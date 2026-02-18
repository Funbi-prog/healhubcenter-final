// src/Sections.jsx
import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

/* ————— Utils ————— */
const smoothScrollTo = (id) => {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

/* Motion Variants */
const fadeSlideVariant = {
  hidden: (direction) => ({
    opacity: 0,
    x: direction === "left" ? -40 : 40,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* Feature Bullet Component */
function Feature({ children }) {
  return (
    <li className="hh-feature">
      <span className="hh-dot" aria-hidden="true" />
      <span>{children}</span>
    </li>
  );
}

/* ————— Section Component ————— */
export function Section({
  id,
  title,
  kicker,
  body,
  bullets = [],
  image,
  reverse = false,
  primaryCta,
  primaryTo = "#",
  secondaryCta,
  secondaryTo = "#",
}) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const navigate = useNavigate();

  React.useEffect(() => {
    controls.start(inView ? "visible" : "hidden");
  }, [inView, controls]);

  /* Unified Navigation Logic */
  const handleNav = (target) => {
    if (!target) return;

    // If internal route
    if (target.startsWith("/")) {
      navigate(target);
    }
    // If page section
    else if (target.startsWith("#")) {
      smoothScrollTo(target);
    }
    // If external link
    else {
      window.location.href = target;
    }
  };

  return (
    <motion.section
      id={id}
      ref={ref}
      className={`hh-section ${reverse ? "reverse" : ""}`}
      aria-labelledby={`${id}-title`}
      initial="hidden"
      animate={controls}
      variants={fadeSlideVariant}
      custom={reverse ? "right" : "left"}
    >
      <div className="hh-media">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="hh-img"
        />
      </div>

      <div className="hh-copy">
        {kicker && <p className="hh-kicker">{kicker}</p>}
        <h2 id={`${id}-title`} className="hh-title">
          {title}
        </h2>
        <p className="hh-body">{body}</p>

        {bullets.length > 0 && (
          <ul className="hh-features" role="list">
            {bullets.map((b, i) => (
              <Feature key={i}>{b}</Feature>
            ))}
          </ul>
        )}

        <div className="hh-ctas">
          {primaryCta && (
            <button
              className="hh-btn primary"
              onClick={() => handleNav(primaryTo)}
              aria-label={primaryCta}
            >
              {primaryCta}
            </button>
          )}
          {secondaryCta && (
            <button
              className="hh-btn ghost"
              onClick={() => handleNav(secondaryTo)}
              aria-label={secondaryCta}
            >
              {secondaryCta}
            </button>
          )}
        </div>
      </div>
    </motion.section>
  );
}

/* ————— All Sections ————— */
export default function Sections() {
  return (
    <div className="hh-sections">
      {/* 🌿 COMMUNITY SECTION */}
      <Section
        id="community"
        kicker="Community • Belonging • Moderated"
        title="A Community That Actually Cares"
        body={`HealHubCenter community is a verified, moderated home for real people in real seasons of life. 
We group conversations by lived context—single parents, widows, youth, elders, and more—so support actually lands. 
Privacy-first. Judgment-free. Built for belonging.`}
        bullets={[
          "Verified entry to keep spaces safe and relevant",
          "Open forum + private sub-groups by life stage",
          "Asynchronous threads and live prompts that spark reflection",
          "Report tools and human moderation for respectful dialogue",
          "Searchable topics so wisdom compounds over time",
        ]}
        image="/assets/comu.avif"
        primaryCta="Join the Community"
        primaryTo="/login"
        secondaryCta="Explore Forums"
        secondaryTo="#community-forums"
      />

      {/* 🪶 ROUNDTABLE SECTION */}
      <Section
        id="roundtable"
        reverse
        kicker="Roundtable • 10 Seats • Trust Over Time"
        title="Roundtable Conversations That Heal"
        body={`Roundtable is a virtual circle of 10 people focused on one shared theme. 
Join anonymously or named. Vent, reflect, listen together. 
You can hop into an SOS session when life spikes, or schedule a weekly recurring circle that builds trust and growth.`}
        bullets={[
          "Small-group rooms (10 people) curated by topic",
          "Anonymous or named participation = your choice",
          "SOS pop-ins for urgent support moments",
          "Scheduled weekly cohorts to deepen trust",
          "Summaries + gentle nudges to keep the circle alive",
        ]}
        image="/assets/rd.avif"
        primaryCta="Join a Roundtable Now"
        primaryTo="/login"
        secondaryCta="Schedule Your Monthly Circle"
        secondaryTo="/login"
      />

      {/* 🤖 BIMPE-AI SECTION */}
      <Section
        id="bimpeai"
        kicker="BIMPE • Empathic • Always-On"
        title="Meet BIMPE — The Intentional Companion"
        body={`BIMPE is more than a chatbot—she’s an emotionally aware concierge for your wellness journey. 
She checks in if you go quiet, guides you through 2-minute calm drills, recommends communities or roundtables that fit your season, and can even help with life admin from tutoring to CV polish when your brain is tired.`}
        bullets={[
          "Checks in after 24–48h inactivity (opt-in)",
          "Recommends groups and Roundtables by interest",
          "Guided calm routines for panic, stress, and sleep",
          "Multi-channel: chat today, continue on web tomorrow",
          "Context memory (opt-in) so care feels personal",
        ]}
        image="/assets/bimpe.jpg"
        primaryCta="Chat with Bimpe"
        primaryTo="/auth"
        secondaryCta="Try a 2-min Calm Exercise"
        secondaryTo="#overview"
      />
    </div>
  );
}
