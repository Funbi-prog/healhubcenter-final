// src/dashboard/pages/SettingsPage.jsx
import React from "react";
import Sidebar from "../Sidebar.jsx";
import Topbar from "../Topbar.jsx";
import "../styles/Settings.css";

export default function SettingsPage() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <Topbar />

        <div className="dashboard-content">
          <h1 className="page-title">Settings</h1>
          <p className="page-description">
            Manage your account preferences, appearance, and notifications.
          </p>

          <section className="settings-section">
            <div className="settings-card">
              <h3>Profile Settings</h3>
              <p>Update your name, photo, or password.</p>
              <button className="primary-btn">Edit Profile</button>
            </div>

            <div className="settings-card">
              <h3>Notifications</h3>
              <p>Control alerts, email summaries, and in-app reminders.</p>
              <button className="primary-btn">Manage Notifications</button>
            </div>

            <div className="settings-card">
              <h3>Theme</h3>
              <p>Switch between light and dark mode.</p>
              <button className="primary-btn">Toggle Theme</button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
