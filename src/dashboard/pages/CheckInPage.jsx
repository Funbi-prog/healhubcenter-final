// src/dashboard/CheckInPage.jsx
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../Dashboard.css";

const moods = [
  { key: "joy", label: "Joy", icon: "😊", color: "#F9D57E" },
  { key: "calm", label: "Calm", icon: "😌", color: "#C6E2E9" },
  { key: "okay", label: "Okay", icon: "🙂", color: "#E0D1B6" },
  { key: "tired", label: "Tired", icon: "🥱", color: "#BEB8DC" },
  { key: "stressed", label: "Stressed", icon: "😣", color: "#E9A1A1" },
];

const fadeRight = (d = 0) => ({
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  transition: { delay: d, duration: 0.5, ease: "easeOut" },
});

export default function CheckInPage() {
  const navigate = useNavigate();
  const [mood, setMood] = useState("");
  const [energy, setEnergy] = useState(50);
  const [sleep, setSleep] = useState(6);
  const [notes, setNotes] = useState("");
  const [done, setDone] = useState(false);

  const disabled = useMemo(() => !mood, [mood]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const entry = {
      ts: new Date().toISOString(),
      mood,
      energy: Number(energy),
      sleep: Number(sleep),
      notes: notes.trim(),
    };
    const key = "hh_checkins";
    const prev = JSON.parse(localStorage.getItem(key) || "[]");
    localStorage.setItem(key, JSON.stringify([entry, ...prev].slice(0, 200)));

    setDone(true);
    setTimeout(() => navigate("/dashboard"), 4200);
  };

  return (
    <div
      className="dashboard-layout"
      style={{
        background: "linear-gradient(180deg, #f8fafc 0%, #f0f9ff 100%)",
        minHeight: "100vh",
      }}
    >
      <main className="checkin-wrap">
        <AnimatePresence>
          {!done ? (
            <>
              <motion.h1 className="checkin-title" {...fadeRight(0.05)}>
                Daily Check-In 🌿
              </motion.h1>
              <motion.p className="checkin-sub" {...fadeRight(0.12)}>
                Take 30 seconds to ground yourself and reconnect.
              </motion.p>

              <form className="checkin-card" onSubmit={handleSubmit}>
                <motion.div className="checkin-block" {...fadeRight(0.15)}>
                  <label className="checkin-label">
                    How do you feel right now?
                  </label>
                  <div className="mood-grid">
                    {moods.map((m) => {
                      const active = mood === m.key;
                      return (
                        <motion.button
                          type="button"
                          key={m.key}
                          onClick={() => setMood(m.key)}
                          className={`mood-chip ${active ? "active" : ""}`}
                          whileHover={{ scale: 1.07 }}
                          style={{
                            background: active
                              ? `${m.color}40`
                              : "rgba(255,255,255,0.8)",
                            borderColor: active ? m.color : "transparent",
                          }}
                        >
                          <span className="mood-ico">{m.icon}</span>
                          {m.label}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>

                <motion.div className="checkin-block" {...fadeRight(0.2)}>
                  <label className="checkin-label">
                    Energy level <span className="muted">({energy}%)</span>
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={energy}
                    onChange={(e) => setEnergy(e.target.value)}
                    className="slider"
                  />
                </motion.div>

                <motion.div className="checkin-block" {...fadeRight(0.25)}>
                  <label className="checkin-label">
                    Sleep (hours) <span className="muted">({sleep}h)</span>
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={12}
                    value={sleep}
                    onChange={(e) => setSleep(e.target.value)}
                    className="slider"
                  />
                </motion.div>

                <motion.div className="checkin-block" {...fadeRight(0.3)}>
                  <label className="checkin-label">Anything to share?</label>
                  <textarea
                    rows={4}
                    placeholder="Optional: wins, worries, or thoughts..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="notes"
                  />
                </motion.div>

                <motion.div className="checkin-actions" {...fadeRight(0.35)}>
                  <button
                    type="button"
                    className="btn-outline-gold"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-gold"
                    disabled={disabled}
                    style={{ opacity: disabled ? 0.6 : 1 }}
                  >
                    Save Check-In
                  </button>
                </motion.div>
              </form>
            </>
          ) : (
            <motion.div
              key="done-state"
              className="checkin-complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h2>✨ Check-In Saved ✨</motion.h2>
              <p>
                You’ve centered yourself beautifully today. Would you like to
                continue your wellness ritual?
              </p>
              <div className="checkin-options">
                <button onClick={() => navigate("/chat")} className="btn-gold">
                  Chat with Bimpe 💬
                </button>
                <button
                  onClick={() => navigate("/dashboard/library")}
                  className="btn-outline-gold"
                >
                  Read something calming 📖
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
