import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Sidebar from "../dashboard/Sidebar.jsx";
import Topbar from "../dashboard/Topbar.jsx";
import "./RoundtablePage.css";

const FIRESIDE = [
  {
    id: "f1",
    title: "Justice & Healing: The Power of Shared Voices",
    desc: "Morning broadcast — safe dialogues that reshape public empathy.",
    img: "https://images.unsplash.com/photo-1619441207976-9e2a6e9f527b",
    live: true,
    time: "Now",
  },
  {
    id: "f2",
    title: "Breaking the Silence: Reframing Trauma",
    desc: "Rebuilding self after pain — tender, practical perspectives.",
    img: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
    live: false,
    time: "10:30 AM",
  },
  {
    id: "f3",
    title: "Gender & Power: Culture, Safety, Change",
    desc: "A grounded conversation on equity and everyday safety.",
    img: "https://images.unsplash.com/photo-1573497019115-66a529f0b0a0",
    live: false,
    time: "11:45 AM",
  },
];

const ROUNDTABLE = [
  { id: "mental-health", title: "Mental Health & Stress Relief", img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e", trending: true, cta: "Join Live" },
  { id: "career", title: "Career & Job Search Help", img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d", trending: true, cta: "Join Live" },
  { id: "finance", title: "Financial Struggles & Advice", img: "https://images.unsplash.com/photo-1565372918674-0b4b2f3c6f0c", cta: "Join Thursday" },
  { id: "relationship", title: "Relationship Guidance", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e", cta: "Join Friday" },
  { id: "business", title: "Business & Startup Advice", img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f", trending: true, cta: "Join Live" },
  { id: "academic", title: "Academic & Study Help", img: "https://images.unsplash.com/photo-1510936111840-65e151ad71bb", cta: "Join Tuesday" },
  { id: "anti-bullying", title: "Anti-bullying & Cybercrime", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158", cta: "Join Wednesday" },
  { id: "family", title: "Family & Personal Growth", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1", cta: "Join Friday" },
  { id: "legal", title: "Legal & Administrative Assistance", img: "https://images.unsplash.com/photo-1581092334009-23e9b78d8a76", cta: "Join Saturday" },
  { id: "emergency", title: "Emergency Help & Crisis Support", img: "https://images.unsplash.com/photo-1606944831954-8f47e5b3b2e0", trending: true, cta: "Join 24/7" },
  { id: "refugee", title: "Refugee & Housing Relief", img: "https://images.unsplash.com/photo-1509099836639-18ba1795216d", cta: "Join Sunday" },
  { id: "disability", title: "Empowering People with Disabilities", img: "https://images.unsplash.com/photo-1581591524425-c7e0978865d3", cta: "Join Saturday" },
  { id: "addiction", title: "Sobriety & Addiction Support", img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d", trending: true, cta: "Join Live" },
  { id: "domestic-abuse", title: "Domestic Abuse & Violence Survivors", img: "https://images.unsplash.com/photo-1604881990661-c9ff29c55e0f", trending: true, cta: "Join Safe Space" },
  { id: "rape", title: "Rape & Sexual Assault Survivors", img: "https://images.unsplash.com/photo-1573497491208-6b1acb260507", trending: true, cta: "Join Safe Space" },
  { id: "gender-equality", title: "Gender Inequalities & Empowerment", img: "https://images.unsplash.com/photo-1573497019115-66a529f0b0a0", cta: "Join Friday" },
  { id: "child-marriage", title: "Child Marriage & Protection", img: "https://images.unsplash.com/photo-1581579185169-6cdbd99cbe3b", cta: "Join Awareness Session" },
];

export default function RoundtablePage() {
  const nav = useNavigate();
  const drift = useAnimation();

  useEffect(() => {
    let mounted = true;
    (async () => {
      while (mounted) {
        await drift.start({ x: -22, transition: { duration: 3.6, ease: "easeInOut" } });
        await drift.start({ x: 0, transition: { duration: 3.6, ease: "easeInOut" } });
      }
    })();
    return () => {
      mounted = false;
      drift.stop();
    };
  }, [drift]);

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <Topbar />

        <div className="dashboard-content roundtable-content">
          <div className="ambient-layer" aria-hidden />

          {/* === Fireside Section === */}
          <section className="fireside-wrap">
            <div className="fireside-head">
              <h1 className="fireside-title">Fireside Conversations</h1>
              <p className="fireside-sub">
                Morning pulse. Listen anonymously. Join when you’re ready.
              </p>
            </div>

            <motion.div
              className="fireside-rail"
              animate={drift}
              drag="x"
              dragConstraints={{ left: -260, right: 0 }}
            >
              {FIRESIDE.map((f, i) => (
                <FiresideCapsule
                  key={f.id}
                  data={f}
                  delay={i * 0.04}
                  onClick={() =>
                    nav(`/fireside/${f.id}`, {
                      state: { title: f.title, desc: f.desc, img: f.img, live: f.live },
                    })
                  }
                />
              ))}
            </motion.div>
          </section>

          {/* === Roundtable Topics Grid === */}
          <section className="rt-grid">
            {ROUNDTABLE.map((t, i) => (
              <motion.article
                key={t.id}
                className={`rt-card ${t.trending ? "trending" : ""}`}
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ type: "spring", stiffness: 220, damping: 24, delay: i * 0.02 }}
                onClick={() => nav("/login")}
              >
                <div className="rt-bg" style={{ backgroundImage: `url(${t.img})` }} />
                <div className="rt-overlay" />
                <div className="rt-content">
                  {t.trending && <span className="rt-badge">🔥 Trending</span>}
                  <h3 className="rt-title">{t.title}</h3>
                  <motion.button
                    className="rt-cta"
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    {t.cta}
                  </motion.button>
                </div>
              </motion.article>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}

/* === Fireside Capsule Component === */
function FiresideCapsule({ data, delay, onClick }) {
  return (
    <motion.div
      className={`fs-capsule ${data.live ? "live" : "upcoming"}`}
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20, delay }}
      whileHover={{ rotateX: -2, rotateY: 2, scale: 1.015 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
    >
      <div className="fs-bg" style={{ backgroundImage: `url(${data.img})` }} />
      <div className="fs-glass" />
      <div className="fs-content">
        <div className="fs-top">
          {data.live ? (
            <span className="fs-badge live">● Live</span>
          ) : (
            <span className="fs-badge time">🕒 {data.time}</span>
          )}
        </div>
        <h3 className="fs-title">{data.title}</h3>
        <p className="fs-desc">{data.desc}</p>
        <motion.button className="fs-cta" whileHover={{ scale: 1.07 }}>
          {data.live ? "Join Live" : "Set Reminder"}
        </motion.button>
      </div>
    </motion.div>
  );
}
