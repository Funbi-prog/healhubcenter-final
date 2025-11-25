// src/dashboard/pages/WorkshopPage.jsx
import React from "react";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import "../styles/Workshop.css";

export default function WorkshopPage() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <Topbar />
        <div className="dashboard-content-wrapper">
          <h1>Workshops</h1>
          <p>This is the new Workshop feature page.</p>
        </div>
      </main>
    </div>
  );
}
