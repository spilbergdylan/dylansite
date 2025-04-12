import React, { useEffect } from 'react';
import CelestialBody from './CelestialBody';
import StarField from './StarField';
import { useScrollCamera } from '../hooks/useScrollCamera';
import sunTexture from '../assets/textures/sun/2k_sun.jpg';
import mercuryTexture from '../assets/textures/intro/2k_mercury.jpg';
import venusTexture from '../assets/textures/venus/2k_venus_surface.jpg';
import earthTexture from '../assets/textures/projects/2k_earth_daymap.jpg';
import marsTexture from '../assets/textures/skills/2k_mars.jpg';
import jupiterTexture from '../assets/textures/contact/2k_jupiter.jpg';
import saturnTexture from '../assets/textures/saturn/2k_saturn.jpg';
import saturnRingTexture from '../assets/textures/saturn/2k_saturn_ring_alpha.png';
import uranusTexture from '../assets/textures/uranus/8k_uranus.jpg';
import neptuneTexture from '../assets/textures/neptune/8k_neptune.jpg';

// Function to calculate position on orbit
const getOrbitPosition = (distance, angle) => {
  return [
    Math.cos(angle) * distance,
    0,
    Math.sin(angle) * distance
  ];
};

// Export the sections configuration
export const sectionsConfig = [
  { 
    name: 'Dylan Spilberg', 
    type: 'sun', 
    position: [0, 0, 0], 
    size: 20, 
    color: '#FDB813',
    viewOffset: 50,
    mobileViewOffset: 65,
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
    position: getOrbitPosition(800, Math.PI * 0.5),
    size: 3, 
    color: '#E27B58',
    viewOffset: 8,
    mobileViewOffset: 12,
    initialRotation: Math.PI * 1.5,
    content: '                 Hi, I\'m Dylan!\n' +
            'A Computer Engineering student at Queen\'s University\n' +
            'and Software Engineer based in Toronto.\n' +
            'I\'m passionate about creating innovative solutions\n' +
            'through full-stack development and AI,\n' +
            'while sharing knowledge with others.',
    textures: {
      map: mercuryTexture
    },
    panelConfig: {
      fontSize: 0.04,
      sections: [
        { 
          x: .02,
          y: -0.1,
          z: 0.05,
          maxWidth: 0.5,
          fontSize: 0.03,
          color: "#ffffff",
          textAlign: "center"
        }
      ]
    }
  },
  { 
    name: 'Education', 
    type: 'planet', 
    position: getOrbitPosition(1200, Math.PI * 0.8),
    size: 4, 
    color: '#E6B89C',
    viewOffset: 10,
    mobileViewOffset: 13,
    initialRotation: Math.PI * 0.1,
    content: 'Queen\'s University\n' +
            'Bachelor of Applied Science\n' +
            'Computer Engineering\n' +
            '2021-2025\n\n' +
            'Tanenbaum CHAT\n' +
            'High School Diploma\n' +
            '2017-2021',
    textures: {
      map: venusTexture
    },
    panelConfig: {
      fontSize: 0.045,
      sections: [
        { 
          x: -0.15,
          y: -.018,
          z: 0.2,
          maxWidth: 0.45,
          fontSize: 0.02,
          color: "#ffffff"
        },
        { 
          x: 0.2,
          y: 0.02,
          z: 0.2,
          maxWidth: 0.35,
          fontSize: 0.02,
          color: "#ffffff"
        }
      ]
    }
  },
  { 
    name: 'Projects', 
    type: 'planet', 
    position: getOrbitPosition(1600, Math.PI * 1.1),
    size: 4.5, 
    color: '#4B72A3',
    viewOffset: 12,
    mobileViewOffset: 14,
    initialRotation: Math.PI * 0.7,
    content: 'Artemis Enterprise\n' +
            'AI LMS Platform\n' +
            'Neural Networks, Full Stack Development\n\n' +
            'Scribbles2\n' +
            'Notes Sharing Platform\n' +
            'Thousands of Users\n\n' +
            'Wedding Seating App\n' +
            'Customizable Web Server\n' +
            'User Interface Design',
    textures: {
      map: earthTexture
    },
    panelConfig: {
      fontSize: 0.035,
      lineHeight: 1.8,
      letterSpacing: 0.01,
      sections: [
        { 
          x: -0.5,
          y: 0.15,
          z: 0,
          maxWidth: 0.25,
          title: {
            text: "Artemis Enterprise",
            fontSize: 0.035,
            color: "#ffffff"
          },
          description: {
            text: "AI Learning Management System\nNeural Networks, Full Stack Development",
            fontSize: 0.025,
            color: "#ffffff"
          }
        },
        { 
          x: -0.2,
          y: -0.1,
          z: 0,
          maxWidth: 0.25,
          title: {
            text: "Scribbles2",
            fontSize: 0.035,
            color: "#ffffff"
          },
          description: {
            text: "Notes Sharing Platform\nThousands of Users",
            fontSize: 0.025,
            color: "#ffffff"
          }
        },
        { 
          x: 0,
          y: -0.35,
          z: 0,
          maxWidth: 0.25,
          title: {
            text: "Casaloma Wedding App",
            fontSize: 0.035,
            color: "#ffffff"
          },
          description: {
            text: "User Interface Design\nCustom Admin Dashboard",
            fontSize: 0.025,
            color: "#ffffff"
          }
        }
      ]
    }
  },
  { 
    name: 'Skills', 
    type: 'planet', 
    position: getOrbitPosition(2200, Math.PI * 1.4),
    size: 4, 
    color: '#CF503A',
    viewOffset: 10,
    mobileViewOffset: 13,
    initialRotation: Math.PI * 1.3,
    content: 'Technical Skills\n' +
            'Python • JavaScript • Ruby\n' +
            'React • Node.js • Java\n' +
            'C • Ruby on Rails • SQL\n\n' +
            'Soft Skills\n' +
            'Analytical Thinking\n' +
            'Fast Learning\n' +
            'Problem Solving',
    textures: {
      map: marsTexture
    },
    panelConfig: {
      fontSize: 0.04,
      sections: [
        { 
          x: -0.2,
          y: 0,
          maxWidth: 0.4,
          fontSize: 0.025,
          color: "#ffffff"
        },
        { 
          x: 0.25,
          y: 0,
          maxWidth: 0.4,
          fontSize: 0.025,
          color: "#ffffff"
        }
      ]
    }
  },
  { 
    name: 'Job Experience', 
    type: 'planet', 
    position: getOrbitPosition(2800, Math.PI * 1.7),
    size: 8, 
    color: '#C88B3A',
    viewOffset: 20,
    mobileViewOffset: 26,
    initialRotation: Math.PI * 1.8,
    content: 'Founder & Lead Developer\n' +
    'Artemis Enterprise\n' +
    'AI LMS Platform\n\n' +
    'Founder & Developer\n' +
    'Scribbles2 Platform\n' +
    'Thousands of Users\n\n' +
    'Technical Lead\n' +
    'ShadowLight CattleCar\n' +
    '360° Museum Exhibit',
    textures: {
      map: jupiterTexture
    },
    panelConfig: {
      fontSize: 0.035,
      sections: [
        { 
          x: -0.2,
          y: 0.1,
          maxWidth: 0.25,
          fontSize: 0.025,
          color: "#ffffff"
        },
        { 
          x: 0.25,
          y: 0.105,
          maxWidth: 0.25,
          fontSize: 0.025,
          color: "#ffffff"
        },
        { 
          x: 0,
          y: -0.15,
          maxWidth: 0.25,
          fontSize: 0.025,
          color: "#ffffff"
        }
      ]
    }
  },
  { 
    name: 'Mentorship', 
    type: 'planet', 
    position: getOrbitPosition(3400, Math.PI * 2.0),
    size: 7, 
    color: '#E3DCCB',
    viewOffset: 18,
    mobileViewOffset: 26,
    initialRotation: Math.PI * 0.3,
    content: 'Engineering Teacher\n' +
            'Exceed Robotics\n' +
            'Physics, Java, Electronics\n\n' +
            'Instructor\n' +
            'The School of Beit Rayim\n' +
            'Student Development\n\n' +
            'Technical Educator\n' +
            'ShadowLight CattleCar\n' +
            'Museum Education',
    textures: {
      map: saturnTexture,
      ringTexture: saturnRingTexture
    },
    panelConfig: {
      fontSize: 0.035,
      sections: [
        { 
          x: -0.22,
          y: 0.11,
          maxWidth: 0.25,
          fontSize: 0.025,
          color: "#ffffff"
        },
        { 
          x: 0.25,
          y: 0.105,
          maxWidth: 0.25,
          fontSize: 0.025,
          color: "#ffffff"
        },
        { 
          x: 0,
          y: -0.15,
          maxWidth: 0.25,
          fontSize: 0.025,
          color: "#ffffff"
        }
      ]
    }
  },
  { 
    name: 'Interests', 
    type: 'planet', 
    position: getOrbitPosition(4000, Math.PI * 2.3),
    size: 5, 
    color: '#B5E5CF',
    viewOffset: 12,
    mobileViewOffset: 17,
    initialRotation: Math.PI * 0.6,
    content: 'Artificial Intelligence\n' +
            'Machine Learning\n' +
            'Neural Networks\n\n' +
            'Space Technology\n' +
            'Astronomy\n' +
            'Physics\n\n' ,
    textures: {
      map: uranusTexture
    },
    panelConfig: {
      fontSize: 0.035,
      sections: [
        { 
          x: -0.2,
          y: 0.005,
          maxWidth: 0.20,
          fontSize: 0.03,
          color: "#ffffff"
        },
        { 
          x: 0.2,
          y: 0,
          maxWidth: 0.25,
          fontSize: 0.03,
          color: "#ffffff"
        }
      ]
    }
  },
  { 
    name: 'Contact', 
    type: 'planet', 
    position: getOrbitPosition(4600, Math.PI * 2.6),
    size: 5, 
    color: '#5B5DDF',
    viewOffset: 12,
    mobileViewOffset: 17,
    initialRotation: Math.PI * 0.9,
    content: 'Email\n' +
            'spilbergdylan@gmail.com\n\n' +
            'Phone\n' +
            '647.620.9273\n\n' +
            'Location\n' +
            'Toronto, ON\n\n' +
            'LinkedIn\n' +
            'linkedin.com/in/dylanspilberg',
    textures: {
      map: neptuneTexture
    },
    panelConfig: {
      fontSize: 0.035,
      sections: [
        { 
          x: -0.225,
          y: 0.1,
          maxWidth: 0.25,
          fontSize: 0.03,
          color: "#ffffff"
        },
        { 
          x: 0.2,
          y: 0.105,
          maxWidth: 0.25,
          fontSize: 0.03,
          color: "#ffffff"
        },
        { 
          x: -0.27,
          y: -0.1,
          maxWidth: 0.25,
          fontSize: 0.03,
          color: "#ffffff"
        },
        { 
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
    <>
      <StarField />
      <group>      
        {/* Add orbit rings
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
        ))} */}

        {/* Add celestial bodies */}
        {sectionsConfig.map((section, index) => (
          <CelestialBody 
            key={index} 
            {...section} 
            isActive={currentSection === index}
          />
        ))}
      </group>
    </>
  );
};

export default SolarSystem; 