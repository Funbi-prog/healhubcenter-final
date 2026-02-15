// src/chat/ChatPage.jsx
import React, { useCallback, useEffect, useState, useRef } from "react";
import { motion as Motion } from "framer-motion";
import { Send, Mic, Smile, StopCircle, Play } from "lucide-react";
import { io } from "socket.io-client";
import Sidebar from "../dashboard/Sidebar.jsx";
import { API_BASE_URL } from "../constants";
import {
  MESSAGE_ACKNOWLEDGE,
  MESSAGE_ERROR,
  MESSAGE_RECEIVE,
  MESSAGE_SEND,
} from "../constants/aichat";
import {
  getAiChatConversationId,
  getToken,
  storeAiChatConversationId,
} from "../utils/storage";
import {
  getConversationMessages,
  sendAiChatMessageMultipart,
  sendAiChatMessageRest,
} from "../services/aiChatApi";
import "./ChatPage.css";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [conversationId, setConversationId] = useState(
    () => getAiChatConversationId() ?? null,
  );
  const [socketConnected, setSocketConnected] = useState(false);
  const [socketError, setSocketError] = useState(null);
  const [openTranscripts, setOpenTranscripts] = useState({});

  const [isRecording, setIsRecording] = useState(false);
  const [recAvailable, setRecAvailable] = useState(false);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

  const socketRef = useRef(null);
  const lastOutgoingRef = useRef(null);

  const chatBodyRef = useRef(null);
  const isAtBottomRef = useRef(true);

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  const EMOJIS = ["❤️", "🙂", "😔", "😃", "🔥", "🌿", "✨", "💬", "🎧", "🙌"];

  const toLocalMessage = useCallback(
    ({
      role,
      sender,
      content,
      text,
      createdAt,
      created_at,
      timestamp,
      ts,
      id,
    }) => {
      const normalizedRole = role ?? (sender === "user" ? "user" : "ai");
      const resolvedSender = normalizedRole === "user" ? "user" : "bimpe";
      const body =
        typeof content === "string"
          ? content
          : typeof text === "string"
            ? text
            : "";

      const rawTime = createdAt ?? created_at ?? timestamp ?? ts;
      const parsedTime =
        typeof rawTime === "number"
          ? rawTime < 1_000_000_000_000
            ? rawTime * 1000
            : rawTime
          : rawTime
            ? new Date(rawTime).getTime()
            : NaN;

      return {
        id: id ?? `local-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        role: normalizedRole,
        sender: resolvedSender,
        type: "text",
        text: body,
        ts: Number.isFinite(parsedTime) ? parsedTime : Date.now(),
        pending: false,
      };
    },
    [],
  );

  const setConversationIdAndPersist = useCallback((nextId) => {
    if (!nextId) return;
    setConversationId(nextId);
    storeAiChatConversationId(nextId);
  }, []);

  const buildAttachmentUrl = useCallback((filePath) => {
    if (!filePath) return null;
    const origin = new URL(API_BASE_URL).origin;
    const path = String(filePath).replace(/^\/+/, "");
    return `${origin}/${path}`;
  }, []);

  const mapServerMessageToUi = useCallback(
    (serverMsg) => {
      const role = serverMsg?.role;
      const normalizedRole = role === "user" ? "user" : "ai";
      const sender = normalizedRole === "user" ? "user" : "bimpe";
      const source = serverMsg?.metadata?.source ?? null;

      const rawTime =
        serverMsg?.createdAt ??
        serverMsg?.created_at ??
        serverMsg?.timestamp ??
        serverMsg?.ts;
      const parsedTime =
        typeof rawTime === "number"
          ? rawTime < 1_000_000_000_000
            ? rawTime * 1000
            : rawTime
          : rawTime
            ? new Date(rawTime).getTime()
            : NaN;
      const ts = Number.isFinite(parsedTime) ? parsedTime : Date.now();

      const content = serverMsg?.content;
      if (typeof content === "string" && content.trim()) {
        return {
          id: serverMsg?.id ?? `srv-${ts}`,
          role: normalizedRole,
          sender,
          type: "text",
          text: content,
          ts,
          pending: false,
          __source: source,
        };
      }

      const firstAttachment = Array.isArray(serverMsg?.attachments)
        ? serverMsg.attachments[0]
        : null;

      const mimeType = firstAttachment?.mimeType;
      const url = buildAttachmentUrl(firstAttachment?.filePath);

      if (mimeType && String(mimeType).startsWith("audio/") && url) {
        return {
          id: serverMsg?.id ?? `srv-${ts}`,
          role: normalizedRole,
          sender,
          type: "voice",
          audioUrl: url,
          ts,
          pending: false,
          transcription:
            serverMsg?.metadata?.transcription ??
            serverMsg?.metadata?.transcript ??
            null,
          __source: source,
        };
      }

      if (mimeType && String(mimeType).startsWith("image/") && url) {
        return {
          id: serverMsg?.id ?? `srv-${ts}`,
          role: normalizedRole,
          sender,
          type: "image",
          imageUrl: url,
          ts,
          pending: false,
          __source: source,
        };
      }

      return {
        id: serverMsg?.id ?? `srv-${ts}`,
        role: normalizedRole,
        sender,
        type: "text",
        text: "",
        ts,
        pending: false,
        __source: source,
      };
    },
    [buildAttachmentUrl],
  );

  const hydrateConversationMessages = useCallback(
    async (id) => {
      if (!id) return;
      try {
        const list = await getConversationMessages(id);
        const mapped = list.map((m, index) => ({
          ...mapServerMessageToUi(m),
          __hydrationIndex: index,
        }));

        mapped.sort((a, b) => {
          if (a.ts !== b.ts) return a.ts - b.ts;

          const aIsUser = (a.role ?? a.sender) === "user";
          const bIsUser = (b.role ?? b.sender) === "user";
          if (aIsUser !== bIsUser) return aIsUser ? -1 : 1;

          return (a.__hydrationIndex ?? 0) - (b.__hydrationIndex ?? 0);
        });

        // Merge server-generated voice transcription messages into the preceding voice note.
        // Backend pattern:
        // - voice message: role=user, content=null, attachments[0].mimeType=audio/*
        // - transcription message: role=user, metadata.source="voice_transcription", content="..."
        const merged = [];
        for (const msg of mapped) {
          const isTranscription =
            msg?.__source === "voice_transcription" &&
            (msg.role ?? msg.sender) === "user" &&
            msg.type === "text" &&
            typeof msg.text === "string" &&
            msg.text.trim();

          if (isTranscription) {
            let attached = false;
            for (let i = merged.length - 1; i >= 0; i--) {
              const candidate = merged[i];
              const candidateIsUser =
                (candidate.role ?? candidate.sender) === "user";
              if (candidateIsUser && candidate.type === "voice") {
                merged[i] = {
                  ...candidate,
                  transcription: candidate.transcription ?? msg.text,
                };
                attached = true;
                break;
              }
            }

            // If we can't find a matching voice note, keep it as a normal message
            // so the user doesn't lose content.
            if (!attached) merged.push(msg);
            continue;
          }

          merged.push(msg);
        }

        setMessages(
          merged.map(
            ({ __hydrationIndex: _ignored, __source: _src, ...rest }) => rest,
          ),
        );
      } catch (err) {
        setSocketError(
          err?.response?.data?.message ??
            err?.message ??
            "Failed to load messages",
        );
      }
    },
    [mapServerMessageToUi],
  );

  const appendMessage = useCallback((message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const markLastPendingUserMessageAsAccepted = useCallback(
    (serverUserMessage) => {
      if (!serverUserMessage) return;

      setMessages((prev) => {
        const idx = [...prev]
          .reverse()
          .findIndex((m) => m.sender === "user" && m.pending === true);

        if (idx === -1) {
          return [...prev, toLocalMessage(serverUserMessage)];
        }

        const realIndex = prev.length - 1 - idx;
        const next = prev.slice();
        const updated = toLocalMessage(serverUserMessage);
        next[realIndex] = { ...next[realIndex], ...updated, pending: false };
        return next;
      });
    },
    [toLocalMessage],
  );

  const attachTranscriptionToLastVoiceMessage = useCallback((transcription) => {
    if (!transcription) return;

    const transcriptText =
      typeof transcription === "string"
        ? transcription
        : (transcription?.text ?? transcription?.transcript ?? null);

    setMessages((prev) => {
      const idx = [...prev]
        .reverse()
        .findIndex((m) => m.type === "voice" && !m.transcription);
      if (idx === -1) return prev;

      const realIndex = prev.length - 1 - idx;
      const next = prev.slice();
      next[realIndex] = {
        ...next[realIndex],
        transcription: transcriptText ?? transcription,
      };
      return next;
    });
  }, []);

  // ========= SOCKET.IO CONNECT ==========
  useEffect(() => {
    const token = getToken();
    const origin = new URL(API_BASE_URL).origin;
    const socket = io(`${origin}/ai-chat`, {
      auth: token ? { token: `Bearer ${token}` } : undefined,
      transports: ["websocket", "polling"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setSocketConnected(true);
      setSocketError(null);
    });

    socket.on("disconnect", () => {
      setSocketConnected(false);
    });

    socket.on("connect_error", (err) => {
      setSocketConnected(false);
      setSocketError(err?.message ?? "Failed to connect");
    });

    socket.on(MESSAGE_ACKNOWLEDGE, (payload) => {
      const nextConversationId = payload?.conversationId;
      if (nextConversationId) setConversationIdAndPersist(nextConversationId);

      markLastPendingUserMessageAsAccepted(payload?.userMessage);
      setIsTyping(true);
    });

    socket.on(MESSAGE_RECEIVE, (payload) => {
      const nextConversationId = payload?.conversationId;
      if (nextConversationId) setConversationIdAndPersist(nextConversationId);

      if (payload?.transcription) {
        attachTranscriptionToLastVoiceMessage(payload.transcription);
      }

      const delivered = payload?.message;

      // Some backends emit a user message with metadata.source="voice_transcription".
      // That should populate the transcript under the related voice note, not render as text.
      const deliveredSource = delivered?.metadata?.source ?? null;
      if (
        deliveredSource === "voice_transcription" &&
        typeof delivered?.content === "string" &&
        delivered.content.trim()
      ) {
        attachTranscriptionToLastVoiceMessage(delivered.content);
      } else if (delivered?.content) {
        appendMessage(toLocalMessage(delivered));
      }

      setIsTyping(false);
    });

    socket.on(MESSAGE_ERROR, async (payload) => {
      setIsTyping(false);
      setSocketError(payload?.message ?? "Message failed");

      const lastOutgoing = lastOutgoingRef.current;
      if (!lastOutgoing || lastOutgoing.triedRest) return;

      lastOutgoingRef.current = { ...lastOutgoing, triedRest: true };
      try {
        const data = await sendAiChatMessageRest({
          conversationId: lastOutgoing.conversationId,
          content: lastOutgoing.content,
        });

        const nextConversationId = data?.conversationId;
        if (nextConversationId) setConversationId(nextConversationId);

        const aiMessage = data?.message ?? data?.reply ?? data?.data?.message;
        if (aiMessage?.content) {
          appendMessage(toLocalMessage(aiMessage));
        }
      } catch (err) {
        setSocketError(
          err?.response?.data?.message ??
            err?.message ??
            "REST fallback failed",
        );
      }
    });

    return () => {
      socket.off(MESSAGE_ACKNOWLEDGE);
      socket.off(MESSAGE_RECEIVE);
      socket.off(MESSAGE_ERROR);
      socket.disconnect();
    };
  }, [
    appendMessage,
    attachTranscriptionToLastVoiceMessage,
    markLastPendingUserMessageAsAccepted,
    setConversationIdAndPersist,
    toLocalMessage,
  ]);

  // Hydrate messages on first load + when returning to this tab
  useEffect(() => {
    if (conversationId) hydrateConversationMessages(conversationId);
  }, [conversationId, hydrateConversationMessages]);

  // Keep chat layout sized to viewport (minus sticky navbar), so scroll stays in chat body.
  useEffect(() => {
    const applyNavHeightVar = () => {
      const nav = document.querySelector(".glass-nav");
      const height = nav && nav instanceof HTMLElement ? nav.offsetHeight : 0;
      document.documentElement.style.setProperty("--hh-nav-h", `${height}px`);
    };

    applyNavHeightVar();
    window.addEventListener("resize", applyNavHeightVar);
    return () => window.removeEventListener("resize", applyNavHeightVar);
  }, []);

  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState === "visible" && conversationId) {
        hydrateConversationMessages(conversationId);
      }
    };
    const onFocus = () => {
      if (conversationId) hydrateConversationMessages(conversationId);
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("focus", onFocus);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("focus", onFocus);
    };
  }, [conversationId, hydrateConversationMessages]);

  const isNearBottom = useCallback((el) => {
    if (!el) return true;
    const thresholdPx = 120;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    return distanceFromBottom <= thresholdPx;
  }, []);

  const updateIsAtBottom = useCallback(() => {
    const el = chatBodyRef.current;
    isAtBottomRef.current = isNearBottom(el);
  }, [isNearBottom]);

  // Auto-scroll only if the user is already at the bottom.
  useEffect(() => {
    if (!isAtBottomRef.current) return;
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Keep bottom-tracking accurate as the container resizes.
  useEffect(() => {
    updateIsAtBottom();
    window.addEventListener("resize", updateIsAtBottom);
    return () => window.removeEventListener("resize", updateIsAtBottom);
  }, [updateIsAtBottom]);

  // mic availability
  useEffect(() => {
    if (navigator.mediaDevices?.getUserMedia) {
      setRecAvailable(true);
    }
  }, []);

  // ========= SEND TEXT (SOCKET + REST FALLBACK) ==========
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const content = input.trim();
    const localId = `local-user-${Date.now()}-${Math.random().toString(16).slice(2)}`;

    appendMessage({
      id: localId,
      role: "user",
      sender: "user",
      type: "text",
      text: content,
      ts: Date.now(),
      pending: true,
    });

    // If the user is sending, keep them pinned to the bottom.
    isAtBottomRef.current = true;

    setInput("");
    setSocketError(null);

    const socket = socketRef.current;
    const outgoingConversationId = conversationId ?? undefined;
    lastOutgoingRef.current = {
      content,
      conversationId: outgoingConversationId,
      triedRest: false,
      localId,
    };

    try {
      if (socket && socket.connected) {
        const payload = outgoingConversationId
          ? { conversationId: outgoingConversationId, content }
          : { content };
        socket.emit(MESSAGE_SEND, payload);
        return;
      }

      // REST fallback when socket isn't connected
      setIsTyping(true);
      const data = await sendAiChatMessageRest({
        conversationId: outgoingConversationId,
        content,
      });

      const nextConversationId = data?.conversationId;
      if (nextConversationId) setConversationIdAndPersist(nextConversationId);

      const aiMessage = data?.message ?? data?.reply ?? data?.data?.message;
      if (aiMessage?.content) {
        appendMessage(toLocalMessage(aiMessage));
      }
      setIsTyping(false);
    } catch (err) {
      setIsTyping(false);
      setSocketError(
        err?.response?.data?.message ?? err?.message ?? "Message failed",
      );
    }
  };

  // ========= INSERT EMOJI ==========
  const insertEmoji = (emoji) => {
    const el = inputRef.current;
    if (!el) return setInput((v) => v + emoji);

    const start = el.selectionStart;
    const end = el.selectionEnd;

    const newVal = input.slice(0, start) + emoji + input.slice(end);
    setInput(newVal);

    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + emoji.length, start + emoji.length);
    });
  };

  // ========= RECORDING ==========
  const startRecording = async () => {
    if (!recAvailable) return alert("Recording not supported");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recordedChunksRef.current = [];

      const mr = new MediaRecorder(stream, { mimeType: "audio/webm" });
      mediaRecorderRef.current = mr;

      mr.ondataavailable = (ev) => {
        if (ev.data.size > 0) recordedChunksRef.current.push(ev.data);
      };

      mr.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, {
          type: "audio/webm",
        });
        const url = URL.createObjectURL(blob);

        const localId = `local-voice-${Date.now()}-${Math.random().toString(16).slice(2)}`;

        appendMessage({
          id: localId,
          role: "user",
          sender: "user",
          type: "voice",
          audioUrl: url,
          ts: Date.now(),
          pending: true,
          transcription: null,
        });

        // Send voice using REST multipart (files aren't supported over socket)
        (async () => {
          try {
            setSocketError(null);
            setIsTyping(true);

            const file = new File([blob], `voice-${Date.now()}.webm`, {
              type: "audio/webm",
            });

            const data = await sendAiChatMessageMultipart({
              conversationId: conversationId ?? undefined,
              files: [file],
            });

            const nextConversationId = data?.conversationId;
            if (nextConversationId)
              setConversationIdAndPersist(nextConversationId);

            if (data?.transcription) {
              attachTranscriptionToLastVoiceMessage(data.transcription);
            }

            setMessages((prev) => {
              const idx = prev.findIndex((m) => m.id === localId);
              if (idx === -1) return prev;
              const next = prev.slice();
              next[idx] = { ...next[idx], pending: false };
              return next;
            });

            // If REST returns an AI reply synchronously, append it.
            const candidateMessage =
              data?.reply ??
              data?.aiMessage ??
              data?.assistantMessage ??
              data?.message;

            const role = candidateMessage?.role;
            const content = candidateMessage?.content;
            const isAiRole = role === "ai" || role === "assistant";

            if (isAiRole && typeof content === "string" && content.trim()) {
              appendMessage(toLocalMessage(candidateMessage));
              setIsTyping(false);
            }
          } catch (err) {
            setIsTyping(false);
            setSocketError(
              err?.response?.data?.message ??
                err?.message ??
                "Voice upload failed",
            );
            setMessages((prev) => {
              const idx = prev.findIndex((m) => m.id === localId);
              if (idx === -1) return prev;
              const next = prev.slice();
              next[idx] = { ...next[idx], pending: false };
              return next;
            });
          }
        })();

        stream.getTracks().forEach((t) => t.stop());
        setIsRecording(false);
      };

      mr.start();
      setIsRecording(true);
    } catch {
      alert("Microphone permission denied.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
  };

  const playAudio = (url) => new Audio(url).play();

  const toggleTranscript = (id) => {
    setOpenTranscripts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // ========= RENDER ==========
  return (
    <div className="dashboard-layout no-topbar">
      <Sidebar />

      <main className="dashboard-main">
        <div className="chat-wrapper">
          {/* HEADER */}
          <Motion.header
            className="chat-header"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div className="bimpe-profile">
              <img
                src="/assets/bim1.png"
                alt="Bimpe"
                className="bimpe-avatar"
              />
              <div>
                <h3>Bimpe</h3>
                <p>
                  {socketConnected ? "Online" : "Offline"} •{" "}
                  {isTyping ? "Thinking" : "Listening"}
                </p>
              </div>
            </div>
          </Motion.header>

          {/* CHAT BODY */}
          <div
            className="chat-body"
            ref={chatBodyRef}
            onScroll={updateIsAtBottom}
          >
            {socketError && (
              <div style={{ color: "#8b1e1e", fontSize: 13 }}>
                {socketError}
              </div>
            )}
            {messages.map((msg, i) => {
              const isUser = (msg.role ?? msg.sender) === "user";
              const key = msg.id ?? msg.ts ?? i;

              return (
                <div
                  className={`message-row ${isUser ? "user" : "bimpe"}`}
                  key={key}
                >
                  {!isUser && (
                    <img
                      src="/assets/bim1.png"
                      alt="B"
                      className="bubble-avatar"
                    />
                  )}

                  <Motion.div
                    className={`chat-bubble ${isUser ? "chat-user-bubble" : "chat-ai-bubble"}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="bubble-body">
                      {msg.type === "text" && (
                        <div className="bubble-text">{msg.text}</div>
                      )}

                      {msg.type === "voice" && (
                        <div className="bubble-voice">
                          <button onClick={() => playAudio(msg.audioUrl)}>
                            <Play size={14} />
                          </button>
                          <audio src={msg.audioUrl} controls />
                          <button
                            type="button"
                            onClick={() =>
                              toggleTranscript(msg.id ?? msg.ts ?? i)
                            }
                            style={{
                              marginLeft: 8,
                              fontSize: 12,
                              background: "transparent",
                              border: "none",
                              cursor: "pointer",
                              color: isUser ? "#fff" : "#1b1b1b",
                              opacity: 0.85,
                              textDecoration: "underline",
                            }}
                          >
                            Transcript
                          </button>
                        </div>
                      )}

                      {msg.type === "image" && msg.imageUrl && (
                        <div style={{ marginTop: 4 }}>
                          <img
                            src={msg.imageUrl}
                            alt="Attachment"
                            style={{
                              maxWidth: 240,
                              width: "100%",
                              borderRadius: 12,
                              display: "block",
                            }}
                          />
                        </div>
                      )}

                      {msg.type === "voice" &&
                        openTranscripts[msg.id ?? msg.ts ?? i] && (
                          <div
                            style={{
                              marginTop: 8,
                              fontSize: 13,
                              lineHeight: 1.4,
                              opacity: 0.85,
                              color: isUser ? "#fff" : "#1b1b1b",
                            }}
                          >
                            {msg.transcription
                              ? typeof msg.transcription === "string"
                                ? msg.transcription
                                : JSON.stringify(msg.transcription)
                              : msg.pending
                                ? "Transcribing…"
                                : "No transcription available."}
                          </div>
                        )}

                      <div className="bubble-meta">
                        <span>
                          {new Date(msg.ts).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  </Motion.div>
                </div>
              );
            })}

            {isTyping && (
              <div className="message-row bimpe">
                <img src="/assets/bim1.png" alt="B" className="bubble-avatar" />
                <Motion.div
                  className="typing-indicator"
                  animate={{ opacity: 1 }}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </Motion.div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* INPUT BAR */}
          <form className="chat-input" onSubmit={handleSend}>
            <button
              type="button"
              className="emoji-btn"
              onClick={() => setShowEmoji((s) => !s)}
            >
              <Smile size={18} />
            </button>

            {showEmoji && (
              <div className="emoji-popover">
                {EMOJIS.map((e) => (
                  <button key={e} onClick={() => insertEmoji(e)}>
                    {e}
                  </button>
                ))}
              </div>
            )}

            <input
              ref={inputRef}
              type="text"
              placeholder="Type your message…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <button
              type="button"
              className={`mic-btn ${isRecording ? "recording" : ""}`}
              onClick={() => (isRecording ? stopRecording() : startRecording())}
            >
              {isRecording ? <StopCircle size={18} /> : <Mic size={18} />}
            </button>

            <button type="submit" className="send-btn">
              <Send size={18} />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
