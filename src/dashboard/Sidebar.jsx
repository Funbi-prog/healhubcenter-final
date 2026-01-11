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
  LogOut,
} from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

// ALL items - kept in code but hidden
const navItems = [
  { icon: <Home size={18} />, label: "Dashboard", route: "/dashboard", hidden: true }, // HIDDEN
  { icon: <MessageCircle size={18} />, label: "Chat", route: "/chat", hidden: false }, // VISIBLE
  { icon: <Brain size={18} />, label: "Mini Games", route: "/dashboard/games", hidden: true }, // HIDDEN
  { icon: <Book size={18} />, label: "Library", route: "/dashboard/library", hidden: true }, // HIDDEN
  { icon: <Users size={18} />, label: "Roundtable", route: "/roundtable", hidden: true }, // HIDDEN
  { icon: <Newspaper size={18} />, label: "Blog", route: "/blog", hidden: true }, // HIDDEN
  { icon: <BarChart2 size={18} />, label: "Insights", route: "/dashboard/insights", hidden: true }, // HIDDEN
  { icon: <Settings size={18} />, label: "Settings", route: "/dashboard/settings", hidden: true }, // HIDDEN
];

export default function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      console.log("✅ User signed out successfully");
      navigate("/coming-soon");
    } catch (error) {
      console.error("❌ Logout Error:", error.message);
      alert("Logout failed, please try again.");
    }
  };

  return (
    <aside className="sidebar">
      {/* Navigation Links */}
      <nav className="sidebar-nav">
        {navItems
          .filter(item => !item.hidden) // Only show items that are NOT hidden
          .map((item, i) => {
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
                  color: active ? "#b99f79" : "#222",
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </motion.button>
            );
          })}

        {/* Logout Button */}
        <motion.button
          onClick={handleLogout}
          className="sidebar-link logout"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          style={{
            marginTop: "1.5rem",
            borderTop: "1px solid rgba(0,0,0,0.06)",
            paddingTop: "1rem",
            color: "#9c2b2b",
            fontWeight: 600,
          }}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </motion.button>
      </nav>
    </aside>
  );
}
