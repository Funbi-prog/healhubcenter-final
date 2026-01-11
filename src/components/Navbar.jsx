import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const isDashboard =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/chat") ||
    location.pathname.startsWith("/roundtable");

  const navItems = isDashboard
    ? [
        { label: "Chat", route: "/chat" },
      ]
    : [
        { label: "Home", route: "/" },
        { label: "About", route: "/about" },
        { label: "Contact", route: "/contact" },
        { label: "Enterprise", route: "https://healhubenterprise.vercel.app", external: true },
      ];

  const handleNavigation = (route, external) => {
    if (external) {
      window.open(route, "_blank", "noopener,noreferrer");
    } else {
      navigate(route);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/"); // Back to landing page
      setMenuOpen(false);
    } catch (error) {
      console.error("Logout Error:", error);
      alert("Logout failed, please try again.");
    }
  };

  return (
    <header className={`glass-nav ${location.pathname !== "/" ? "scrolled" : ""}`}>
      <div className="nav-container">
        <img
          src="/assets/nav.png"
          alt="HealHub Center Logo"
          className="nav-logo-img"
          onClick={() => navigate(isDashboard ? "/dashboard" : "/")}
        />

        <nav className="nav-links">
          {navItems.map((item, i) => (
            <motion.button
              key={i}
              onClick={() => handleNavigation(item.route, item.external)}
              className={`nav-link ${location.pathname === item.route ? "active" : ""}`}
              whileHover={{ scale: 1.08 }}
            >
              {item.label}
            </motion.button>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="darkmode-toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button className="hamburger" onClick={() => setMenuOpen((prev) => !prev)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
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
                  handleNavigation(item.route, item.external);
                  setMenuOpen(false);
                }}
                className={`mobile-link ${location.pathname === item.route ? "active" : ""}`}
              >
                {item.label}
              </button>
            ))}

            {/* Logout in mobile menu (only in dashboard) */}
            {isDashboard && (
              <button
                onClick={handleLogout}
                className="mobile-link logout-mobile"
                style={{
                  marginTop: "1rem",
                  paddingTop: "1rem",
                  borderTop: "1px solid rgba(0,0,0,0.1)",
                  color: "#dc2626",
                  fontWeight: 600,
                }}
              >
                <LogOut size={18} style={{ marginRight: "8px" }} />
                Logout
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
