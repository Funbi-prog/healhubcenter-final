// src/dashboard/Sidebar.jsx
import React from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  MessageCircle,
  Brain,
  Book,
  Users,
  Newspaper,
  BarChart2,
  Settings,
} from "lucide-react";

const navItems = [
  { icon: <Home size={18} />, label: "Dashboard", route: "/dashboard" },
  { icon: <MessageCircle size={18} />, label: "Chat", route: "/chat" },
  { icon: <Brain size={18} />, label: "Mini Games", route: "/dashboard/games" },
  { icon: <Book size={18} />, label: "Library", route: "/dashboard/library" },
  { icon: <Users size={18} />, label: "Roundtable", route: "/roundtable" },
  { icon: <Newspaper size={18} />, label: "Blog", route: "/blog" },
  { icon: <BarChart2 size={18} />, label: "Insights", route: "/dashboard/insights" },
  { icon: <Settings size={18} />, label: "Settings", route: "/dashboard/settings" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <aside className="sidebar">
      <motion.div
        className="sidebar-header"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img src="/assets/nav.png" alt="HealHub Logo" className="sidebar-logo" />
      </motion.div>

      <nav className="sidebar-nav">
        {navItems.map((item, i) => {
          const active = pathname === item.route;
          return (
            <motion.button
              key={i}
              className="sidebar-link"
              onClick={() => navigate(item.route)}
              aria-label={item.label}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              style={{
                background: active ? "rgba(205,185,150,0.12)" : "transparent",
                borderColor: active ? "rgba(205,185,150,0.35)" : "transparent",
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </motion.button>
          );
        })}
      </nav>
    </aside>
  );
}
