import "./About.css";
import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import Footer from "../Footer.jsx";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut", delay },
    viewport: { once: true, amount: 0.3 },
});

// === Animated Counter Helper ===
function AnimatedCounter({ from = 0, to = 100, duration = 1.6, className }) {
    const [val, setVal] = useState(from);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.4 });

    useEffect(() => {
        if (!inView) return;
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
    }, [inView, from, to, duration]);

    return (
        <div ref={ref} className={className}>
            {val.toLocaleString()}
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
                                    "Where Healing Meets Innovation.",
                                    2500,
                                    "Where Empathy Learns to Scale.",
                                    2500,
                                    "Where Technology Feels Human.",
                                    2500,
                                ]}
                                wrapper="span"
                                speed={45}
                                repeat={Infinity}
                            />
                        </h1>
                        <p>
                            We’re building a digital ecosystem that listens, learns, and heals —
                            merging AI empathy with real human connection. This isn’t just wellness
                            tech. It’s a revolution in how care feels.
                        </p>

                        <div className="hero-buttons">
                            <button className="btn-primary" onClick={() => navigate("/signup")}>
                                Join the Movement
                            </button>
                            <button className="btn-outline" onClick={() => navigate("/login")}>
                                Get Started
                            </button>
                        </div>
                    </motion.div>

                    {/* ANALYTICS CARD */}
                    <motion.div {...fadeUp(0.15)} className="hero-dashboard">
                        <div className="dashboard-card shadow-xl short-card">
                            <div className="dashboard-header">
                                <h4>Healing in Numbers</h4>
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
                                        <strong>200+</strong> sessions per day
                                    </p>
                                    <p>
                                        <strong>40+</strong> certified therapists
                                    </p>
                                    <p>
                                        <strong>1,500+</strong> active members
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* === OUR STORY — Global Edition === */}
            <section className="our-story-cinematic">
                <div className="story-overlay-gradient"></div>

                <motion.div
                    className="story-stage"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.5 }}
                >
                    <h2 className="story-title">Our Story</h2>
                    <motion.p className="story-quote" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.5 }}>
                        "Every movement begins with silence."
                    </motion.p>
                    <p className="story-intro-text">
                        For HealHubCenter, that silence came from the world’s growing cry for emotional clarity.
                        On <strong>December 26th, 2023</strong>, what started as a quiet question became a loud purpose:
                        <em>“What if healing could be redesigned for everyone?”</em>
                    </p>
                </motion.div>

                {/* The Cinematic Panels */}
                <div className="story-scroll-container">
                    <motion.div className="story-panel dawn" whileInView={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ duration: 1 }}>
                        <div className="panel-text">
                            <h3>The Beginning</h3>
                            <p>
                                A small outreach became a movement
                                a spark of compassion lighting pathways in underserved communities.
                            </p>
                        </div>
                        <div className="panel-image" style={{ backgroundImage: "url('/assets/chooselife.jpg')" }}></div>
                    </motion.div>

                    <motion.div className="story-panel glow" whileInView={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ duration: 1 }}>
                        <div className="panel-text">
                            <h3>The Awakening</h3>
                            <p>
                                What began with empathy evolved into technology that listens
                                a sanctuary where AI meets emotion with respect and care.
                            </p>
                        </div>
                        <div className="panel-image" style={{ backgroundImage: "url('/assets/therapy.jpg')" }}></div>
                    </motion.div>

                    <motion.div className="story-panel sunset" whileInView={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ duration: 1 }}>
                        <div className="panel-text">
                            <h3>The Expansion</h3>
                            <p>
                                Across <strong>Africa</strong>, <strong>Europe</strong>, and <strong>Asia</strong>,
                                HealHubCenter is bridging cultures, languages, and hearts
                                redefining global access to mental wellness.
                            </p>
                        </div>
                        <div className="panel-image" style={{ backgroundImage: "url('/assets/global-map.jpg')" }}></div>
                    </motion.div>

                    <motion.div className="story-panel pure" whileInView={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ duration: 1 }}>
                        <div className="panel-text">
                            <h3>The Promise</h3>
                            <p>
                                By 2030, we aim to reach <strong> 200 million lives</strong>
                                not through algorithms alone,
                                but through community, compassion, and courage.
                            </p>
                        </div>
                        <div className="panel-image" style={{ backgroundImage: "url('/assets/hope.jpg')" }}></div>
                    </motion.div>
                </div>

                <motion.div
                    className="story-outro"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.5 }}
                >
                    <p>
                        HealHubCenter stands for <strong>empathy</strong>, <strong>innovation</strong>,
                        and <strong>collective care</strong>
                        not just technology, but humanity refined.
                    </p>
                    <div className="heartbeat"></div>
                </motion.div>
            </section>

            {/* === VISION & MISSION DASHBOARD === */}
            <section className="vision-mission-dashboard">
                <motion.div
                    className="vm-intro"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.4 }}
                >
                    <h2 className="vm-eyebrow">Our Vision & Mission</h2>
                    <div className="vm-typed-wrap">
                        <TypeAnimation
                            sequence={[
                                "By 2030, we will extend evidence-based healing to 200,000,000+ lives worldwide.",
                                2800,
                                "A global sanctuary where technology amplifies tenderness — not replaces it.",
                                2800,
                                "From access to equity: building the operating system for mental wellness.",
                                2800,
                            ]}
                            wrapper="span"
                            speed={48}
                            repeat={Infinity}
                            className="vm-typed"
                        />
                    </div>
                    <p className="vm-sub">
                        The mission is precise: unlock high-trust, culturally aware care at scale —
                        while aligning with global standards that keep people safe, seen, and supported.
                    </p>
                </motion.div>

                {/* Analytics / Cards row */}
                <div className="vm-grid">
                    <motion.div
                        className="vm-card kpi"
                        {...fadeUp(0.1)}
                        whileHover={{ rotateX: 6, rotateY: -6, translateZ: 6 }}
                    >
                        <div className="kpi-head">
                            <span className="kpi-dot" />
                            <span>Lives Impacted (Target 2030)</span>
                        </div>
                        <AnimatedCounter from={0} to={200000000} duration={2.2} className="kpi-num" />
                        <div className="kpi-progress">
                            <div className="kpi-bar" />
                        </div>
                        <p className="kpi-foot">
                            Milestone trajectory: phased rollout across Africa → Europe → Asia.
                        </p>
                    </motion.div>

                    <motion.div
                        className="vm-card sdg"
                        {...fadeUp(0.2)}
                        whileHover={{ rotateX: 6, rotateY: 6, translateZ: 6 }}
                    >
                        <div className="sdg-head">
                            <span className="kpi-dot" />
                            <span>UN SDG Focus</span>
                        </div>
                        <div className="sdg-chips">
                            <span className="chip">SDG 3: Good Health</span>
                            <span className="chip">SDG 5: Gender Equality</span>
                            <span className="chip">SDG 10: Reduced Inequalities</span>
                            <span className="chip">SDG 16: Peace, Justice</span>
                            <span className="chip">SDG 17: Partnerships</span>
                        </div>
                        <div className="sdg-mini-graph">
                            <div className="mini-bar b1" />
                            <div className="mini-bar b2" />
                            <div className="mini-bar b3" />
                            <div className="mini-bar b4" />
                            <div className="mini-bar b5" />
                        </div>
                        <p className="kpi-foot">
                            Programs mapped to measurable SDG outcomes; quarterly impact reviews.
                        </p>
                    </motion.div>

                    <motion.div
                        className="vm-card who"
                        {...fadeUp(0.3)}
                        whileHover={{ rotateX: -6, rotateY: 6, translateZ: 6 }}
                    >
                        <div className="who-head">
                            <span className="kpi-dot" />
                            <span>Standards & Safety</span>
                        </div>
                        <div className="who-orb">
                            <div className="ring ring-a" />
                            <div className="ring ring-b" />
                            <div className="ring ring-c" />
                        </div>
                        <ul className="who-points">
                            <li>Clinical triage protocols; crisis escalation pathways</li>
                            <li>Data privacy by design; consent-first experiences</li>
                            <li>Evidence-based content; licensed human review</li>
                        </ul>
                        <p className="kpi-foot">
                            Aligned with global best practices for digital mental health.
                        </p>
                    </motion.div>

                    <motion.div
                        className="vm-card partners"
                        {...fadeUp(0.4)}
                        whileHover={{ rotateX: -6, rotateY: -6, translateZ: 6 }}
                    >
                        <div className="partners-head">
                            <span className="kpi-dot" />
                            <span>Ecosystem & Partnerships</span>
                        </div>
                        <div className="partner-logos">
                            <div className="logo-chip spin">UN</div>
                            <div className="logo-chip">NGOs</div>
                            <div className="logo-chip">Hospitals</div>
                            <div className="logo-chip">Academia</div>
                            <div className="logo-chip">Gov</div>
                        </div>
                        <div className="partner-stats">
                            <div className="ps-row">
                                <span>Regions Onboarded</span>
                                <span className="ps-val ps-pulse">3</span>
                            </div>
                            <div className="ps-row">
                                <span>Therapist Network</span>
                                <span className="ps-val">40+</span>
                            </div>
                            <div className="ps-row">
                                <span>Programs Running</span>
                                <span className="ps-val">12</span>
                            </div>
                        </div>
                        <p className="kpi-foot">
                            Partner-first growth; governance, ethics, and transparency baked in.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* === COMMUNITY FORUMS === */}
            <section className="community-forums-section">
                <motion.div {...fadeUp()} className="forums-container">
                    <h3 className="forums-heading">🌍 Community Circles</h3>
                    <p className="forums-subtext">
                        <strong>Together, we heal louder.</strong> Join a circle that understands your story —
                        find community, voice, and belonging through shared experiences.
                    </p>

                    <div className="forum-grid">
                        {[
                            {
                                icon: "👩‍👧",
                                title: "Single Parents",
                                desc: "Where strength and tenderness meet — raising love, not just children.",
                                stats: "12.4K members",
                                color: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
                            },
                            {
                                icon: "🕊️",
                                title: "Widowed",
                                desc: "Gentle spaces to rebuild hope, one heartbeat at a time.",
                                stats: "7.9K members",
                                color: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
                            },
                            {
                                icon: "🌿",
                                title: "Elderly",
                                desc: "Dignity, wisdom, and laughter shared across generations.",
                                stats: "3.5K members",
                                color: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
                            },
                            {
                                icon: "🎧",
                                title: "Adolescents",
                                desc: "Voices growing, identities forming, balance finding its beat.",
                                stats: "9.2K members",
                                color: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
                            },
                            {
                                icon: "🔥",
                                title: "Youth",
                                desc: "Purpose meets pressure — let’s turn ambition into wellness.",
                                stats: "18.7K members",
                                color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
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
                                        <span>👥 {forum.stats}</span>
                                        <button
                                            className="join-btn"
                                            onClick={() => navigate("/login")}
                                        >
                                            Join Circle →
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Floating emojis in the background for vibe */}
                <div className="floating-emojis">
                    <span>💬</span>
                    <span>🌿</span>
                    <span>🫶</span>
                    <span>🔥</span>
                    <span>💛</span>
                </div>
            </section>

            <Footer />
        </main>
    );
}
