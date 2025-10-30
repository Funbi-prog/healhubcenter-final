import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  RoundedBox,
  Environment,
  ContactShadows,
  Text,
} from "@react-three/drei";
import { useMemo, useState, useEffect, useRef } from "react";
import BimpeModel from "./BimpeModel";
import Atmosphere from "./Atmosphere";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

/* 🎨 Refined Warm Palette */
const colors = {
  wall: "#F9F7F3",
  floor: "#FBF9F4",
  accent: "#CDBA96",
  glass: "#FFFFFF",
  monitorGlow: "#BDBDBD",
  plantLeaf: "#8FBF9E",
  plantLeaf2: "#A8D5C0",
  plantPot: "#C9B28D",
  rug: "#F0EAF4",
  trim: "#EAE2FF",
  sign: "#111111",
};

/* Utils */
const smoothScrollTo = (id) => {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  else console.warn(`Anchor ${id} not found`);
};

/* 🌿 Glass Plane */
function GlassPlane({ size = [2.2, 0.04, 0.9], position = [0, 0.77, 0] }) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshPhysicalMaterial
        color={colors.glass}
        transmission={0.9}
        roughness={0.1}
        thickness={0.15}
        clearcoat={1}
        metalness={0.1}
      />
    </mesh>
  );
}

/* 🪴 Plant */
function Plant({ position = [-2.2, 0, -2.4] }) {
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

/* 🖥️ Monitor */
function Monitor({ position = [0.55, 0.82, 0.05] }) {
  return (
    <group position={position}>
      <RoundedBox args={[0.55, 0.32, 0.05]} radius={0.04} smoothness={6}>
        <meshStandardMaterial emissive={colors.monitorGlow} emissiveIntensity={0.35} />
      </RoundedBox>
      <mesh position={[0, -0.25, -0.08]}>
        <boxGeometry args={[0.12, 0.22, 0.12]} />
        <meshStandardMaterial color="#D7D7D7" roughness={0.5} />
      </mesh>
    </group>
  );
}

/* 🪑 Desk Accessories (journals, books, pen cup, tiny plant, diffuser) */
function DeskAccessories() {
  return (
    <group>
      {/* Journals stack */}
      <mesh position={[-0.35, 0.6, 0.28]}>
        <boxGeometry args={[0.22, 0.03, 0.16]} />
        <meshStandardMaterial color="#9DB7FF" roughness={0.6} />
      </mesh>
      <mesh position={[-0.35, 0.63, 0.28]}>
        <boxGeometry args={[0.22, 0.03, 0.16]} />
        <meshStandardMaterial color="#FFC6A3" roughness={0.6} />
      </mesh>

      {/* Colorful books upright */}
      {[0,1,2].map((i)=>(
        <mesh key={i} position={[-0.05 + i*0.07, 0.62, 0.32]} rotation={[0, 0, Math.PI*0.02*i]}>
          <boxGeometry args={[0.06, 0.12 + i*0.015, 0.02]} />
          <meshStandardMaterial color={["#A8D5C0","#E6D8FF","#FDE68A"][i]} roughness={0.6}/>
        </mesh>
      ))}

      {/* Pen holder */}
      <group position={[0.28, 0.61, 0.25]}>
        <mesh>
          <cylinderGeometry args={[0.03, 0.03, 0.07, 24]} />
          <meshStandardMaterial color="#3C3C3C" roughness={0.4} metalness={0.2} />
        </mesh>
        {/* pens */}
        {[0,1,2].map(i=>(
          <mesh key={i} position={[Math.sin(i)*0.01, 0.04, Math.cos(i)*0.01]} rotation={[0,0,(i-1)*0.2]}>
            <boxGeometry args={[0.005, 0.09, 0.005]} />
            <meshStandardMaterial color={["#111","#555","#0F4C81"][i]} />
          </mesh>
        ))}
      </group>

      {/* Tiny succulent */}
      <group position={[0.12, 0.60, 0.18]}>
        <mesh>
          <cylinderGeometry args={[0.035, 0.04, 0.035, 18]} />
          <meshStandardMaterial color="#EDEDED" roughness={0.6} />
        </mesh>
        {[0,1,2,3,4].map(i=>(
          <mesh key={i} position={[Math.sin(i)*0.03, 0.04, Math.cos(i)*0.03]}>
            <coneGeometry args={[0.02, 0.05, 12]} />
            <meshStandardMaterial color="#7FB28E" roughness={0.4}/>
          </mesh>
        ))}
      </group>

      {/* Diffuser glow */}
      <mesh position={[-0.7, 0.6, 0.3]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial emissive="#FFD9B5" emissiveIntensity={0.6} color="#fff2e5" />
      </mesh>
    </group>
  );
}

/* 🪑 Reception Desk */
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
      <DeskAccessories />
    </group>
  );
}

/* ✨ Pendant Chandelier + Wall Sconces */
function AmbientLights() {
  return (
    <group>
      {/* Pendant */}
      <group position={[0, 2.7, -0.1]}>
        <mesh>
          <sphereGeometry args={[0.12, 24, 24]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.2} metalness={0.0} />
        </mesh>
        <pointLight intensity={0.6} distance={5} color="#FFE6CC" />
      </group>
      {/* Sconces */}
      {[-2.7, 2.7].map((x, i) => (
        <group key={i} position={[x, 1.7, -2.95]}>
          <mesh>
            <boxGeometry args={[0.18, 0.35, 0.06]} />
            <meshStandardMaterial emissive="#FFF5E6" emissiveIntensity={0.4} color="#333" />
          </mesh>
          <pointLight intensity={0.35} distance={2} color="#FFEAD1" />
        </group>
      ))}
    </group>
  );
}

/* 🖼️ Wall Art (lowered a bit to clear AC space) */
function FramedArt({ position = [1.8, 1.35, -2.99] }) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[1.1, 0.8, 0.04]} />
        <meshStandardMaterial color="#2b2b2b" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0, 0.025]}>
        <planeGeometry args={[1.0, 0.7]} />
        <meshStandardMaterial color="#E6D8FF" />
      </mesh>
      <mesh position={[-0.25, 0.15, 0.03]}>
        <planeGeometry args={[0.35, 0.2]} />
        <meshStandardMaterial color="#CDBA96" />
      </mesh>
      <mesh position={[0.2, -0.1, 0.03]}>
        <planeGeometry args={[0.3, 0.25]} />
        <meshStandardMaterial color="#A8D5C0" />
      </mesh>
    </group>
  );
}

/* 🧱 Room Shell + Sign + TV */
function RoomShell() {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color={colors.floor} roughness={0.9} />
      </mesh>

      {/* Walls */}
      <mesh position={[0, 1.5, -3]}>
        <planeGeometry args={[10, 3]} />
        <meshStandardMaterial color={colors.wall} roughness={0.85} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-5, 1.5, 0]}>
        <planeGeometry args={[10, 3]} />
        <meshStandardMaterial color={colors.wall} roughness={0.85} />
      </mesh>
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[5, 1.5, 0]}>
        <planeGeometry args={[10, 3]} />
        <meshStandardMaterial color={colors.wall} roughness={0.85} />
      </mesh>

      {/* Rug */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0.2]}>
        <circleGeometry args={[1.6, 48]} />
        <meshStandardMaterial color={colors.rug} roughness={0.9} />
      </mesh>

      {/* Bold Sign */}
      <Text position={[0, 2.35, -2.98]} fontSize={0.4} color={colors.sign} anchorX="center" anchorY="middle" depth={0.12}>
        HEALHUBCENTER
      </Text>

      {/* Matte-black Wall TV with subtle sheen + thin frame */}
      <group position={[-1.5, 1.2, -2.98]}>
        <mesh>
          <planeGeometry args={[1.4, 0.8]} />
          <meshStandardMaterial color="#0E0E10" metalness={0.55} roughness={0.45} />
        </mesh>
        <mesh position={[0, 0, -0.01]}>
          <ringGeometry args={[0.72, 0.71, 4]} />
          <meshStandardMaterial color="#111" />
        </mesh>
      </group>
    </group>
  );
}

/* 🎥 Floating Camera */
function FloatingCamera({ basePosition = [0, 1.25, 3.8] }) {
  const { camera, scene } = useThree();
  const t = useRef(0);
  useFrame((_, delta) => {
    t.current += delta * 0.3;
    const offsetY = Math.sin(t.current) * 0.02;
    const offsetX = Math.sin(t.current * 0.5) * 0.012;
    camera.position.lerp(
      new THREE.Vector3(basePosition[0] + offsetX, basePosition[1] + offsetY, basePosition[2]),
      0.04
    );
    camera.lookAt(0, 1, 0);
    const light = scene.getObjectByName("breatheLight");
    if (light) light.intensity = 1 + Math.sin(t.current * 1.2) * 0.02;
  });
  return null;
}

/* 🌸 Main */
export default function LandingIntro() {
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
      text: "That's wonderful! Would you like to get started or look around?",
      options: ["Get started", "Look around"],
    },
    "I'm okay": {
      text: "Let's ease into today. Would you like a brief tour?",
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

    // Navigation & UX branching (premium)
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

  const currentDialogue = selected && responses[selected] ? responses[selected] : flow[step];

  return (
    <div
      className="scene-wrapper"
      style={{ position: "relative", width: "100%", height: "100vh" }}
    >
      <Canvas
        shadows
        camera={{ position: [2.2, 1.25, 3.8], fov: 45 }}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <color attach="background" args={["#FFFDFE"]} />
        <fog attach="fog" args={["#FFF7FB", 8, 22]} />
        <hemisphereLight intensity={0.9} groundColor="#F9F5EF" skyColor="#FFFFFF" />
        <directionalLight name="breatheLight" position={[4, 5, 3]} intensity={1} color="#FFEBD2" castShadow />
        <Environment preset="city" />

        <group>
          <RoomShell />
          <AmbientLights />
          <ReceptionDesk />
          <FramedArt />
          <BimpeModel position={[0, -0.47, -0.35]} scale={1.05} rotation={[0, Math.PI, 0]} />
          <Atmosphere />
          <Plant position={[-2.4, 0, -2.4]} />
          <Plant position={[2.6, 0, -2.5]} />
        </group>

        <ContactShadows position={[0, 0.01, 0]} opacity={0.25} scale={10} blur={2.4} far={4} />
        <FloatingCamera />
      </Canvas>

      {/* 💬 Interactive Chat Bubble (moved to LEFT side so it doesn't overlap the monitor) */}
      <AnimatePresence mode="wait">
        {!finalMsg && (
          <motion.div
            key={currentDialogue.text}
            style={{
              position: "absolute",
              bottom: "46%",
              left: "38%",
              transform: "translate(-50%, 50%)",
              background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(245,240,250,0.9))",
              borderRadius: "14px 14px 14px 6px",
              padding: "0.8rem 1.1rem",
              maxWidth: 260,
              fontSize: "0.95rem",
              color: "#111",
              boxShadow: "0 10px 24px rgba(0,0,0,0.10)",
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.6 }}
          >
            <p style={{ margin: 0 }}>{currentDialogue.text}</p>
            {currentDialogue.options && (
              <div style={{ marginTop: "0.5rem" }}>
                {currentDialogue.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelect(opt)}
                    style={{
                      display: "block",
                      width: "100%",
                      border: "none",
                      background: "#F3F3F3",
                      borderRadius: 6,
                      padding: "0.45rem",
                      marginTop: "0.35rem",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      transition: "0.25s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#111";
                      e.currentTarget.style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#F3F3F3";
                      e.currentTarget.style.color = "#111";
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
            {/* little nub */}
            <span
              style={{
                position: "absolute",
                left: "8px",
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

      {/* Premium “Not now” line — soft, then fade away */}
      <AnimatePresence>
        {finalMsg && (
          <motion.div
            key="final-line"
            style={{
              position: "absolute",
              bottom: "46%",
              left: "38%",
              transform: "translate(-50%, 50%)",
              background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(245,240,250,0.9))",
              borderRadius: 12,
              padding: "0.7rem 1rem",
              maxWidth: 280,
              fontSize: "0.92rem",
              color: "#111",
              boxShadow: "0 10px 24px rgba(0,0,0,0.10)",
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.6 }}
          >
            {finalMsg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
