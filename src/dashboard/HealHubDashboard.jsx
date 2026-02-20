// src/dashboard/HealHubDashboard.jsx
import React from "react";
import "./Dashboard.css";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import WidgetCard from "./pages/WidgetCard";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// === Dashboard Widgets Data ===
const WIDGETS = (go) => [
  {
    title: "Daily Check-In",
    subtitle: "How are you feeling today?",
    actionText: "Take Quick Survey",
    gradient: "linear-gradient(90deg, #0EA5E9 0%, #39388B 100%)",
    metricValue: 68,
    metricLabel: "Completion",
    trend: "+2.4% WoW",
    data: [8, 12, 10, 13, 16, 14, 18, 22, 21, 25],
    onClick: () => go("/dashboard/checkin"),
  },
  {
    title: "Mini Mind Games",
    subtitle: "2-min calm games for focus.",
    actionText: "Start Game",
    gradient: "linear-gradient(90deg, #39388B 0%, #0EA5E9 100%)",
    metricValue: 54,
    metricLabel: "Streak",
    trend: "+6.1%",
    data: [5, 7, 9, 6, 10, 12, 11, 15, 13, 17],
    onClick: () => go("/dashboard/games"),
  },
  {
    title: "Therapist Chat",
    subtitle: "Talk to BigBay instantly.",
    actionText: "Open Chat",
    gradient: "linear-gradient(90deg, #0EA5E9 0%, #39388B 100%)",
    metricValue: 82,
    metricLabel: "Satisfaction",
    trend: "+1.8%",
    data: [10, 9, 12, 14, 16, 19, 18, 20, 22, 24],
    onClick: () => go("/chat"),
  },
  // {
  //   title: "HealHub Library",
  //   subtitle: "Curated articles & journals.",
  //   actionText: "Explore Library",
  //   gradient: "linear-gradient(135deg, #0EA5E9 0%, #39388B 100%)",
  //   metricValue: 41,
  //   metricLabel: "Reads",
  //   trend: "-0.7%",
  //   data: [4, 5, 6, 6, 7, 8, 8, 9, 10, 9],
  //   onClick: () => go("/dashboard/library"),
  // },
  // {
  //   title: "Roundtable Sessions",
  //   subtitle: "Weekly group healing topics.",
  //   actionText: "View Topics",
  //   gradient: "linear-gradient(90deg, #0EA5E9 0%, #39388B 100%)",
  //   metricValue: 73,
  //   metricLabel: "Seats filled",
  //   trend: "+4.2%",
  //   data: [6, 8, 12, 11, 15, 17, 16, 19, 21, 23],
  //   onClick: () => go("/roundtable"),
  // },

  // ============================================
  // NEW — HEALHUB CONNECT
  // ============================================
  {
    title: "HealHub Connect",
    subtitle: "Find work or hire safely.",
    actionText: "Open Connect",
    gradient: "linear-gradient(90deg, #39388B 0%, #0EA5E9 100%)",
    metricValue: 88,
    metricLabel: "Matches",
    trend: "+3.8%",
    data: [7, 12, 14, 18, 20, 22, 19, 25, 27, 30],
    onClick: () => go("/dashboard/connect"),
  },

  // // ============================================
  // // NEW — WORKSHOPS
  // // ============================================
  // {
  //   title: "Workshops",
  //   subtitle: "Guided healing journeys.",
  //   actionText: "Start Workshop",
  //   gradient: "linear-gradient(135deg, #39388B 0%, #0EA5E9 100%)",
  //   metricValue: 52,
  //   metricLabel: "Progress",
  //   trend: "+5.4%",
  //   data: [3, 5, 7, 6, 9, 11, 10, 14, 13, 16],
  //   onClick: () => go("/dashboard/workshops"),
  // },
];

// === HealHub Dashboard Component ===
export default function HealHubDashboard() {
  const navigate = useNavigate();
  const go = (route) => navigate(route);

  return (
    <div className="dashboard-layout">
      {/* === Sidebar === */}
      <Sidebar />

      {/* === Main Dashboard === */}
      <main className="dashboard-main">
        <Topbar />

        {/* === Animated Widget Section === */}
        <motion.section
          className="dashboard-widgets"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, y: 24 },
            show: {
              opacity: 1,
              y: 0,
              transition: {
                staggerChildren: 0.06,
                duration: 0.6,
                ease: "easeOut",
              },
            },
          }}
        >
          {WIDGETS(go).map((widget, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <WidgetCard {...widget} />
            </motion.div>
          ))}
        </motion.section>
      </main>
    </div>
  );
}
