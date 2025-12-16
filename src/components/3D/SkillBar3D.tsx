'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface SkillBar3DProps {
  position: [number, number, number];
  proficiency: number;
  color?: string;
  name: string;
}

export default function SkillBar3D({ 
  position, 
  proficiency, 
  color = '#667eea',
  name 
}: SkillBar3DProps) {
  const barRef = useRef<Mesh>(null);
  const progressRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (barRef.current && progressRef.current) {
      barRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      progressRef.current.scale.x = proficiency / 100;
    }
  });

  return (
    <group position={position}>
      {/* Background bar */}
      <mesh ref={barRef} position={[0, 0, 0]}>
        <boxGeometry args={[2, 0.1, 0.1]} />
        <meshStandardMaterial
          color="#333333"
          metalness={0.3}
          roughness={0.7}
          transparent
          opacity={0.5}
        />
      </mesh>
      
      {/* Progress bar */}
      <mesh 
        ref={progressRef} 
        position={[-1 + (proficiency / 100), 0, 0.01]}
        scale={[1, 1, 1]}
      >
        <boxGeometry args={[2, 0.12, 0.12]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

