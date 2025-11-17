// src/chat/ChatPage.jsx
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Mic, Smile, StopCircle, Play } from "lucide-react";
import Sidebar from "../dashboard/Sidebar.jsx";
import "./ChatPage.css";

/**
 * ChatPage — full page
 * - Emoji picker (local)
 * - Voice note recorder using MediaRecorder (frontend-only)
 * - Placeholder send logic (replace with backend endpoint call)
 *
 * Notes for engineer: replace sendPlaceholderResponse() with API call to your endpoint.
 */

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  // Recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recAvailable, setRecAvailable] = useState(false);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  const emojiButtonRef = useRef(null);

  const lastMood = localStorage.getItem("hh_lastMood");

  // simple emoji set (extend as needed)
  const EMOJIS = ["❤️", "🙂", "😔", "😃", "🔥", "🌿", "✨", "💬", "🎧", "🙌"];

  // Greeting
  useEffect(() => {
    let greeting = "";

    switch (lastMood) {
      case "stressed":
        greeting = "Hi love 🌿, I saw you felt stressed earlier. Want to talk about it?";
        break;
      case "joy":
        greeting = "Hey sunshine ☀️, you seemed joyful today — that’s beautiful!";
        break;
      case "tired":
        greeting = "Hi dear 😴, looks like you felt tired earlier. Want to unwind together?";
        break;
      case "calm":
        greeting = "Hi beautiful soul 💫, your calm energy is everything.";
        break;
      default:
        greeting = "Hi, I’m Bimpe — your digital wellness companion. How are you feeling today?";
    }

    setIsTyping(true);
    const t = setTimeout(() => {
      setMessages([{ sender: "bimpe", type: "text", text: greeting, ts: Date.now() }]);
      setIsTyping(false);
    }, 700);

    return () => clearTimeout(t);
  }, []);

  // scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Enable recording availability check
  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      setRecAvailable(true);
    }
  }, []);

  // Placeholder backend reply - replace with a real API call
  const sendPlaceholderResponse = (userText) => {
    setIsTyping(true);
    setTimeout(() => {
      const reply = {
        sender: "bimpe",
        type: "text",
        text: "I hear you. That’s valid — would you like a suggestion or resources?",
        ts: Date.now(),
      };
      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
    }, 900);
  };

  // Send text message
  const handleSend = (e) => {
    e?.preventDefault();
    if (!input.trim()) return;
    const msg = { sender: "user", type: "text", text: input.trim(), ts: Date.now() };
    setMessages((prev) => [...prev, msg]);
    setInput("");
    setShowEmoji(false);
    // TODO: replace with POST to your chat endpoint and handle streaming response
    sendPlaceholderResponse(input.trim());
  };

  // Emoji insertion at cursor
  const insertEmoji = (emoji) => {
    const el = inputRef.current;
    if (!el) {
      setInput((v) => v + emoji);
      return;
    }
    const start = el.selectionStart || 0;
    const end = el.selectionEnd || 0;
    const newVal = input.slice(0, start) + emoji + input.slice(end);
    setInput(newVal);
    // move caret after inserted emoji
    requestAnimationFrame(() => {
      el.focus();
      const pos = start + emoji.length;
      el.setSelectionRange(pos, pos);
    });
  };

  // Recording functions (frontend)
  const startRecording = async () => {
    if (!recAvailable) return alert("Recording not available in this browser");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recordedChunksRef.current = [];
      const mr = new MediaRecorder(stream, { mimeType: "audio/webm" });
      mediaRecorderRef.current = mr;

      mr.ondataavailable = (ev) => {
        if (ev.data && ev.data.size > 0) recordedChunksRef.current.push(ev.data);
      };

      mr.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        const voiceMsg = {
          sender: "user",
          type: "voice",
          audioUrl: url,
          ts: Date.now(),
          duration: null,
        };
        setMessages((prev) => [...prev, voiceMsg]);
        // optionally send the blob to backend here
        // e.g. uploadBlobToServer(blob)
        stream.getTracks().forEach((t) => t.stop());
        setIsRecording(false);
      };

      mr.start();
      setIsRecording(true);
    } catch (err) {
      console.error("mic error", err);
      alert("Could not access microphone. Check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    } else {
      setIsRecording(false);
    }
  };

  // Play/stop audio inside message (simple)
  const handlePlayAudio = (audioUrl) => {
    const a = new Audio(audioUrl);
    a.play();
  };

  return (
    <div className="dashboard-layout no-topbar">
      <Sidebar />

      <main className="dashboard-main">
        <div className="chat-wrapper">

          {/* HEADER */}
          <motion.header
            className="chat-header"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div className="bimpe-profile">
              <img
                src="/assets/bim1.png"
                alt="Bimpe Avatar"
                className="bimpe-avatar"
              />
              <div>
                <h3>Bimpe</h3>
                <p>Online • Listening</p>
              </div>
            </div>
          </motion.header>

          {/* BODY */}
          <div className="chat-body">
            {messages.map((msg, i) => {
              const isUser = msg.sender === "user";
              const bubbleClass = isUser ? "user-bubble" : "bimpe-bubble";

              return (
                <motion.div
                  key={msg.ts || i}
                  className={`chat-bubble ${bubbleClass}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {/* left side avatar for bimpe only on big screens */}
                  {!isUser && (
                    <img src="/assets/bim1.png" alt="B" className="bubble-avatar" />
                  )}

                  <div className="bubble-body">
                    {msg.type === "text" && <div className="bubble-text">{msg.text}</div>}

                    {msg.type === "voice" && (
                      <div className="bubble-voice">
                        <button
                          className="voice-play"
                          onClick={() => handlePlayAudio(msg.audioUrl)}
                          aria-label="Play voice note"
                        >
                          <Play size={14} />
                        </button>
                        <audio src={msg.audioUrl} controls className="voice-player" />
                      </div>
                    )}

                    <div className="bubble-meta">
                      <span className="ts">
                        {new Date(msg.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {isTyping && (
              <motion.div
                className="typing-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span></span>
                <span></span>
                <span></span>
              </motion.div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* INPUT */}
          <form className="chat-input" onSubmit={handleSend} onBlur={() => setShowEmoji(false)}>
            <div className="left-controls">
              <button
                type="button"
                className="emoji-btn"
                onClick={() => setShowEmoji((s) => !s)}
                ref={emojiButtonRef}
                aria-label="Open emoji picker"
              >
                <Smile size={18} />
              </button>

              {showEmoji && (
                <div className="emoji-popover" role="dialog" aria-hidden={!showEmoji}>
                  {EMOJIS.map((e) => (
                    <button
                      key={e}
                      className="emoji-item"
                      type="button"
                      onClick={() => insertEmoji(e)}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <input
              ref={inputRef}
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-label="Message input"
            />

            <div className="right-controls">
              <button
                type="button"
                className={`mic-btn ${isRecording ? "recording" : ""}`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => (isRecording ? stopRecording() : startRecording())}
                title={isRecording ? "Stop recording" : "Record voice note"}
              >
                {isRecording ? <StopCircle size={18} /> : <Mic size={18} />}
              </button>

              <button type="submit" className="send-btn" aria-label="Send message">
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
