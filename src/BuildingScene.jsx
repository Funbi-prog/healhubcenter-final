import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

function Building({ onEnter }) {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef();

  // Add a slow breathing animation
  useFrame((state, delta) => {
    groupRef.current.rotation.y += delta * 0.2;
    const scale = 1 + Math.sin(state.clock.elapsedTime) * 0.03;
    groupRef.current.scale.set(scale, scale, scale);
  });

  return (
    <group ref={groupRef} position={[0, 1, 0]}>
      {/* Base block */}
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onEnter}
      >
        <boxGeometry args={[4, 2, 4]} />
        <meshStandardMaterial
          color={hovered ? '#d6ccc2' : '#e0dcd3'}
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>

      {/* Glass top */}
      <mesh position={[0, 1.3, 0]}>
        <boxGeometry args={[3.5, 0.8, 3.5]} />
        <meshPhysicalMaterial
          color="#d1e3d1"
          transmission={0.8}
          roughness={0.1}
          thickness={0.5}
          clearcoat={1}
        />
      </mesh>

      {/* Glowing logo panel */}
      <mesh position={[-2.2, 1.3, 0]}>
        <planeGeometry args={[1.2, 0.7]} />
        <meshStandardMaterial
          emissive="#a3b18a"
          emissiveIntensity={2.5}
          color="#ffffff"
        />
      </mesh>
    </group>
  );
}

export default function BuildingScene({ onEnter }) {
  return (
    <Canvas camera={{ position: [0, 3, 7], fov: 60 }} shadows>
      <color attach="background" args={['#f2f1ee']} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[6, 8, 4]} intensity={1.2} />
      <Building onEnter={onEnter} />
      <Text position={[0, 3.2, 0]} fontSize={0.45} color="#333" fontWeight="bold">
        HealHubCenter
      </Text>
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
