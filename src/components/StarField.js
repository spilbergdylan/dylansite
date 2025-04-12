import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const StarField = () => {
  const starsRef = useRef();
  const starCount = 20000; // Number of stars
  const starPositions = new Float32Array(starCount * 3);
  const starColors = new Float32Array(starCount * 3);

  // Generate random star positions and colors
  for (let i = 0; i < starCount; i++) {
    const i3 = i * 3;
    
    // Random position in a sphere
    const radius = Math.random() * 10000 + 1000; // Between 1000 and 3000 units from center
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    
    starPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    starPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    starPositions[i3 + 2] = radius * Math.cos(phi);
    
    // Random star color (white to slightly blue)
    const color = new THREE.Color();
    color.setHSL(0.6, 0.1, Math.random() * 0.5 + 0.5);
    starColors[i3] = color.r;
    starColors[i3 + 1] = color.g;
    starColors[i3 + 2] = color.b;
  }

  // Create buffer geometry
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

  useFrame((state) => {
    if (starsRef.current) {
      // Slowly rotate the star field
      starsRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <points ref={starsRef} geometry={geometry}>
      <pointsMaterial
        size={2}
        vertexColors
        transparent
        opacity={1}
        sizeAttenuation
      />
    </points>
  );
};

export default StarField; 