'use client';

import { useRef, useState, ReactNode } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import * as THREE from 'three';

interface Card3DProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  color?: string;
  children?: ReactNode;
  hoverScale?: number;
}

export default function Card3D({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  color = '#667eea',
  children,
  hoverScale = 1.1
}: Card3DProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = rotation[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group position={position} rotation={rotation} scale={hovered ? scale * hoverScale : scale}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[2, 1.5, 0.2]} />
        <meshStandardMaterial
          color={color}
          metalness={0.7}
          roughness={0.3}
          emissive={color}
          emissiveIntensity={hovered ? 0.3 : 0.1}
          transparent
          opacity={0.9}
        />
      </mesh>
      {children && (
        <group position={[0, 0, 0.11]}>
          {children}
        </group>
      )}
    </group>
  );
}

