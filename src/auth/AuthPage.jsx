// src/auth/AuthPage.jsx
import React from "react";
import { motion as Motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaApple, FaEnvelope } from "react-icons/fa";

export default function AuthPage() {
  const navigate = useNavigate();

  // Detect mobile once on mount and on resize
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false,
  );
  React.useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleLogin = (method) => {
    if (method === "Email") {
      navigate("/login");
      return;
    }

    // OAuth not wired in this project yet.
    navigate("/login");
  };

  return (
    <div style={{ ...styles.page, ...(isMobile ? styles.pageMobile : null) }}>
      {/* 🧭 Navbar (glass) */}
      <nav style={styles.nav}>
        <img
          src="/assets/nav.png" // update if your logo path/name differs
          alt="HealHubCenter Logo"
          style={styles.logoImg}
        />
        <button style={styles.homeBtn} onClick={() => navigate("/")}>
          Home
        </button>
      </nav>

      {/* Soft overlay */}
      <div style={styles.bgOverlay} />

      {/* 🧍🏽‍♀️ Desktop/Large-screen Bimpe (hidden on mobile) */}
      {!isMobile && (
        <Motion.img
          src="/assets/bim1.png" // full-body transparent PNG
          alt="Bimpe AI"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          style={styles.bimpeImg}
        />
      )}

      {/* 📱 Mobile Floating Avatar (circular, draggable, always above the form) */}
      {isMobile && (
        <Motion.div
          drag
          dragMomentum={false}
          dragElastic={0.2}
          initial={{ opacity: 0, y: -10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={styles.mobileAvatarWrap}
          aria-label="BIMPE avatar"
        >
          <img
            src="/assets/bimpe-face.png" // <— add a square/transparent face crop here
            alt="BIMPE"
            style={styles.mobileAvatarImg}
            onError={(e) => {
              // Fallback if face crop not ready yet: use full image and let it cover
              e.currentTarget.src = "/assets/bim1.png";
              e.currentTarget.style.objectPosition = "top";
            }}
          />
          {/* subtle breathing glow */}
          <Motion.span
            style={styles.mobileGlow}
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
          />
        </Motion.div>
      )}

      {/* 💬 Auth Card */}
      <Motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ ...styles.card, ...(isMobile ? styles.cardMobile : null) }}
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

        <form
          style={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/login");
          }}
        >
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
          <button style={styles.signInBtn} type="submit">
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
            <Link to="/signup" style={styles.linkBold}>
              Create one
            </Link>
          </div>
        </div>
      </Motion.div>

      {/* ⚖️ Premium Footer */}
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

/* ————— Styles ————— */
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
    paddingTop: "5rem", // space for glass nav
    paddingBottom: "2rem",
  },
  pageMobile: {
    // a bit more headroom so the avatar can float above the card
    paddingTop: "6rem",
  },
  bgOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(5px)",
    zIndex: 0,
  },
  // Glass nav
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    padding: "1rem 1.25rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
    background: "rgba(255, 255, 255, 0.25)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
  },
  logoImg: {
    height: "42px",
    objectFit: "contain",
  },
  homeBtn: {
    background: "rgba(255,255,255,0.2)",
    border: "1px solid rgba(0,0,0,0.2)",
    borderRadius: "8px",
    padding: "0.4rem 1rem",
    cursor: "pointer",
    color: "#222",
    fontSize: "0.9rem",
    backdropFilter: "blur(6px)",
    transition: "all 0.3s ease",
  },

  // Auth card (center column)
  card: {
    zIndex: 2,
    background: "#fff",
    borderRadius: "14px",
    padding: "2rem 2.4rem",
    boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
    textAlign: "center",
    width: "90%",
    maxWidth: "420px",
    margin: "2rem auto 0 auto",
  },
  cardMobile: {
    // leave space on top so the avatar doesn’t overlap inputs
    marginTop: "4.5rem",
  },
  banner: {
    background: "#dbeafe",
    color: "#0c4a6e",
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

  // Desktop Bimpe full image (kept tighter left & slightly higher)
  bimpeImg: {
    position: "absolute",
    bottom: "7.5%", // slightly higher
    left: "-9.5%", // more left so gesture aims toward form
    height: "400px",
    objectFit: "contain",
    zIndex: 1,
    opacity: 0.96,
    pointerEvents: "none",
    transition: "all 0.6s ease-out",
  },

  // Mobile circular avatar that sits above the card
  mobileAvatarWrap: {
    position: "fixed",
    top: "84px", // below the glass nav
    left: "16px",
    width: "84px",
    height: "84px",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.95)",
    boxShadow: "0 10px 28px rgba(0,0,0,0.15)",
    zIndex: 5, // above the card
    overflow: "hidden",
    border: "1px solid rgba(0,0,0,0.06)",
    touchAction: "none",
  },
  mobileAvatarImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    display: "block",
  },
  mobileGlow: {
    position: "absolute",
    inset: 0,
    borderRadius: "999px",
    boxShadow: "0 0 24px #38bdf8 inset",
    pointerEvents: "none",
  },

  // Premium footer
  footer: {
    position: "relative",
    width: "100%",
    background: "#111",
    color: "#e5decf",
    padding: "1.4rem 0",
    marginTop: "3rem",
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
