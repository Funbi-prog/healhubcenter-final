import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

/* 🌬️ Animation variants */
const fadeSlideVariant = {
  hidden: (direction) => ({
    opacity: 0,
    x: direction === "left" ? -80 : 80,
    scale: 0.96,
    filter: "blur(8px)",
  }),
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 20,
      duration: 1.2,
    },
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction === "left" ? 60 : -60,
    scale: 0.98,
    filter: "blur(6px)",
    transition: { duration: 0.8 },
  }),
};

/* 🌿 Reusable Section */
export function Section({ id, title, body, image, reverse = false }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: false });

  React.useEffect(() => {
    if (inView) controls.start("visible");
    else controls.start("hidden");
  }, [inView, controls]);

  return (
    <motion.section
      id={id}
      ref={ref}
      className={`healhub-section ${reverse ? "reverse" : ""}`}
      initial="hidden"
      animate={controls}
      variants={fadeSlideVariant}
      custom={reverse ? "right" : "left"}
    >
      <motion.div
        className="section-image"
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 70 }}
      >
        <motion.img
          src={image}
          alt={title}
          loading="lazy"
          className="section-img"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </motion.div>

      <motion.div
        className="section-text"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 40 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      >
        <motion.h2
          className="section-title"
          initial={{ scale: 0.9 }}
          animate={{ scale: inView ? 1 : 0.9 }}
          transition={{ type: "spring", stiffness: 80 }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="section-body"
          animate={{ opacity: inView ? 1 : 0.4 }}
          transition={{ duration: 1.5 }}
        >
          {body}
        </motion.p>
      </motion.div>
    </motion.section>
  );
}

/* 🌍 All Sections Together */
export default function Sections() {
  return (
    <div className="sections-wrapper">
      <Section
        id="community"
        title="Community That Actually Cares"
        body="Where wellness meets genuine connection. Share stories, find accountability, and grow together."
        image="/assets/comu.avif"
      />
      <Section
        id="roundtable"
        title="Roundtable Discussions That Matter"
        body="Thought leaders and everyday voices meet here. Real dialogue, real growth — no echo chambers."
        image="/assets/roudtable.avif"
        reverse
      />
      <Section
        id="bimpeai"
        title="Meet BimpeAI — Your Calm Concierge"
        body="Our digital assistant greets you, guides you, and checks in like a real friend. Subtle. Human. Always learning."
        image="/assets/bimpe.jpg"
      />
    </div>
  );
}
