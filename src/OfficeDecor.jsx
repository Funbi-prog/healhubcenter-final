// src/OfficeDecor.jsx
import { RoundedBox } from "@react-three/drei";
import React from "react";

export function WallClock({ position = [0, 2.4, -2.9] }) {
  return (
    <group position={position}>
      {/* Outer ring */}
      <mesh>
        <torusGeometry args={[0.25, 0.03, 16, 64]} />
        <meshStandardMaterial color="#38bdf8" metalness={0.5} roughness={0.4} />
      </mesh>
      {/* Face */}
      <mesh>
        <circleGeometry args={[0.22, 48]} />
        <meshStandardMaterial color="#F9F9F9" />
      </mesh>
      {/* Clock hands */}
      <mesh rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[0.02, 0.14, 0.02]} />
        <meshStandardMaterial color="#3A3A3A" />
      </mesh>
      <mesh rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.01, 0.18, 0.01]} />
        <meshStandardMaterial color="#3A3A3A" />
      </mesh>
    </group>
  );
}

export function WallArt({ position = [-2.2, 1.5, -2.9] }) {
  return (
    <group position={position}>
      {[...Array(3)].map((_, i) => (
        <mesh key={i} position={[i * 0.8, 0, 0]}>
          <boxGeometry args={[0.6, 0.6, 0.02]} />
          <meshStandardMaterial color={["#E4D6F9", "#DCE8F6", "#F8E8D8"][i]} />
        </mesh>
      ))}
    </group>
  );
}

export function Shelf({ position = [1.6, 0.9, -1.8] }) {
  return (
    <group position={position}>
      <RoundedBox args={[0.8, 0.04, 0.3]} radius={0.02} smoothness={6}>
        <meshStandardMaterial color="#38bdf8" roughness={0.4} />
      </RoundedBox>
      <mesh position={[0, 0.12, 0]}>
        <sphereGeometry args={[0.08, 24, 24]} />
        <meshStandardMaterial color="#A8D5C0" />
      </mesh>
      <mesh position={[0.25, 0.08, 0]}>
        <boxGeometry args={[0.12, 0.18, 0.08]} />
        <meshStandardMaterial color="#F2E6CF" />
      </mesh>
    </group>
  );
}
