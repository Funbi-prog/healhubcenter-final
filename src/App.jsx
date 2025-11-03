// src/App.jsx
import React from "react";
import LandingIntro from "./LandingIntro.jsx";
import Sections from "./Sections.jsx";
import "./index.css";
import Footer from "./Footer.jsx";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

// === GLOBAL COMPONENTS ===
import Navbar from "./components/Navbar.jsx";
import ScrollToTopButton from "./components/ScrollToTopButton.jsx";

// === AUTH & FEATURE ROUTES ===
import AuthPage from "./auth/AuthPage.jsx";
import LoginPage from "./auth/LoginPage.jsx";
import SignupPage from "./auth/SignupPage.jsx";
import AuthHelp from "./auth/AuthHelp.jsx";
import RoundtablePage from "./roundtable/RoundtablePage.jsx";
import ChatPage from "./chat/ChatPage.jsx";
import FiresideChat from "./fireside/FiresideChat.jsx"; // ✅ Added import

// === INFORMATIONAL PAGES ===
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

// === DASHBOARD (DEV PREVIEW) ===
import HealHubDashboard from "./dashboard/HealHubDashboard.jsx";
import CheckInPage from "./dashboard/CheckInPage.jsx";

// === PLACEHOLDER COMPONENT ===
function PlaceholderPage({ title }) {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h2 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#222" }}>
        {title} Page — Coming Soon
      </h2>
      <p style={{ maxWidth: "500px", color: "#555", lineHeight: 1.6 }}>
        We’re crafting something wonderful here. Check back soon to explore{" "}
        {title.toLowerCase()} insights and updates from HealHub Center.
      </p>
    </div>
  );
}

// === HOMEPAGE ===
function HomePage() {
  const navigate = useNavigate();

  const hour = new Date().getHours();
  let greeting = "Welcome back";
  if (hour < 12) greeting = "Good morning";
  else if (hour < 18) greeting = "Good afternoon";
  else greeting = "Good evening";

  return (
    <div className="app-container">
      {/* === HERO SECTION === */}
      <section className="hero-layout modern-layout">
        <div className="hero-content modern-content">
          <motion.h2
            className="hero-greeting"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {greeting}, let’s make today lighter.
          </motion.h2>

          <motion.h1
            className="hero-title modern-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
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

          <motion.p
            className="hero-subtext modern-subtext"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            HealHub Center connects you to <strong>real therapists</strong>,{" "}
            <strong>supportive communities</strong>, and{" "}
            <strong>AI-driven care</strong> designed for today’s world.
            <br />
            Whether you’re healing, learning, or simply being —{" "}
            <span style={{ color: "#CDBA96" }}>we’re here for you.</span>
          </motion.p>

          <motion.div
            className="hero-buttons modern-buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <button
              className="primary-btn black-btn"
              onClick={() => navigate("/login")}
            >
              Discover HealHub Center
            </button>
          </motion.div>
        </div>

        <div className="hero-office modern-office">
          <LandingIntro />
        </div>
      </section>

      <Sections />
      <Footer />
    </div>
  );
}

// === MAIN ROUTER ===
export default function App() {
  return (
    <BrowserRouter>
      {/* === GLOBAL NAVBAR & SCROLL === */}
      <Navbar />
      <ScrollToTopButton />

      <Routes>
        {/* === MAIN === */}
        <Route path="/" element={<HomePage />} />

        {/* === AUTH === */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/help" element={<AuthHelp />} />

        {/* === FEATURES === */}
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/roundtable" element={<RoundtablePage />} />
        <Route path="/fireside/:id" element={<FiresideChat />} /> {/* ✅ Added Fireside route */}

        {/* === INFORMATION === */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* === DASHBOARD (DEV PREVIEW) === */}
        <Route path="/dashboard" element={<HealHubDashboard />} />
        <Route path="/dashboard/checkin" element={<CheckInPage />} />
      </Routes>
    </BrowserRouter>
  );
}
