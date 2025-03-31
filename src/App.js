import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import SolarSystem, { sectionsConfig } from './components/SolarSystem';
import './App.css';

function App() {
  const [currentSection, setCurrentSection] = useState(0);

  // Set up scroll container
  useEffect(() => {
    // Set document height to accommodate all sections
    document.body.style.height = `${100 * sectionsConfig.length}vh`;
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'fixed' }}>
      <Canvas
        shadows
        camera={{ 
          position: [-30, 22, 30],
          fov: 55,
          up: [0, 10, 0]
        }}
        gl={{ 
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace
        }}
      >
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.3} />
        <SolarSystem onSectionChange={setCurrentSection} />
      </Canvas>
    </div>
  );
}

export default App;
