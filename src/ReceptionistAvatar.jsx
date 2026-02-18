// src/ReceptionistAvatar.jsx
import { RoundedBox } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

/**
 * Receptionist Avatar (Bimpe) – calm, minimal, graceful
 * Represents the AI wellness assistant seated at the reception desk
 */

export default function ReceptionistAvatar({ position = [0, 0, -0.3] }) {
  const headRef = useRef();
  const glowRef = useRef();

  // Gentle idle animation – breathing & slight head tilt
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (headRef.current) headRef.current.rotation.y = Math.sin(t * 0.6) * 0.15;
    if (glowRef.current)
      glowRef.current.material.emissiveIntensity =
        0.5 + Math.sin(t * 1.2) * 0.2;
  });

  return (
    <group position={position}>
      {/* Chair */}
      <RoundedBox
        args={[0.52, 0.08, 0.5]}
        radius={0.04}
        smoothness={6}
        position={[0, 0.12, 0]}
      >
        <meshStandardMaterial color="#38bdf8" roughness={0.45} />
      </RoundedBox>
      <RoundedBox
        args={[0.05, 0.48, 0.45]}
        radius={0.03}
        smoothness={6}
        position={[-0.2, 0.36, 0]}
      >
        <meshStandardMaterial color="#38bdf8" roughness={0.45} />
      </RoundedBox>

      {/* Torso */}
      <RoundedBox
        args={[0.34, 0.6, 0.34]}
        radius={0.12}
        smoothness={6}
        position={[0, 0.54, 0]}
      >
        <meshStandardMaterial
          color="#D8B4FE"
          roughness={0.4}
          metalness={0.2}
        />
      </RoundedBox>

      {/* Head */}
      <mesh ref={headRef} position={[0, 1.05, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="#E3D4FF" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Gentle glow aura */}
      <mesh ref={glowRef} position={[0, 1.05, 0]}>
        <sphereGeometry args={[0.23, 32, 32]} />
        <meshStandardMaterial
          emissive="#CBB7FF"
          emissiveIntensity={0.5}
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Small handheld tablet */}
      <mesh position={[0.2, 0.65, 0.25]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[0.18, 0.02, 0.28]} />
        <meshStandardMaterial
          color="#AAA0FF"
          metalness={0.2}
          roughness={0.3}
          emissive="#B9A5FF"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}
