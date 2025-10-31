// src/App.jsx
import React from "react";
import LandingIntro from "./LandingIntro.jsx";
import Sections from "./Sections.jsx";
import "./index.css";
import Footer from "./Footer.jsx";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

// Auth & Feature Routes
import AuthPage from "./auth/AuthPage.jsx";
import LoginPage from "./auth/LoginPage.jsx";
import SignupPage from "./auth/SignupPage.jsx";
import AuthHelp from "./auth/AuthHelp.jsx";
import RoundtablePage from "./roundtable/RoundtablePage.jsx";
import ChatPage from "./chat/ChatPage.jsx";

// ✅ Import your new About page
import About from "./pages/About.jsx";

// Temporary placeholder pages for Blog, FAQs, Contact
function PlaceholderPage({ title }) {
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.6rem",
        fontWeight: 500,
        color: "#333",
      }}
    >
      {title} Page — Coming Soon
    </div>
  );
}

// 🏠 HomePage Component
function HomePage() {
  const navigate = useNavigate();

  // ⏰ Time-based greeting
  const hour = new Date().getHours();
  let greeting = "Welcome back";
  if (hour < 12) greeting = "Good morning";
  else if (hour < 18) greeting = "Good afternoon";
  else greeting = "Good evening";

  // ✨ Navbar items
  const navItems = [
    { label: "About", route: "/about" },
    { label: "Blog", route: "/blog" },
    { label: "FAQs", route: "/faqs" },
    { label: "Contact", route: "/contact" },
  ];

  return (
    <div className="app-container">
      {/* 🌐 Navbar */}
      <nav
        className="navbar minimal-nav"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.8rem 2rem",
        }}
      >
        <div className="nav-left">
          <img
            src="/assets/nav.png"
            alt="HealHub Center Logo"
            className="nav-logo-img"
            style={{ height: "42px", cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
        </div>

        <div
          className="nav-links"
          style={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          {navItems.map((item, i) => (
            <motion.button
              key={i}
              onClick={() => navigate(item.route)}
              className="nav-link"
              style={{
                position: "relative",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "0.95rem",
                fontWeight: 300,
                color: "#222",
                letterSpacing: "0.03em",
                padding: "0.3rem 0.6rem",
                fontFamily: "Inter, sans-serif",
              }}
              whileHover={{ scale: 1.08 }}
            >
              {item.label}
              <motion.span
                layoutId="circle-hover"
                style={{
                  position: "absolute",
                  bottom: "-4px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#CDBA96",
                  opacity: 0,
                }}
                whileHover={{
                  opacity: 1,
                  scale: [0, 1.6, 1],
                  transition: { duration: 0.5, ease: "easeOut" },
                }}
              />
            </motion.button>
          ))}
        </div>
      </nav>

      {/* 🍔 Hamburger for mobile */}
      <div
        className="hamburger"
        onClick={() => {
          document.querySelector(".hamburger").classList.toggle("active");
          document.querySelector(".mobile-menu").classList.toggle("open");
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* 📱 Mobile Menu */}
      <div className="mobile-menu">
        <button className="nav-link" onClick={() => navigate("/about")}>
          About
        </button>
        <button className="nav-link" onClick={() => navigate("/blog")}>
          Blog
        </button>
        <button className="nav-link" onClick={() => navigate("/faqs")}>
          FAQs
        </button>
        <button className="nav-link" onClick={() => navigate("/contact")}>
          Contact
        </button>
      </div>

      {/* 🖥️ Hero Layout */}
      <section className="hero-layout modern-layout">
        <div className="hero-content modern-content">
          {/* Dynamic Greeting */}
          <motion.h2
            className="hero-greeting"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              fontSize: "1rem",
              letterSpacing: "0.05em",
              color: "#444",
              marginBottom: "0.6rem",
            }}
          >
            {greeting}, let’s make today lighter.
          </motion.h2>

          {/* ✨ Animated Headline */}
          <motion.h1
            className="hero-title modern-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: "1.2",
            }}
          >
            <TypeAnimation
              sequence={[
                "Wellness that meets you where you are.",
                2500,
                "Heal better. Feel supported. Live lighter.",
                2500,
                "Your digital wellness companion for real change.",
                2500,
                "Where care, calm, and connection meet.",
                3000,
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              speed={45}
            />
          </motion.h1>

          {/* 💬 Subtext */}
          <motion.p
            className="hero-subtext modern-subtext"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            HealHub Center connects you to <strong>real therapists</strong>,{" "}
            <strong>supportive communities</strong>, and{" "}
            <strong>AI-driven care</strong> designed for today’s world.
            <br />
            Whether you’re healing, learning, or simply being —{" "}
            <span style={{ color: "#CDBA96" }}>we’re here for you.</span>
          </motion.p>

          {/* 🎯 CTA — single, centered, authorized */}
          <motion.div
            className="hero-buttons modern-buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1.2rem",
            }}
          >
            <button
              className="primary-btn black-btn"
              onClick={() => navigate("/login")}
            >
              Discover HealHub Center
            </button>
          </motion.div>
        </div>

        {/* 🪞 3D Wellness Office Scene */}
        <div className="hero-office modern-office">
          <LandingIntro />
        </div>
      </section>

      {/* 🌿 Interactive Wellness Sections */}
      <Sections />

      {/* 🦋 Footer */}
      <Footer />
    </div>
  );
}

// 🧭 Main App Router
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/help" element={<AuthHelp />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/roundtable" element={<RoundtablePage />} />

        {/* ✅ Informational Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<PlaceholderPage title="Blog" />} />
        <Route path="/faqs" element={<PlaceholderPage title="FAQs" />} />
        <Route path="/contact" element={<PlaceholderPage title="Contact" />} />
      </Routes>
    </BrowserRouter>
  );
}
