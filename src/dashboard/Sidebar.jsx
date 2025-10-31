// Sidebar.jsx
import React from "react";
import { motion } from "framer-motion";
import { Home, MessageCircle, Brain, Book, Users, Newspaper, BarChart2, Settings } from "lucide-react";

const navItems = [
  { icon: <Home size={20} />, label: "Dashboard" },
  { icon: <MessageCircle size={20} />, label: "Chat" },
  { icon: <Brain size={20} />, label: "Mini Games" },
  { icon: <Book size={20} />, label: "Library" },
  { icon: <Users size={20} />, label: "Roundtable" },
  { icon: <Newspaper size={20} />, label: "Blog" },
  { icon: <BarChart2 size={20} />, label: "Insights" },
  { icon: <Settings size={20} />, label: "Settings" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <motion.div
        className="sidebar-header"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img src="/assets/nav.png" alt="HealHub Logo" className="sidebar-logo" />
      </motion.div>

      <nav className="sidebar-nav">
        {navItems.map((item, i) => (
          <motion.button
            key={i}
            className="sidebar-link"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(183, 159, 109, 0.08)" }}
          >
            {item.icon}
            <span>{item.label}</span>
          </motion.button>
        ))}
      </nav>
    </aside>
  );
}
