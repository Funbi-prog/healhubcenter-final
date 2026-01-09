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

/* Motion Variants - OPTIMIZED WITH BLUR */
const fadeSlideVariant = {
  hidden: (direction) => ({
    opacity: 0,
    x: direction === "left" ? -40 : 40,
    scale: 0.98,
    filter: "blur(8px)", // ← KEPT THE BLUR
  }),
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { 
      type: "spring", 
      stiffness: 80,
      damping: 25,
      duration: 0.6,
    },
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
  const [ref, inView] = useInView({ 
    threshold: 0.15,
    triggerOnce: false // ← CHANGED: Animation repeats on scroll
  });
  const navigate = useNavigate();

  React.useEffect(() => {
    controls.start(inView ? "visible" : "hidden"); // ← Animates in AND out
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
        <motion.img
          src={image}
          alt={title}
          loading="lazy"
          className="hh-img"
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
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
      {/* 🤖 BIMPE-AI SECTION - FIRST */}
      <Section
        id="bimpeai"
        kicker="BIMPE • Empathic • Always-On"
        title="Meet BIMPE — Your Intentional Companion"
        body={`BIMPE is more than a chatbot — she's an emotionally aware concierge for your wellness journey. 
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

      {/* 🌿 COMMUNITY SECTION - SECOND */}
      <Section
        id="community"
        reverse
        kicker="Community • Belonging • Moderated"
        title="A Community That Actually Cares"
        body={`HealHubCenter community is a verified, moderated home for real people in real seasons of life. 
We group conversations by lived context — single parents, widows, youth, elders, and more — so support actually lands. 
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
        primaryTo="/coming-soon"
        secondaryCta="Explore Forums"
        secondaryTo="#community-forums"
      />

      {/* 🏥 ENTERPRISE SECTION - THIRD (SLIDES FROM LEFT) */}
      <Section
        id="enterprise"
        reverse={false}
        kicker="Enterprise • Custom AI • Healthcare Grade"
        title="For Healthcare Organizations & Institutions"
        body={`HealHubCenter also powers private, customizable AI assistants for hospitals, NGOs, and research institutions trained on proprietary healthcare data to automate education, triage, booking, and engagement. 
        
Built for scale, compliance, and impact. Whether you're serving 500 patients or 50,000 community members, our enterprise solutions adapt to your workflows, integrate with existing systems, and provide actionable insights that improve outcomes.`}
        bullets={[
          "Custom AI trained on your clinical protocols and patient education materials",
          "HIPAA-compliant infrastructure with end-to-end encryption",
          "Automated triage, appointment booking, and follow-up reminders",
          "Multi-language support for diverse patient populations",
          "Real-time analytics dashboard for engagement and health metrics",
          "Seamless integration with EHR/EMR systems",
          "Dedicated success team for onboarding and ongoing support",
        ]}
        image="/assets/hce.png"
        primaryCta="Explore HealHubCenter Enterprise"
        primaryTo="/coming-soon"
        secondaryCta="Schedule a Demo"
        secondaryTo="https://calendly.com/healhubcenter"
      />
    </div>
  );
}