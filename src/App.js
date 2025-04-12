import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import SolarSystem, { sectionsConfig } from './components/SolarSystem';
import FlightControls from './components/FlightControls';
import './App.css';

function App() {
  const [currentSection, setCurrentSection] = useState(0);

  // Set up scroll container
  useEffect(() => {
    // Set document height to accommodate all sections
    document.body.style.height = `${100 * sectionsConfig.length}vh`;
  }, []);

  // Add it to the title update
  useEffect(() => {
    document.title = `Dylan Spilberg - ${sectionsConfig[currentSection].name}`;
  }, [currentSection]);

  const handleNavigate = (sectionIndex) => {
    setCurrentSection(sectionIndex);
    // Dispatch custom event for direct navigation
    window.dispatchEvent(new CustomEvent('directNavigation', { 
      detail: { targetSection: sectionIndex } 
    }));
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'fixed' }}>
      <Canvas
        shadows
        camera={{ 
          position: [-30, 22, 30],
          fov: 75,
          near: 0.1,
          far: 10000
        }}
        gl={{ 
          antialias: true,
          toneMapping: THREE.NoToneMapping,
          outputColorSpace: THREE.SRGBColorSpace
        }}
      >
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.2} />
        <SolarSystem onSectionChange={setCurrentSection} />
      </Canvas>
      <FlightControls 
        sections={sectionsConfig}
        currentSection={currentSection}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

export default App;
