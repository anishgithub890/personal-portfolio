'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingText3DProps {
  text: string;
  position: [number, number, number];
  fontSize?: number;
  color?: string;
  speed?: number;
}

export default function FloatingText3D({
  text,
  position,
  fontSize = 0.5,
  color = '#667eea',
  speed = 1
}: FloatingText3DProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Text
        fontSize={fontSize}
        color={color}
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {text}
      </Text>
    </group>
  );
}

