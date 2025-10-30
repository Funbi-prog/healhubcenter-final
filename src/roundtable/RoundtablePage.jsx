import React from "react";

const topics = [
  { id: "mental-health", title: "Mental Health & Stress Relief", trending: true, cta: "Join Live" },
  { id: "finance-career", title: "Finance & Career Growth", trending: false, cta: "Join Thursday" },
  { id: "domestic-violence", title: "Rape & Domestic Violence", trending: true, cta: "Join Live" },
  { id: "grief", title: "Loss of a Loved One", trending: false, cta: "Join Wednesday" },
  // add more up to 12...
];

export default function RoundtablePage() {
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.h1}>Roundtable Discussions</h1>
        <p style={styles.p}>
          Small, trusted circles of 10 people. Join anonymously or named. Build honest dialogue,
          reduce pressure, and grow together.
        </p>
      </header>

      <section style={styles.grid}>
        {topics.map((t) => (
          <div key={t.id} style={styles.card}>
            <div style={styles.cardTop}>
              <h3 style={styles.cardTitle}>{t.title}</h3>
              {t.trending && <span style={styles.badge}>🔥 Trending</span>}
            </div>
            <button style={styles.cardBtn}>{t.cta}</button>
          </div>
        ))}
      </section>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#faf8f6", padding: "24px 16px" },
  header: { maxWidth: 900, margin: "0 auto 16px" },
  h1: { margin: 0, fontSize: 28, fontWeight: 800 },
  p: { marginTop: 8, color: "#555" },
  grid: {
    maxWidth: 1000, margin: "12px auto",
    display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
  },
  card: { background: "#fff", borderRadius: 14, padding: 16, boxShadow: "0 8px 24px rgba(0,0,0,0.06)" },
  cardTop: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  cardTitle: { margin: 0, fontSize: 16, fontWeight: 700 },
  badge: { background: "#fff4e5", border: "1px solid #ffd9a3", padding: "4px 8px", borderRadius: 999, fontSize: 12 },
  cardBtn: { marginTop: 12, width: "100%", padding: "10px 12px", borderRadius: 10, background: "#000", color: "#fff", border: "none", fontWeight: 700, cursor: "pointer" },
};
