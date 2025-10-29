// src/OverlayUI.jsx
import React, { useState } from "react";
import "./index.css";

export default function OverlayUI() {
  const [section, setSection] = useState(0);

  const sections = [
    {
      title: "Welcome to HealHubCenter",
      subtitle: "Your Digital Wellness Space 🌿",
      content:
        "Step into a calm, reflective world where healing meets innovation. Let Bimpe guide you through our journey.",
      button: "Meet Bimpe",
    },
    {
      title: "Our Community",
      subtitle: "Where Healing Meets Belonging",
      content:
        "These aren’t just forums. They’re identity-centered safe spaces for real connection and growth. Join the room that gets you.",
      button: "Join a Forum",
    },
    {
      title: "Say It. Feel It. Heal From It.",
      subtitle: "Roundtable Discussions",
      content:
        "12+ focused zones — from emotional, financial, and legal to academic and personal. We meet you exactly where you are.",
      button: "Find a Discussion",
    },
    {
      title: "Meet Bimpe",
      subtitle: "AI Care with Human Warmth",
      content:
        "Bimpe is your compassionate AI — your self-care coach, your daily check-in, your motivator. She remembers, she listens, she grows with you.",
      button: "Start Your Journey",
    },
  ];

  const handleNext = () => setSection((section + 1) % sections.length);

  return (
    <div className="overlay-container">
      <div className="overlay-glass">
        <h1 className="overlay-title">{sections[section].title}</h1>
        <h3 className="overlay-subtitle">{sections[section].subtitle}</h3>
        <p className="overlay-content">{sections[section].content}</p>
        <button className="overlay-btn" onClick={handleNext}>
          {sections[section].button}
        </button>
      </div>
    </div>
  );
}
