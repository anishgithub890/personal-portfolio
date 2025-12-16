'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import { Mesh } from 'three';
import * as THREE from 'three';

interface ExperienceCard3DProps {
  position: [number, number, number];
  title: string;
  company: string;
  period: string;
  color?: string;
}

export default function ExperienceCard3D({
  position,
  title,
  company,
  period,
  color = '#667eea'
}: ExperienceCard3DProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = hovered 
        ? Math.sin(state.clock.elapsedTime) * 0.1 
        : Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? [3, 2, 0.2] : [2.5, 1.8, 0.2]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={color}
          metalness={0.7}
          roughness={0.2}
          transparent
          opacity={0.9}
          emissive={color}
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </mesh>
      <Text
        position={[0, 0.5, 0.11]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        {title}
      </Text>
      <Text
        position={[0, 0.2, 0.11]}
        fontSize={0.1}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        {company}
      </Text>
      <Text
        position={[0, -0.2, 0.11]}
        fontSize={0.08}
        color="#cccccc"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        {period}
      </Text>
    </group>
  );
}

