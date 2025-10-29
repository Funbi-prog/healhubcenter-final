// src/BimpeModel.jsx
import React from "react";
import { useGLTF } from "@react-three/drei";

export default function BimpeModel({ position = [0, 0, 0], scale = 1.1 }) {
  const { scene } = useGLTF("/models/bimpe.glb");
  return (
    <primitive
      object={scene}
      position={position}
      scale={scale}
      rotation={[0, 0, 0]}

    />
  );
}
