// src/dashboard/Sidebar.jsx
import React from "react";
import { motion as Motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import "./Dashboard.css";
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
import { logout } from "../services/authApi";

const navItems = [
  { icon: <Home size={18} />, label: "Dashboard", route: "/dashboard" },
  { icon: <MessageCircle size={18} />, label: "Chat", route: "/chat" },
  { icon: <Users size={18} />, label: "Roundtable", route: "/roundtable" },
  { icon: <Newspaper size={18} />, label: "Blog", route: "/dashboard/blog" },
  {
    icon: <BarChart2 size={18} />,
    label: "Insights",
    route: "/dashboard/insights",
  },
  {
    icon: <Settings size={18} />,
    label: "Settings",
    route: "/dashboard/settings",
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login"); // ✅ Redirect
    } catch (error) {
      console.error("❌ Logout Error:", error.message);
      alert("Logout failed, please try again.");
    }
  };

  return (
    <aside className="sidebar">
      {/* Logo Header */}

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        {navItems.map((item, i) => {
          const active = pathname === item.route;
          return (
            <Motion.button
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
            </Motion.button>
          );
        })}

        {/* Logout Button */}
        <Motion.button
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
        </Motion.button>
      </nav>
    </aside>
  );
}
