import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaApple } from "react-icons/fa";

export default function SignupPage() {
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    // TODO: real sign-up flow
    navigate("/chat");
  };

  return (
    <div style={styles.page}>
      <nav style={styles.nav}>
        <img src="/assets/nav.png" alt="HealHub Logo" style={styles.logoImg} />
        <Link to="/login" style={styles.navLink}>Login</Link>
      </nav>

      <div style={styles.card}>
        <h1 style={styles.title}>Create your HealHubCenter account</h1>
        <p style={styles.blurb}>Join the community that actually cares.</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button style={styles.oauthBtn}><FaGoogle /> Continue with Google</button>
          <button style={styles.oauthBtn}><FaApple /> Continue with Apple</button>
        </div>

        <div style={styles.divider}>
          <span style={styles.line}></span>
          <span style={styles.or}>OR</span>
          <span style={styles.line}></span>
        </div>

        <form style={styles.form} onSubmit={submit}>
          <input required placeholder="Full name" style={styles.input} />
          <input required type="email" placeholder="Email address" style={styles.input} />
          <input required type="password" placeholder="Create a password" style={styles.input} />
          <button type="submit" style={styles.primary}>Create account</button>
        </form>

        <p style={styles.meta}>
          Already have an account? <Link to="/login" style={styles.link}>Sign in</Link>
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
    maxWidth: 520, margin: "32px auto", background: "#fff", borderRadius: 14,
    padding: 24, boxShadow: "0 12px 28px rgba(0,0,0,0.06)",
  },
  title: { margin: 0, fontSize: 22, fontWeight: 700 },
  blurb: { marginTop: 6, color: "#555" },
  oauthBtn: {
    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
    border: "1px solid #ddd", borderRadius: 10, padding: "10px 12px",
    background: "#fff", cursor: "pointer"
  },
  divider: { display: "flex", alignItems: "center", gap: 8, margin: "14px 0" },
  line: { flex: 1, height: 1, background: "#eee" },
  or: { fontSize: 12, color: "#777", fontWeight: 700 },
  form: { display: "grid", gap: 10 },
  input: { border: "1px solid #ddd", borderRadius: 10, padding: "10px 12px", fontSize: 15 },
  primary: { marginTop: 6, background: "#000", color: "#fff", border: "none", borderRadius: 10, padding: "12px", cursor: "pointer", fontWeight: 700 },
  meta: { marginTop: 12, color: "#555" },
  link: { color: "#000", textDecoration: "none", fontWeight: 600 },
};
