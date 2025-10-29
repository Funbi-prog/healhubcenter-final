import React from "react";

export default function Footer() {
  return (
    <footer
      className="footer-section"
      style={{
        backgroundImage: "url('/assets/diverse-hands-circle.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="footer-overlay"></div>

      {/* Content */}
      <div className="footer-content">
        <h2 className="footer-heading">
          Join thousands taking steps towards better mental well-being.
        </h2>

        <div className="footer-cta">
          <a href="#signup" className="footer-btn">
            Get Started Today
          </a>
        </div>

        <div className="footer-links">
          <div className="footer-top-links">
            <a href="#blog">Blog</a>
            <a href="#newsletters">Newsletters</a>
            <a href="#media">Media</a>
            <a href="#community">Community</a>
            <a href="#faqs">FAQs</a>
            <a href="#contact">Contact Support</a>
            <a href="#roundtable">Join a Roundtable</a>
            <a href="#support">Immediate Support</a>
          </div>

          <div className="footer-bottom-links">
            <a href="#terms">Terms of Service</a>
            <a href="#privacy">Privacy Policy</a>
          </div>
        </div>

        <div className="footer-socials">
          <a href="mailto:support@healhubcenter.com">
            <i className="fas fa-envelope"></i>
          </a>
          <a href="https://linkedin.com/company/healhubcenter" target="_blank">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://twitter.com/healhubcenter" target="_blank">
            <i className="fab fa-x-twitter"></i>
          </a>
          <a href="https://instagram.com/healhubcenter" target="_blank">
            <i className="fab fa-instagram"></i>
          </a>
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} HealHub Wellness Center. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
