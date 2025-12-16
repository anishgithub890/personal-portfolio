'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import * as THREE from 'three';

function FloatingBox({ position, color, speed }: { position: [number, number, number]; color: string; speed: number }) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speed * 0.01;
      meshRef.current.rotation.y += speed * 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

function FloatingSphere({ position, color, speed }: { position: [number, number, number]; color: string; speed: number }) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speed * 0.01;
      meshRef.current.rotation.y += speed * 0.015;
      meshRef.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * speed) * 0.4;
      meshRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        metalness={0.7}
        roughness={0.3}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

function FloatingTorus({ position, color, speed }: { position: [number, number, number]; color: string; speed: number }) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speed * 0.02;
      meshRef.current.rotation.z += speed * 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 0.7) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <torusGeometry args={[0.25, 0.1, 16, 100]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        metalness={0.6}
        roughness={0.4}
        transparent
        opacity={0.65}
      />
    </mesh>
  );
}

export default function FloatingShapes() {
  const shapes = [
    { type: 'box', position: [-3, 2, -2] as [number, number, number], color: '#667eea', speed: 0.5 },
    { type: 'sphere', position: [3, -1, -3] as [number, number, number], color: '#764ba2', speed: 0.7 },
    { type: 'torus', position: [-2, -2, -1] as [number, number, number], color: '#f093fb', speed: 0.6 },
    { type: 'box', position: [2, 1, -4] as [number, number, number], color: '#f5576c', speed: 0.4 },
    { type: 'sphere', position: [-1, 3, -2] as [number, number, number], color: '#4facfe', speed: 0.8 },
    { type: 'torus', position: [1, -3, -3] as [number, number, number], color: '#00f2fe', speed: 0.5 },
    { type: 'box', position: [0, 0, -5] as [number, number, number], color: '#43e97b', speed: 0.6 },
    { type: 'sphere', position: [-4, -1, -1] as [number, number, number], color: '#fa709a', speed: 0.7 },
  ];

  return (
    <>
      {shapes.map((shape, index) => {
        if (shape.type === 'box') {
          return (
            <FloatingBox
              key={`box-${index}`}
              position={shape.position}
              color={shape.color}
              speed={shape.speed}
            />
          );
        } else if (shape.type === 'sphere') {
          return (
            <FloatingSphere
              key={`sphere-${index}`}
              position={shape.position}
              color={shape.color}
              speed={shape.speed}
            />
          );
        } else {
          return (
            <FloatingTorus
              key={`torus-${index}`}
              position={shape.position}
              color={shape.color}
              speed={shape.speed}
            />
          );
        }
      })}
    </>
  );
}

