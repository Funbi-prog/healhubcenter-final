import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic, Plus, LogOut, Moon, Sun } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import {
  sendMessage,
  createConversation,
  getMessages,
  getConversations,
} from "../services/api";
import "./ChatPage.css";

export default function ChatPage() {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    if (currentConversationId) {
      loadMessages(currentConversationId);
    }
  }, [currentConversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadConversations = async () => {
    try {
      const data = await getConversations();
      if (data && data.conversations) {
        setConversations(data.conversations);
        if (data.conversations.length > 0 && !currentConversationId) {
          setCurrentConversationId(data.conversations[0].id);
        }
      }
    } catch (error) {
      console.error("Failed to load conversations:", error);
    }
  };

  const loadMessages = async (conversationId) => {
    try {
      setLoading(true);
      const data = await getMessages(conversationId);
      if (data && data.messages) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error("Failed to load messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = async () => {
    const title = prompt("Enter a title for your new chat:");
    if (!title) return;

    try {
      setLoading(true);
      const data = await createConversation(title);
      if (data && data.conversation) {
        setConversations([data.conversation, ...conversations]);
        setCurrentConversationId(data.conversation.id);
        setMessages([]);
      }
    } catch (error) {
      console.error("Failed to create conversation:", error);
      alert("Failed to create new chat. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !currentConversationId) return;

    const userMessage = {
      id: Date.now(),
      content: input,
      role: "user",
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const data = await sendMessage(currentConversationId, input);
      if (data && data.message) {
        setMessages((prev) => [...prev, data.message]);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className={`chat-page ${darkMode ? "dark" : ""}`}>
      {/* Animated Background */}
      <div className="animated-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      {/* Sidebar */}
      <aside className="chat-sidebar">
        <div className="sidebar-header">
          <img src="/assets/nav.png" alt="Logo" className="sidebar-logo" />
          <button className="new-chat-btn" onClick={handleNewChat}>
            <Plus size={20} />
            New Chat
          </button>
        </div>

        <div className="conversations-list">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              className={`conversation-item ${
                currentConversationId === conv.id ? "active" : ""
              }`}
              onClick={() => setCurrentConversationId(conv.id)}
            >
              {conv.title}
            </button>
          ))}
        </div>

        <div className="sidebar-footer">
          <button
            className="icon-btn"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="icon-btn logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="chat-main">
        <div className="chat-header">
          <div className="bimpe-info">
            <div className="bimpe-avatar">👩‍⚕️</div>
            <div>
              <h3>Bimpe</h3>
              <p className="status">Online • Listening</p>
            </div>
          </div>
        </div>

        <div className="messages-container">
          <AnimatePresence>
            {messages.map((msg, idx) => (
              <motion.div
                key={msg.id || idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`message ${msg.role === "user" ? "user" : "assistant"}`}
              >
                {msg.role !== "user" && (
                  <div className="message-avatar">👩‍⚕️</div>
                )}
                <div className="message-content">
                  <p>{msg.content}</p>
                  <span className="message-time">
                    {new Date(msg.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="message assistant"
            >
              <div className="message-avatar">👩‍⚕️</div>
              <div className="message-content typing">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            disabled={loading || !currentConversationId}
          />
          <button className="icon-btn" disabled={loading}>
            <Mic size={20} />
          </button>
          <button
            className="icon-btn send-btn"
            onClick={handleSend}
            disabled={loading || !input.trim() || !currentConversationId}
          >
            <Send size={20} />
          </button>
        </div>
      </main>
    </div>
  );
}
