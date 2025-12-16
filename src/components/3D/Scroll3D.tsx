'use client';

import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

export default function Scroll3D() {
  const { camera } = useThree();
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      const offset = scroll.offset;
      groupRef.current.rotation.y = offset * Math.PI * 2;
      camera.position.z = 5 + offset * 2;
    }
  });

  return <group ref={groupRef} />;
}

