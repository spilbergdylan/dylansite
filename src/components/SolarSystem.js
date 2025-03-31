import React, { useEffect } from 'react';
import CelestialBody from './CelestialBody';
import { useScrollCamera } from '../hooks/useScrollCamera';
import sunTexture from '../assets/textures/sun/8k_sun.jpg';
import mercuryTexture from '../assets/textures/intro/8k_mercury.jpg';
import moonTexture from '../assets/textures/education/8k_moon.jpg';
import earthTexture from '../assets/textures/projects/8k_earth_daymap.jpg';
import marsTexture from '../assets/textures/skills/8k_mars.jpg';
import jupiterTexture from '../assets/textures/contact/8k_jupiter.jpg';
import StarField from './StarField';
import introPanelTexture from '../assets/textures/panels/mercury_text.jpg';
import educationPanelTexture from '../assets/textures/panels/moon_text.jpg';
import projectsPanelTexture from '../assets/textures/panels/earth_text.jpg';
import skillsPanelTexture from '../assets/textures/panels/mars_text.jpg';
import contactPanelTexture from '../assets/textures/panels/jupiter_text.jpg';
import { faEnvelope, faPhone, faLocationDot, faGlobe } from '@fortawesome/free-solid-svg-icons';

// Function to calculate position on orbit
const getOrbitPosition = (distance, angle) => {
  return [
    Math.cos(angle) * distance, // X
    0, // Y (keeping planets on same plane)
    Math.sin(angle) * distance  // Z
  ];
};

// Export the sections configuration
export const sectionsConfig = [
  { 
    name: 'Dylan Spilberg', 
    type: 'sun', 
    position: [0, 0, 0], 
    size: 15, 
    color: '#FDB813',
    viewOffset: 50,
    content: 'Software Engineer\n' +
            'Computer Engineering Student\n' +
            'Queen\'s University',
    textures: {
      map: sunTexture
    }
  },
  { 
    name: 'Introduction', 
    type: 'planet', 
    position: getOrbitPosition(100, Math.PI * 0.5),
    size: 3, 
    color: '#E27B58',
    viewOffset: 10,
    initialRotation: Math.PI * 1.5,
    content: '                 Hi, I\'m Dylan!\n' +
            'A Computer Engineering student at Queen\'s University\n' +
            'and Software Engineer based in Toronto.\n' +
            'I\'m passionate about creating innovative solutions\n' +
            'through full-stack development and AI,\n' +
            'while sharing knowledge with others.',
    textures: {
      map: mercuryTexture,
      panelTexture: introPanelTexture
    },
    panelConfig: {
      fontSize: 0.04,
      sections: [
        { 
          x: .02,          // Centered horizontally
          y: -0.1,       // Adjusted vertical position
          z: 0.05,
          maxWidth: 0.5, // Slightly reduced for better line breaks
          fontSize: 0.03,
          color: "#ffffff",
          textAlign: "center"  // Added text alignment
        }
      ]
    }
  },
  { 
    name: 'Education', 
    type: 'planet', 
    position: getOrbitPosition(180, Math.PI * 1.1),
    size: 4.5, 
    color: '#C7B0A5',
    viewOffset: 15,
    initialRotation: Math.PI * 0.1,
    content: 'Queen\'s University\n' +
            'Bachelor of Applied Science\n' +
            'Computer Engineering\n' +
            '2021-2025\n\n' +
            'Tanenbaum CHAT\n' +
            'High School Diploma\n' +
            '2017-2021',
    textures: {
      map: moonTexture,
      panelTexture: educationPanelTexture
    },
    panelConfig: {
      fontSize: 0.045,
      sections: [
        { 
          x: -0.225,
          y: -.02,
          z: 0.2,
          maxWidth: 0.45,
          fontSize: 0.03,
          color: "#ffeecc"
        },
        { 
          x: 0.27,
          y: 0.02,
          z: 0.2,
          maxWidth: 0.35,
          fontSize: 0.03,
          color: "#dddddd"
        }
      ]
    }
  },
  { 
    name: 'Projects', 
    type: 'planet', 
    position: getOrbitPosition(260, Math.PI * 1.7),
    size: 6, 
    color: '#4B72A3',
    viewOffset: 18,
    initialRotation: Math.PI * 0.7,
    content: 'Artemis Enterprise\n' +
            'AI Education Platform\n' +
            'Neural Networks, Web Development\n\n' +
            'Scribbles2\n' +
            'Notes Sharing Platform\n' +
            'Thousands Daily Users\n\n' +
            'Wedding Seating App\n' +
            'Customizable Web Server\n' +
            'User Interface Design',
    textures: {
      map: earthTexture,
      panelTexture: projectsPanelTexture
    },
    panelConfig: {
      fontSize: 0.035,
      lineHeight: 1.8,
      letterSpacing: 0.01,
      sections: [
        { 
          x: -0.4,
          y: 0.2,
          z: 0,
          maxWidth: 0.25,
          title: {
            text: "Artemis Enterprise",
            fontSize: 0.035,
            color: "#ffffff"
          },
          description: {
            text: "AI Education Platform\nNeural Networks, Web Development",
            fontSize: 0.02,
            color: "#cccccc"
          }
        },
        { 
          x: -0.2,
          y: -0.025,
          z: 0,
          maxWidth: 0.25,
          title: {
            text: "Scribbles2",
            fontSize: 0.035,
            color: "#ffffff"
          },
          description: {
            text: "Notes Sharing Platform\nThousands Daily Users",
            fontSize: 0.02,
            color: "#cccccc"
          }
        },
        { 
          x: 0,
          y: -0.25,
          z: 0,
          maxWidth: 0.25,
          title: {
            text: "Wedding Seating",
            fontSize: 0.035,
            color: "#ffffff"
          },
          description: {
            text: "Customizable Web Server\nUser Interface Design",
            fontSize: 0.02,
            color: "#cccccc"
          }
        }
      ]
    }
  },
  { 
    name: 'Skills', 
    type: 'planet', 
    position: getOrbitPosition(340, Math.PI * 0.2),
    size: 5, 
    color: '#CF503A',
    viewOffset: 15,
    initialRotation: Math.PI * 1.2,
    content: 'Technical Skills\n' +
            'Python • JavaScript • React\n' +
            'Node.js • HTML/CSS • Java\n' +
            'C • Linux • MATLAB\n\n' +
            'Soft Skills\n' +
            'Analytical Thinking\n' +
            'Fast Learning\n' +
            'Problem Solving',
    textures: {
      map: marsTexture,
      panelTexture: skillsPanelTexture
    },
    panelConfig: {
      fontSize: 0.04,
      sections: [
        { 
          x: -0.22,        // Left section (Technical Skills)
          y: 0,
          maxWidth: 0.4,
          fontSize: 0.025,
          color: "#ffffff"
        },
        { 
          x: 0.28,         // Right section (Soft Skills)
          y: 0,
          maxWidth: 0.4,
          fontSize: 0.025,
          color: "#ffffff"
        }
      ]
    }
  },
  { 
    name: 'Contact', 
    type: 'planet', 
    position: getOrbitPosition(420, Math.PI * 0.8),
    size: 9, 
    color: '#C88B3A',
    viewOffset: 28,
    initialRotation: Math.PI * 1.8,
    content: 'Email\n' +
            'spilbergdylan@gmail.com\n\n' +
            'Phone\n' +
            '647.620.9273\n\n' +
            'Location\n' +
            'Toronto, ON\n\n' +
            'LinkedIn\n' +
            'linkedin.com/in/dylanspilberg',
    textures: {
      map: jupiterTexture,
      panelTexture: contactPanelTexture
    },
    panelConfig: {
      fontSize: 0.035,
      sections: [
        { //email
          x: -0.225,
          y: 0.1,
          maxWidth: 0.25,
          fontSize: 0.03,
          color: "#ffffff"
        },
        { //phone
          x: 0.2,
          y: 0.105,
          maxWidth: 0.25,
          fontSize: 0.03,
          color: "#ffffff"
        },
        { //location
          x: -0.27,
          y: -0.1,
          maxWidth: 0.25,
          fontSize: 0.03,
          color: "#ffffff"
        },
        { //LinkedIn
          x: 0.2,
          y: -0.1,
          maxWidth: 0.25,
          fontSize: 0.03,
          color: "#ffffff"
        }
      ]
    }
  }
];

const SolarSystem = ({ onSectionChange }) => {
  const currentSection = useScrollCamera(sectionsConfig);

  // Update parent component when section changes
  useEffect(() => {
    onSectionChange(currentSection);
  }, [currentSection, onSectionChange]);

  return (
    <group>
      <StarField />
      
      {/* Add orbit rings */}
      {sectionsConfig.slice(1).map((section, index) => (
        <mesh key={`orbit-${index}`} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry 
            args={[
              Math.sqrt(section.position[0]**2 + section.position[2]**2) - 0.5,
              Math.sqrt(section.position[0]**2 + section.position[2]**2) + 0.5,
              64
            ]} 
          />
          <meshBasicMaterial color="#ffffff" opacity={0.1} transparent={true} />
        </mesh>
      ))}

      {/* Add celestial bodies */}
      {sectionsConfig.map((section, index) => (
        <CelestialBody 
          key={index} 
          {...section} 
          isActive={currentSection === index}
        />
      ))}
    </group>
  );
};

export default SolarSystem; 