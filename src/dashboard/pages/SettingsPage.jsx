// src/dashboard/pages/SettingsPage.jsx
import React from "react";
import Sidebar from "../Sidebar.jsx";
import Topbar from "../Topbar.jsx";
import "../styles/Settings.css";
import { motion } from "framer-motion";

export default function SettingsPage() {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <Topbar />

        <div className="dashboard-content settings-page">
          {/* HEADER */}
          <header className="settings-header">
            <h1 className="page-title">Settings</h1>
            <p className="page-description">
              Manage your preferences, appearance, and notifications.
            </p>
          </header>

          {/* SETTINGS GRID */}
          <section className="settings-section">
            {/* Card 1 */}
            <motion.div
              className="settings-card"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="card-head">
                <h3>Profile Settings</h3>
                <p>Update your name, profile picture, and password.</p>
              </div>

              <button className="hh-btn">Edit Profile</button>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              className="settings-card"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="card-head">
                <h3>Notifications</h3>
                <p>Manage alerts, reminders, and daily summaries.</p>
              </div>

              <button className="hh-btn">Notification Settings</button>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              className="settings-card"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="card-head">
                <h3>Theme</h3>
                <p>Toggle between light & dark mode.</p>
              </div>

              <button className="hh-btn">Toggle Theme</button>
            </motion.div>
          </section>
        </div>
      </main>
    </div>
  );
}
