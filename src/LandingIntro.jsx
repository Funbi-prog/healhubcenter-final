// LandingIntro.jsx
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  RoundedBox,
  Environment,
  ContactShadows,
  Text,
} from "@react-three/drei";
import { useMemo, useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
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

/* Floating Camera reacts to "focus" (inView) for zoom-in/out feel */
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

/* Glass Plane */
function GlassPlane({ size = [2.2, 0.04, 0.9], position = [0, 0.77, 0] }) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshPhysicalMaterial
        color={colors.glass}
        transmission={0.92}
        roughness={0.12}
        thickness={0.18}
        clearcoat={1}
        metalness={0.05}
      />
    </mesh>
  );
}
/* Plants */
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

/* Gold Chandelier */
function GoldChandelier({ position = [0, 2.6, -0.1] }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) ref.current.rotation.z = Math.sin(t * 0.3) * 0.03;
  });

  return (
    <group position={position} ref={ref}>
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.5, 24]} />
        <meshStandardMaterial color={colors.gold} roughness={0.35} metalness={1} />
      </mesh>
      {[[-0.32, -0.48, 0], [0, -0.5, 0], [0.32, -0.48, 0]].map((p, i) => (
        <group key={i} position={p}>
          <mesh>
            <sphereGeometry args={[0.08, 24, 24]} />
            <meshStandardMaterial
              emissive="#FFE1B5"
              emissiveIntensity={0.55}
              color="#FFF9EE"
              roughness={0.25}
              metalness={0.05}
            />
          </mesh>
          <pointLight intensity={0.65} distance={4} decay={2} color="#FFE5B0" />
        </group>
      ))}
      <pointLight position={[0, -0.5, 0]} intensity={0.3} distance={5} color="#FFEAD1" />
    </group>
  );
}

/* Wall Sconces */
function WallSconces() {
  return (
    <group>
      {[-2.9, 2.9].map((x, i) => (
        <group key={i} position={[x, 1.6, -2.95]}>
          <mesh>
            <boxGeometry args={[0.18, 0.36, 0.06]} />
            <meshStandardMaterial color={colors.gold} metalness={1} roughness={0.35} />
          </mesh>
          <mesh position={[0, 0, 0.03]}>
            <boxGeometry args={[0.14, 0.28, 0.02]} />
            <meshStandardMaterial emissive="#FFF3DE" emissiveIntensity={0.45} color="#FFF8EF" />
          </mesh>
          <pointLight intensity={0.35} distance={2.2} color="#FFEFD9" />
        </group>
      ))}
    </group>
  );
}

/* Desk Decor — LEFT on glass */
function DeskDecorGlassLeft() {
  return (
    <group position={[-0.72, 0.8, 0.2]}>
      <group>
        <mesh>
          <cylinderGeometry args={[0.05, 0.05, 0.1, 16]} />
          <meshStandardMaterial color="#fff5e9" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.06, 0]}>
          <sphereGeometry args={[0.02, 12, 12]} />
          <meshStandardMaterial emissive="#FFD6A3" emissiveIntensity={0.75} color="#fff5e9" />
        </mesh>
        <pointLight intensity={0.55} distance={1.4} color="#FFE5B0" />
      </group>
      <group position={[0.18, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[0.04, 0.05, 0.12, 24]} />
          <meshPhysicalMaterial
            color="#D7E8E3"
            transparent
            opacity={0.4}
            roughness={0.2}
            transmission={0.8}
          />
        </mesh>
        {[...Array(3)].map((_, i) => (
          <mesh key={i} position={[Math.sin(i) * 0.01, 0.09, Math.cos(i) * 0.01]}>
            <boxGeometry args={[0.01, 0.25, 0.01]} />
            <meshStandardMaterial color="#4B3E33" />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* Desk Books — RIGHT on wood */
function DeskBooksRight() {
  return (
    <group position={[0.58, 0.56, 0.1]}>
      {[
        { c: "#A6C48A", s: [0.18, 0.03, 0.14] },
        { c: "#E9BEBE", s: [0.2, 0.03, 0.15] },
        { c: "#9DB7FF", s: [0.16, 0.03, 0.13] },
      ].map((b, i) => (
        <mesh key={i} position={[i * 0.045, i * 0.012, i * 0.04]}>
          <boxGeometry args={b.s} />
          <meshStandardMaterial color={b.c} roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

/* Sculptural Vases */
function VaseSet() {
  return (
    <group position={[3.7, 0, -1.6]}>
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.7, 28]} />
        <meshStandardMaterial color="#EFE9E3" roughness={0.6} />
      </mesh>
      <group position={[0, 0.75, 0]}>
        <mesh position={[-0.08, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.06, 0.2, 24]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.5} />
        </mesh>
        <mesh position={[0.08, 0.03, 0]} rotation={[0, 0, 0.2]}>
          <torusKnotGeometry args={[0.035, 0.01, 80, 12]} />
          <meshStandardMaterial color={colors.gold} metalness={1} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.06, -0.06]}>
          <sphereGeometry args={[0.045, 24, 24]} />
          <meshStandardMaterial color="#F7F2EE" roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
}

/* Monitor */
function Monitor({ position = [0.55, 0.82, 0.05] }) {
  return (
    <group position={position}>
      <RoundedBox args={[0.55, 0.32, 0.05]} radius={0.04} smoothness={6}>
        <meshStandardMaterial
          emissive={colors.monitorGlow}
          emissiveIntensity={0.35}
          color={colors.monitor}
        />
      </RoundedBox>
      <mesh position={[0, -0.25, -0.08]}>
        <boxGeometry args={[0.12, 0.22, 0.12]} />
        <meshStandardMaterial color="#D7D7D7" roughness={0.5} />
      </mesh>
    </group>
  );
}

/* Reception Desk */
function ReceptionDesk() {
  return (
    <group>
      <RoundedBox args={[2.2, 0.55, 0.84]} radius={0.08} smoothness={8} position={[0, 0.35, 0]}>
        <meshStandardMaterial color={colors.accent} metalness={0.25} roughness={0.45} />
      </RoundedBox>
      <mesh position={[0, 0.55, 0.44]}>
        <boxGeometry args={[2.1, 0.1, 0.06]} />
        <meshStandardMaterial color={colors.trim} roughness={0.3} />
      </mesh>
      <GlassPlane />
      <Monitor />
      <DeskDecorGlassLeft />
      <DeskBooksRight />
    </group>
  );
}

/* Wall Art */
function WallArt({ position = [1.8, 1.4, -2.99] }) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[1.1, 0.8, 0.04]} />
        <meshStandardMaterial color="#2A2A2A" metalness={0.3} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0, 0.025]}>
        <planeGeometry args={[1.0, 0.7]} />
        <meshStandardMaterial color="#8A6BBF" emissive="#FFB6C1" emissiveIntensity={0.28} />
      </mesh>
    </group>
  );
}

/* Wall TV */
function WallTV({ position = [-1.25, 1.18, -2.95] }) {
  const [i, setI] = useState(0);
  const quotes = [
    "Healing isn’t linear, but it’s always worth it.",
    "You’re not behind. You’re rebuilding.",
    "Rest is a form of progress.",
    "Small steps count, especially today.",
  ];
  useEffect(() => {
    const id = setInterval(() => setI((s) => (s + 1) % quotes.length), 7000);
    return () => clearInterval(id);
  }, []);
  return (
    <group position={position} scale={0.9}>
      <mesh>
        <boxGeometry args={[1.4, 0.85, 0.05]} />
        <meshStandardMaterial color={colors.tvOff} />
      </mesh>
      <mesh position={[0, 0, 0.03]}>
        <planeGeometry args={[1.3, 0.75]} />
        <meshStandardMaterial emissive={colors.tvGlow} emissiveIntensity={0.72} />
      </mesh>
      <Text
        position={[0, 0, 0.04]}
        fontSize={0.08}
        color="#BFE3FF"
        maxWidth={1.1}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        {quotes[i]}
      </Text>
    </group>
  );
}

/* Room Shell */
function RoomShell() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color={colors.floor} roughness={0.9} />
      </mesh>

      <mesh position={[0, 1.5, -3]}>
        <planeGeometry args={[10, 3]} />
        <meshStandardMaterial color={colors.wall} />
      </mesh>

      <mesh rotation={[0, Math.PI / 2, 0]} position={[-5, 1.5, 0]}>
        <planeGeometry args={[10, 3]} />
        <meshStandardMaterial color={colors.wall} />
      </mesh>

      <mesh rotation={[0, -Math.PI / 2, 0]} position={[5, 1.5, 0]}>
        <planeGeometry args={[10, 3]} />
        <meshStandardMaterial color={colors.wall} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0.2]}>
        <circleGeometry args={[1.6, 48]} />
        <meshStandardMaterial color={colors.rug} roughness={0.9} />
      </mesh>

      <mesh position={[0, 3, -3]}>
        <boxGeometry args={[10, 0.02, 0.02]} />
        <meshStandardMaterial color={colors.brass} metalness={1} roughness={0.4} />
      </mesh>

      <group position={[0, 2.2, -2.95]}>
        <RoundedBox args={[3.0, 0.6, 0.04]} radius={0.06}>
          <meshPhysicalMaterial color={colors.plaque} roughness={0.3} metalness={0.1} clearcoat={1} />
        </RoundedBox>
        <Text
          position={[0, 0, 0.035]}
          fontSize={0.32}
          color={colors.sign}
          anchorX="center"
          anchorY="middle"
          depth={0.08}
        >
          HEALHUBCENTER
        </Text>
      </group>

      <WallSconces />
      <WallTV />
      <WallArt />
      <VaseSet />
    </group>
  );
}
/* -----------------------------
   Dialogue + Page
------------------------------*/
export default function LandingIntro() {
  const { ref: containerRef, inView } = useInView({ threshold: 0.35 });
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState("");
  const [finalMsg, setFinalMsg] = useState("");

  const flow = [
    { text: "Welcome to HealHub Center.", next: 1 },
    { text: "I’m Bimpe — your digital wellness companion.", next: 2 },
    { text: "How are you feeling today?", options: ["I'm good", "I'm okay", "Not great"] },
  ];

  const responses = {
    "I'm good": {
      text: "That’s wonderful! Would you like to get started or look around?",
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
        navigate("/auth");
        break;
      case "Join roundtable":
        smoothScrollTo("#roundtable");
        break;
      case "Not now":
        setFinalMsg("Alright — I’ll be right here when you’re ready.");
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
      {/* 🪞 Smooth zoom / fade */}
      <motion.div
        initial={{ opacity: 0.0, scale: 0.98 }}
        animate={{ opacity: inView ? 1 : 0.6, scale: inView ? 1 : 0.97 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ position: "absolute", inset: 0 }}
      >
        {/* ✅ Resilient mobile Canvas mount */}
        {(() => {
          const isMobile =
            typeof navigator !== "undefined" &&
            /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

          if (typeof window === "undefined" || typeof document === "undefined") return null;

          try {
            const canvas = document.createElement("canvas");
            const gl =
              canvas.getContext("webgl", { failIfMajorPerformanceCaveat: false }) ||
              canvas.getContext("experimental-webgl");
            if (!gl) throw new Error("WebGL not supported");

            return (
              <Canvas
                shadows={!isMobile}
                dpr={[1, isMobile ? 1.2 : 2]}
                frameloop={isMobile ? "demand" : "always"}
                gl={{
                  antialias: !isMobile,
                  alpha: true,
                  powerPreference: "high-performance",
                  preserveDrawingBuffer: false,
                }}
                camera={{ position: [2.2, 1.25, 3.8], fov: 45 }}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
              >
                <color attach="background" args={["#FFFDFE"]} />
                <fog attach="fog" args={["#FFF7FB", 8, 22]} />

                <hemisphereLight
                  intensity={0.9}
                  groundColor="#F5EFE6"
                  skyColor="#FFFFFF"
                />
                <directionalLight
                  name="breatheLight"
                  position={[4, 5, 3]}
                  intensity={isMobile ? 0.8 : 1}
                  color="#FFEBD2"
                  castShadow={!isMobile}
                />
                <Environment preset="city" />

                <group>
                  <RoomShell />
                  <ReceptionDesk />
                  <GoldChandelier position={[0.1, 2.6, -0.1]} />
                  <Plant position={[-2.4, 0, -2.4]} />
                  <Plant position={[2.6, 0, -2.5]} />
                  <BimpeModel position={[0, -0.47, -0.35]} scale={1.05} rotation={[0, Math.PI, 0]} />
                  <Atmosphere />
                </group>

                <ContactShadows
                  position={[0, 0.01, 0]}
                  opacity={isMobile ? 0.15 : 0.25}
                  scale={10}
                  blur={2.4}
                  far={4}
                />
                <FloatingCamera focus={inView} />
              </Canvas>
            );
          } catch {
            return null;
          }
        })()}
      </motion.div>

      {/* 💬 Dialogue Bubble */}
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
              transform: "translate(-10%,0)",
              background:
                "linear-gradient(135deg,rgba(255,255,255,0.95),rgba(245,240,250,0.92))",
              borderRadius: "14px 14px 14px 6px",
              padding: "0.9rem 1.1rem",
              maxWidth: 300,
              fontSize: "0.95rem",
              color: "#111",
              boxShadow: "0 10px 24px rgba(0,0,0,0.10)",
              backdropFilter: "blur(8px)",
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
                      transition: "0.25s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#111";
                      e.currentTarget.style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#F8F8F8";
                      e.currentTarget.style.color = "#111";
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            <span
              style={{
                position: "absolute",
                left: "10px",
                bottom: "-6px",
                width: 0,
                height: 0,
                borderLeft: "8px solid transparent",
                borderRight: "8px solid transparent",
                borderTop: "8px solid rgba(255,255,255,0.92)",
                filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.08))",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🕊 Soft final message */}
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
              transform: "translate(-10%,0)",
              background:
                "linear-gradient(135deg,rgba(255,255,255,0.95),rgba(245,240,250,0.92))",
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
