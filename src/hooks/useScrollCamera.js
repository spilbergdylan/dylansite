import { useEffect, useState, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const useScrollCamera = (sections) => {
  const { camera } = useThree();
  const [currentSection, setCurrentSection] = useState(0);
  const animationRef = useRef(null);
  const isAnimating = useRef(false);

  const getIdealCameraDistance = (size) => {
    // Adjust camera distance based on planet size
    // Smaller planets need camera to be closer
    return Math.max(20, 30 - size * 2);
  };

  const animateToSection = (targetSection) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const startPosition = camera.position.clone();
    const targetPosition = new THREE.Vector3(
      sections[targetSection].position[0],
      sections[targetSection].position[1],
      sections[targetSection].position[2]
    );

    // Calculate the direction vector from start to target
    const direction = new THREE.Vector3().subVectors(targetPosition, startPosition).normalize();
    const distance = startPosition.distanceTo(targetPosition);
    
    // Adjust camera distance based on planet size
    const cameraDistance = sections[targetSection].viewOffset || getIdealCameraDistance(sections[targetSection].size);
    
    // Create control points that maintain more consistent height and reduce spinning
    const controlPoint1 = new THREE.Vector3().copy(startPosition).add(
      new THREE.Vector3(
        direction.x * distance * 0.25,
        15, // Reduced height
        direction.z * distance * 0.25
      )
    );

    const controlPoint2 = new THREE.Vector3().copy(targetPosition).add(
      new THREE.Vector3(
        -direction.x * distance * 0.25,
        15, // Reduced height
        -direction.z * distance * 0.25
      )
    );

    // Create a curved path for the camera that ends at a straight-on view
    const curve = new THREE.CubicBezierCurve3(
      startPosition,
      controlPoint1,
      controlPoint2,
      new THREE.Vector3(
        targetPosition.x - direction.x * cameraDistance,
        targetPosition.y, // Remove the height offset to be at eye level
        targetPosition.z - direction.z * cameraDistance
      )
    );

    let progress = 0;
    isAnimating.current = true;

    // Store initial and target look-at positions
    const startLookAt = new THREE.Vector3(...sections[currentSection].position);
    const endLookAt = new THREE.Vector3(...sections[targetSection].position);

    const animate = () => {
      progress += 0.008;

      if (progress <= 1) {
        const currentPoint = curve.getPoint(easeInOut(progress));
        camera.position.copy(currentPoint);

        // More gradual look-at transition
        const lookAtProgress = easeInOut(Math.min(progress * 1.2, 1));
        const currentLookAt = new THREE.Vector3(
          THREE.MathUtils.lerp(startLookAt.x, endLookAt.x, lookAtProgress),
          THREE.MathUtils.lerp(startLookAt.y, endLookAt.y, lookAtProgress),
          THREE.MathUtils.lerp(startLookAt.z, endLookAt.z, lookAtProgress)
        );
        
        camera.lookAt(currentLookAt);
        animationRef.current = requestAnimationFrame(animate);
      } else {
        isAnimating.current = false;
        camera.position.set(
          targetPosition.x - direction.x * cameraDistance,
          targetPosition.y,
          targetPosition.z - direction.z * cameraDistance
        );
        camera.lookAt(targetPosition);
      }
    };

    animate();
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const vh = window.innerHeight;
      
      // Calculate current section based on scroll position
      const section = Math.floor(scrollPosition / vh);
      const newSection = Math.min(section, sections.length - 1);
      
      if (newSection !== currentSection) {
        setCurrentSection(newSection);
        // For scroll navigation, animate through each section
        animateToSection(newSection);
      }
    };

    // Handle direct navigation from buttons
    const handleDirectNavigation = (event) => {
      const { targetSection } = event.detail;
      setCurrentSection(targetSection);
      
      const currentPosition = new THREE.Vector3(...sections[currentSection].position);
      const targetPosition = new THREE.Vector3(...sections[targetSection].position);
      
      // Calculate a higher midpoint that's offset toward the target
      const midPoint = new THREE.Vector3(
        currentPosition.x * 0.3 + targetPosition.x * 0.7, // Bias towards target
        Math.max(currentPosition.y, targetPosition.y) + 300, // Higher zoom out
        currentPosition.z * 0.3 + targetPosition.z * 0.7  // Bias towards target
      );

      const targetDistance = sections[targetSection].viewOffset || getIdealCameraDistance(sections[targetSection].size);

      // Create a single smooth curve instead of three segments
      const curve = new THREE.CubicBezierCurve3(
        camera.position.clone(), // Start at current camera position
        new THREE.Vector3( // First control point - up and slightly towards target
          camera.position.x * 0.7 + targetPosition.x * 0.3,
          midPoint.y,
          camera.position.z * 0.7 + targetPosition.z * 0.3
        ),
        new THREE.Vector3( // Second control point - high point biased towards target
          targetPosition.x,
          midPoint.y,
          targetPosition.z
        ),
        new THREE.Vector3( // End point
          targetPosition.x - targetDistance,
          targetPosition.y,
          targetPosition.z - targetDistance
        )
      );

      let progress = 0;
      const animate = () => {
        progress += 0.008;

        if (progress <= 1) {
          const currentPoint = curve.getPoint(easeInOut(progress));
          camera.position.copy(currentPoint);

          // Smoothly transition look-at target
          const lookAtProgress = easeInOut(progress);
          const lookAtPoint = new THREE.Vector3(
            THREE.MathUtils.lerp(currentPosition.x, targetPosition.x, lookAtProgress),
            THREE.MathUtils.lerp(currentPosition.y, targetPosition.y, lookAtProgress),
            THREE.MathUtils.lerp(currentPosition.z, targetPosition.z, lookAtProgress)
          );
          
          camera.lookAt(lookAtPoint);
          requestAnimationFrame(animate);
        }
      };

      animate();
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('directNavigation', handleDirectNavigation);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('directNavigation', handleDirectNavigation);
    };
  }, [animateToSection, camera, sections]);

  // Initial setup
  useEffect(() => {
    if (currentSection === 0) {
      const initialTarget = new THREE.Vector3(...sections[0].position);
      const initialDistance = sections[0].viewOffset || getIdealCameraDistance(sections[0].size);
      camera.position.set(
        initialTarget.x - initialDistance,
        initialTarget.y + 5,
        initialTarget.z + initialDistance
      );
      camera.lookAt(initialTarget);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      isAnimating.current = false;
    };
  }, [camera, sections]);

  return currentSection;
};

const easeInOut = (t) => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}; 