// src/dashboard/Topbar.jsx
import React from "react";
import { Bell } from "lucide-react";

export default function Topbar() {
  const hours = new Date().getHours();
  const greeting =
    hours < 12
      ? "Good morning"
      : hours < 18
      ? "Good afternoon"
      : "Good evening";

  return (
    <header className="topbar">
      <h2>{greeting}, Fumbi 🌿</h2>
      <div className="topbar-right">
        <Bell className="icon" />
        <img src="/assets/bim3.png" alt="Profile" className="profile-avatar" />
      </div>
    </header>
  );
}
