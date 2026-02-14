// src/chat/ChatPage.jsx
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Mic, Smile, StopCircle, Play } from "lucide-react";
import Sidebar from "../dashboard/Sidebar.jsx";
import "./ChatPage.css";


// 🔥 FULL SCRIPTED CHAT (REAL TIMESTAMPS GENERATED ON PLAY)
const SCRIPTED_CHAT = [
  { sender: "bimpe", text: "Hi love, welcome to HealHubCenter. I’m glad you’re here." },
  { sender: "user", text: "Hey Bimpe, I’ve been overwhelmed lately…" },
  { sender: "bimpe", text: "I understand. You’ve been carrying so much." },
  { sender: "bimpe", text: "You’re safe here, okay? Just breathe for a second." },
  { sender: "bimpe", text: "What’s the biggest thing on your mind right now?" },
];


export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  const [isRecording, setIsRecording] = useState(false);
  const [recAvailable, setRecAvailable] = useState(false);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  const EMOJIS = ["❤️", "🙂", "😔", "😃", "🔥", "🌿", "✨", "💬", "🎧", "🙌"];

  // ========= AUTO-PLAY SCRIPTED CHAT ==========
  useEffect(() => {
    let index = 0;

    function playNext() {
      if (index >= SCRIPTED_CHAT.length) return;

      const next = SCRIPTED_CHAT[index];

      setIsTyping(true);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: next.sender,
            type: "text",
            text: next.text,
            ts: Date.now(),  // REAL timestamp
          },
        ]);

        setIsTyping(false);
        index++;
        setTimeout(playNext, 900);
      }, 900);
    }

    playNext();
  }, []);

  // auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // mic availability
  useEffect(() => {
    if (navigator.mediaDevices?.getUserMedia) {
      setRecAvailable(true);
    }
  }, []);

  // ========= SEND TEXT (LOCAL ONLY) ==========
  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const text = input.trim();

    setMessages((prev) => [
      ...prev,
      { sender: "user", type: "text", text, ts: Date.now() },
    ]);

    setInput("");

    // Auto-demo reply
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bimpe",
          type: "text",
          text: "I’m listening… tell me more.",
          ts: Date.now(),
        },
      ]);
      setIsTyping(false);
    }, 900);
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
        const blob = new Blob(recordedChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);

        setMessages((prev) => [
          ...prev,
          {
            sender: "user",
            type: "voice",
            audioUrl: url,
            ts: Date.now(),
          },
        ]);

        stream.getTracks().forEach((t) => t.stop());
        setIsRecording(false);
      };

      mr.start();
      setIsRecording(true);
    } catch (err) {
      alert("Microphone permission denied.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
  };

  const playAudio = (url) => new Audio(url).play();

  // ========= RENDER ==========
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
              <img src="/assets/bim1.png" alt="Bimpe" className="bimpe-avatar" />
              <div>
                <h3>Bimpe</h3>
                <p>Online • Listening</p>
              </div>
            </div>
          </motion.header>

          {/* CHAT BODY */}
          <div className="chat-body">
            {messages.map((msg, i) => {
              const isUser = msg.sender === "user";

              return (
                <motion.div
                  key={msg.ts || i}
                  className={`chat-bubble ${isUser ? "user-bubble" : "bimpe-bubble"}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {!isUser && (
                    <img src="/assets/bim1.png" alt="B" className="bubble-avatar" />
                  )}

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
                </motion.div>
              );
            })}

            {isTyping && (
              <motion.div className="typing-indicator" animate={{ opacity: 1 }}>
                <span></span><span></span><span></span>
              </motion.div>
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
