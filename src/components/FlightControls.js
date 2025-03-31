import React from 'react';
import styled from 'styled-components';

const ControlPanel = styled.div`
  position: fixed;
  right: 20px;
  top: 75%;
  transform: translateY(-50%) perspective(2000px) rotateY(-10deg);
  background-color: #2A363B;
  border-radius: 12px;
  padding: 25px 20px;
  box-shadow: 
    /* Inner panel shadow */
    inset 0 1px 8px rgba(0, 0, 0, 0.4),
    /* Outer edge highlight */
    0 -1px 0px #4A5A60,
    /* Outer panel shadow */
    0 5px 15px rgba(0, 0, 0, 0.4),
    /* Side shadow for 3D effect */
    -10px 10px 20px rgba(0, 0, 0, 0.6),
    /* Ambient light reflection */
    0 0 20px rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 300px;
  height: 480px;
  border: 2px solid #1A262B;
  border-right: 15px solid #1A262B;
  transform-style: preserve-3d;
  & > * {
    pointer-events: auto;
  }
  pointer-events: all;
`;

const NavigationControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 0;
  margin-top: auto;
  margin-bottom: 20px;
  width: 100%;
  z-index: 10;
`;

const NavButton = styled.button`
  background: linear-gradient(to bottom, #3D4D53, #2A363B);
  border: 2px solid #1A262B;
  border-radius: 8px;
  padding: 12px 25px;
  min-width: 100px;
  color: #B8B8B8;
  font-family: 'Courier New', monospace;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  box-shadow:
    inset 0 1px 3px rgba(0, 0, 0, 0.3),
    0 1px 0 rgba(255, 255, 255, 0.1);
  z-index: 20;
  pointer-events: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  white-space: nowrap;
  user-select: none;

  &:hover:not(:disabled) {
    background: linear-gradient(to bottom, #4A5A60, #3D4D53);
    transform: translateY(-1px);
    box-shadow:
      inset 0 1px 3px rgba(0, 0, 0, 0.3),
      0 1px 0 rgba(255, 255, 255, 0.1),
      0 0 15px rgba(255, 255, 255, 0.2);
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PanelTitle = styled.div`
  color: #B8B8B8;
  font-family: 'Courier New', monospace;
  text-align: center;
  padding: 8px;
  margin: -5px -5px 10px -5px;
  border: 2px solid #1A262B;
  border-radius: 6px;
  background: linear-gradient(to bottom, #3D4D53, #2A363B);
  letter-spacing: 2px;
  font-weight: bold;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  box-shadow:
    /* Inner shadow */
    inset 0 1px 3px rgba(0, 0, 0, 0.3),
    /* Outer highlight */
    0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(to bottom, 
      rgba(255, 255, 255, 0.1),
      transparent
    );
    border-radius: 4px 4px 0 0;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  gap: 20px;
  margin-top: 20px;
`;

const PlanetButton = styled.button`
  background: ${props => props.isActive 
    ? `linear-gradient(to bottom, 
        ${props.color}30, 
        ${props.color}50
      )`
    : 'linear-gradient(to bottom, #3D4D53, #2A363B)'
  };
  border: 2px solid ${props => props.isActive ? props.color : '#1A262B'};
  border-radius: 8px;
  padding: 0 15px;
  width: 70%;
  height: 50px;
  color: ${props => props.isActive ? props.color : '#B8B8B8'};
  font-family: 'Courier New', monospace;
  font-size: 18px;
  font-weight: ${props => props.isActive ? 'bold' : 'normal'};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  text-align: center;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  box-shadow:
    /* Inner shadow */
    inset 0 1px 3px rgba(0, 0, 0, 0.3),
    /* Outer highlight top */
    0 1px 0 rgba(255, 255, 255, 0.1),
    /* Active glow */
    0 0 ${props => props.isActive ? '15px' : '0'} ${props => props.color}30;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  &:hover {
    background: linear-gradient(to bottom,
      ${props => props.color}30,
      ${props => props.color}50
    );
    border-color: ${props => props.color};
    transform: translateY(-1px);
    box-shadow:
      inset 0 1px 3px rgba(0, 0, 0, 0.3),
      0 1px 0 rgba(255, 255, 255, 0.1),
      0 0 20px ${props => props.color}30;
  }

  &:active {
    transform: translateY(1px);
  }

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    right: 15px;
    width: 12px;
    height: 12px;
    background: ${props => props.isActive 
      ? `radial-gradient(circle at center,
          ${props.color},
          ${props.color}80 40%,
          ${props.color}40 70%
        )`
      : '#1A262B'
    };
    border-radius: 50%;
    transform: translateY(-50%);
    box-shadow: 
      /* Inner light */
      inset 0 0 2px ${props => props.isActive ? props.color : '#4A5A60'},
      /* Outer glow */
      0 0 ${props => props.isActive ? '10px' : '0'} ${props => props.color},
      /* Surface reflection */
      0 -1px 0 rgba(255, 255, 255, 0.2);
    border: 1px solid ${props => props.isActive ? props.color : '#4A5A60'};
  }

  & > span {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 40px;
  }
`;

const Screws = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background: radial-gradient(circle at 30% 30%, 
    #4A5A60,
    #2A363B
  );
  border-radius: 50%;
  border: 1px solid #1A262B;
  box-shadow:
    /* Inner shadow */
    inset 0 1px 2px rgba(0, 0, 0, 0.8),
    /* Outer highlight */
    0 1px 0 rgba(255, 255, 255, 0.1);
  
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 4px;
    height: 1px;
    background: #1A262B;
    transform: translate(-50%, -50%);
  }

  &.top-left { top: 10px; left: 10px; transform: rotate(45deg); }
  &.top-right { top: 10px; right: 10px; transform: rotate(135deg); }
  &.bottom-left { bottom: 10px; left: 10px; transform: rotate(-45deg); }
  &.bottom-right { bottom: 10px; right: 10px; transform: rotate(-135deg); }
`;

const FlightControls = ({ sections, currentSection, onNavigate }) => {
  const handlePrevious = () => {
    if (currentSection > 0) {
      onNavigate(currentSection - 1);
    }
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      onNavigate(currentSection + 1);
    }
  };

  return (
    <ControlPanel>
      <Screws className="top-left" />
      <Screws className="top-right" />
      <Screws className="bottom-left" />
      <Screws className="bottom-right" />
      
      <PanelTitle>FLIGHT CONTROLS</PanelTitle>
      
      <ButtonContainer>
        {sections.map((section, index) => (
          <PlanetButton
            key={index}
            isActive={currentSection === index}
            color={section.color}
            onClick={() => onNavigate(index)}
          >
            <span>{section.name.toUpperCase()}</span>
          </PlanetButton>
        ))}
      </ButtonContainer>

      <NavigationControls>
        <NavButton 
          onClick={handlePrevious}
          disabled={currentSection === 0}
        >
          ◄ PREV
        </NavButton>
        <NavButton 
          onClick={handleNext}
          disabled={currentSection === sections.length - 1}
        >
          NEXT ►
        </NavButton>
      </NavigationControls>
    </ControlPanel>
  );
};

export default FlightControls; 