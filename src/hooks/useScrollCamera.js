import { useEffect, useState, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const useScrollCamera = (sections) => {
  const { camera } = useThree();
  const [currentSection, setCurrentSection] = useState(0);
  const animationRef = useRef(null);
  const isAnimating = useRef(false);
  
  // Simple mobile detection
  const isMobile = window.innerWidth <= 768;
  
  // Mobile adjustments
  const mobileVerticalOffset = isMobile ? 0 : 0;

  const getIdealCameraDistance = (size) => {
    // Adjust camera distance based on planet size
    // Smaller planets need camera to be closer
    return Math.max(20, 30 - size * 2);
  };

  const getViewOffset = (section) => {
    // Use mobileViewOffset if on mobile and it exists, otherwise use viewOffset or calculated distance
    if (isMobile && section.mobileViewOffset !== undefined) {
      return section.mobileViewOffset;
    }
    return section.viewOffset || getIdealCameraDistance(section.size);
  };

  const animateToSection = (targetSection) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const startPosition = camera.position.clone();
    const targetPosition = new THREE.Vector3(
      sections[targetSection].position[0],
      sections[targetSection].position[1] + mobileVerticalOffset,
      sections[targetSection].position[2]
    );

    // Calculate the direction vector from start to target
    const direction = new THREE.Vector3().subVectors(targetPosition, startPosition).normalize();
    const distance = startPosition.distanceTo(targetPosition);
    
    // Adjust camera distance based on planet size
    const cameraDistance = getViewOffset(sections[targetSection]);
    
    // Create control points with no height offset to keep camera level
    const controlPoint1 = new THREE.Vector3().copy(startPosition).add(
      new THREE.Vector3(
        direction.x * distance * 0.25,
        startPosition.y - startPosition.y + targetPosition.y, // Keep at target height
        direction.z * distance * 0.25
      )
    );

    const controlPoint2 = new THREE.Vector3().copy(targetPosition).add(
      new THREE.Vector3(
        -direction.x * distance * 0.25,
        targetPosition.y - targetPosition.y + targetPosition.y, // Keep at target height
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
        targetPosition.y, // Keep at target height
        targetPosition.z - direction.z * cameraDistance
      )
    );

    let progress = 0;
    isAnimating.current = true;

    // Store initial and target look-at positions
    const startLookAt = new THREE.Vector3(
      sections[currentSection].position[0],
      sections[currentSection].position[1] + mobileVerticalOffset,
      sections[currentSection].position[2]
    );
    const endLookAt = new THREE.Vector3(
      sections[targetSection].position[0],
      sections[targetSection].position[1] + mobileVerticalOffset,
      sections[targetSection].position[2]
    );

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
          targetPosition.y, // Keep at target height
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
      animateToSection(targetSection);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('directNavigation', handleDirectNavigation);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('directNavigation', handleDirectNavigation);
    };
  }, [animateToSection, camera, sections, currentSection]);

  // Initial setup
  useEffect(() => {
    if (currentSection === 0) {
      const initialTarget = new THREE.Vector3(
        sections[0].position[0],
        sections[0].position[1] + mobileVerticalOffset,
        sections[0].position[2]
      );
      const initialDistance = getViewOffset(sections[0]);
      camera.position.set(
        initialTarget.x - initialDistance,
        initialTarget.y, // Keep at target height
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