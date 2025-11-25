// src/dashboard/pages/BlogPage.jsx
import React from "react";
import Sidebar from "../Sidebar.jsx";
import Topbar from "../Topbar.jsx";
import "../styles/Shared.css";

export default function BlogPage() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        <Topbar />
        <div className="dashboard-content">
          <h1 className="page-title">HealHub Blog</h1>
          <p className="page-description">
            Explore articles, wellness stories, and mental health conversations
            from our community and experts.
          </p>

          <div className="blog-grid">
            <div className="blog-card">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                alt="Wellness"
              />
              <h3>The Power of Slow Healing</h3>
              <p>
                Discover why taking your time to heal can transform your entire
                perspective on growth and resilience.
              </p>
            </div>

            <div className="blog-card">
              <img
                src="https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb"
                alt="Mindfulness"
              />
              <h3>Mindfulness in Motion</h3>
              <p>
                Learn how small, mindful steps each day bring calm, focus, and
                emotional balance to your life.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
