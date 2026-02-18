import React from "react";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";
import "../Dashboard.css";

export default function LibraryPage() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <Topbar />
        <div style={{ padding: "1rem 0" }}>
          <h2 style={{ margin: 0, fontSize: "1.6rem", fontWeight: 700 }}>HealHub Library</h2>
          <p style={{ marginTop: "0.6rem", color: "#555", lineHeight: 1.6 }}>
            Curated articles and journals — coming soon.
          </p>
        </div>
      </main>
    </div>
  );
}
