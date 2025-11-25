// src/auth/LoginPage.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { FaGoogle, FaApple, FaEnvelope } from "react-icons/fa";
import { auth, provider } from "../firebaseConfig";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // === Firebase Auth Handlers ===
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("✅ Google Login Success:", result.user);
      // Redirect to dashboard after successful login
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Google Login Error:", error.message);
      alert("Google login failed. Please try again.");
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("✅ Email Login Success:", userCredential.user);
      // Redirect to dashboard after successful login
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Email Login Error:", error.message);
      alert(error.message);
    }
  };

  return (
    <div style={styles.page}>
      {/* 🌫️ Glass Nav */}
      <nav style={styles.nav}>
        <img src="/assets/nav.png" alt="HealHub Logo" style={styles.logoImg} />
        <Link to="/" style={styles.navLink}>
          Home
        </Link>
      </nav>

      {/* Overlay */}
      <div style={styles.bgOverlay} />

      {/* ===== Desktop Bimpe ===== */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: [0, -12, 0],
            transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
          style={styles.bimpeDesktop}
        >
          <img
            src="/assets/bim3.png"
            alt="Bimpe illustration"
            style={styles.bimpeImg}
          />
        </motion.div>
      )}

      {/* ===== Mobile Floating Bimpe ===== */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: 1,
            y: [0, -8, 0],
            transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
          style={styles.fabContainer}
        >
          <img src="/assets/bim1.png" alt="BIMPE" style={styles.fabImg} />
          <div style={styles.bubble}>Hey there 👋 Ready to sign in?</div>
        </motion.div>
      )}

      {/* ===== Auth Card ===== */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={styles.card}
      >
        <div style={styles.banner}>Welcome back to HealHubCenter.</div>

        <h1 style={styles.title}>
          Sign in to your <span style={styles.brandText}>HealHubCenter</span>{" "}
          account
        </h1>
        <p style={styles.subdomain}>healhubcenter.vercel.app</p>

        <div style={styles.buttons}>
          <button style={styles.oauthBtn} onClick={handleGoogleLogin}>
            <FaGoogle style={styles.icon} /> Continue with Google
          </button>
          <button style={styles.oauthBtn}>
            <FaApple style={styles.icon} /> Continue with Apple
          </button>
        </div>

        <div style={styles.divider}>
          <span style={styles.line}></span>
          <span style={styles.or}>OR</span>
          <span style={styles.line}></span>
        </div>

        <form style={styles.form} onSubmit={handleEmailLogin}>
          <input
            type="email"
            placeholder="name@workemail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button style={styles.signInBtn} type="submit">
            <FaEnvelope style={{ marginRight: 6 }} /> Sign In with Email
          </button>
        </form>

        <div style={styles.links}>
          <Link to="/help" style={styles.link}>
            Having trouble signing in?
          </Link>
          <div style={{ marginTop: 8 }}>
            Don’t have an account?{" "}
            <Link to="/signup" style={styles.linkBold}>
              Create one
            </Link>
          </div>
        </div>
      </motion.div>

      {/* ===== Footer ===== */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <a href="#" style={styles.footerLink}>
            Privacy & Terms
          </a>
          <a href="#" style={styles.footerLink}>
            Contact Us
          </a>
          <a href="#" style={styles.footerLink}>
            Change Region
          </a>
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
    paddingTop: "4.5rem",
  },
  nav: {
    position: "fixed",
    top: 0,
    width: "100%",
    height: "60px",
    padding: "0.6rem 1.4rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 20,
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(255,255,255,0.15)",
  },
  logoImg: { height: 30, objectFit: "contain" },
  navLink: {
    textDecoration: "none",
    color: "#222",
    padding: "6px 14px",
    borderRadius: 8,
    fontSize: 14,
    background: "rgba(255,255,255,0.25)",
    border: "1px solid rgba(0,0,0,0.1)",
    backdropFilter: "blur(6px)",
  },
  bgOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(255,255,255,0.65)",
    zIndex: 0,
  },
  bimpeDesktop: {
    position: "absolute",
    right: "-0.9%",
    bottom: "5%",
    zIndex: 1,
  },
  bimpeImg: {
    width: "580px",
    height: "720px",
    maxHeight: "80vh",
    objectFit: "contain",
    filter: "drop-shadow(0 14px 30px rgba(0,0,0,0.14))",
    transition: "transform 0.3s ease-in-out",
  },
  card: {
    zIndex: 2,
    background: "rgba(255,255,255,0.88)",
    borderRadius: 18,
    padding: "2rem 2.2rem",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    textAlign: "center",
    width: "92%",
    maxWidth: 420,
    margin: "3rem auto 2rem",
    backdropFilter: "blur(8px)",
  },
  banner: {
    background: "#f6f2ea",
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "1.1rem 0",
  },
  line: { height: 1, width: "40%", background: "#ddd" },
  or: { margin: "0 0.55rem", fontSize: "0.8rem", color: "#777", fontWeight: 600 },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
    marginBottom: "1.1rem",
  },
  input: {
    padding: "0.7rem 1rem",
    borderRadius: 10,
    border: "1px solid #d7d7d7",
    fontSize: "0.95rem",
    outline: "none",
  },
  signInBtn: {
    background: "#000",
    color: "#fff",
    padding: "0.8rem 1rem",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: 600,
  },
  links: { fontSize: "0.85rem", color: "#555" },
  link: { color: "#555", textDecoration: "none" },
  linkBold: { color: "#000", fontWeight: 600, textDecoration: "none" },
  fabContainer: {
    position: "fixed",
    left: 14,
    bottom: 74,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 30,
  },
  fabImg: {
    width: 95,
    height: 95,
    objectFit: "contain",
    borderRadius: "50%",
    border: "3px solid #fff",
    boxShadow: "0 10px 24px rgba(0,0,0,0.15)",
  },
  bubble: {
    background: "rgba(255,255,255,0.95)",
    borderRadius: "16px 16px 16px 0",
    padding: "0.7rem 1rem",
    fontSize: "0.9rem",
    marginTop: "0.6rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
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
