import React from 'react';
import styled from 'styled-components';

const FlightControlsContainer = styled.div`
  @media (max-width: 768px) {
    .control-panel {
      display: none !important;
    }
  }
`;

const ControlPanel = styled.div`
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #2A363B;
  border: 2px solid #1A262B;
  border-radius: 10px;
  padding: 20px;
  width: 18vw;
  min-width: 200px;
  max-width: 300px;
  height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  overflow: hidden;
  pointer-events: auto;
`;

const NavigationControls = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 20px;
  gap: 10px;
`;

const NavButton = styled.button`
  background: linear-gradient(to bottom, #3D4D53, #2A363B);
  border: 2px solid #1A262B;
  border-radius: 8px;
  padding: 1vh 1.5vw;
  min-width: 80px;
  color: #B8B8B8;
  font-family: 'Courier New', monospace;
  font-size: 1.2vh;
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
  padding: 1vh 1vw;
  margin: 2px -5px 1vh -5px;
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
  font-size: 1.5vh;
  
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
  gap: 2vh;
  margin-top: 2vh;
`;

const PlanetButton = styled.button`
  background: ${({ isActive, color }) => isActive 
    ? `linear-gradient(to bottom, 
        ${color}30, 
        ${color}50
      )`
    : 'linear-gradient(to bottom, #3D4D53, #2A363B)'
  };
  border: 2px solid ${({ isActive, color }) => isActive ? color : '#1A262B'};
  border-radius: 8px;
  padding: 0 1vw;
  width: 70%;
  height: 5vh;
  color: ${({ isActive, color }) => isActive ? color : '#B8B8B8'};
  font-family: 'Courier New', monospace;
  font-size: 1.5vh;
  font-weight: ${({ isActive }) => isActive ? 'bold' : 'normal'};
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
    0 0 ${({ isActive, color }) => isActive ? '15px' : '0'} ${({ color }) => color}30;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  &:hover {
    background: linear-gradient(to bottom,
      ${({ color }) => color}30,
      ${({ color }) => color}50
    );
    border-color: ${({ color }) => color};
    transform: translateY(-1px);
    box-shadow:
      inset 0 1px 3px rgba(0, 0, 0, 0.3),
      0 1px 0 rgba(255, 255, 255, 0.1),
      0 0 20px ${({ color }) => color}30;
  }

  &:active {
    transform: translateY(1px);
  }

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    right: 1vw;
    width: 0.8vw;
    height: 0.8vw;
    background: ${({ isActive, color }) => isActive 
      ? `radial-gradient(circle at center,
          ${color},
          ${color}80 40%,
          ${color}40 70%
        )`
      : '#1A262B'
    };
    border-radius: 50%;
    transform: translateY(-50%);
    box-shadow: 
      /* Inner light */
      inset 0 0 2px rgba(255, 255, 255, 0.3),
      /* Outer glow */
      0 0 5px ${({ isActive, color }) => isActive ? color : 'rgba(0, 0, 0, 0.5)'};
  }
`;

const Screws = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background: #1A262B;
  border-radius: 50%;
  box-shadow: 
    inset 0 0 5px rgba(0, 0, 0, 0.5),
    0 0 5px rgba(255, 255, 255, 0.2);
  
  &.top-left {
    top: 10px;
    left: 10px;
  }
  
  &.top-right {
    top: 10px;
    right: 10px;
  }
  
  &.bottom-left {
    bottom: 10px;
    left: 10px;
  }
  
  &.bottom-right {
    bottom: 10px;
    right: 10px;
  }
`;

const MobileControls = styled.div`
  display: none;
  position: fixed;
  bottom: 20px;
  left: 0;
  right: 0;
  z-index: 1000;
  pointer-events: none;
  
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
`;

const MobileNavButton = styled(NavButton)`
  min-width: 80px;
  padding: 12px 20px;
  font-size: 14px;
  margin: 0;
  pointer-events: auto;
  background: linear-gradient(to bottom, #3D4D53, #2A363B);
  border: 2px solid #1A262B;
  box-shadow: 
    0 4px 8px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 
      0 6px 12px rgba(0, 0, 0, 0.4),
      0 0 25px rgba(0, 0, 0, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }
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
    <FlightControlsContainer>
      <ControlPanel className="control-panel">
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

      <MobileControls>
        <MobileNavButton 
          onClick={handlePrevious}
          disabled={currentSection === 0}
        >
          ◄ PREV
        </MobileNavButton>
        <MobileNavButton 
          onClick={handleNext}
          disabled={currentSection === sections.length - 1}
        >
          NEXT ►
        </MobileNavButton>
      </MobileControls>
    </FlightControlsContainer>
  );
};

export default FlightControls; 