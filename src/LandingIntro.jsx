// LandingIntro.jsx
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  RoundedBox,
  Environment,
  ContactShadows,
  Text,
  Html,
} from "@react-three/drei";
import { Suspense, useMemo, useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import BimpeModel from "./BimpeModel";
import Atmosphere from "./Atmosphere";

/* ✨ Soft Gold Wellness Palette */
const colors = {
  wall: "#FBF9F5",
  floor: "#FDFCFB",
  accent: "#CDBA96",
  trim: "#EDE6DD",
  plaque: "#FFFFFF",
  sign: "#111111",
  gold: "#D4AF37",
  brass: "#B89F65",
  glass: "#FFFFFF",
  rug: "#F2EEE9",
  monitor: "#16263A",
  monitorGlow: "#3A4E66",
  plantLeaf: "#9BCBA8",
  plantLeaf2: "#B8E0C1",
  plantPot: "#D7C2A3",
  tvOff: "#0A0A0A",
  tvGlow: "#1B2A3A",
};

/* -----------------------------
   Utilities
------------------------------*/
const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

const smoothScrollTo = (id) => {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

function useInView(options = { threshold: 0.35 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(true);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      options
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [options.threshold]);
  return { ref, inView };
}

/* -----------------------------
   Scene Bits
------------------------------*/
function FloatingCamera({ basePosition = [0, 1.25, 3.8], focus = true }) {
  const { camera, scene } = useThree();
  const t = useRef(0);

  useFrame((_, delta) => {
    t.current += delta * 0.25;
    const targetZ = focus ? basePosition[2] : basePosition[2] + 0.9;
    const targetY = focus ? basePosition[1] : basePosition[1] - 0.1;

    const offsetY = Math.sin(t.current * 1.0) * 0.02;
    const offsetX = Math.sin(t.current * 0.5) * 0.012;

    const target = new THREE.Vector3(
      basePosition[0] + offsetX,
      targetY + offsetY,
      targetZ
    );
    camera.position.lerp(target, 0.06);
    camera.lookAt(0, 1, 0);

    const light = scene.getObjectByName("breatheLight");
    if (light) {
      const base = focus ? 1 : 0.8;
      light.intensity = base + Math.sin(t.current * 1.2) * 0.02;
    }
  });
  return null;
}

function GlassPlane({ size = [2.2, 0.04, 0.9], position = [0, 0.77, 0] }) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      {isMobile ? (
        <meshStandardMaterial
          color={colors.glass}
          roughness={0.25}
          metalness={0.1}
        />
      ) : (
        <meshPhysicalMaterial
          color={colors.glass}
          transmission={0.92}
          roughness={0.12}
          thickness={0.18}
          clearcoat={1}
          metalness={0.05}
        />
      )}
    </mesh>
  );
}

function Plant({ position = [-1.6, 0, -2.2] }) {
  const leaves = useMemo(
    () => [
      { p: [0, 0.55, 0], r: 0.28 },
      { p: [0.22, 0.72, 0.05], r: 0.24 },
      { p: [-0.22, 0.7, 0.02], r: 0.22 },
      { p: [0.05, 0.9, -0.08], r: 0.2 },
    ],
    []
  );
  return (
    <group position={position}>
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.18, 0.22, 0.35, 24]} />
        <meshStandardMaterial color={colors.plantPot} roughness={0.5} />
      </mesh>
      {leaves.map((leaf, i) => (
        <mesh key={i} position={leaf.p}>
          <sphereGeometry args={[leaf.r, 24, 24]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? colors.plantLeaf : colors.plantLeaf2}
            roughness={0.35}
          />
        </mesh>
      ))}
    </group>
  );
}

/* Room Shell */
function RoomShell() {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color={colors.floor} roughness={0.9} />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 1.5, -3]}>
        <planeGeometry args={[10, 3]} />
        <meshStandardMaterial color={colors.wall} />
      </mesh>

      {/* Side Walls */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-5, 1.5, 0]}>
        <planeGeometry args={[10, 3]} />
        <meshStandardMaterial color={colors.wall} />
      </mesh>
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[5, 1.5, 0]}>
        <planeGeometry args={[10, 3]} />
        <meshStandardMaterial color={colors.wall} />
      </mesh>
    </group>
  );
}

/* -----------------------------
   Dialogue + Page
------------------------------*/
export default function LandingIntro() {
  const { ref: containerRef, inView } = useInView({ threshold: 0.35 });
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState("");
  const [finalMsg, setFinalMsg] = useState("");

  const flow = [
    { text: "Welcome to HealHub Center.", next: 1 },
    { text: "I’m Bimpe — your digital wellness companion.", next: 2 },
    {
      text: "How are you feeling today?",
      options: ["I'm good", "I'm okay", "Not great"],
    },
  ];

  const responses = {
    "I'm good": {
      text: "That's wonderful! Would you like to get started or look around?",
      options: ["Get started", "Look around"],
    },
    "I'm okay": {
      text: "Let’s ease into today. Would you like a brief tour?",
      options: ["Yes", "Not now"],
    },
    "Not great": {
      text: "I’m here for you. Would you like to chat with me or join a roundtable?",
      options: ["Chat with Bimpe", "Join roundtable"],
    },
  };

  useEffect(() => {
    if (step < 2) {
      const id = setTimeout(() => setStep((s) => s + 1), 3500);
      return () => clearTimeout(id);
    }
  }, [step]);

  const handleSelect = (option) => {
    setSelected(option);
    switch (option) {
      case "Get started":
        smoothScrollTo("#login");
        break;
      case "Look around":
      case "Yes":
        smoothScrollTo("#overview");
        break;
      case "Chat with Bimpe":
        smoothScrollTo("#bimpeai");
        break;
      case "Join roundtable":
        smoothScrollTo("#roundtable");
        break;
      case "Not now":
        setFinalMsg("Alright. I’ll be right here when you’re ready.");
        setTimeout(() => setFinalMsg(""), 3000);
        break;
      default:
        break;
    }
  };

  const currentDialogue =
    selected && responses[selected] ? responses[selected] : flow[step];

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <motion.div
        initial={{ opacity: 0.0, scale: 0.98 }}
        animate={{ opacity: inView ? 1 : 0.6, scale: inView ? 1 : 0.97 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ position: "absolute", inset: 0 }}
      >
        {/* ✅ 3D Canvas (Optimized for iOS + Android) */}
        <Suspense
          fallback={
            <Html center style={{ color: "#444", fontSize: "1rem" }}>
              Loading 3D Reception...
            </Html>
          }
        >
          <Canvas
            shadows={!isMobile}
            dpr={[1, isMobile ? 1.1 : 2]}
            gl={{
              antialias: !isMobile,
              powerPreference: "high-performance",
              preserveDrawingBuffer: false,
              alpha: true,
              context: "webgl",
            }}
            camera={{
              position: [2.2, 1.25, isMobile ? 4.6 : 3.8],
              fov: isMobile ? 50 : 45,
            }}
            style={{ width: "100%", height: "100%", position: "absolute" }}
          >
            <color attach="background" args={["#FFFDFE"]} />
            <hemisphereLight
              intensity={0.8}
              groundColor="#F5EFE6"
              skyColor="#FFFFFF"
            />
            <directionalLight
              name="breatheLight"
              position={[4, 5, 3]}
              intensity={isMobile ? 0.7 : 1}
              color="#FFEBD2"
            />
            {!isMobile && <Environment preset="city" />}
            <RoomShell />
            <Plant position={[-2.4, 0, -2.4]} />
            <Plant position={[2.6, 0, -2.5]} />
            <BimpeModel
              position={[0, -0.47, -0.35]}
              scale={1.05}
              rotation={[0, Math.PI, 0]}
            />
            <Atmosphere />
            <ContactShadows
              position={[0, 0.01, 0]}
              opacity={isMobile ? 0.12 : 0.25}
              scale={10}
              blur={2.2}
              far={4}
            />
            <FloatingCamera focus={inView} />
          </Canvas>
        </Suspense>
        {/* Static fallback for ultra-low GPUs */}
        <img
          src="/bimpe-static.jpg"
          alt="HealHub Reception"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "none",
          }}
          onError={(e) => (e.target.style.display = "none")}
        />
      </motion.div>

      {/* Dialogue Section */}
      <AnimatePresence mode="wait">
        {!finalMsg && (
          <motion.div
            key={currentDialogue.text}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5 }}
            style={{
              position: "absolute",
              bottom: "12%",
              left: "16%",
              transform: "translate(-10%, 0)",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(245,240,250,0.92))",
              borderRadius: "14px 14px 14px 6px",
              padding: "0.9rem 1.1rem",
              maxWidth: 300,
              fontSize: "0.95rem",
              color: "#111",
              boxShadow: "0 10px 24px rgba(0,0,0,0.10)",
              border: "1px solid rgba(0,0,0,0.06)",
              zIndex: 3,
            }}
          >
            <p style={{ margin: 0 }}>{currentDialogue.text}</p>
            {currentDialogue.options && (
              <div style={{ marginTop: "0.6rem" }}>
                {currentDialogue.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelect(opt)}
                    style={{
                      display: "block",
                      width: "100%",
                      border: "1px solid #111",
                      background: "#F8F8F8",
                      borderRadius: 8,
                      padding: "0.5rem 0.6rem",
                      marginTop: "0.4rem",
                      cursor: "pointer",
                      fontSize: "0.88rem",
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Soft closing line */}
      <AnimatePresence>
        {finalMsg && (
          <motion.div
            key="final-line"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5 }}
            style={{
              position: "absolute",
              bottom: "12%",
              left: "16%",
              transform: "translate(-10%, 0)",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(245,240,250,0.92))",
              borderRadius: 12,
              padding: "0.7rem 1rem",
              maxWidth: 300,
              fontSize: "0.92rem",
              color: "#111",
              boxShadow: "0 10px 24px rgba(0,0,0,0.10)",
              border: "1px solid rgba(0,0,0,0.06)",
              zIndex: 3,
            }}
          >
            {finalMsg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
