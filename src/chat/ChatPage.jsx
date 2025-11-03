// src/chat/ChatPage.jsx
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import "./ChatPage.css";
import { Send, Bot, User } from "lucide-react";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const lastMood = localStorage.getItem("hh_lastMood");

  useEffect(() => {
    let greeting = "";
    switch (lastMood) {
      case "stressed":
        greeting =
          "Hi love 🌿, I saw that you felt stressed earlier. Wanna tell me what’s been weighing on you?";
        break;
      case "joy":
        greeting =
          "Hey sunshine ☀️, you seemed joyful today — that’s wonderful! What made you smile?";
        break;
      case "tired":
        greeting =
          "Hey there 😴, I noticed you’re feeling a bit tired. Would you like to unwind together?";
        break;
      case "calm":
        greeting =
          "Hi beautiful soul 💫, I love that calm energy. Let’s keep that peace flowing.";
        break;
      case "okay":
        greeting =
          "Hey, I sensed you were feeling okay earlier. Neutral days are valid too — wanna chat?";
        break;
      default:
        greeting =
          "Hi, I’m Bimpe 💬 — your digital wellness companion. How are you feeling today?";
        break;
    }

    setIsTyping(true);
    setTimeout(() => {
      setMessages([{ sender: "bimpe", text: greeting }]);
      setIsTyping(false);
    }, 1200);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = { sender: "user", text: input.trim() };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = {
        sender: "bimpe",
        text: "I hear you. That’s valid, really. Would you like me to suggest something to help?",
      };
      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="chat-container">
      <motion.header
        className="chat-header"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="bimpe-profile">
          <img
            src="/assets/bim1"
            alt="Bimpe"
            className="bimpe-avatar"
          />
          <div>
            <h3>Bimpe AI</h3>
            <p>Online • Listening</p>
          </div>
        </div>
      </motion.header>

      <div className="chat-body">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            className={`chat-bubble ${
              msg.sender === "user" ? "user-bubble" : "bimpe-bubble"
            }`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {msg.sender === "bimpe" ? <Bot size={16} /> : <User size={16} />}
            <span>{msg.text}</span>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            className="typing-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span></span>
            <span></span>
            <span></span>
          </motion.div>
        )}

        <div ref={chatEndRef} />
      </div>

      <form className="chat-input" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
