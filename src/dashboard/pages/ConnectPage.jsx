import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import "../styles/ConnectPage.css";
import { motion, AnimatePresence } from "framer-motion";

export default function ConnectPage() {
  const [mode, setMode] = useState(null); // 'open' | 'hire'
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({
    title: "",
    minExp: "0",
    maxExp: "5",
    budget: "",
    type: "Remote",
    location: "",
    bio: "",
  });
  const [matches, setMatches] = useState([]);

  // Demo seed matches (mocked)
  useEffect(() => {
    setMatches([
      {
        id: 1,
        title: "Frontend Developer",
        meta: "₦150k–₦200k • Remote • 2+ yrs",
      },
      {
        id: 2,
        title: "Content Creator",
        meta: "₦50k–₦100k • Hybrid • 1+ yrs",
      },
      {
        id: 3,
        title: "UX Designer",
        meta: "₦120k–₦180k • Remote • 3+ yrs",
      },
    ]);
  }, []);

  const skillSet = ["React", "Figma", "Copywriting", "SEO", "Design", "Data"];

  const toggleSkill = (s) =>
    setSkills((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  const submit = (e) => {
    e.preventDefault();
    alert("Saved — showing recommended matches for demo.");
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <Topbar />

        <div className="dashboard-content connect-page">
          <header className="connect-header">
            <h1>HealHub Connect</h1>
            <p className="lead">
              A gentle connector — find work or people without the noise.
            </p>
          </header>

          <div className="connect-grid">
            {/* LEFT SECTION */}
            <section className="connect-main">
              <AnimatePresence mode="wait">
                {!mode ? (
                  /* ====================
                     CHOOSE MODE VIEW
                  ==================== */
                  <motion.div
                    key="choice"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28 }}
                  >
                    <div className="choice-row">
                      <button
                        className="choice-card"
                        onClick={() => setMode("open")}
                      >
                        <h3>I'm Open to Work</h3>
                        <p className="small">
                          Tell us what you accept and we'll recommend matches.
                        </p>
                      </button>

                      <button
                        className="choice-card"
                        onClick={() => setMode("hire")}
                      >
                        <h3>I'm Hiring</h3>
                        <p className="small">
                          Post a role and see vetted candidates.
                        </p>
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* ====================
                     FORM VIEW
                  ==================== */
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28 }}
                  >
                    <form className="connect-form" onSubmit={submit}>
                      <div className="form-row">
                        <input
                          className="input"
                          placeholder={
                            mode === "open"
                              ? "Role you want (e.g. Frontend Developer)"
                              : "Role title (e.g. Senior UX)"
                          }
                          value={form.title}
                          onChange={(e) =>
                            setForm({ ...form, title: e.target.value })
                          }
                        />

                        <input
                          className="input"
                          placeholder="Preferred location"
                          value={form.location}
                          onChange={(e) =>
                            setForm({ ...form, location: e.target.value })
                          }
                        />
                      </div>

                      <div className="form-row">
                        {mode === "hire" ? (
                          <>
                            <input
                              className="input"
                              placeholder="Min exp (yrs)"
                              value={form.minExp}
                              onChange={(e) =>
                                setForm({ ...form, minExp: e.target.value })
                              }
                            />

                            <input
                              className="input"
                              placeholder="Max exp (yrs)"
                              value={form.maxExp}
                              onChange={(e) =>
                                setForm({ ...form, maxExp: e.target.value })
                              }
                            />
                          </>
                        ) : (
                          <>
                            <input
                              className="input"
                              placeholder="Minimum pay you accept"
                              value={form.budget}
                              onChange={(e) =>
                                setForm({ ...form, budget: e.target.value })
                              }
                            />

                            <select
                              className="input"
                              value={form.type}
                              onChange={(e) =>
                                setForm({ ...form, type: e.target.value })
                              }
                            >
                              <option>Remote</option>
                              <option>Hybrid</option>
                              <option>Physical</option>
                            </select>
                          </>
                        )}
                      </div>

                      <div className="choices-label">Skills (tap to add)</div>

                      <div className="skill-row">
                        {skillSet.map((s) => (
                          <button
                            type="button"
                            key={s}
                            className={`skill ${
                              skills.includes(s) ? "on" : ""
                            }`}
                            onClick={() => toggleSkill(s)}
                          >
                            {s}
                          </button>
                        ))}
                      </div>

                      <textarea
                        className="textarea"
                        placeholder={
                          mode === "hire"
                            ? "Full role description"
                            : "Short bio / portfolio link"
                        }
                        value={form.bio}
                        onChange={(e) =>
                          setForm({ ...form, bio: e.target.value })
                        }
                      />

                      <div className="form-actions">
                        <button
                          type="button"
                          className="ghost"
                          onClick={() => {
                            setMode(null);
                            setSkills([]);
                            setForm({
                              title: "",
                              minExp: "0",
                              maxExp: "5",
                              budget: "",
                              type: "Remote",
                              location: "",
                              bio: "",
                            });
                          }}
                        >
                          Cancel
                        </button>

                        <button type="submit" className="primary">
                          {mode === "hire"
                            ? "Post Job & See Candidates"
                            : "Save & Get Matches"}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

            {/* RIGHT SECTION: RECOMMENDED MATCHES */}
            <aside className="connect-feed">
              <h3>Recommended Matches</h3>
              <p className="small muted">
                Demo feed — production will personalize.
              </p>

              <div className="matches">
                {matches.map((m) => (
                  <div className="match-card" key={m.id}>
                    <div className="match-left">
                      <div className="match-title">{m.title}</div>
                      <div className="match-meta">{m.meta}</div>
                    </div>

                    <div className="match-actions">
                      <button className="ghost">Save</button>
                      <button className="primary">
                        {mode === "hire" ? "Get in touch" : "Apply now"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
