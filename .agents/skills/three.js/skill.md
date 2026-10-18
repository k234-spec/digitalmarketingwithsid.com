---
name: three.js
description: Production-grade 3D web development guidelines using Three.js (r174+), React Three Fiber (R3F), and Drei in Next.js 15 App Router applications.
version: 0.174.0
---

# Three.js & React Three Fiber (R3F) Skill Guide

This skill guides the design, architecture, performance tuning, and implementation of production-grade 3D graphics in modern Next.js web applications using Three.js (`three`), React Three Fiber (`@react-three/fiber`), and Drei (`@react-three/drei`).

---

## 1. Core Architecture & Next.js App Router Integration

### 1.1 Strict Client-Side Isolation
Three.js and WebGL require the `window`, `document`, and `WebGLRenderingContext` APIs, which do not exist during Server-Side Rendering (SSR).
- Always mark 3D scene files with `"use client";`.
- Dynamically import R3F Canvas components with `ssr: false` from Next.js parent containers:
  ```tsx
  import dynamic from "next/dynamic";
  import { SceneFallback } from "./SceneFallback";

  export const HeroSceneCanvas = dynamic(
    () => import("./HeroSceneCanvas").then((mod) => mod.HeroSceneCanvas),
    {
      ssr: false,
      loading: () => <SceneFallback />,
    }
  );
  ```
- **Never** use synchronous CommonJS `require()` calls inside dynamic import callbacks in Next.js 15 Turbopack. Use dedicated client modules with standard ES `import`.

### 1.2 Transpilation in `next.config.ts`
Ensure modern Three.js and Fiber/Drei packages are listed in `transpilePackages`:
```ts
const nextConfig: NextConfig = {
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  // ...
};
```

---

## 2. Canvas Configuration & Visual Fidelity

### 2.1 Canvas Setup Checklist
```tsx
<Canvas
  camera={{ position: [0, 1.2, 5.2], fov: 42 }}
  dpr={qualityTier === 2 ? [1, 2] : 1}
  gl={{
    antialias: qualityTier === 2,
    alpha: true,
    powerPreference: "high-performance",
    stencil: false,
    depth: true,
  }}
  onCreated={(state) => {
    // AgX Tone Mapping (Three.js r160+) provides cinematic highlights without color blowout
    state.gl.toneMapping = THREE.AgXToneMapping;
    state.gl.toneMappingExposure = 1.1;
  }}
>
```

### 2.2 Tone Mapping & Color Calibration
- Use `THREE.AgXToneMapping` or `THREE.ACESFilmicToneMapping` for high dynamic range scenes.
- Ensure linear workflow: Hex color strings (e.g. `"#7657FF"`, `"#D9FF70"`) passed to materials are converted cleanly to `THREE.Color` in sRGB space.

### 2.3 Lighting Vocabulary
- **Ambient Light**: Baseline fill (`intensity: 0.6 - 0.9`) to prevent total blackness in shadowed crevices.
- **Directional Key Light**: Positioned above and to one side with shadow casting enabled on Tier 2.
- **Accent Point Lights**: Saturated brand colors (Editorial Indigo `#7657FF` and Neon Citrus `#D9FF70`) to create high-contrast rim lighting and kinetic glow.

---

## 3. Animation, Physics & Mouse Parallax

### 3.1 Pointer Tracking (Parallax)
In `useFrame`, read `state.pointer.x` and `state.pointer.y` (normalized coordinates `[-1, 1]`) and interpolate rotation using `THREE.MathUtils.lerp`:
```tsx
useFrame((state, delta) => {
  if (!groupRef.current) return;
  // Smooth mouse parallax lerp
  const targetX = -state.pointer.y * 0.25;
  const targetY = state.pointer.x * 0.45;
  groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05);
  groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.05);
});
```

### 3.2 Drei Floating Dynamics
Use `<Float speed={2} rotationIntensity={0.25} floatIntensity={0.5}>` to give meshes an organic zero-gravity weightlessness.

### 3.3 Contact Shadows
Avoid expensive real-time shadow map cascades where soft contact shadows suffice:
```tsx
<ContactShadows
  position={[0, -1.2, 0]}
  opacity={0.65}
  scale={8}
  blur={2.5}
  far={4}
  color="#7657FF"
/>
```

---

## 4. Graceful Degradation & Quality Tiers

### 4.1 Tiers
- **Tier 0 (Fallback)**: Low-end devices, battery saver, WebGL disabled, or `prefers-reduced-motion`. Render high-craft 2D/SVG data dashboard (`SceneFallback.tsx`).
- **Tier 1 (Mobile / Medium)**: DPR capped at 1, shadows disabled, simplified shaders, reduced geometry segments.
- **Tier 2 (Desktop High)**: DPR up to 2, full antialiasing, contact shadows, emissive bloom, real-time parallax physics.

### 4.2 WebGL Context Loss & Error Boundary
Always wrap Canvas components in a React `ErrorBoundary` so that unexpected GPU context losses cleanly degrade to the 2D SVG telemetry dashboard without breaking page hydration.

---

## 5. Memory Management & Disposal
- Reuse geometries and materials whenever possible.
- Avoid recreating geometries inside render functions or `useFrame`.
- When unmounting, React Three Fiber automatically cleans up standard scene graph elements; avoid manual window listeners that leak memory.