// src/App.jsx
import React, { lazy, Suspense } from "react";
// import LandingIntro from "./LandingIntro.jsx";
import Sections from "./Sections.jsx";
import "./index.css";
import Footer from "./Footer.jsx";
import { TypeAnimation } from "react-type-animation";
import { motion as Motion } from "framer-motion";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import RequireAuth from "./auth/RequireAuth.jsx";

// === GLOBAL COMPONENTS (always needed, eager-load) ===
import Navbar from "./components/Navbar.jsx";
import ScrollToTopButton from "./components/ScrollToTopButton.jsx";

// === LAZY-LOADED ROUTES (split into separate chunks) ===
const AuthPage = lazy(() => import("./auth/AuthPage.jsx"));
const LoginPage = lazy(() => import("./auth/LoginPage.jsx"));
const SignupPage = lazy(() => import("./auth/SignupPage.jsx"));
const AuthHelp = lazy(() => import("./auth/AuthHelp.jsx"));
const RoundtablePage = lazy(() => import("./roundtable/RoundtablePage.jsx"));
const ChatPage = lazy(() => import("./chat/ChatPage.jsx"));
const FiresideChat = lazy(() => import("./fireside/FiresideChat.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const HealHubDashboard = lazy(() => import("./dashboard/HealHubDashboard.jsx"));
const CheckInPage = lazy(() => import("./dashboard/pages/CheckInPage.jsx"));
const LibraryPage = lazy(() => import("./dashboard/pages/LibraryPage.jsx"));
const GamesPage = lazy(() => import("./dashboard/pages/GamesPage.jsx"));
const InsightsPage = lazy(() => import("./dashboard/pages/InsightsPage.jsx"));
const SettingsPage = lazy(() => import("./dashboard/pages/SettingsPage.jsx"));
const BlogPage = lazy(() => import("./dashboard/pages/BlogPage.jsx"));
const ConnectPage = lazy(() => import("./dashboard/pages/ConnectPage.jsx"));
const WorkshopPage = lazy(() => import("./dashboard/pages/WorkshopPage.jsx"));

// === PAGE LOADING FALLBACK ===
function PageLoader() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          border: "3px solid #0EA5E9",
          borderTopColor: "transparent",
          borderRadius: "50%",
          animation: "spin 0.7s linear infinite",
        }}
      />
    </div>
  );
}

// === PLACEHOLDER ===
function PlaceholderPage({ title }) {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h2 style={{ fontSize: "2rem", marginBottom: "1rem", color: "#222" }}>
        {title} Page — Coming Soon
      </h2>
      <p style={{ maxWidth: "500px", color: "#555", lineHeight: 1.6 }}>
        We're crafting something wonderful here. Check back soon to explore{" "}
        {title.toLowerCase()} insights and updates from HealHub Center.
      </p>
    </div>
  );
}

// === HOMEPAGE ===
function HomePage() {
  const navigate = useNavigate();
  const hour = new Date().getHours();
  let greeting = "Welcome back";

  if (hour < 12) greeting = "Good morning";
  else if (hour < 18) greeting = "Good afternoon";
  else greeting = "Good evening";

  return (
    <div className="app-container">
      <section className="hero-layout modern-layout">
        <div className="hero-content modern-content">
          <Motion.h2
            className="hero-greeting"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {greeting}, let's make today lighter.
          </Motion.h2>

          <Motion.h1
            className="hero-title modern-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <TypeAnimation
              sequence={[
                "Wellness that meets you where you are.",
                2500,
                "Heal better. Feel supported. Live lighter.",
                2500,
                "Your digital wellness companion for real change.",
                2500,
                "Where care, calm, and connection meet.",
                3000,
              ]}
              wrapper="span"
              cursor={true}
              repeat={Infinity}
              speed={45}
            />
          </Motion.h1>

          <Motion.p
            className="hero-subtext modern-subtext"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            HealHub Center connects you to <strong>real therapists</strong>,{" "}
            <strong>supportive communities</strong>, and{" "}
            <strong>AI-driven care</strong> designed for today's world.
            <br />
            Whether you're healing, learning, or simply being —{" "}
            <span style={{ color: "#0EA5E9" }}>we're here for you.</span>
          </Motion.p>

          <Motion.div
            className="hero-buttons modern-buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <button
              className="primary-btn black-btn gradient-btn"
              onClick={() => navigate("/login")}
            >
              Discover HealHub Center
            </button>
          </Motion.div>
        </div>

        <div className="hero-office modern-office">
          {/* <LandingIntro /> */}
        </div>
      </section>

      <Sections />
      <Footer />
    </div>
  );
}

// === MAIN ROUTER ===
export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToTopButton />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* === MAIN === */}
          <Route path="/" element={<HomePage />} />

          {/* === AUTH === */}
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/help" element={<AuthHelp />} />

          {/* === FEATURES === */}
          <Route
            path="/chat"
            element={
              <RequireAuth>
                <ChatPage />
              </RequireAuth>
            }
          />
          <Route
            path="/roundtable"
            element={
              <RequireAuth>
                <RoundtablePage />
              </RequireAuth>
            }
          />
          <Route
            path="/fireside/:id"
            element={
              <RequireAuth>
                <FiresideChat />
              </RequireAuth>
            }
          />

          {/* === INFORMATION === */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* === DASHBOARD (FULL NAVIGATION) === */}
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <HealHubDashboard />
              </RequireAuth>
            }
          />

          <Route
            path="/dashboard/checkin"
            element={
              <RequireAuth>
                <CheckInPage />
              </RequireAuth>
            }
          />
          <Route
            path="/dashboard/library"
            element={
              <RequireAuth>
                <LibraryPage />
              </RequireAuth>
            }
          />
          <Route
            path="/dashboard/games"
            element={
              <RequireAuth>
                <GamesPage />
              </RequireAuth>
            }
          />
          <Route
            path="/dashboard/insights"
            element={
              <RequireAuth>
                <InsightsPage />
              </RequireAuth>
            }
          />
          <Route
            path="/dashboard/settings"
            element={
              <RequireAuth>
                <SettingsPage />
              </RequireAuth>
            }
          />
          <Route
            path="/dashboard/blog"
            element={
              <RequireAuth>
                <BlogPage />
              </RequireAuth>
            }
          />

          {/* === NEW FEATURES YOU ADDED === */}
          <Route
            path="/dashboard/connect"
            element={
              <RequireAuth>
                <ConnectPage />
              </RequireAuth>
            }
          />
          <Route
            path="/dashboard/workshops"
            element={
              <RequireAuth>
                <WorkshopPage />
              </RequireAuth>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
