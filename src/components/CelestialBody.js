import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Text3D, Center, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

const InfoPanel = ({ content, isActive, planetSize, color, panelConfig }) => {
  const panelRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isActive]);

  useEffect(() => {
    if (panelRef.current) {
      gsap.to(panelRef.current.scale, {
        x: isVisible ? 1 : 0,
        y: isVisible ? 1 : 0,
        duration: 0.8,
        ease: "power2.out"
      });
    }
  }, [isVisible]);

  // Format text content based on section
  const formatContent = (content) => {
    const lines = content.split('\n');
    const sections = [];
    let currentSection = [];
    
    lines.forEach(line => {
      if (line === '') {
        if (currentSection.length > 0) {
          sections.push(currentSection);
          currentSection = [];
        }
      } else {
        currentSection.push(line);
      }
    });
    if (currentSection.length > 0) {
      sections.push(currentSection);
    }
    return sections;
  };

  const {
    fontSize = 0.035,
    sections: sectionConfigs = [{ x: -0.35, y: 0.25, maxWidth: 0.8 }]
  } = panelConfig || {};

  const sections = formatContent(content);

  return (
    <group 
      ref={panelRef} 
      scale={[0, 0, 1]}
      position={[0, 0, -planetSize * 1.5]}
      rotation={[0, Math.PI, 0]}
    >
      {/* Text sections */}
      {sections.map((section, sectionIndex) => {
        const config = sectionConfigs[Math.min(sectionIndex, sectionConfigs.length - 1)];
        return (
          <group 
            key={sectionIndex}
            position={[
              planetSize * (config.x || 0),
              planetSize * (config.y || 0),
              planetSize * (config.z || 0)
            ]}
          >
            {config.title && (
              <>
                <Text3D
                  font="/fonts/helvetiker_regular.typeface.json"
                  size={planetSize * config.title.fontSize}
                  height={planetSize * 0.005}
                  bevelEnabled={false}
                  bevelThickness={0}
                  bevelSize={0}
                  bevelSegments={0}
                  center
                >
                  {config.title.text}
                  <meshStandardMaterial 
                    color={config.title.color}
                    metalness={0.5}
                    roughness={0.2}
                    emissive={config.title.color}
                    emissiveIntensity={0.65}
                  />
                </Text3D>
                
                <Text3D
                  position={[0, -planetSize * 0.08, 0]}
                  font="/fonts/helvetiker_regular.typeface.json"
                  size={planetSize * config.description.fontSize}
                  height={planetSize * 0.005}
                  bevelEnabled={false}
                  bevelThickness={0}
                  bevelSize={0}
                  bevelSegments={0}
                  center
                >
                  {config.description.text.replace('\n', '\n\n')}
                  <meshStandardMaterial 
                    color={config.description.color}
                    metalness={0}
                    roughness={0.3}
                    emissive={config.description.color}
                    emissiveIntensity={.65}
                  />
                </Text3D>
              </>
            )}
            {!config.title && (
              <Center>
                <Text3D
                  font="/fonts/helvetiker_regular.typeface.json"
                  size={planetSize * (config.fontSize || fontSize)}
                  height={planetSize * 0.005}
                  bevelEnabled={false}
                  bevelThickness={0}
                  bevelSize={0}
                  bevelSegments={0}
                  center
                >
                  {section.map((line, i) => {
                    const lineWidth = line.length * planetSize * (config.fontSize || fontSize) * 0.5;
                    return (
                      <group key={i} position={[0, -i * planetSize * 0.08, 0]}>
                        <Text3D
                          font="/fonts/helvetiker_regular.typeface.json"
                          size={planetSize * (config.fontSize || fontSize)}
                          height={planetSize * 0.005}
                          bevelEnabled={false}
                          bevelThickness={0}
                          bevelSize={0}
                          bevelSegments={0}
                          center
                          position={[-lineWidth/2, 0, 0]}
                        >
                          {line}
                          <meshStandardMaterial 
                            color={config.color || "white"}
                            metalness={0}
                            roughness={0.3}
                            emissive="white"
                            emissiveIntensity={0.65}
                          />
                        </Text3D>
                      </group>
                    );
                  })}
                </Text3D>
              </Center>
            )}
          </group>
        );
      })}
    </group>
  );
};

const CelestialBody = ({ name, type, position, size, color, isActive, initialRotation = 0, content, textures, panelConfig }) => {
  const meshRef = useRef();
  const textRingRef = useRef();
  const ringRef = useRef();
  
  // Load textures if provided, only include defined textures
  const textureKeys = {};
  if (textures.map) textureKeys.map = textures.map;
  if (textures.normalMap) textureKeys.normalMap = textures.normalMap;
  if (textures.roughnessMap) textureKeys.roughnessMap = textures.roughnessMap;
  if (textures.aoMap) textureKeys.aoMap = textures.aoMap;
  if (textures.displacementMap) textureKeys.displacementMap = textures.displacementMap;
  if (textures.ringTexture) textureKeys.ringTexture = textures.ringTexture;

  const loadedTextures = useTexture(textureKeys);

  useFrame((state) => {
    if (type === 'sun') {
      // Remove sun rotation
      // meshRef.current.rotation.y += 0.005;
    } else {
      // Calculate orbital motion
      const orbitSpeed = 0.0002; // Adjust this value to control orbit speed
      const orbitRadius = Math.sqrt(position[0] * position[0] + position[2] * position[2]);
      const currentAngle = Math.atan2(position[2], position[0]);
      const newAngle = currentAngle + orbitSpeed;
      
      // Update position based on orbital motion
      const newX = Math.cos(newAngle) * orbitRadius;
      const newZ = Math.sin(newAngle) * orbitRadius;
      meshRef.current.position.x = newX;
      meshRef.current.position.z = newZ;
      
      // Update ring position if it exists
      if (ringRef.current) {
        ringRef.current.position.x = newX;
        ringRef.current.position.z = newZ;
      }

      if (isActive) {
        // Only rotate to face camera when active
        const cameraPosition = state.camera.position;
        const planetPosition = new THREE.Vector3(newX, position[1], newZ);
        const directionToCamera = new THREE.Vector3()
          .subVectors(cameraPosition, planetPosition)
          .normalize();

        const angle = Math.atan2(directionToCamera.x, directionToCamera.z);
        meshRef.current.rotation.y = angle + Math.PI;
        if (ringRef.current) {
          ringRef.current.rotation.y = angle + Math.PI;
        }
      }
    }
    
    // Text ring rotation continues independently
    if (textRingRef.current) {
      textRingRef.current.rotation.y += 0.01;
    }
  });

  // Function to create curved text geometry for title
  const createCurvedText = (text, radius, textSize) => {
    const letters = text.split('');
    const angleStep = (textSize * 1.2) / radius;
    const startAngle = -(letters.length - 1) * angleStep / 2;
    const surfaceOffset = radius * 0.02;

    // Function to create text at a specific rotation
    const createTextRing = (baseRotation) => (
      <group rotation={[0, baseRotation, 0]} position={[0, size * 0.8, 0]}>
        {letters.map((letter, i) => {
          const angle = startAngle + i * angleStep;
          const x = Math.sin(angle) * (radius + surfaceOffset);
          const y = -1.5;
          const z = Math.cos(angle) * (radius + surfaceOffset);
          
          return (
            <group 
              key={i} 
              position={[x, y, z]}
              rotation={[0, angle, 0]}
            >
              <Text3D
                font="/fonts/helvetiker_regular.typeface.json"
                size={textSize * 0.6}
                height={Math.min(0.1, textSize * 0.2)}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.01}
                bevelSize={0.01}
                bevelOffset={0}
                bevelSegments={5}
              >
                {letter}
                <meshStandardMaterial 
                  color="white"
                  metalness={0}
                  roughness={0.2}
                  emissive="white"
                  emissiveIntensity={0.65}
                />
              </Text3D>
            </group>
          );
        })}
      </group>
    );

    return (
      <group ref={textRingRef} rotation={[0, Math.PI / 4, 0]}>
        {createTextRing(Math.PI * 1/2)}
        {createTextRing(Math.PI * 3/2)}
      </group>
    );
  };

  return (
    <group>
      <mesh ref={meshRef} position={position} rotation={[0, initialRotation, 0]}>
        <Sphere args={[size, 64, 64]}>
          <meshStandardMaterial 
            map={loadedTextures.map}
            normalMap={loadedTextures.normalMap}
            roughnessMap={loadedTextures.roughnessMap}
            aoMap={loadedTextures.aoMap}
            displacementMap={loadedTextures.displacementMap}
            displacementScale={0.2}
            color={type === 'sun' ? "white" : "#ffffff"}
            roughness={0.3}
            metalness={type === 'sun' ? -4 : -4}
            emissive={color}
            emissiveIntensity={type === 'sun' ? 0 : 0}
            envMapIntensity={1}
            transparent={false}
            anisotropy={16}
          />
        </Sphere>

        {/* Title text wrapped around planet */}
        {createCurvedText(name, size, size * 0.15)}
        
        {/* Info panel */}
        {type !== 'sun' && (
          <InfoPanel 
            content={content}
            isActive={isActive}
            planetSize={size}
            color={color}
            panelConfig={panelConfig}
          />
        )}
      </mesh>

      {/* Add ring for Saturn */}
      {name === 'Mentorship' && (
        <mesh 
          ref={ringRef} 
          position={position}
          rotation={[Math.PI / 2, initialRotation, 2]}
        >
          <ringGeometry args={[size * 1.2, size * 1.8, 64]} />
          <meshStandardMaterial
            map={loadedTextures.ringTexture}
            color="#FFFFF"
            roughness={0.5}
            metalness={-6}
            transparent={true}
            opacity={1}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
};

export default CelestialBody; 