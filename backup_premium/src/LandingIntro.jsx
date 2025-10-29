import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  RoundedBox,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import { useMemo, useState, useEffect } from "react";
import { WallClock, WallArt, Shelf } from "./OfficeDecor";
import BimpeModel from "./BimpeModel";
import Atmosphere from "./Atmosphere";
import * as THREE from "three";

/* 🎨 Palette (soft, modern, wellness) */
const colors = {
  wall: "#F5F2FC",
  floor: "#FBF9F4",
  accent: "#CDBA96",
  glass: "#FFFFFF",
  monitorGlow: "#BDBDBD",
  plantLeaf: "#8FBF9E",
  plantLeaf2: "#A8D5C0",
  plantPot: "#C9B28D",
  rug: "#F3EAF7",
  trim: "#EAE2FF",
};

/* 🌿 Glass Plane */
function GlassPlane({ size = [2.2, 0.04, 0.9], position = [0, 0.9, 0] }) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshPhysicalMaterial
        color={colors.glass}
        transmission={0.9}
        roughness={0.08}
        thickness={0.15}
        clearcoat={1}
        metalness={0.1}
      />
    </mesh>
  );
}

/* 🪴 Plant */
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

/* 🖥️ Monitor */
function Monitor({ position = [0.55, 0.82, 0.05] }) {
  return (
    <group position={position}>
      <RoundedBox args={[0.55, 0.32, 0.05]} radius={0.04} smoothness={6}>
        <meshStandardMaterial
          emissive={colors.monitorGlow}
          emissiveIntensity={0.35}
        />
      </RoundedBox>
      <mesh position={[0, -0.25, -0.08]}>
        <boxGeometry args={[0.12, 0.22, 0.12]} />
        <meshStandardMaterial color="#D7D7D7" roughness={0.5} />
      </mesh>
    </group>
  );
}

/* 🪑 Reception Desk + Chair */
function ReceptionDesk() {
  return (
    <group>
      {/* Desk Base */}
      <RoundedBox
        args={[2.2, 0.55, 0.84]}
        radius={0.08}
        smoothness={8}
        position={[0, 0.35, 0]}
      >
        <meshStandardMaterial
          color={colors.accent}
          metalness={0.25}
          roughness={0.45}
        />
      </RoundedBox>

      {/* Desk Trim */}
      <mesh position={[0, 0.55, 0.44]}>
        <boxGeometry args={[2.1, 0.1, 0.06]} />
        <meshStandardMaterial
          color={colors.trim}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* Glass Top + Monitor */}
      <GlassPlane />
      <Monitor />

      {/* Chair */}
      <group position={[0, 0.15, -0.6]}>
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.25, 32]} />
          <meshStandardMaterial color="#CDBA96" roughness={0.5} />
        </mesh>
        <RoundedBox args={[0.5, 0.08, 0.5]} radius={0.04} position={[0, 0.5, 0]}>
          <meshStandardMaterial color="#E6D8FF" roughness={0.4} />
        </RoundedBox>
        <RoundedBox args={[0.5, 0.4, 0.08]} radius={0.06} position={[0, 0.75, -0.19]}>
          <meshStandardMaterial color="#E6D8FF" roughness={0.4} />
        </RoundedBox>
      </group>
    </group>
  );
}

/* 🧱 Room Shell */
function RoomShell() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color={colors.floor} roughness={0.9} />
      </mesh>

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
    </group>
  );
}

/* 🎥 Smooth Camera Zoom */
function CameraZoomToBimpe({ targetPosition = [0, 1.25, 1.4] }) {
  const { camera } = useThree();
  const [progress, setProgress] = useState(0);

  useFrame(() => {
    if (progress < 1) {
      setProgress((p) => Math.min(1, p + 0.015));
      camera.position.lerp(new THREE.Vector3(...targetPosition), 0.03);
      camera.lookAt(0, 1, 0);
    }
  });

  return null;
}

/* 🌸 Main Scene */
export default function LandingIntro() {
  const [showDialogue, setShowDialogue] = useState(false);
  const [dialogueIndex, setDialogueIndex] = useState(0);

  const dialogue = [
    "Welcome to HealHub Center.",
    "I’m Bimpe, your digital receptionist.",
    "How are you feeling today?",
  ];

  useEffect(() => {
    const timers = [
      setTimeout(() => setShowDialogue(true), 1000),
      setTimeout(() => setDialogueIndex(1), 4000),
      setTimeout(() => setDialogueIndex(2), 7000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="scene-wrapper">
      <Canvas
        shadows
        camera={{ position: [2.2, 1.4, 3.5], fov: 45 }}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "24px",
          background: "radial-gradient(circle at 30% 40%, #f8f7ff, #fff)",
        }}
      >
        <color attach="background" args={["#FFFDFE"]} />
        <fog attach="fog" args={["#FFF7FB", 8, 22]} />
        <hemisphereLight intensity={0.8} groundColor="#EDE7FF" skyColor="#FFFFFF" />
        <directionalLight
          position={[4, 5, 3]}
          intensity={1.1}
          color="#FFEBD2"
          castShadow
        />
        <Environment preset="city" />

        <group>
          <RoomShell />
          <ReceptionDesk />
          <BimpeModel
            position={[0, -0.3, -0.2]}
            scale={1.1}
            rotation={[0, Math.PI, 0]}
          />
          <Atmosphere />
          <WallClock />
          <WallArt />
          <Shelf />
          <Plant position={[-1.6, 0, -2.2]} />
          <Plant position={[1.7, 0, -2.4]} />
        </group>

        <ContactShadows
          position={[0, 0.01, 0]}
          opacity={0.25}
          scale={10}
          blur={2.4}
          far={4}
        />

        <OrbitControls enablePan={false} enableZoom={false} target={[0, 1.2, 0]} />
        <CameraZoomToBimpe />
      </Canvas>

      {/* 🗨️ Greeting Pop-up */}
      {showDialogue && (
        <div className="bimpe-greeting">
          <p>{dialogue[dialogueIndex]}</p>
          {dialogueIndex === 2 && (
            <div className="greeting-buttons">
              <button>Explore Community</button>
              <button>Join Roundtable</button>
              <button>Speak to Bimpe</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
