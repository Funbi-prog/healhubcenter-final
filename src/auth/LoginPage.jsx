// src/auth/LoginPage.jsx
import React, { useState, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FaGoogle, FaEnvelope } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import { login, googleLogin } from "../services/authApi";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Google Signup/Login
  const handleGoogleAuth = async (credential) => {
    try {
      setError(null);
      setIsSubmitting(true);
      await googleLogin({ idToken: credential });
      const fromPath = location.state?.from?.pathname;
      const nextPath =
        typeof fromPath === "string" && fromPath.startsWith("/")
          ? fromPath
          : "/dashboard";
      navigate(nextPath, { replace: true });
    } catch (err) {
      const status = err?.response?.status;
      if (status === 401) {
        setError("Invalid Google account or account deactivated.");
      } else if (status === 409) {
        setError("This Google account is already linked to another user.");
      } else {
        setError("Google sign-in failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      setIsSubmitting(true);
      await login({ email, password });
      const fromPath = location.state?.from?.pathname;
      const nextPath =
        typeof fromPath === "string" && fromPath.startsWith("/")
          ? fromPath
          : "/dashboard";
      navigate(nextPath, { replace: true });
    } catch (err) {
      const status = err?.response?.status;
      if (
        status === 401 &&
        err?.response?.data?.message.message ===
          "This account uses social login."
      ) {
        setError(
          "This account is linked to a social login. Please sign in using Google.",
        );
      } else if (status === 401 || status === 403) {
        console.warn("Authentication failed:", err.response.data.message);
        setError("Invalid email or password.");
      } else {
        console.error(
          "Unexpected Login Error:",
          err.response.data.message.message,
        );
        setError(
          err?.response?.data?.message.message ||
            err?.response.data.message.message[0] ||
            "Login failed. Please try again.",
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
        <Link to="/" style={styles.navLink}>
          Home
        </Link>
      </nav>

      {/* Overlay */}
      <div style={styles.bgOverlay} />

      {/* ===== Desktop Bimpe ===== */}
      {!isMobile && (
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            ...styles.bimpeDesktop,
            animation: "bimpeFloat 5s ease-in-out infinite",
          }}
        >
          <img
            src="/assets/bim3.png"
            alt="Bimpe illustration"
            style={styles.bimpeImg}
          />
        </Motion.div>
      )}

      {/* ===== Mobile Floating Bimpe ===== */}
      {isMobile && (
        <Motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{
            ...styles.fabContainer,
            animation: "bimpeFloat 4s ease-in-out infinite",
          }}
        >
          <img src="/assets/bim1.png" alt="BIMPE" style={styles.fabImg} />
          <div style={styles.bubble}>Hey there 👋 Ready to sign in?</div>
        </Motion.div>
      )}

      {/* ===== Auth Card ===== */}
      <Motion.div
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
          <div style={styles.googleOverlayWrapper}>
            <button
              style={styles.oauthBtn}
              type="button"
              disabled={isSubmitting}
            >
              <FaGoogle style={styles.icon} /> Continue with Google
            </button>
            <div style={styles.googleOverlay}>
              <GoogleLogin
                onSuccess={(res) => handleGoogleAuth(res.credential)}
                onError={() =>
                  setError("Google sign-in failed. Please try again.")
                }
                width="420"
                size="large"
              />
            </div>
          </div>
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
            disabled={isSubmitting}
          />
          <input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
            disabled={isSubmitting}
          />
          {error && (
            <div style={{ color: "#8b1e1e", fontSize: 13, textAlign: "left" }}>
              {error}
            </div>
          )}
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
      </Motion.div>

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
    background: "linear-gradient(135deg, #f8fafc, #f0f9ff)",
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
    background: "#39388B",
    color: "#fff",
    padding: "0.55rem",
    borderRadius: 6,
    fontSize: "0.85rem",
    marginBottom: "0.9rem",
  },
  title: {
    fontSize: "1.55rem",
    color: "#222",
    marginBottom: 6,
    fontWeight: 600,
  },
  brandText: { color: "#39388B" },
  subdomain: { fontSize: "0.9rem", color: "#666", marginBottom: "1.2rem" },
  buttons: { display: "flex", flexDirection: "column", gap: "0.75rem" },
  googleOverlayWrapper: { position: "relative" },
  googleOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.001,
    overflow: "hidden",
  },
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
    width: "100%",
  },
  icon: { fontSize: "1.1rem" },
  divider: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "1.1rem 0",
  },
  line: { height: 1, width: "40%", background: "#ddd" },
  or: {
    margin: "0 0.55rem",
    fontSize: "0.8rem",
    color: "#777",
    fontWeight: 600,
  },
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
