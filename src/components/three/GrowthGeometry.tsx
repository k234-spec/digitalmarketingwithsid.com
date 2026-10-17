"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface GrowthGeometryProps {
  qualityTier: 1 | 2;
}

export const GrowthGeometry: React.FC<GrowthGeometryProps> = ({ qualityTier }) => {
  const groupRef = useRef<THREE.Group>(null);
  const barsGroupRef = useRef<THREE.Group>(null);

  // Subtle oscillation frame loop
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.25) * 0.15;
      groupRef.current.rotation.x = Math.cos(t * 0.2) * 0.08;
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.1;
    }
    if (barsGroupRef.current) {
      barsGroupRef.current.children.forEach((child, i) => {
        child.scale.y = 1 + Math.sin(t * 1.5 + i * 0.6) * 0.15;
      });
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Central dimensional platform */}
      <mesh position={[0, -1.2, 0]} receiveShadow={qualityTier === 2}>
        <cylinderGeometry args={[2.8, 3.0, 0.2, 32]} />
        <meshStandardMaterial
          color="#181A20"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Outer ring accent */}
      <mesh position={[0, -1.18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.82, 2.92, 48]} />
        <meshBasicMaterial color="#7657FF" wireframe />
      </mesh>

      {/* Floating 3D Graph Columns (Growth visualization) */}
      <group ref={barsGroupRef} position={[0, -1.0, 0]}>
        {[
          { x: -1.2, z: 0.2, h: 1.0, color: "#7657FF" },
          { x: -0.6, z: -0.4, h: 1.6, color: "#8B6EFF" },
          { x: 0.0, z: 0.3, h: 2.2, color: "#A287FF" },
          { x: 0.6, z: -0.2, h: 2.9, color: "#B8A7FF" },
          { x: 1.2, z: 0.4, h: 3.6, color: "#D9FF70" },
        ].map((bar, i) => (
          <mesh
            key={i}
            position={[bar.x, bar.h / 2, bar.z]}
            castShadow={qualityTier === 2}
          >
            <boxGeometry args={[0.35, bar.h, 0.35]} />
            <meshStandardMaterial
              color={bar.color}
              emissive={bar.color}
              emissiveIntensity={i === 4 ? 0.35 : 0.15}
              roughness={0.2}
              metalness={0.5}
            />
          </mesh>
        ))}
      </group>

      {/* Floating abstract dashboard plane (representing digital presence) */}
      <mesh position={[-0.8, 1.2, -0.6]} rotation={[0.2, 0.4, -0.05]}>
        <boxGeometry args={[1.8, 1.2, 0.04]} />
        <meshStandardMaterial
          color="#1F2128"
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Floating small badge element */}
      <mesh position={[1.2, 1.6, 0.4]} rotation={[-0.1, -0.3, 0.1]}>
        <boxGeometry args={[1.1, 0.7, 0.03]} />
        <meshStandardMaterial
          color="#7657FF"
          emissive="#7657FF"
          emissiveIntensity={0.2}
          roughness={0.3}
        />
      </mesh>

      {/* Lime highlight orb */}
      <mesh position={[0.9, 2.2, 0.2]}>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshStandardMaterial
          color="#D9FF70"
          emissive="#D9FF70"
          emissiveIntensity={0.8}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
};
