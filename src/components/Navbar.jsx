import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // 🌓 Handle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // 🔍 Route-aware nav items
  const isDashboard =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/chat") ||
    location.pathname.startsWith("/roundtable");

  const navItems = isDashboard
    ? [
        { label: "Dashboard", route: "/dashboard" },
        { label: "Check-In", route: "/dashboard/checkin" },
        { label: "Library", route: "/dashboard/library" },
        { label: "Chat", route: "/chat" },
        { label: "Roundtable", route: "/roundtable" },
      ]
    : [
        { label: "Home", route: "/" },
        { label: "About", route: "/about" },
        { label: "Contact", route: "/contact" },
        { label: "Coming Soon", route: "/coming-soon" },
      ];

  return (
    <header
      className={`glass-nav ${location.pathname !== "/" ? "scrolled" : ""}`}
    >
      <div className="nav-container">
        {/* === Logo === */}
        <img
          src="/assets/nav.png"
          alt="HealHub Center Logo"
          className="nav-logo-img"
          onClick={() => navigate(isDashboard ? "/dashboard" : "/")}
        />

        {/* === Desktop Nav === */}
        <nav className="nav-links">
          {navItems.map((item, i) => (
            <motion.button
              key={i}
              onClick={() => navigate(item.route)}
              className={`nav-link ${
                location.pathname === item.route ? "active" : ""
              }`}
              whileHover={{ scale: 1.08 }}
            >
              {item.label}
            </motion.button>
          ))}
        </nav>

        {/* === Icons === */}
        <div className="nav-actions">
          <button
            className="darkmode-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            className="hamburger"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* === Mobile Dropdown === */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mobile-nav ${darkMode ? "dark" : ""}`}
          >
            {navItems.map((item, i) => (
              <button
                key={i}
                onClick={() => {
                  navigate(item.route);
                  setMenuOpen(false);
                }}
                className={`mobile-link ${
                  location.pathname === item.route ? "active" : ""
                }`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
