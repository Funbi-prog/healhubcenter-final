import "./About.css";
import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import Footer from "../Footer.jsx";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut", delay },
  viewport: { once: false, amount: 0.3 },
});

// === Animated Counter Helper ===
function AnimatedCounter({
  from = 0,
  to = 100,
  duration = 1.6,
  className,
  suffix = "",
}) {
  const [val, setVal] = useState(from);
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount: 0.4 });

  useEffect(() => {
    if (inView) {
      const frames = Math.round(60 * duration);
      const step = (to - from) / frames;
      let i = 0;
      const id = requestAnimationFrame(function tick() {
        i++;
        const next = Math.round(from + step * i);
        setVal(next > to ? to : next);
        if (i < frames) requestAnimationFrame(tick);
      });
      return () => cancelAnimationFrame(id);
    } else {
      setVal(from);
    }
  }, [inView, from, to, duration]);

  return (
    <div ref={ref} className={className}>
      {val.toLocaleString()}
      {suffix}
    </div>
  );
}

export default function About() {
  const navigate = useNavigate();

  return (
    <main className="about-page">
      {/* === HERO === */}
      <section className="about-hero modern-hero">
        <div className="hero-grid">
          <motion.div {...fadeUp()} className="hero-text">
            <h1 className="hero-title">
              <TypeAnimation
                sequence={[
                  "Where Healthcare Meets Intelligence.",
                  2500,
                  "Where Hospitals Scale Compassion.",
                  2500,
                  "Where Mental Health Becomes Enterprise.",
                  2500,
                  "Where Technology Heals Systems.",
                  2500,
                ]}
                wrapper="span"
                speed={45}
                repeat={Infinity}
              />
            </h1>
            <p>
              We're not just a mental health platform. We're the{" "}
              <strong>operating system</strong> for modern healthcare
              institutions powering hospitals, NGOs, and governments with
              AI-driven mental wellness infrastructure that scales from 500 to 5
              million lives.
            </p>

            <div className="hero-buttons">
              <button
                className="btn-primary"
                onClick={() => navigate("/coming-soon")}
              >
                Transform Your Organization
              </button>
              <button
                className="btn-outline"
                onClick={() =>
                  window.open("https://calendly.com/healhubcenter", "_blank")
                }
              >
                Schedule Enterprise Demo
              </button>
            </div>
          </motion.div>

          {/* LIVE METRICS CARD */}
          <motion.div {...fadeUp(0.15)} className="hero-dashboard">
            <div className="dashboard-card shadow-xl short-card">
              <div className="dashboard-header">
                <h4>Healthcare Impact Metrics</h4>
                <span className="status-dot" />
              </div>
              <div className="analytics-body">
                <div className="analytics-card live-analytics">
                  <div className="pulse-bar bar1"></div>
                  <div className="pulse-bar bar2"></div>
                  <div className="pulse-bar bar3"></div>
                  <div className="pulse-bar bar4"></div>
                  <div className="pulse-bar bar5"></div>
                </div>
                <div className="analytics-summary">
                  <p>
                    <strong>12</strong> Healthcare Partners
                  </p>
                  <p>
                    <strong>3</strong> Countries Active
                  </p>
                  <p>
                    <strong>40+</strong> Licensed Therapists
                  </p>
                  <p>
                    <strong>200M</strong> Lives Target (2030)
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* === OUR STORY — ENTERPRISE EVOLUTION === */}
      <section className="our-story-cinematic">
        <div className="story-overlay-gradient"></div>

        <motion.div
          className="story-stage"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <h2 className="story-title">The HealHubCenter Story</h2>
          <motion.p
            className="story-quote"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            "Every healthcare revolution begins with a question no one dared to
            ask."
          </motion.p>
          <p className="story-intro-text">
            On <strong>December 26th, 2023</strong>, we asked:{" "}
            <em>
              "What if mental health infrastructure could be designed like
              enterprise software modular, scalable, and intelligent?"
            </em>
            <br />
            <br />
            What started as grassroots mental health outreach evolved into
            Africa's fastest-growing
            <strong> healthcare AI platform</strong> now powering hospitals,
            NGOs, and governments across three continents.
          </p>
        </motion.div>

        {/* The Evolution Panels */}
        <div className="story-scroll-container">
          <motion.div
            className="story-panel dawn"
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
          >
            <div className="panel-text">
              <h3>2023: The Crisis</h3>
              <p>
                <strong>500 million Africans</strong> lack access to mental
                health services. Traditional models couldn't scale. Healthcare
                systems were drowning in demand. We saw an infrastructure
                problem, not just a care problem.
              </p>
            </div>
            <div
              className="panel-image"
              style={{ backgroundImage: "url('/assets/chooselife.jpg')" }}
            ></div>
          </motion.div>

          <motion.div
            className="story-panel pure"
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
          >
            <div className="panel-text">
              <h3>2030: The Vision</h3>
              <p>
                By 2030, <strong>200 million lives</strong> will access mental
                health through our infrastructure. We're not replacing
                therapists we're <strong>augmenting healthcare systems</strong>{" "}
                so that every hospital, clinic, and community center can deliver
                world-class mental wellness at scale.
              </p>
            </div>
            <div
              className="panel-image"
              style={{ backgroundImage: "url('/assets/hope.jpg')" }}
            ></div>
          </motion.div>
        </div>

        <motion.div
          className="story-outro"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <p>
            HealHubCenter stands for <strong>infrastructure</strong>,{" "}
            <strong>intelligence</strong>, and <strong>impact</strong> we're the{" "}
            <strong>AWS of mental health</strong>, the{" "}
            <strong>Salesforce of wellness</strong>, the bridge between clinical
            excellence and enterprise scale.
          </p>
          <div className="heartbeat"></div>
        </motion.div>
      </section>
      {/* === HEALHUBCENTER MENTAL HEALTH INFRASTRUCTURE === */}
      <section className="vision-mission-dashboard">
        {/* INTRO */}
        <motion.div
          className="vm-intro"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.45 }}
        >
          <h2 className="vm-eyebrow">Mental Health, Built as Infrastructure</h2>

          <div className="vm-typed-wrap">
            <TypeAnimation
              sequence={[
                "Mental health is not episodic. It’s continuous.",
                2600,
                "Care should be adaptive, not reactive.",
                2600,
                "Technology should support the mind quietly.",
                2600,
              ]}
              wrapper="span"
              speed={36}
              repeat={Infinity}
              className="vm-typed"
            />
          </div>

          <p className="vm-sub">
            HealHubCenter is a mental health ecosystem engineered to support
            individuals over time not moments. We design systems that listen,
            remember, and respond with intention, preserving dignity while
            scaling access across communities.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="vm-grid four-col">
          {/* CARD 1 — PHILOSOPHY (STATIC) */}
          <div className="vm-card gold-accent">
            <div className="kpi-head">
              <span className="kpi-dot" />
              <span>People-First Mental Health</span>
            </div>

            <p className="kpi-foot">
              HealHubCenter is built on a simple principle: mental health care
              must feel human before it feels intelligent. Every interaction is
              designed to protect emotional safety, privacy, and autonomy
              without surveillance, pressure, or performative engagement.
            </p>
          </div>

          {/* CARD 2 — INTELLIGENCE (ANIMATED) */}
          <motion.div
            className="vm-card gold-accent"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ y: -4 }}
          >
            <div className="kpi-head">
              <span className="kpi-dot" />
              <span>Mental Health Intelligence</span>
            </div>

            {/* Subtle signal animation */}
            <motion.div
              className="signal-stack"
              animate={{ opacity: [0.35, 0.7, 0.35] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span />
              <span />
              <span />
            </motion.div>

            <p className="kpi-foot">
              The platform observes emotional signals across time language
              patterns, interaction rhythm, and behavioral shifts allowing
              support to be delivered with context and restraint rather than
              urgency or generic responses.
            </p>
          </motion.div>

          {/* CARD 3 — CONTINUITY (ANIMATED) */}
          <motion.div
            className="vm-card gold-accent"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            whileHover={{ y: -4 }}
          >
            <div className="kpi-head">
              <span className="kpi-dot" />
              <span>Continuity of Care</span>
            </div>

            {/* Slow memory loop */}
            <motion.div
              className="memory-loop"
              animate={{ rotate: 360 }}
              transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
            >
              <span className="loop-core" />
            </motion.div>

            <p className="kpi-foot">
              Mental health compounds. HealHubCenter preserves emotional context
              across interactions so care does not reset. Progress, setbacks,
              and growth are understood as part of a continuous journey not
              isolated sessions.
            </p>
          </motion.div>

          {/* CARD 4 — AFRICA-FIRST SCALE (STATIC) */}
          <div className="vm-card gold-accent">
            <div className="kpi-head">
              <span className="kpi-dot" />
              <span>Africa-First by Design</span>
            </div>

            <p className="kpi-foot">
              Built with African realities in mind, cultural nuance, access
              gaps, and stigma. HealHubCenter pioneers a scalable mental health
              model that remains deeply relevant to the people it serves, while
              standing strong on a global stage.
            </p>
          </div>
        </div>
      </section>

      {/* === ENTERPRISE SOLUTIONS SHOWCASE === */}
      <section className="vision-mission-dashboard">
        <motion.div
          className="vm-intro"
          initial={{ opacity: 0, x: 80, y: 12 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <h2 className="vm-eyebrow">Enterprise Solutions That Scale</h2>
          <div className="vm-typed-wrap">
            <TypeAnimation
              sequence={[
                "Custom AI trained on your clinical protocols. Deployed in 40 days.",
                2800,
                "HIPAA-compliant. GDPR-ready. Built for healthcare compliance.",
                2800,
                "From patient triage to therapy booking one unified platform.",
                2800,
              ]}
              wrapper="span"
              speed={48}
              repeat={Infinity}
              className="vm-typed"
            />
          </div>
          <p className="vm-sub">
            Whether you're a 50-bed clinic or a 5,000-bed hospital network, our
            enterprise infrastructure adapts to your workflows, integrates with
            your EHR, and scales with your growth.
          </p>
        </motion.div>

        {/* Enterprise Metrics Grid */}
        <div className="vm-grid">
          <motion.div
            className="vm-card kpi"
            {...fadeUp(0.1)}
            whileHover={{ scale: 1.05, rotateY: 5 }}
          >
            <div className="kpi-head">
              <span className="kpi-dot" />
              <span>Patient Touchpoints (Monthly)</span>
            </div>
            <AnimatedCounter
              from={0}
              to={47000}
              duration={2}
              className="kpi-num"
              suffix="+"
            />
            <div className="kpi-progress">
              <div className="kpi-bar" />
            </div>
            <p className="kpi-foot">
              Across 12 healthcare partners in Nigeria, Kenya, and Germany
            </p>
          </motion.div>

          <motion.div
            className="vm-card sdg"
            {...fadeUp(0.2)}
            whileHover={{ scale: 1.05, rotateY: -5 }}
          >
            <div className="sdg-head">
              <span className="kpi-dot" />
              <span>Enterprise Features</span>
            </div>
            <div className="sdg-chips">
              <span className="chip">White-Label AI</span>
              <span className="chip">EHR Integration</span>
              <span className="chip">Clinical Dashboards</span>
              <span className="chip">Multi-Language</span>
              <span className="chip">24/7 Support</span>
            </div>
            <div className="sdg-mini-graph">
              <div className="mini-bar b1" />
              <div className="mini-bar b2" />
              <div className="mini-bar b3" />
              <div className="mini-bar b4" />
              <div className="mini-bar b5" />
            </div>
            <p className="kpi-foot">
              Full-stack mental health infrastructure for modern healthcare
              organizations
            </p>
          </motion.div>

          <motion.div
            className="vm-card who"
            {...fadeUp(0.3)}
            whileHover={{ scale: 1.05, rotateY: 5 }}
          >
            <div className="who-head">
              <span className="kpi-dot" />
              <span>Compliance & Security</span>
            </div>
            <div className="who-orb">
              <div className="ring ring-a" />
              <div className="ring ring-b" />
              <div className="ring ring-c" />
            </div>
            <ul className="who-points">
              <li>HIPAA-compliant infrastructure; end-to-end encryption</li>
              <li>GDPR-ready; multi-region data sovereignty</li>
              <li>ISO 27001 security standards; SOC 2 Type II certified</li>
            </ul>
            <p className="kpi-foot">
              Enterprise-grade security that healthcare organizations trust
            </p>
          </motion.div>

          <motion.div
            className="vm-card partners"
            {...fadeUp(0.4)}
            whileHover={{ scale: 1.05, rotateY: -5 }}
          >
            <div className="partners-head">
              <span className="kpi-dot" />
              <span>Deployment Speed</span>
            </div>
            <div className="partner-logos">
              <div className="logo-chip spin">30 Days</div>
              <div className="logo-chip">Setup</div>
              <div className="logo-chip">Training</div>
              <div className="logo-chip">Launch</div>
              <div className="logo-chip">Scale</div>
            </div>
            <div className="partner-stats">
              <div className="ps-row">
                <span>Integration Time</span>
                <span className="ps-val ps-pulse">2 weeks</span>
              </div>
              <div className="ps-row">
                <span>Staff Training</span>
                <span className="ps-val">3 days</span>
              </div>
              <div className="ps-row">
                <span>Go-Live Support</span>
                <span className="ps-val">24/7</span>
              </div>
            </div>
            <p className="kpi-foot">
              From contract to launch in 30 days no enterprise project should
              take 6 months
            </p>
          </motion.div>
        </div>
      </section>

      {/* === WHO WE SERVE === */}
      <section className="community-forums-section">
        <motion.div {...fadeUp()} className="forums-container">
          <h3 className="forums-heading">🏥 Who We Serve</h3>
          <p className="forums-subtext">
            <strong>Healthcare infrastructure for every context.</strong> From
            50-bed clinics to government health programs, we power mental
            wellness at scale.
          </p>

          <div className="forum-grid">
            {[
              {
                icon: "🏥",
                title: "Hospitals & Clinics",
                desc: "White-label AI triage, patient engagement, and therapy booking systems integrated with your EHR.",
                stats: "8 Active Partners",
                color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              },
              {
                icon: "🌍",
                title: "NGOs & Nonprofits",
                desc: "Community mental health programs powered by scalable AI — reaching underserved populations.",
                stats: "4 Active Programs",
                color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              },
              {
                icon: "🏛️",
                title: "Government Health",
                desc: "National mental health infrastructure data dashboards, policy insights, population-level analytics.",
                stats: "2 Gov Partners",
                color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
              },
              {
                icon: "🎓",
                title: "Universities & Research",
                desc: "Mental health data infrastructure for research institutions studying digital wellness interventions.",
                stats: "3 Research Grants",
                color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
              },
              {
                icon: "💼",
                title: "Corporate Wellness",
                desc: "Employee mental health programs with engagement tracking, anonymous support, and burnout prevention.",
                stats: "Coming Q2 2025",
                color: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
              },
            ].map((forum, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.1)}
                className="forum-card enhanced"
                style={{ background: forum.color }}
                whileHover={{ scale: 1.04, y: -6 }}
              >
                <div className="forum-icon-wrap">
                  <span className="forum-icon">{forum.icon}</span>
                </div>
                <div className="forum-body">
                  <h5 className="forum-title">{forum.title}</h5>
                  <p className="forum-desc">{forum.desc}</p>
                  <div className="forum-stats">
                    <span>📊 {forum.stats}</span>
                    <button
                      className="join-btn"
                      onClick={() => navigate("/coming-soon")}
                    >
                      Learn More →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Floating icons */}
        <div className="floating-emojis">
          <span>🏥</span>
          <span>💊</span>
          <span>🩺</span>
          <span>📊</span>
          <span>🌍</span>
        </div>
      </section>

      <Footer />
    </main>
  );
}
