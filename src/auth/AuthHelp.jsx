import React from "react";
import { Link } from "react-router-dom";

export default function AuthHelp() {
  return (
    <div style={styles.page}>
      <nav style={styles.nav}>
        <img src="/assets/nav.png" alt="HealHub Logo" style={styles.logoImg} />
        <Link to="/login" style={styles.navLink}>Back to Login</Link>
      </nav>

      <div style={styles.card}>
        <h1 style={styles.title}>Need help signing in?</h1>
        <ul style={styles.list}>
          <li>Reset your password (we’ll email you a link).</li>
          <li>Make sure you’re using the correct email.</li>
          <li>Try an alternative method: Google or Apple.</li>
        </ul>
        <p style={styles.meta}>
          Still stuck? <a href="mailto:support@healhubcenter.com" style={styles.link}>Contact support</a>.
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", paddingTop: 64, background: "#faf8f6" },
  nav: {
    position: "sticky", top: 0, background: "rgba(255,255,255,0.6)",
    backdropFilter: "blur(8px)", display: "flex", justifyContent: "space-between",
    alignItems: "center", padding: "10px 16px", borderBottom: "1px solid #eee", zIndex: 10
  },
  logoImg: { height: 34 },
  navLink: { textDecoration: "none", color: "#222", border: "1px solid #444", padding: "6px 12px", borderRadius: 8 },
  card: {
    maxWidth: 560, margin: "32px auto", background: "#fff", borderRadius: 14,
    padding: 24, boxShadow: "0 12px 28px rgba(0,0,0,0.06)",
  },
  title: { margin: 0, fontSize: 22, fontWeight: 700 },
  list: { marginTop: 12, paddingLeft: 18, color: "#444" },
  meta: { marginTop: 12, color: "#555" },
  link: { color: "#000", textDecoration: "none", fontWeight: 600 },
};
