import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Contact.css";
import Footer from "../Footer.jsx";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: "easeOut", delay },
  viewport: { once: true, amount: 0.3 },
});

export default function Contact() {
  const navigate = useNavigate();

  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);

  const faqs = [
    {
      q: "How can I partner with HealHub Center?",
      a: "Partnership inquiries are welcome! Whether you’re an NGO, hospital, or wellness brand, fill out the form under 'Partnership' and our collaborations team will reach out within 3–5 business days.",
    },
    {
      q: "How do I join the HealHub Movement?",
      a: "Simply sign up on our platform and choose your focus area — therapy, volunteering, or advocacy. You’ll receive onboarding details and community access instantly.",
    },
    {
      q: "Can I get professional therapy through HealHub?",
      a: "Yes. We connect users to licensed therapists across Africa and Europe, verified through strict data-safety and clinical protocols.",
    },
    {
      q: "Where are you headquartered?",
      a: "Our main office is in Lagos, Nigeria — with virtual operations spanning Africa, Europe, and Asia.",
    },
  ];

  return (
    <main className="contact-page">
      {/* === NAVBAR === */}
      

      {/* === HERO SECTION (SaaS Dashboard Style) === */}
      <section className="contact-hero">
        <div className="contact-hero-grid">
          {/* TEXT SIDE */}
          <motion.div
            className="contact-hero-text"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h1 className="contact-title">Let’s Connect. Collaborate. Create Impact.</h1>
            <p className="contact-sub">
              Whether it’s a partnership, inquiry, or just a hello — we’d love to hear from you.{" "}
              Let’s build a global wellness community, starting here in{" "}
              <strong>Lagos, Nigeria.</strong>
            </p>
          </motion.div>

          {/* IMAGE SIDE */}
          <motion.div
            className="contact-hero-image-wrap"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <img
              src="/assets/disp.jpg"
              alt="HealHub Contact"
              className="contact-hero-image"
            />
          </motion.div>
        </div>
      </section>

      {/* === CONTACT FORM + INFO SIDE-BY-SIDE === */}
      <section className="contact-form-section">
        {/* LEFT FORM SIDE */}
        <motion.div {...fadeUp(0.1)} className="contact-form-container">
          <h2>Get in Touch</h2>
          <p className="contact-intro">
            Fill out the form below and select your reason for contacting us.  
            Our team will respond with next steps within 48–72 hours.
          </p>

          <form className="contact-form">
            <div className="form-row">
              <label>Full Name</label>
              <input type="text" placeholder="Enter your full name" required />
            </div>

            <div className="form-row">
              <label>Email Address</label>
              <input type="email" placeholder="example@healhub.org" required />
            </div>

            <div className="form-row">
              <label>Inquiry Type</label>
              <select>
                <option>General Inquiry</option>
                <option>Partnership</option>
                <option>Join the Movement</option>
                <option>Complaints</option>
              </select>
            </div>

            <div className="form-row">
              <label>Your Message</label>
              <textarea rows="5" placeholder="Write your message here..." required />
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="btn-submit"
            >
              Submit Inquiry
            </motion.button>
          </form>
        </motion.div>

        {/* RIGHT INFO SIDE */}
        <motion.div {...fadeUp(0.2)} className="contact-side">
          {[
            { title: "📍 Headquarters", desc: "HealHub Center, Lagos, Nigeria." },
            { title: "📧 Email Us", desc: "support@healhubcenter.org" },
            { title: "🤝 Partnerships", desc: "collaborate@healhubcenter.org" },
            { title: "🌐 Office Hours", desc: "Mon – Fri: 9:00 AM – 5:00 PM (WAT)" },
          ].map((card, index) => (
            <motion.div
              key={index}
              className="contact-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 * index }}
              viewport={{ once: true }}
            >
              <h4>{card.title}</h4>
              <p>{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* === FAQ SECTION === */}
      <section className="faq-section">
        <div className="faq-container">
          <h2>Frequently Asked Questions</h2>
          <p className="faq-intro">
            Here are answers to some of our most common inquiries.  
            If you don’t find yours here, feel free to reach out directly.
          </p>

          {faqs.map((faq, i) => (
            <div key={i} className="faq-item">
              <button className="faq-question" onClick={() => toggleFAQ(i)}>
                {faq.q}
                <span>{openIndex === i ? "−" : "+"}</span>
              </button>
              {openIndex === i && (
                <motion.div
                  className="faq-answer"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <p>{faq.a}</p>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* === CTA SECTION === */}
      <section className="contact-cta">
        <h2>Join Our Global Wellness Network</h2>
        <p>
          Whether you’re a therapist, volunteer, or visionary — HealHub is your home for change.  
          Let’s make wellness accessible, dignified, and human.
        </p>
        <button
          className="btn-primary"
          onClick={() => navigate("/signup")}
        >
          Join the Movement →
        </button>
      </section>

      <Footer />
    </main>
  );
}
