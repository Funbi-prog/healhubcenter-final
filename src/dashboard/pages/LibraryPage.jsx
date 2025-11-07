// src/dashboard/pages/LibraryPage.jsx
import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Library.css";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
const BOOKS = [
  {
    id: 1,
    title: "You Are a Badass",
    author: "Jen Sincero",
    category: "Self-Worth",
    description: "A witty and empowering guide to breaking self-doubt.",
    cover: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e",
    fileUrl: "#",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Growth & Purpose",
    description: "Small habits. Big results.",
    cover: "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
    fileUrl: "#",
  },
  {
    id: 3,
    title: "The Body Keeps the Score",
    author: "Bessel van der Kolk",
    category: "Healing",
    description: "Trauma, recovery, and the body’s memory of pain.",
    cover: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    fileUrl: "#",
  },
];


export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState("Library");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const categories = useMemo(
    () => ["All", "Self-Worth", "Healing", "Growth & Purpose"],
    []
  );

  const filteredBooks = BOOKS.filter(
    (b) =>
      (category === "All" || b.category === category) &&
      (b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.author.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <Topbar />

        {/* === Unified Dashboard Flow === */}
        <div className="dashboard-content library-content">
          <header className="library-header">
            <h1>HealHub Growth Library</h1>
            <p>Read. Reflect. Heal. This is your sanctuary for self-growth.</p>

            <div className="section-tabs">
              {["Library", "Journal"].map((tab) => (
                <motion.button
                  key={tab}
                  className={`tab ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab}
                </motion.button>
              ))}
            </div>
          </header>

          <AnimatePresence mode="wait">
            {activeTab === "Library" ? (
              <motion.div
                key="library"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="library-controls">
                  <input
                    type="text"
                    placeholder="Search books..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-bar"
                  />

                  <div className="category-tabs">
                    {categories.map((c) => (
                      <button
                        key={c}
                        className={`tab ${category === c ? "active" : ""}`}
                        onClick={() => setCategory(c)}
                      >
                        {c}
                      </button>
                    ))}
                  </div>

                  <motion.button
                    className="upload-btn"
                    whileHover={{ scale: 1.05 }}
                  >
                    + Upload Book
                  </motion.button>
                </div>

                <motion.div
                  className="book-shelf"
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { staggerChildren: 0.1, duration: 0.8 },
                    },
                  }}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredBooks.length > 0 ? (
                    filteredBooks.map((b) => (
                      <motion.div
                        key={b.id}
                        className="book-card"
                        variants={{
                          hidden: { opacity: 0, y: 15 },
                          visible: { opacity: 1, y: 0 },
                        }}
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <img
                          src={b.cover}
                          alt={b.title}
                          className="book-cover"
                          loading="lazy"
                        />
                        <div className="book-meta">
                          <h3>{b.title}</h3>
                          <p className="author">{b.author}</p>
                          <span className="category">{b.category}</span>
                          <p className="desc">{b.description}</p>
                          <a
                            href={b.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="read-link"
                          >
                            Read / Download
                          </a>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="empty-state">
                      <p>No books found for your search.</p>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ) : (
              <JournalSection key="journal" />
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
/* === Journal Section — Immersive Guided Flow === */
function JournalSection() {
  const PROMPTS = [
    { id: "feel",    title: "Talk Your Talk",    subtitle: "How do you feel right now?",  placeholder: "Type it out or dump it raw…" },
    { id: "grat",    title: "Gratitude",         subtitle: "What are you grateful for?",  placeholder: "Small wins, quiet joys, names, moments…" },
    { id: "annoy",   title: "What Pissed Me Off",subtitle: "Let it out. No judgment.",     placeholder: "Say the hard thing. You’re safe here." },
    { id: "joy",     title: "What Made Me Happy",subtitle: "Name the light.",              placeholder: "What lifted you — even a little?" },
    { id: "reflect", title: "Reflection",         subtitle: "What did today teach you?",   placeholder: "Connect dots. Patterns. Next step." },
  ];

  const MOODS = ["😌", "🙂", "😐", "😣", "😤", "😭", "🤍"];
  const QUICK_TAGS = ["Work", "Family", "Money", "Faith", "Health", "Relationship", "School"];

  const [step, setStep] = React.useState(0);
  const [mood, setMood] = React.useState(localStorage.getItem("hh_lastMood") || "🙂");
  const [tags, setTags] = React.useState([]);
  const [entries, setEntries] = React.useState(() => {
    const saved = localStorage.getItem("hh_journal_v1");
    return saved ? JSON.parse(saved) : { feel:"", grat:"", annoy:"", joy:"", reflect:"" };
  });
  const [saving, setSaving] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  const current = PROMPTS[step];

  const toggleTag = (t) =>
    setTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const setEntry = (id, val) => setEntries((e) => ({ ...e, [id]: val }));

  const saveAll = () => {
    setSaving(true);
    const payload = {
      ...entries,
      tags,
      mood,
      ts: new Date().toISOString(),
    };
    localStorage.setItem("hh_journal_v1", JSON.stringify(payload));
    localStorage.setItem("hh_lastMood", mood);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 1200);
    }, 500);
  };

  const next = () => setStep((s) => Math.min(s + 1, PROMPTS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));
  const jump = (i) => setStep(i);

  return (
    <motion.div
      className="journal-portal"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* Ambient layers */}
      <div className="journal-ambient" aria-hidden />
      <div className="journal-vignette" aria-hidden />

      {/* Head */}
      <header className="journal-head">
        <div className="journal-streak">
          <span className="dot" /> Daily Journal
        </div>

        <div className="journal-mood">
          <label>Mood</label>
          <div className="mood-row">
            {MOODS.map((m) => (
              <button
                key={m}
                className={`mood-pill ${mood === m ? "active" : ""}`}
                onClick={() => setMood(m)}
                aria-label={`Mood ${m}`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Guided card */}
      <section className="journal-stage">
        <motion.div
          key={current.id}
          className="stage-card"
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35 }}
        >
          <div className="stage-header">
            <h2>{current.title}</h2>
            <p>{current.subtitle}</p>
          </div>

          {/* quick tags only on first two steps */}
          {(step === 0 || step === 1) && (
            <div className="quick-tags">
              {QUICK_TAGS.map((t) => (
                <button
                  key={t}
                  className={`tag ${tags.includes(t) ? "on" : ""}`}
                  onClick={() => toggleTag(t)}
                >
                  #{t}
                </button>
              ))}
            </div>
          )}

          <textarea
            className="stage-input"
            placeholder={current.placeholder}
            value={entries[current.id] || ""}
            onChange={(e) => setEntry(current.id, e.target.value)}
          />

          <div className="stage-actions">
            <button className="ghost" onClick={prev} disabled={step === 0}>
              Back
            </button>

            {step < PROMPTS.length - 1 ? (
              <button className="primary" onClick={next}>
                Continue
              </button>
            ) : (
              <button className="primary" onClick={saveAll} disabled={saving}>
                {saving ? "Saving…" : saved ? "Saved ✓" : "Finish & Save"}
              </button>
            )}
          </div>
        </motion.div>
      </section>

      {/* Progress dots */}
      <div className="journal-progress">
        {PROMPTS.map((p, i) => (
          <button
            key={p.id}
            className={`prog-dot ${i === step ? "active" : i < step ? "done" : ""}`}
            onClick={() => jump(i)}
            aria-label={`Jump to ${p.title}`}
          />
        ))}
      </div>
    </motion.div>
  );
}
