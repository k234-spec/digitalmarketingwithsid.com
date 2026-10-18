"use client";

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface GrowthGeometryProps {
  qualityTier: 1 | 2;
}

export const GrowthGeometry: React.FC<GrowthGeometryProps> = ({ qualityTier }) => {
  const groupRef = useRef<THREE.Group>(null);
  const barsGroupRef = useRef<THREE.Group>(null);
  const orbitalRingRef = useRef<THREE.Mesh>(null);
  const orbRef = useRef<THREE.Mesh>(null);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  // Growth bar data: escalating commercial trajectory
  const bars = [
    { x: -1.3, z: 0.25, h: 1.1, baseColor: "#7657FF", glowColor: "#7657FF" },
    { x: -0.65, z: -0.35, h: 1.7, baseColor: "#8B6EFF", glowColor: "#8B6EFF" },
    { x: 0.0, z: 0.35, h: 2.3, baseColor: "#A287FF", glowColor: "#B8A7FF" },
    { x: 0.65, z: -0.25, h: 3.0, baseColor: "#B8A7FF", glowColor: "#B8A7FF" },
    { x: 1.3, z: 0.45, h: 3.8, baseColor: "#D9FF70", glowColor: "#D9FF70" },
  ];

  // Dynamic animation and cursor parallax physics
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Dynamic idle oscillation
      const idleRotY = Math.sin(t * 0.2) * 0.08;
      const idleRotX = Math.cos(t * 0.15) * 0.05;
      const idlePosY = Math.sin(t * 0.6) * 0.06;

      // Mouse pointer parallax lerp (responsive to user cursor)
      const targetMouseX = state.pointer.x * 0.35;
      const targetMouseY = -state.pointer.y * 0.2;

      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        idleRotY + targetMouseX,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        idleRotX + targetMouseY,
        0.05
      );
      groupRef.current.position.y = idlePosY;
    }

    // Dynamic bar heights breathing
    if (barsGroupRef.current) {
      barsGroupRef.current.children.forEach((child, i) => {
        const isHovered = hoveredBar === i;
        const breath = 1 + Math.sin(t * 1.6 + i * 0.5) * 0.08;
        const targetScaleY = isHovered ? 1.18 : breath;
        child.scale.y = THREE.MathUtils.lerp(child.scale.y, targetScaleY, 0.1);
      });
    }

    // Orbiting data ring rotation
    if (orbitalRingRef.current) {
      orbitalRingRef.current.rotation.z = t * 0.4;
      orbitalRingRef.current.rotation.x = -Math.PI / 2 + Math.sin(t * 0.3) * 0.12;
    }

    // Glowing Neon Citrus orb pulse
    if (orbRef.current) {
      const orbScale = 1 + Math.sin(t * 2.2) * 0.12;
      orbRef.current.scale.set(orbScale, orbScale, orbScale);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Central Foundation Pedestal (Obsidian & Mineral Finish) */}
      <mesh position={[0, -1.2, 0]} receiveShadow={qualityTier === 2}>
        <cylinderGeometry args={[2.7, 2.9, 0.2, qualityTier === 2 ? 36 : 24]} />
        <meshStandardMaterial
          color="#181A20"
          metalness={0.7}
          roughness={0.25}
        />
      </mesh>

      {/* Primary Laser Ring Accent */}
      <mesh position={[0, -1.18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.72, 2.82, qualityTier === 2 ? 48 : 32]} />
        <meshBasicMaterial color="#7657FF" wireframe />
      </mesh>

      {/* Dynamic Orbital Halo Ring */}
      <mesh ref={orbitalRingRef} position={[0, 0.6, 0]}>
        <ringGeometry args={[2.2, 2.26, qualityTier === 2 ? 40 : 28]} />
        <meshBasicMaterial
          color="#D9FF70"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Floating 3D Graph Columns (Growth visualization) */}
      <group ref={barsGroupRef} position={[0, -1.0, 0]}>
        {bars.map((bar, i) => {
          const isHighlight = i === bars.length - 1;
          const isHovered = hoveredBar === i;

          return (
            <group
              key={i}
              position={[bar.x, 0, bar.z]}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredBar(i);
              }}
              onPointerOut={() => setHoveredBar(null)}
            >
              <mesh
                position={[0, bar.h / 2, 0]}
                castShadow={qualityTier === 2}
              >
                <boxGeometry args={[0.36, bar.h, 0.36]} />
                <meshStandardMaterial
                  color={bar.baseColor}
                  emissive={bar.glowColor}
                  emissiveIntensity={isHovered ? 0.75 : isHighlight ? 0.45 : 0.2}
                  roughness={0.2}
                  metalness={0.6}
                />
              </mesh>

              {/* Glowing Top Cap */}
              <mesh position={[0, bar.h + 0.02, 0]}>
                <boxGeometry args={[0.38, 0.04, 0.38]} />
                <meshBasicMaterial
                  color={isHighlight ? "#D9FF70" : "#B8A7FF"}
                  transparent
                  opacity={isHovered ? 1.0 : 0.8}
                />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* Floating Abstract Dashboard Panel (Editorial Void Surface) */}
      <mesh position={[-0.85, 1.25, -0.6]} rotation={[0.18, 0.35, -0.05]}>
        <boxGeometry args={[1.9, 1.25, 0.04]} />
        <meshStandardMaterial
          color="#1F2128"
          roughness={0.25}
          metalness={0.8}
        />
      </mesh>

      {/* Wireframe Grid on Dashboard Panel */}
      <mesh position={[-0.85, 1.25, -0.57]} rotation={[0.18, 0.35, -0.05]}>
        <planeGeometry args={[1.75, 1.1, 4, 3]} />
        <meshBasicMaterial
          color="#7657FF"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Floating Accent Badge (Attribution Metric Card) */}
      <mesh position={[1.15, 1.7, 0.4]} rotation={[-0.1, -0.35, 0.08]}>
        <boxGeometry args={[1.15, 0.72, 0.03]} />
        <meshStandardMaterial
          color="#7657FF"
          emissive="#7657FF"
          emissiveIntensity={0.28}
          roughness={0.3}
          metalness={0.4}
        />
      </mesh>

      {/* Pulsing Neon Citrus Orb (Peak ROAS / Scaling Node) */}
      <mesh ref={orbRef} position={[0.9, 2.25, 0.2]}>
        <sphereGeometry args={[0.17, 24, 24]} />
        <meshStandardMaterial
          color="#D9FF70"
          emissive="#D9FF70"
          emissiveIntensity={0.9}
          roughness={0.15}
          metalness={0.2}
        />
      </mesh>

      {/* Ambient Micro-Particles / Star Dust Nodes (Tier 2 only) */}
      {qualityTier === 2 && (
        <group>
          {[
            [-1.5, 1.8, 0.6],
            [-0.3, 2.5, -0.8],
            [1.6, 0.7, -0.4],
            [-1.1, 0.2, 1.2],
          ].map((pos, idx) => (
            <mesh key={idx} position={pos as [number, number, number]}>
              <sphereGeometry args={[0.04, 12, 12]} />
              <meshBasicMaterial color="#B8A7FF" transparent opacity={0.6} />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
};
