"use client";

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
// Removed ASCII overlay to render the real 3D sphere

function BinaryTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "700 16px Inter, ui-sans-serif, system-ui";
  for (let y = 0; y < canvas.height; y += 20) {
    for (let x = 0; x < canvas.width; x += 12) {
      const bit = Math.random() > 0.5 ? "1" : "0";
      const intensity = 180 + Math.floor(Math.random() * 75);
      ctx.fillStyle = `rgb(${intensity}, ${140 + Math.random() * 60}, 40)`; // golden hues
      ctx.fillText(bit, x, y);
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 1);
  tex.needsUpdate = true;
  return tex;
}

function SunMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useMemo(() => BinaryTexture(), []);
  const emissiveMap = useMemo(() => BinaryTexture(), []);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.0025;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
  });
  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <sphereGeometry args={[1.5, 128, 128]} />
      <meshStandardMaterial
        map={texture}
        emissive={new THREE.Color("#F5C044")}
        emissiveIntensity={0.6}
        emissiveMap={emissiveMap}
        metalness={0.1}
        roughness={0.6}
      />
    </mesh>
  );
}

// ASCII overlay removed

function Scene() {
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 6, 3]} intensity={0.9} castShadow />
      <SunMesh />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={!reducedMotion}
        autoRotateSpeed={0.35}
        enableDamping
        dampingFactor={0.06}
      />
    </>
  );
}

export default function ThreeSun() {
  return (
    <Canvas
      shadows
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ width: "100%", height: "100%", display: "block", pointerEvents: "auto" }}
    >
      <Scene />
    </Canvas>
  );
}

