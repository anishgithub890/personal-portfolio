'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, MeshDistortMaterial } from '@react-three/drei';
import { Mesh } from 'three';
import * as THREE from 'three';

interface SkillIcon3DProps {
  position: [number, number, number];
  skill: string;
  color?: string;
  size?: number;
}

export default function SkillIcon3D({ 
  position, 
  skill, 
  color = '#667eea',
  size = 0.5 
}: SkillIcon3DProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? size * 1.5 : size}
      >
        <boxGeometry args={[1, 1, 1]} />
        <MeshDistortMaterial
          color={color}
          distort={hovered ? 0.4 : 0.2}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.8}
        />
      </mesh>
      <Text
        position={[0, -1, 0]}
        fontSize={0.2}
        color={color}
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        {skill}
      </Text>
    </group>
  );
}

