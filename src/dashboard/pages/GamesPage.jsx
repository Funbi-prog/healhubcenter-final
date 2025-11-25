// src/dashboard/pages/GamesPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar.jsx";
import Topbar from "../Topbar.jsx";
import "../styles/GamesPage.css";

export default function GamesPage() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <Topbar />

        <div className="dashboard-content">
          <h1 className="page-title">Mindful Games</h1>
          <p className="page-description">
            Relax, reset, and challenge your mind through science-backed mental clarity games.
          </p>

          <section className="games-grid">
            
            <div className="game-card">
              <div className="game-icon memory"></div>
              <h3>Memory Flip</h3>
              <p>Improve focus and retention by matching hidden pairs.</p>
              <Link to="/games/memory" className="primary-btn">Play Memory</Link>
            </div>

            <div className="game-card">
              <div className="game-icon calm"></div>
              <h3>Calm Clicks</h3>
              <p>A soothing reflex game that tests timing and relaxation.</p>
              <Link to="/games/calm" className="primary-btn">Start Calming</Link>
            </div>

            <div className="game-card">
              <div className="game-icon word"></div>
              <h3>Word Focus</h3>
              <p>Expand vocabulary and attention span through word challenges.</p>
              <Link to="/games/word" className="primary-btn">Play Word Game</Link>
            </div>

          </section>
        </div>
      </main>
    </div>
  );
}
