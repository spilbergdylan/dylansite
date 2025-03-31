import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';

const StarField = ({ count = 5000 }) => {
  const points = useRef();
  
  // Generate random star positions
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    // Create a sphere of stars
    const radius = 1000;
    const phi = Math.random() * Math.PI * 2;
    const theta = Math.random() * Math.PI;
    
    positions[i3] = radius * Math.sin(theta) * Math.cos(phi);
    positions[i3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
    positions[i3 + 2] = radius * Math.cos(theta);
    
    // Random star colors (mostly white with hints of blue and yellow)
    colors[i3] = Math.random() * 0.3 + 0.7;
    colors[i3 + 1] = Math.random() * 0.3 + 0.7;
    colors[i3 + 2] = Math.random() * 0.3 + 0.7;
  }

  // Slow rotation effect
  useFrame((state) => {
    points.current.rotation.y += 0.0001;
    points.current.rotation.x += 0.0001;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={2}
        sizeAttenuation={true}
        vertexColors={true}
        transparent={true}
        opacity={0.8}
      />
    </points>
  );
};

export default StarField; 