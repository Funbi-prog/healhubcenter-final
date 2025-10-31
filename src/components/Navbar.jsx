import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Home", route: "/" },
    { label: "About", route: "/about" },
    { label: "Blog", route: "/blog" },
    { label: "Contact", route: "/contact" },
  ];

  return (
    <header
      className={`glass-nav ${
        location.pathname !== "/" ? "scrolled" : ""
      }`}
    >
      <div className="nav-container">
        <img
          src="/assets/nav.png"
          alt="HealHub Center Logo"
          className="nav-logo-img"
          onClick={() => navigate("/")}
        />

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
      </div>
    </header>
  );
}
