// src/App.jsx
import React from "react";
import LandingIntro from "./LandingIntro.jsx";
import Sections from "./Sections.jsx";
import "./index.css";
import Footer from "./Footer.jsx";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

// 🧩 Routing imports
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import AuthPage from "./auth/AuthPage.jsx";
import LoginPage from "./auth/LoginPage.jsx";
import SignupPage from "./auth/SignupPage.jsx";
import AuthHelp from "./auth/AuthHelp.jsx";
import RoundtablePage from "./roundtable/RoundtablePage.jsx";
import ChatPage from "./chat/ChatPage.jsx";

// 🏠 HomePage Component
function HomePage() {
  const navigate = useNavigate();

  // ⏰ Time-based greeting
  const hour = new Date().getHours();
  let greeting = "Welcome back";
  if (hour < 12) greeting = "Good morning";
  else if (hour < 18) greeting = "Good afternoon";
  else greeting = "Good evening";

  return (
    <div className="app-container">
      {/* 🌐 Navbar */}
      <nav className="navbar minimal-nav">
        <div className="nav-left">
          <img
            src="/assets/nav.png"
            alt="HealHub Logo"
            className="nav-logo-img"
          />
        </div>

        <div className="nav-links">
          <button className="nav-link" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="demo-btn" onClick={() => navigate("/signup")}>
            Sign-up
          </button>
        </div>
      </nav>

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
            HealHubCenter connects you to <strong>real therapists</strong>,{" "}
            <strong>supportive communities</strong>, and{" "}
            <strong>AI-driven care</strong> designed for today’s world.
            <br />
            Whether you’re healing, learning, or simply being —{" "}
            <span style={{ color: "#CDBA96" }}>we’re here for you.</span>
          </motion.p>

          {/* 🎯 Buttons */}
          <motion.div
            className="hero-buttons modern-buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <button
              className="primary-btn black-btn"
              onClick={() =>
                document
                  .querySelector("#overview")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Join Community
            </button>

            <button
              className="secondary-btn outline-btn"
              onClick={() =>
                document
                  .querySelector("#bimpeai")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Meet Bimpe
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
    <Route path="/auth" element={<AuthPage />} />      {/* 💥 ADD THIS BACK */}
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/help" element={<AuthHelp />} />
    <Route path="/chat" element={<ChatPage />} />
    <Route path="/roundtable" element={<RoundtablePage />} />
  </Routes>
</BrowserRouter>

  );
}
