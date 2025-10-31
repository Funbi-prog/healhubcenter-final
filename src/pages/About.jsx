import "./About.css";
import React from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import Footer from "../Footer.jsx";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut", delay },
  viewport: { once: true, amount: 0.3 },
});

export default function About() {
  const navigate = useNavigate();

  return (
    <main className="about-page">
      {/* === NAVBAR === */}
      <header className="about-navbar glass-nav">
        <div className="nav-container">
          <img
            src="/assets/nav.png"
            alt="HealHubCenter Logo"
            className="about-logo"
            onClick={() => navigate("/")}
          />
          <nav className="nav-links">
            <button onClick={() => navigate("/")} className="nav-link">
              Home
            </button>
            <button onClick={() => navigate("/about")} className="nav-link active">
              About
            </button>
            <button onClick={() => navigate("/blog")} className="nav-link">
              Blog
            </button>
            <button onClick={() => navigate("/contact")} className="nav-link">
              Contact
            </button>
          </nav>
        </div>
      </header>

      {/* === HERO === */}
      <section className="about-hero modern-hero">
        <div className="hero-grid">
          {/* LEFT TEXT */}
          <motion.div {...fadeUp()} className="hero-text">
            <h1 className="hero-title">
              <TypeAnimation
                sequence={[
                  "Where Healing Meets Innovation.",
                  2500,
                  "Where Empathy Learns to Scale.",
                  2500,
                  "Where Technology Feels Human.",
                  2500,
                ]}
                wrapper="span"
                speed={45}
                repeat={Infinity}
              />
            </h1>
            <p>
              We’re building a digital ecosystem that listens, learns, and heals — merging AI empathy
              with real human connection. This isn’t just wellness tech. It’s a revolution in how care feels.
            </p>

            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => navigate("/signup")}>
                Join the Movement
              </button>
              <button className="btn-outline" onClick={() => navigate("/login")}>
                Get Started
              </button>
            </div>
          </motion.div>

          {/* RIGHT SIDE — ANALYTICS CARD */}
          <motion.div {...fadeUp(0.15)} className="hero-dashboard">
            <div className="dashboard-card shadow-xl short-card">
              <div className="dashboard-header">
                <h4>Healing in Numbers</h4>
                <span className="status-dot" />
              </div>
              <div className="analytics-body">
                <div className="analytics-card live-analytics">
                  <div className="pulse-bar bar1"></div>
                  <div className="pulse-bar bar2"></div>
                  <div className="pulse-bar bar3"></div>
                  <div className="pulse-bar bar4"></div>
                  <div className="pulse-bar bar5"></div>
                </div>
                <div className="analytics-summary">
                  <p><strong>200+</strong> sessions per day</p>
                  <p><strong>40+</strong> certified therapists</p>
                  <p><strong>1,500+</strong> active members</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* === OUR STORY — NOW BEFORE FORUMS === */}
      <section className="about-story-section">
        <div className="story-container">
          <motion.div {...fadeUp()} className="story-text">
            <h2>Our Story</h2>
            <p>
              HealHubCenter began as a whisper — a quiet response to a loud world. Founded in{" "}
              <strong>2023</strong> by <strong>Funbi Akintade</strong>, what started as a small initiative
              to offer <strong>free therapy</strong> to over <strong>500 Nigerians</strong> became a
              movement toward <strong>digital healing</strong>.
            </p>
            <p>
              We emerged when people were scrolling for answers but craving connection.
              Our goal was never to build another app — it was to build a sanctuary.
            </p>
            <p>
              Today, HealHubCenter stands as a <strong>global ecosystem</strong>, bridging
              <strong> technology and tenderness</strong>.
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.1)} className="story-image">
            <img src="/assets/chooselife.jpg" alt="Our Story" />
          </motion.div>
        </div>
      </section>

      {/* === COMMUNITY FORUMS === */}
      <section className="community-forums-section">
        <motion.div {...fadeUp()} className="forums-container">
          <h3 className="forums-heading">💬 Our Community Forums</h3>
          <p className="forums-subtext">
            <strong>Where Healing Meets Belonging.</strong> Log in. Join your circle. Share. Reflect. Grow.
          </p>

          <div className="forum-grid">
            {[
              { icon: "👩‍👧", title: "Single Parents", desc: "Support. Strength. Shared stories." },
              { icon: "🕊️", title: "Widowed", desc: "Gentle healing. Steady rebuilding." },
              { icon: "🌿", title: "Elderly", desc: "Connection. Dignity. Legacy." },
              { icon: "🎧", title: "Adolescents", desc: "Voice. Identity. Balance." },
              { icon: "🔥", title: "Youth", desc: "Purpose. Pressure. Passion." },
            ].map((forum, i) => (
              <div key={i} className="forum-card">
                <div className="forum-header">
                  <span className="forum-icon">{forum.icon}</span>
                  <h5 className="forum-title">{forum.title}</h5>
                </div>
                <p className="forum-desc">{forum.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* === MISSION === */}
      <section className="about-mission-section">
        <div className="mission-container">
          <motion.div {...fadeUp()} className="mission-image">
            <img src="/assets/index.jpg" alt="Our Mission" />
          </motion.div>

          <motion.div {...fadeUp(0.1)} className="mission-text">
            <h3>Our Mission</h3>
            <p>
              To make mental wellness <strong>human again</strong> — accessible, stigma-free, and deeply personal.
            </p>
            <p>
              We merge <strong>AI intelligence</strong> with <strong>human empathy</strong> to
              <strong> amplify care</strong>. Every feature reminds people: you are not alone.
            </p>
            <div className="mission-cta">
              <button className="btn-primary" onClick={() => navigate("/signup")}>
                Join the Movement
              </button>
              <button className="btn-outline" onClick={() => navigate("/login")}>
                Start Your Journey
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* === VALUES === */}
      <section className="values-section">
        <motion.h3 {...fadeUp()} className="section-title">
          What We Stand For
        </motion.h3>
        <div className="values-grid">
          <motion.div {...fadeUp(0.1)} className="value-card">
            <h4>Empathy First</h4>
            <p>Every word begins with compassion. We build for people, not profiles.</p>
          </motion.div>
          <motion.div {...fadeUp(0.15)} className="value-card">
            <h4>Innovation with Soul</h4>
            <p>Technology should serve the human experience — not replace it.</p>
          </motion.div>
          <motion.div {...fadeUp(0.2)} className="value-card">
            <h4>Privacy with Purpose</h4>
            <p>Your story is sacred — end-to-end encrypted, confidential, and yours.</p>
          </motion.div>
        </div>
      </section>

      {/* === VISION === */}
      <section
        className="vision-section"
        style={{ backgroundImage: "url('/assets/vision.jpg')" }}
      >
        <div className="overlay" />
        <motion.div {...fadeUp()} className="vision-content">
          <h3>Our Vision for 2030</h3>
          <p>
            To impact <strong>200 million lives</strong> by building a digital sanctuary that heals,
            educates, and connects people to hope.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate("/login")}>
              Become a Member
            </button>
            <Link to="/contact" className="btn-outline">
              Partner with Us
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
