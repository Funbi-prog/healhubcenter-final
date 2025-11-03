import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import "./FiresideChat.css";

// connect to backend server
const socket = io("http://localhost:5000", {
  transports: ["websocket"],
});

export default function FiresideChat() {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [isAnonymous, setIsAnonymous] = useState(true);
  const [micOn, setMicOn] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [reactions, setReactions] = useState([]);
  const [listenerCount, setListenerCount] = useState(1);

  const roomId = id || "healhub-room";

  const topic =
    state || {
      title: "Fireside Session",
      desc: "A calm, reflective space for honest and healing conversations.",
    };

  useEffect(() => {
    // join room on mount
    socket.emit("joinRoom", roomId);

    socket.on("updateCount", (count) => {
      setListenerCount(count);
    });

    socket.on("newReaction", (emoji) => {
      const id = Date.now();
      const left = Math.random() * 80 + 10;
      setReactions((prev) => [...prev, { id, emoji, left }]);
      setTimeout(
        () => setReactions((prev) => prev.filter((r) => r.id !== id)),
        2500
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  const handleReaction = () => {
    const emojis = ["💜", "👏", "🔥", "✨", "🙌", "💭"];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    socket.emit("reaction", { roomId, emoji });
  };

  const toggleRaiseHand = () => {
    setHandRaised((prev) => !prev);
  };

  return (
    <motion.div
      className="fs-room"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="fs-aurora" />
      <img src="/assets/hc-logo.png" alt="HC Logo" className="fs-logo" />

      {/* === HEADER === */}
      <header className="fs-header">
        <div>
          <h1 className="fs-title">{topic.title}</h1>
          <p className="fs-sub">{topic.desc}</p>
        </div>

        <div className="fs-actions">
          <span className="live-count">👂 {listenerCount} listening</span>
          <button className="fs-pill ghost" onClick={() => navigate("/roundtable")}>
            Leave quietly
          </button>
          <button className="fs-pill solid">Invite</button>
        </div>
      </header>

      {/* === SPEAKERS === */}
      <section className="fs-stage">
        <motion.div
          className={`fs-avatar ${micOn ? "speaking" : ""}`}
          animate={{ scale: micOn ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className={`mic-wave ${micOn ? "active" : ""}`} />
          <img src="https://randomuser.me/api/portraits/women/45.jpg" alt="You" />
          <strong>You</strong>
          <span>Speaker</span>
        </motion.div>
      </section>

      {/* === FLOATING REACTIONS === */}
      <AnimatePresence>
        {reactions.map((r) => (
          <motion.span
            key={r.id}
            className="reaction-burst"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: -120 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            style={{ left: `${r.left}%` }}
          >
            {r.emoji}
          </motion.span>
        ))}
      </AnimatePresence>

      {/* === CONTROLS === */}
      <footer className="fs-controls">
        <div className="fs-controls-left">
          <button
            className={`ctrl ${handRaised ? "active" : ""}`}
            onClick={toggleRaiseHand}
          >
            {handRaised ? "✋ Lower Hand" : "✋ Raise Hand"}
          </button>

          <button className="ctrl ghost" onClick={handleReaction}>
            💜 Reactions
          </button>
        </div>

        <div className="fs-controls-center">
          <motion.button
            className={`mic ${micOn ? "on" : "off"}`}
            onClick={() => setMicOn(!micOn)}
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.05 }}
          >
            {micOn && <span className="mic-led" />}
            {micOn ? "🔴 Recording" : "🎙 Tap Mic"}
          </motion.button>

          <button className="primary" onClick={() => navigate("/roundtable")}>
            Step Out Quietly
          </button>
        </div>

        <div className="fs-controls-right">
          <button className="ctrl danger">End Session</button>
        </div>
      </footer>
    </motion.div>
  );
}
