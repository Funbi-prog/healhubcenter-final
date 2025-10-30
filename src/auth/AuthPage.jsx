// src/auth/AuthPage.jsx
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaApple, FaEnvelope } from "react-icons/fa";

export default function AuthPage() {
  const navigate = useNavigate();

  const handleLogin = (method) => {
    console.log(`${method} login clicked`);
    setTimeout(() => {
      navigate("/chat");
    }, 1000);
  };

  return (
    <div style={styles.page}>
      {/* 🧭 Navbar */}
      <nav style={styles.nav}>
        <img
          src="/assets/nav.png"
          alt="HealHubCenter Logo"
          style={styles.logoImg}
        />
        <button style={styles.homeBtn} onClick={() => navigate("/")}>
          Home
        </button>
      </nav>

      {/* 🌸 Overlay */}
      <div style={styles.bgOverlay}></div>

      {/* 🧍🏽‍♀️ Bimpe AI — closer to the form */}
      <motion.img
        src="/assets/bim1.png"
        alt="Bimpe AI"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        style={styles.bimpeImg}
      />

      {/* 💬 Auth Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={styles.card}
      >
        <div style={styles.banner}>You need to sign in to see this page.</div>

        <h2 style={styles.title}>
          Sign in to talk to <span style={styles.brandText}>BIMPE</span>
        </h2>
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

        <form style={styles.form}>
          <input
            type="email"
            placeholder="name@workemail.com"
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Your password"
            style={styles.input}
          />
          <button style={styles.signInBtn} onClick={() => handleLogin("Email")}>
            Sign In
          </button>
        </form>

        <div style={styles.links}>
          <a href="#" style={styles.link}>
            Forgot your password?
          </a>{" "}
          •{" "}
          <a href="#" style={styles.link}>
            Get help signing in
          </a>
          <div style={{ marginTop: "0.6rem" }}>
            Don’t have an account?{" "}
            <a href="#" style={styles.linkBold}>
              Create one
            </a>
          </div>
        </div>
      </motion.div>

      {/* ⚖️ Premium Footer */}
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

/* ————— Styles ————— */
const styles = {
  page: {
    position: "relative",
    minHeight: "100vh",
    width: "100%",
    background: "linear-gradient(135deg, #fdfcfb, #f1ece7)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflowY: "auto",
    padding: "5rem 0 0",
  },
  bgOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(5px)",
    zIndex: 0,
  },
 nav: {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  padding: "1rem 2rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  zIndex: 10,
  background: "rgba(255, 255, 255, 0.25)", // translucent white
  backdropFilter: "blur(10px)",             // glass effect
  WebkitBackdropFilter: "blur(10px)",       // for Safari
  borderBottom: "1px solid rgba(255, 255, 255, 0.3)", // subtle border line
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",        // soft shadow for depth
  borderRadius: "0 0 12px 12px",           // rounded bottom corners (optional)
},

  logoImg: {
    height: "42px",
    objectFit: "contain",
  },
  homeBtn: {
    background: "none",
    border: "1px solid #444",
    borderRadius: "8px",
    padding: "0.4rem 1rem",
    cursor: "pointer",
    color: "#222",
    fontSize: "0.9rem",
  },
  card: {
    zIndex: 2,
    background: "#fff",
    borderRadius: "14px",
    padding: "2rem 2.4rem",
    boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
    textAlign: "center",
    width: "90%",
    maxWidth: "420px",
    margin: "2rem auto",
  },
  banner: {
    background: "#f7f0e9",
    color: "#4b3f2f",
    padding: "0.6rem",
    borderRadius: "6px",
    fontSize: "0.85rem",
    marginBottom: "1rem",
  },
  title: {
    fontSize: "1.6rem",
    color: "#222",
    marginBottom: "0.4rem",
    fontWeight: "600",
  },
  brandText: {
    color: "#a680ff",
  },
  subdomain: {
    fontSize: "0.9rem",
    color: "#666",
    marginBottom: "1.5rem",
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
  },
  oauthBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.6rem",
    background: "#fff",
    border: "1px solid #ccc",
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    color: "#333",
  },
  icon: {
    fontSize: "1.1rem",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "1.2rem 0",
  },
  line: {
    height: "1px",
    width: "40%",
    background: "#ccc",
  },
  or: {
    margin: "0 0.5rem",
    fontSize: "0.8rem",
    color: "#777",
    fontWeight: "600",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
    marginBottom: "1.2rem",
  },
  input: {
    padding: "0.7rem 1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "0.95rem",
  },
  signInBtn: {
    background: "#000",
    color: "#fff",
    padding: "0.8rem 1rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
  },
  links: {
    fontSize: "0.85rem",
    color: "#555",
  },
  link: {
    color: "#555",
    textDecoration: "none",
  },
  linkBold: {
    color: "#000",
    fontWeight: "600",
    textDecoration: "none",
  },
 bimpeImg: {
  position: "absolute",
  bottom: "6%",      // moved slightly higher for better alignment
  left: "-8.5%",     // nudged slightly farther left
  height: "400px",
  objectFit: "contain",
  zIndex: 1,
  opacity: 0.96,
  pointerEvents: "none",
  transition: "all 0.6s ease-out",
},

  footer: {
    position: "relative",
    width: "100%",
    background: "#111", // matte black
    color: "#e5decf", // soft gold tone
    padding: "1.4rem 0",
    marginTop: "4rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  footerInner: {
    display: "flex",
    gap: "1.5rem",
    marginBottom: "0.5rem",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  footerLink: {
    color: "#f3f0e9",
    fontSize: "0.85rem",
    textDecoration: "none",
    transition: "color 0.3s ease",
  },
  copyright: {
    fontSize: "0.78rem",
    opacity: 0.8,
  },
};