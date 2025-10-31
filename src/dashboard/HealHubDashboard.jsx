// HealHubDashboard.jsx
import React from "react";
import "./Dashboard.css";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import WidgetCard from "./WidgetCard";

export default function HealHubDashboard() {
  return (
    <div className="dashboard-layout">
      {/* === SIDEBAR === */}
      <Sidebar />

      {/* === MAIN CONTENT === */}
      <div className="dashboard-main">
        <Topbar />

        <section className="dashboard-widgets">
          <WidgetCard
            title="Daily Check-In"
            subtitle="How are you feeling today?"
            actionText="Take Quick Survey"
            gradient="var(--color-gradient)"
          />

          <WidgetCard
            title="Mini Mind Games"
            subtitle="Play 2-min calming games for focus."
            actionText="Start Game"
            gradient="linear-gradient(90deg, #a39bd2, #b79f6d)"
          />

          <WidgetCard
            title="Therapist Chat"
            subtitle="Talk to BigBay instantly — your AI support guide."
            actionText="Open Chat"
            gradient="linear-gradient(90deg, #b79f6d, #ffb6b9)"
          />

          <WidgetCard
            title="HealHub Library"
            subtitle="Read curated wellness articles and journals."
            actionText="Explore Library"
            gradient="linear-gradient(90deg, #a39bd2, #8ac6d1)"
          />

          <WidgetCard
            title="Roundtable Sessions"
            subtitle="Join weekly discussions on mental health & lifestyle."
            actionText="View Topics"
            gradient="linear-gradient(90deg, #ff8a65, #a39bd2)"
          />
        </section>
      </div>
    </div>
  );
}
