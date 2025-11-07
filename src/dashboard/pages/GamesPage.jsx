// src/dashboard/pages/GamesPage.jsx
import React from "react";
import Sidebar from "../Sidebar.jsx";
import Topbar from "../Topbar.jsx";
import "../styles/Shared.css";

export default function GamesPage() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <Topbar />

        <div className="dashboard-content">
          <h1 className="page-title">Mindful Games</h1>
          <p className="page-description">
            Play interactive games to unwind, boost focus, and sharpen your
            mental clarity.
          </p>

          <section className="games-grid">
            <div className="game-card">
              <h3>Memory Flip</h3>
              <p>Enhance your focus and recall skills through fun memory flips.</p>
              <button className="primary-btn">Play Now</button>
            </div>

            <div className="game-card">
              <h3>Calm Clicks</h3>
              <p>A slow-paced reflex game that rewards stillness and timing.</p>
              <button className="primary-btn">Play Now</button>
            </div>

            <div className="game-card">
              <h3>Word Focus</h3>
              <p>Challenge your attention span and vocabulary at once.</p>
              <button className="primary-btn">Play Now</button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
