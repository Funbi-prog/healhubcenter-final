import React from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { FaGoogle, FaApple, FaEnvelope } from "react-icons/fa";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (method) => {
    console.log(`${method} login clicked`);
    // TODO: plug real auth; redirect after success:
    setTimeout(() => navigate("/chat"), 600);
  };

  return (
    <div style={styles.page}>
      {/* Glass Nav */}
      <nav style={styles.nav}>
        <img src="/assets/nav.png" alt="HealHub Logo" style={styles.logoImg} />
        <div style={{ display: "flex", gap: 12 }}>
          <Link to="/" style={styles.navLink}>Home</Link>
          <Link to="/signup" style={styles.navLink}>Create account</Link>
        </div>
      </nav>

      {/* Subtle overlay */}
      <div style={styles.bgOverlay} />

      {/* Bimpe chat-head (mobile-safe floating avatar) */}
      <div style={styles.fab}>
        <img src="/assets/bimpe-head.png" alt="BIMPE" style={styles.fabImg} />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={styles.card}
      >
        <div style={styles.banner}>You need to sign in to see this page.</div>

        <h1 style={styles.title}>
          Sign in to talk to <span style={styles.brandText}>BIMPE</span>
        </h1>
        <p style={styles.subdomain}>healhubcenter.vercel.app</p>

        <div style={styles.buttons}>
          <button style={styles.oauthBtn} onClick={() => handleLogin("Google")}>
            <FaGoogle style={styles.icon} /> Continue with Google
          </button>
          <button style={styles.oauthBtn} onClick={() => handleLogin("Apple")}>
            <FaApple style={styles.icon} /> Continue with Apple
          </button>
          <button style={styles.oauthBtn} onClick={() => handleLogin("Email")}>
            <FaEnvelope style={styles.icon} /> Continue with Email
          </button>
        </div>

        <div style={styles.divider}>
          <span style={styles.line}></span>
          <span style={styles.or}>OR</span>
          <span style={styles.line}></span>
        </div>

        <form
          style={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin("Email");
          }}
        >
          <input type="email" placeholder="name@workemail.com" style={styles.input} required />
          <input type="password" placeholder="Your password" style={styles.input} required />
          <button style={styles.signInBtn} type="submit">Sign In</button>
        </form>

        <div style={styles.links}>
          <Link to="/help" style={styles.link}>Having trouble signing in?</Link>
          <div style={{ marginTop: 8 }}>
            Don’t have an account?{" "}
            <Link to="/signup" style={styles.linkBold}>Create one</Link>
          </div>
        </div>
      </motion.div>

      {/* Premium footer */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <a href="#" style={styles.footerLink}>Privacy & Terms</a>
          <a href="#" style={styles.footerLink}>Contact Us</a>
          <a href="#" style={styles.footerLink}>Change Region</a>
        </div>
        <p style={styles.copyright}>
          © {new Date().getFullYear()} HealHubCenter. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    position: "relative",
    minHeight: "100vh",
    width: "100%",
    background: "linear-gradient(135deg, #fdfcfb, #f1ece7)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflowY: "auto",
    padding: "5rem 0 0",
  },
  nav: {
    position: "sticky",
    top: 0,
    width: "100%",
    padding: "0.8rem 1.2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 20,
    background: "rgba(255, 255, 255, 0.35)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(0,0,0,0.06)",
  },
  logoImg: { height: 36, objectFit: "contain" },
  navLink: {
    textDecoration: "none",
    color: "#222",
    border: "1px solid #444",
    padding: "6px 12px",
    borderRadius: 8,
    fontSize: 14,
  },
  bgOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(255,255,255,0.85)",
    zIndex: 0,
  },
  card: {
    zIndex: 2,
    background: "#fff",
    borderRadius: 16,
    padding: "2rem 2.2rem",
    boxShadow: "0 12px 36px rgba(0,0,0,0.08)",
    textAlign: "center",
    width: "92%",
    maxWidth: 430,
    margin: "2rem auto",
  },
  banner: {
    background: "#f7f0e9",
    color: "#4b3f2f",
    padding: "0.55rem",
    borderRadius: 6,
    fontSize: "0.85rem",
    marginBottom: "0.9rem",
  },
  title: { fontSize: "1.55rem", color: "#222", marginBottom: 6, fontWeight: 600 },
  brandText: { color: "#a680ff" },
  subdomain: { fontSize: "0.9rem", color: "#666", marginBottom: "1.2rem" },
  buttons: { display: "flex", flexDirection: "column", gap: "0.75rem" },
  oauthBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.6rem",
    background: "#fff",
    border: "1px solid #d7d7d7",
    padding: "0.75rem 1rem",
    borderRadius: 10,
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: 500,
    color: "#333",
  },
  icon: { fontSize: "1.1rem" },
  divider: {
    display: "flex", alignItems: "center", justifyContent: "center",
    margin: "1.1rem 0",
  },
  line: { height: 1, width: "40%", background: "#ddd" },
  or: { margin: "0 0.55rem", fontSize: "0.8rem", color: "#777", fontWeight: 600 },
  form: { display: "flex", flexDirection: "column", gap: "0.8rem", marginBottom: "1.1rem" },
  input: {
    padding: "0.7rem 1rem",
    borderRadius: 10,
    border: "1px solid #d7d7d7",
    fontSize: "0.95rem",
    outline: "none",
  },
  signInBtn: {
    background: "#000", color: "#fff",
    padding: "0.8rem 1rem", border: "none", borderRadius: 10,
    cursor: "pointer", fontSize: "1rem", fontWeight: 600,
  },
  links: { fontSize: "0.85rem", color: "#555" },
  link: { color: "#555", textDecoration: "none" },
  linkBold: { color: "#000", fontWeight: 600, textDecoration: "none" },

  // Floating Bimpe head (always above the form on mobile)
  fab: {
    position: "fixed",
    left: 14,
    bottom: 88,            // sits above footer on mobile
    width: 72,
    height: 72,
    borderRadius: "50%",
    background: "linear-gradient(145deg,#fff,#f4efe9)",
    boxShadow: "0 10px 24px rgba(0,0,0,0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 30,
    border: "1px solid rgba(0,0,0,0.06)",
  },
  fabImg: {
    width: 60,
    height: 60,
    objectFit: "contain",
    borderRadius: "50%",
  },

  footer: {
    position: "relative",
    width: "100%",
    background: "#111",
    color: "#e5decf",
    padding: "1.2rem 0 1.4rem",
    marginTop: "2.2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 2,
  },
  footerInner: {
    display: "flex",
    gap: "1.2rem",
    marginBottom: "0.45rem",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  footerLink: { color: "#f3f0e9", fontSize: "0.85rem", textDecoration: "none" },
  copyright: { fontSize: "0.78rem", opacity: 0.8 },
};
