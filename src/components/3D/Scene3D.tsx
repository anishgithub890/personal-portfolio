'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Stars } from '@react-three/drei';
import { Suspense } from 'react';
import FloatingShapes from './FloatingShapes';
import ParticleField from './ParticleField';

interface Scene3DProps {
  intensity?: number;
  showControls?: boolean;
  showStars?: boolean;
  showParticles?: boolean;
  cameraPosition?: [number, number, number];
}

export default function Scene3D({
  intensity = 0.5,
  showControls = false,
  showStars = true,
  showParticles = true,
  cameraPosition = [0, 0, 5]
}: Scene3DProps) {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 three-d-container gpu-accelerated-3d">
      <Canvas
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true
        }}
        dpr={typeof window !== 'undefined' ? [1, Math.min(window.devicePixelRatio, 2)] : [1, 1]}
        style={{ background: 'transparent' }}
        performance={{ min: 0.5 }}
      >
        <PerspectiveCamera makeDefault position={cameraPosition} fov={75} />
        <ambientLight intensity={intensity} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#667eea" />
        <directionalLight position={[0, 10, 5]} intensity={0.5} />
        
        {showStars && (
          <Stars
            radius={300}
            depth={50}
            count={3000}
            factor={4}
            saturation={0}
            fade
            speed={0.5}
          />
        )}
        
        <Suspense fallback={null}>
          {showParticles && <ParticleField />}
          <FloatingShapes />
          <Environment preset="sunset" />
        </Suspense>
        
        {showControls && <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />}
      </Canvas>
    </div>
  );
}

