import React from "react";
import LandingIntro from "./LandingIntro.jsx";
import "./index.css";

export default function App() {
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
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#community">Community</a>
          <a href="#contact">Contact</a>
          <button className="demo-btn">Book Demo</button>
        </div>
      </nav>

      {/* 🖥️ Modern Hero Layout */}
      <section className="hero-layout modern-layout">
        <div className="hero-content modern-content">
          <h1 className="hero-title modern-title">
            A wellness experience built for the modern world.
          </h1>
          <p className="hero-subtext modern-subtext">
            HealHubCenter connects you to real support, community, and care.
            <br />
            Everything you need for mental and emotional well-being — reimagined.
          </p>
          <div className="hero-buttons modern-buttons">
            <button className="primary-btn black-btn">Join Community</button>
            <button className="secondary-btn outline-btn">Learn More</button>
          </div>
        </div>

        <div className="hero-office modern-office">
          <LandingIntro />
        </div>
      </section>
    </div>
  );
}
