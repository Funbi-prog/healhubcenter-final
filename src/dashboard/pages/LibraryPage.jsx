// src/dashboard/pages/LibraryPage.jsx
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import "../styles/Library.css";

/**
 * LibraryPage — Refactored SaaS-ready component (Version B)
 * - Full file, ready to paste
 * - Uses same logic/state as your original
 * - Clean markup that matches the upgraded SaaS CSS
 * - JournalSection included below (no routing changes)
 */

/* ---------- Sample Books (keep/replace with real data) ---------- */
const BOOKS = [
  {
    id: 1,
    title: "You Are a Badass",
    author: "Jen Sincero",
    category: "Self-Worth",
    description: "A witty and empowering guide to breaking self-doubt.",
    cover: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&q=60&auto=format&fit=crop",
    fileUrl: "#",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Growth & Purpose",
    description: "Small habits. Big results.",
    cover: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&q=60&auto=format&fit=crop",
    fileUrl: "#",
  },
  {
    id: 3,
    title: "The Body Keeps the Score",
    author: "Bessel van der Kolk",
    category: "Healing",
    description: "Trauma, recovery, and the body’s memory of pain.",
    cover: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=60&auto=format&fit=crop",
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

  const filteredBooks = BOOKS.filter((b) => {
    const matchesCategory = category === "All" || b.category === category;
    const q = search.trim().toLowerCase();
    const matchesQuery =
      !q ||
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      (b.category && b.category.toLowerCase().includes(q));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <Topbar />

        <div className="dashboard-content library-page">
          {/* HEADER */}
          <header className="library-header">
            <h1>HealHub Growth Library</h1>
            <p>Your calm space to learn, grow, and realign.</p>

            <div className="section-tabs">
              {["Library", "Journal"].map((tab) => (
                <motion.button
                  key={tab}
                  className={`tab ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {tab}
                </motion.button>
              ))}
            </div>
          </header>

          {/* BODY */}
          <AnimatePresence mode="wait">
            {activeTab === "Library" ? (
              <motion.section
                key="library"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.35 }}
              >
                {/* CONTROLS */}
                <div className="library-controls">
                  <input
                    type="text"
                    className="search-bar"
                    placeholder="Search books or authors..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    aria-label="Search books"
                  />

                  <div className="category-tabs" role="tablist" aria-label="Categories">
                    {categories.map((c) => (
                      <button
                        key={c}
                        className={`tab ${category === c ? "active" : ""}`}
                        onClick={() => setCategory(c)}
                        aria-pressed={category === c}
                      >
                        {c}
                      </button>
                    ))}
                  </div>

                  <motion.button
                    className="upload-btn"
                    whileHover={{ scale: 1.04 }}
                    aria-label="Upload book"
                    onClick={() => {
                      // placeholder — keep your upload modal/integration here
                      // e.g. openUploadModal();
                      console.log("Upload book clicked");
                    }}
                  >
                    + Upload Book
                  </motion.button>
                </div>

                {/* BOOK GRID */}
                <motion.div
                  className="book-shelf"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { staggerChildren: 0.08, duration: 0.6 },
                    },
                  }}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredBooks.length > 0 ? (
                    filteredBooks.map((b) => (
                      <motion.article
                        key={b.id}
                        className="book-card"
                        variants={{
                          hidden: { opacity: 0, y: 12 },
                          visible: { opacity: 1, y: 0 },
                        }}
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 160 }}
                      >
                        <img
                          src={b.cover}
                          alt={b.title}
                          className="book-cover"
                          loading="lazy"
                          width="400"
                          height="240"
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
                      </motion.article>
                    ))
                  ) : (
                    <div className="empty-state" style={{ gridColumn: "1/-1", textAlign: "center", padding: "3rem 1rem" }}>
                      <p>No books found for your search.</p>
                    </div>
                  )}
                </motion.div>
              </motion.section>
            ) : (
              <JournalSection key="journal" />
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

/* ============================================
   JournalSection — Fully included, cleaned up
   - Keeps original localStorage logic
   - Clean markup / aria improvements
   ============================================ */
function JournalSection() {
  const PROMPTS = [
    { id: "feel", title: "Talk Your Talk", subtitle: "How do you feel right now?", placeholder: "Type it out or dump it raw…" },
    { id: "grat", title: "Gratitude", subtitle: "What are you grateful for?", placeholder: "Small wins, quiet joys, names, moments…" },
    { id: "annoy", title: "What Pissed Me Off", subtitle: "Let it out. No judgment.", placeholder: "Say the hard thing. You’re safe here." },
    { id: "joy", title: "What Made Me Happy", subtitle: "Name the light.", placeholder: "What lifted you — even a little?" },
    { id: "reflect", title: "Reflection", subtitle: "What did today teach you?", placeholder: "Connect dots. Patterns. Next step." },
  ];

  const MOODS = ["😌", "🙂", "😐", "😣", "😤", "😭", "🤍"];
  const QUICK_TAGS = ["Work", "Family", "Money", "Faith", "Health", "Relationship", "School"];

  const [step, setStep] = useState(0);
  const [mood, setMood] = useState(() => localStorage.getItem("hh_lastMood") || "🙂");
  const [tags, setTags] = useState([]);
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("hh_journal_v1");
    try {
      return saved ? JSON.parse(saved) : { feel: "", grat: "", annoy: "", joy: "", reflect: "" };
    } catch (err) {
      console.warn("Invalid saved journal data, clearing.", err);
      localStorage.removeItem("hh_journal_v1");
      return { feel: "", grat: "", annoy: "", joy: "", reflect: "" };
    }
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

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
    try {
      localStorage.setItem("hh_journal_v1", JSON.stringify(payload));
      localStorage.setItem("hh_lastMood", mood);
    } catch (err) {
      console.error("Failed to save journal", err);
    }
    // mimic async save feedback
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
      <div className="journal-ambient" aria-hidden />
      <div className="journal-vignette" aria-hidden />

      <header className="journal-head">
        <div className="journal-streak">
          <span className="dot" /> Daily Journal
        </div>

        <div className="journal-mood" aria-label="Select mood">
          <label style={{ display: "block", fontSize: 12, marginBottom: 6 }}>Mood</label>
          <div className="mood-row">
            {MOODS.map((m) => (
              <button
                key={m}
                className={`mood-pill ${mood === m ? "active" : ""}`}
                onClick={() => setMood(m)}
                aria-pressed={mood === m}
                title={`Mood ${m}`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section className="journal-stage">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            className="stage-card"
            initial={{ opacity: 0, y: 12, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.995 }}
            transition={{ duration: 0.33 }}
          >
            <div className="stage-header">
              <h2>{current.title}</h2>
              <p>{current.subtitle}</p>
            </div>

            {(step === 0 || step === 1) && (
              <div className="quick-tags" aria-hidden={false}>
                {QUICK_TAGS.map((t) => (
                  <button
                    key={t}
                    className={`tag ${tags.includes(t) ? "on" : ""}`}
                    onClick={() => toggleTag(t)}
                    aria-pressed={tags.includes(t)}
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
              aria-label={current.title}
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
        </AnimatePresence>
      </section>

      <div className="journal-progress" role="tablist" aria-label="Journal progress">
        {PROMPTS.map((p, i) => (
          <button
            key={p.id}
            className={`prog-dot ${i === step ? "active" : i < step ? "done" : ""}`}
            onClick={() => jump(i)}
            aria-current={i === step ? "step" : undefined}
            title={p.title}
          />
        ))}
      </div>
    </motion.div>
  );
}
