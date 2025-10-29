// src/Atmosphere.jsx
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Atmosphere() {
  const particlesRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.05;
    }
  });

  // Floating dust particles
  const count = 150;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 1] = Math.random() * 3 + 0.2;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
  }

  return (
    <group>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#FFFFFF"
          opacity={0.15}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Subtle warm glow (like scented candles) */}
      <pointLight position={[0.5, 0.4, 0.5]} intensity={0.6} color="#FFE4B5" />
      <pointLight position={[-0.8, 0.3, -0.4]} intensity={0.5} color="#FFDFC4" />
    </group>
  );
}
