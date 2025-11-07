// src/dashboard/pages/InsightsPage.jsx
import React from "react";
import Sidebar from "../Sidebar.jsx";
import Topbar from "../Topbar.jsx";
import "../styles/Shared.css";

export default function InsightsPage() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <Topbar />
        <div className="dashboard-content">
          <h1 className="page-title">Insights Dashboard</h1>
          <p className="page-description">
            View your healing progress, analytics, and engagement stats across
            HealHub Center. New graphs and wellness insights will appear here soon.
          </p>

          {/* Placeholder Visualization */}
          <div className="insights-placeholder">
            <div className="insight-box">📈 Weekly Mood Tracker</div>
            <div className="insight-box">💬 Chat Engagement</div>
            <div className="insight-box">🕊️ Reflection Trends</div>
          </div>
        </div>
      </main>
    </div>
  );
}
