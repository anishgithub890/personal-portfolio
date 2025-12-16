'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { Mesh } from 'three';

interface Profile3DProps {
  imageUrl: string;
  position?: [number, number, number];
  scale?: number;
}

export default function Profile3D({ 
  imageUrl, 
  position = [0, 0, 0],
  scale = 1 
}: Profile3DProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  // Load texture
  const texture = useTexture(imageUrl);

  useFrame((state) => {
    if (meshRef.current) {
      if (hovered) {
        meshRef.current.rotation.y += 0.02;
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      } else {
        meshRef.current.rotation.y += 0.005;
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      }
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* Main profile sphere */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          metalness={0.8}
          roughness={0.2}
          emissive="#667eea"
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </mesh>
      
      {/* Glow effect */}
      <mesh position={[0, 0, -0.1]}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial
          color="#667eea"
          transparent
          opacity={hovered ? 0.3 : 0.1}
          emissive="#667eea"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Orbiting rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#764ba2"
          emissive="#764ba2"
          emissiveIntensity={0.5}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}

