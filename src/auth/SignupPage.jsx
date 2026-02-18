// src/auth/SignupPage.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { FaGoogle, FaApple } from "react-icons/fa";
import { register } from "../services/authApi";

export default function SignupPage() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await register({ email, password, fullname });
      navigate("/dashboard");
    } catch (err) {
      console.log("Signup error:", err);
      const status = err?.response?.status;
      if (status === 409) {
        setError("This email already exists. Try signing in instead.");
      } else if (status === 401 || status === 403) {
        setError("Unauthorized. Please check your details and try again.");
      } else {
        setError(
          err?.response?.data?.message.message[0] ||
            err?.response.data.message.message ||
            "Signup failed. Please try again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* 🌫️ Glass Nav */}
      <nav style={styles.nav}>
        <img src="/assets/nav.png" alt="HealHub Logo" style={styles.logoImg} />
        <div style={styles.navLinks}>
          <Link to="/" style={styles.navLink}>
            Home
          </Link>
          <Link to="/login" style={styles.navLink}>
            Login
          </Link>
        </div>
      </nav>

      {/* ===== Background Layer ===== */}
      <div style={styles.background}>
        <div style={styles.bgOverlay} />

        {/* ===== Desktop Bimpe ===== */}
        {!isMobile && (
          <div style={styles.bimpeDesktop}>
            <div style={styles.bimpeGlow}></div>
            <img
              src="/assets/bim3.png"
              alt="Bimpe illustration"
              style={styles.bimpeImg}
            />
          </div>
        )}
      </div>

      {/* ===== Content Section ===== */}
      <main style={styles.main}>
        <Motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={styles.card}
        >
          <h1 style={styles.title}>Create your HealHubCenter account</h1>
          <p style={styles.blurb}>Join the community that actually cares.</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button style={styles.oauthBtn}>
              <FaGoogle /> Continue with Google
            </button>
            <button style={styles.oauthBtn}>
              <FaApple /> Continue with Apple
            </button>
          </div>

          <div style={styles.divider}>
            <span style={styles.line}></span>
            <span style={styles.or}>OR</span>
            <span style={styles.line}></span>
          </div>

          <form style={styles.form} onSubmit={submit}>
            <input
              required
              placeholder="Full name"
              style={styles.input}
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              disabled={isSubmitting}
            />
            <input
              required
              type="email"
              placeholder="Email address"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
            <input
              required
              type="password"
              placeholder="Create a password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
            />
            {error && (
              <div
                style={{ color: "#8b1e1e", fontSize: 13, textAlign: "left" }}
              >
                {error}
              </div>
            )}
            <button
              type="submit"
              style={styles.primary}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create account"}
            </button>
          </form>

          <p style={styles.meta}>
            Already have an account?{" "}
            <Link to="/login" style={styles.link}>
              Sign in
            </Link>
          </p>
        </Motion.div>
      </main>

      {/* ===== Mobile Floating Bimpe ===== */}
      {isMobile && (
        <div style={styles.fabContainer}>
          <img src="/assets/bim1.png" alt="BIMPE" style={styles.fabImg} />
          <div style={styles.bubble}>Hey there 👋 Ready to sign up?</div>
        </div>
      )}

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
  /* === Base Layout === */
  page: {
    position: "relative",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f8fafc, #f0f9ff)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },

  main: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: 10,
    paddingTop: "5rem",
    paddingBottom: "4rem",
  },

  /* === Nav === */
  nav: {
    position: "fixed",
    top: 0,
    width: "100%",
    height: "60px",
    padding: "0.6rem 1.4rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 50,
    background: "rgba(255,255,255,0.5)",
    backdropFilter: "blur(14px)",
    borderBottom: "1px solid rgba(0,0,0,0.08)",
  },
  logoImg: { height: 30, objectFit: "contain" },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "0.8rem",
  },
  navLink: {
    textDecoration: "none",
    color: "#222",
    padding: "6px 14px",
    borderRadius: 8,
    fontSize: 14,
    background: "rgba(255,255,255,0.3)",
    border: "1px solid rgba(0,0,0,0.15)",
    backdropFilter: "blur(6px)",
    transition: "all 0.25s ease",
  },

  /* ==== Background Layer ==== */
  background: {
    position: "absolute",
    inset: 0,
    overflow: "hidden",
    zIndex: 0,
  },

  bgOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(255,255,255,0.7)",
    zIndex: 1,
  },

  /* ==== Desktop Bimpe ==== */
  bimpeDesktop: {
    position: "absolute",
    right: "-6%",
    bottom: "-4%",
    zIndex: 2,
    pointerEvents: "none",
  },

  bimpeGlow: {
    position: "absolute",
    width: "600px",
    height: "600px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle at center, rgba(14,165,233,0.25), transparent 70%)",
    filter: "blur(45px)",
    zIndex: -1,
  },
  bimpeImg: {
    width: "620px",
    height: "800px",
    objectFit: "contain",
    filter: "drop-shadow(0 14px 30px rgba(0,0,0,0.15))",
  },

  /* ==== Card ==== */
  card: {
    zIndex: 20,
    background: "rgba(255,255,255,0.9)",
    borderRadius: 18,
    padding: "2.2rem 2.4rem",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    textAlign: "center",
    width: "92%",
    maxWidth: 460,
    backdropFilter: "blur(8px)",
  },
  title: { margin: 0, fontSize: 24, fontWeight: 700 },
  blurb: { marginTop: 8, color: "#555" },
  oauthBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    border: "1px solid #ddd",
    borderRadius: 10,
    padding: "10px 12px",
    background: "#fff",
    cursor: "pointer",
    fontWeight: 500,
  },
  divider: { display: "flex", alignItems: "center", gap: 8, margin: "14px 0" },
  line: { flex: 1, height: 1, background: "#eee" },
  or: { fontSize: 12, color: "#777", fontWeight: 700 },
  form: { display: "grid", gap: 10 },
  input: {
    border: "1px solid #ddd",
    borderRadius: 10,
    padding: "10px 12px",
    fontSize: 15,
  },
  primary: {
    background:
      "linear-gradient(90deg, rgb(57, 56, 139) 0%, rgb(14, 165, 233) 100%)",
    color: "#fff",
    padding: "0.8rem 1rem",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: 600,
  },
  meta: { marginTop: 12, color: "#555" },
  link: { color: "#000", textDecoration: "none", fontWeight: 600 },

  /* ==== Mobile Floating Bimpe ==== */
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
    width: 110,
    height: 110,
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

  /* ==== Footer ==== */
  footer: {
    background: "#000",
    color: "#F3F0E9",
    padding: "1.6rem 0 1.2rem",
    textAlign: "center",
    position: "relative",
    zIndex: 20,
  },
  footerInner: {
    display: "flex",
    justifyContent: "center",
    gap: "1.2rem",
    marginBottom: "0.6rem",
    flexWrap: "wrap",
  },
  footerLink: { color: "#f3f0e9", fontSize: "0.85rem", textDecoration: "none" },
  copyright: { fontSize: "0.78rem", opacity: 0.8 },
};
