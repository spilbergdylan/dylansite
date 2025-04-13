import React from 'react';
import styled, { keyframes } from 'styled-components';
import { lighten, darken } from 'polished';

// --- Keyframes for Animation ---
const pulseGlow = keyframes`
  0%, 100% { opacity: 0.7; box-shadow-spread: 0px; }
  50% { opacity: 1; box-shadow-spread: 2px; }
`;

const radarSweep = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Keyframe for button press feedback
const pressPulse = keyframes`
  0% { box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.6); }
  50% { box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.6), inset 0 0 10px rgba(255, 255, 255, 0.1); }
  100% { box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.6); }
`;

// --- Base Styles & Container ---
const FlightControlsContainer = styled.div`
  perspective: 1000px; /* Slightly increased perspective */
  perspective-origin: center 30%; /* Adjusted origin for a more direct view */
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 25vh;
  pointer-events: none;
  z-index: 999;
`;

// Base style for all panel sections
const BaseCockpitPanel = styled.div`
  position: absolute;
  bottom: 5px;
  height: 20vh;
  /* Enhanced gradient for more depth */
  background: linear-gradient(170deg, #303438, #1e2124); 
  /* Metallic Bevel/Frame effect */
  border: 1px solid #101214; /* Dark base border */
  border-top-color: #4a4e53; /* Lighter top edge */
  border-radius: 4px; /* Slightly more rounding */
  /* Complex shadow for depth and metallic feel */
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.08), /* Inner top highlight */
    inset 0 -1px 0 rgba(0,0,0,0.3), /* Inner bottom shadow */
    0 0 1px rgba(0,0,0,0.6), /* Tight outer shadow */
    0 4px 10px rgba(0,0,0,0.4); /* Main drop shadow */
  transform-style: preserve-3d;
  pointer-events: auto;

  /* Enhanced Noise Texture */
  &::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6"><path fill="%23fff" fill-opacity="0.03" d="M0 0h1v1H0zm2 0h1v1H2zm4 0h1v1H4zM1 2h1v1H1zm2 0h1v1H3zm2 0h1v1H5zM0 4h1v1H0zm2 0h1v1H2zm4 0h1v1H4zM1 5h1v1H1zm2 0h1v1H3zm2 0h1v1H5z" /></svg>');
    pointer-events: none;
    opacity: 0.5; /* Slightly more visible noise */
    z-index: 1;
    border-radius: inherit;
    mix-blend-mode: overlay; /* Blend noise */
  }
`;

const ControlPanel = styled(BaseCockpitPanel)`
  left: 50%;
  transform: translateX(-50%);
  width: 55vw;
  max-width: 1200px;
  border-top: 10px solid transparent; /* Keep for ledge spacing */
  border-radius: 4px 4px 0 0; /* Match base */

  /* Adjust shadows for central panel emphasis */
  box-shadow: 
      inset 0 1px 0 rgba(255, 255, 255, 0.08), 
      inset 0 -1px 0 rgba(0,0,0,0.3), 
      0 -8px 15px rgba(0, 0, 0, 0.55), /* Stronger top shadow */
      0 2px 5px rgba(0, 0, 0, 0.3); /* Ground shadow */
  z-index: 1000;

  /* Keep tilt, adjusted perspective handles some angle */
  transform-origin: bottom center;
  transform: translateX(-50%) rotateX(18deg); /* Slightly reduced angle */

  /* Enhanced Ledge */
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 10px; /* Match border-top */
    background: linear-gradient(to bottom, #52575c, #3e4247); /* Slightly lighter ledge */
    transform-origin: top center;
    transform: rotateX(-90deg);
    z-index: 0;
    border-radius: 0 0 3px 3px; /* Smoother rounding */
    box-shadow: 
      inset 0 1px 0 rgba(255, 255, 255, 0.15), /* Stronger ledge highlight */
      inset 0 -1px 2px rgba(0, 0, 0, 0.5), /* Deeper ledge shadow */
      0 2px 3px rgba(0, 0, 0, 0.3); 
  }

  &::after { z-index: 1; border-radius: inherit; }

  @media (max-width: 768px) {
    height: 18vh; /* Slightly less height */
    width: 75vw; /* Adjust width */
    transform: translateX(-50%) rotateX(15deg); /* Adjust mobile tilt */
    border-top-width: 8px;
    box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.6), 0 1px 3px rgba(0, 0, 0, 0.4);
    &::before { height: 8px; }
  }
`;

// Outer Left Panel (adjusted for frame)
const OuterLeftPanel = styled(BaseCockpitPanel)`
  width: 30vw;
  height: 19vh; /* Slightly shorter */
  top: 5vh; /* Adjusted position */
  /* Push further left, accounting for rotation */
  left: calc(50% - 27.5vw - 30vw + 10px); /* Adjust calculation */
  transform-origin: center right;
  /* Simplify transform: Remove rotateY and translateZ, keep rotateX */
  transform: rotateX(18deg);
  z-index: 990;
  border-top: 10px solid transparent; /* Ledge space */
  border-right: none; /* No border facing center */
  border-radius: 4px 0 0 4px;
  /* Specific shadows */
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.08), 
    inset 0 -1px 0 rgba(0,0,0,0.3),
    0 -4px 8px rgba(0,0,0,0.5), /* Ledge shadow */
    5px 5px 12px rgba(0,0,0,0.5); /* Outer/bottom shadow */

  /* Ledge */
  &::before {
     content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 10px; /* Match border-top */
    background: linear-gradient(to bottom, #52575c, #3e4247); /* Slightly lighter ledge */
    transform-origin: top center;
    transform: rotateX(-90deg);
    z-index: 0;
    border-radius: 0 0 3px 3px; /* Smoother rounding */
    box-shadow: 
      inset 0 1px 0 rgba(255, 255, 255, 0.15), /* Stronger ledge highlight */
      inset 0 -1px 2px rgba(0, 0, 0, 0.5), /* Deeper ledge shadow */
      0 2px 3px rgba(0, 0, 0, 0.3); 
  }

  @media (max-width: 768px) {
    width: 15vw;
    left: calc(50% - 37.5vw - 15vw + 5px); /* Adjust mobile pos */
    /* Simplify mobile transform */
    transform: rotateX(15deg); 
    border-top-width: 8px;
    box-shadow: 0 -2px 5px rgba(0,0,0,0.5), 2px 2px 6px rgba(0,0,0,0.6);
    &::before { height: 8px; }
  }
`;

// Outer Right Panel (adjusted for frame)
const OuterRightPanel = styled(BaseCockpitPanel)`
  width: 30vw;
  height: 19vh;
  top: 5vh;
  /* Push further right */
  left: calc(50% + 27.5vw - 10px); /* Adjust calculation */
  transform-origin: center left;
  transform: rotateY(-15deg) rotateX(18deg) translateZ(-10px); /* Apply angle, keep tilt consistent */
  z-index: 990;
  border-top: 10px solid transparent;
  border-left: none;
  border-radius: 0 4px 4px 0;
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.08), 
    inset 0 -1px 0 rgba(0,0,0,0.3),
    0 -4px 8px rgba(0,0,0,0.5), 
    -5px 5px 12px rgba(0,0,0,0.5);

  /* Ledge */
   &::before {
     content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 10px; /* Match border-top */
    background: linear-gradient(to bottom, #52575c, #3e4247); /* Slightly lighter ledge */
    transform-origin: top center;
    transform: rotateX(-90deg);
    z-index: 0;
    border-radius: 0 0 3px 3px; /* Smoother rounding */
    box-shadow: 
      inset 0 1px 0 rgba(255, 255, 255, 0.15), /* Stronger ledge highlight */
      inset 0 -1px 2px rgba(0, 0, 0, 0.5), /* Deeper ledge shadow */
      0 2px 3px rgba(0, 0, 0, 0.3); 
  }

  @media (max-width: 768px) {
    width: 15vw;
    left: calc(50% + 37.5vw - 5px);
    transform: rotateY(-20deg) rotateX(15deg) translateZ(-5px);
    border-top-width: 8px;
    box-shadow: 0 -2px 5px rgba(0,0,0,0.5), -2px 2px 6px rgba(0,0,0,0.6);
    &::before { height: 8px; }
  }
`;

// Wrapper to group controls
const MainControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* Keep centered */
  gap: 40px; /* Increased gap */
  position: relative;
  z-index: 2;
  padding-top: 15px; /* More space below ledge */
  padding-left: 20px; /* Padding for visual balance */
  padding-right: 20px;
  box-sizing: border-box;
  width: 100%; /* Ensure wrapper fills */

  @media (max-width: 1024px) { gap: 25px; }
  @media (max-width: 768px) {
     gap: 15px;
     padding-top: 10px;
     padding-left: 10px;
     padding-right: 10px;
  }
`;

// Sub-Panel Base Style
const SubPanel = styled.div`
  padding: 10px 15px; /* More padding */
  background-color: rgba(10, 12, 14, 0.5); /* Darker, slightly transparent inset */
  border-radius: 5px; /* Smoother radius */
  box-shadow: 
    inset 0 2px 5px rgba(0,0,0,0.8), /* Deeper inset shadow */
    inset 0 0 0 1px rgba(0,0,0,0.6); /* Inner border line */
  border: 1px solid rgba(255,255,255,0.05); /* Subtle outer highlight border */
  transform-style: preserve-3d;
  transition: transform 0.3s ease;
  pointer-events: auto;
  position: relative; /* Needed for potential pseudo-elements */
`;

const LeftPanel = styled(SubPanel)`
  /* No rotation for better click reliability */
  transform: none; 
`;

const CenterPanel = styled(SubPanel)`
  display: flex;
  justify-content: center;
  gap: 15px; /* More space between nav buttons */
  padding: 8px 10px; /* Less padding for tighter fit */
`;

const RightPanel = styled(SubPanel)`
  /* Slight tilt for the keypad panel */
  transform: rotateY(-8deg) rotateX(2deg); 
  /* Add ambient glow behind keypad */
   box-shadow: 
    inset 0 2px 5px rgba(0,0,0,0.8), 
    inset 0 0 0 1px rgba(0,0,0,0.6),
    0 0 20px rgba(0, 128, 128, 0.15); /* Soft teal ambient glow */ 
`;

// Grid for section buttons
const SectionButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(85px, auto)); /* Slightly wider min */
  grid-template-rows: repeat(auto-fill, 32px); /* Slightly taller buttons */
  gap: 8px; /* More gap */
  max-width: 320px; 
`;

// Keypad Grid (inside RightPanel)
const Keypad = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 32px); /* Match button height */
  grid-template-rows: repeat(4, 32px);
  gap: 6px; /* Increased gap */
  padding: 8px; /* More padding */
  /* Match SubPanel appearance */
  background-color: transparent; /* Let SubPanel background show */
  border-radius: 4px;
  box-shadow: none; /* Remove redundant shadow */
  border: none; /* Remove redundant border */
  position: relative; /* For glow */
  z-index: 1; /* Ensure buttons are above any keypad glow */
`;

// Base Button Style (for Keypad and Section) - Matte Plastic
const BaseRectButton = styled.button`
  display: inline-flex; justify-content: center; align-items: center;
  border: none; cursor: pointer;
  font-family: 'Orbitron', 'Arial', sans-serif;
  font-weight: 500;
  border-radius: 4px; // Slightly softer edges
  transition: all 0.1s ease-out;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  position: relative; // For pseudo-elements if needed
  transform-style: preserve-3d; // Allows for 3D effects
  outline: none; // Remove default outline

  /* Sizing */
  width: 100%; // Take grid width
  height: 32px; // Consistent height
  font-size: 10px; 
  line-height: 1;
  text-transform: uppercase;

  /* Appearance - Matte Plastic with 3D Depth */
  background: linear-gradient(to bottom, #40454a, #282c30); // Softer gradient
  color: #a0a5ac; // Brighter base text
  /* Multi-layered shadow for bevel and depth */
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.1), /* Top edge highlight */
    inset 0 -1px 0 rgba(0, 0, 0, 0.2), /* Bottom edge inner shadow */
    0 2px 0 #111315, /* Dark bottom edge for thickness */
    0 3px 3px rgba(0, 0, 0, 0.4); /* Main drop shadow */
  transform: translateY(-1px); // Default raised position

  &:hover:not(:disabled) {
     background: linear-gradient(to bottom, #484d52, #303438); // Lighter on hover
     color: #c0c5cc;
     transform: translateY(-2px); // Raise slightly more
     box-shadow: 
        inset 0 1px 0 rgba(255, 255, 255, 0.15), 
        inset 0 -1px 0 rgba(0, 0, 0, 0.2), 
        0 3px 0 #111315, 
        0 4px 5px rgba(0, 0, 0, 0.5); /* Larger shadow on hover */
  }

   &:active:not(:disabled) {
     background: linear-gradient(to top, #3a3f44, #25292d); // Pressed gradient
     transform: translateY(1px); // Push down
     box-shadow: 
       inset 0 1px 2px rgba(0, 0, 0, 0.7), /* Deeper inner shadow when pressed */
       0 1px 1px rgba(0,0,0,0.3); /* Minimal outer shadow */
     color: #70757c; // Dim text when pressed
     animation: ${pressPulse} 0.2s ease-out; // Add pulse effect
   }

   &:disabled {
     background: linear-gradient(to bottom, #2a2e32, #202326); // Darker disabled
     color: #555a60;
     cursor: not-allowed;
     box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.5); // Simple inset shadow
     transform: translateY(0); // No lift
     text-shadow: none;
   }
`;


// Keypad Button Styling (Inherits BaseRectButton)
const KeypadButton = styled(BaseRectButton)`
  width: 32px; // Make square
  height: 32px;
  font-size: 11px;
`;

// Section Button Styling (Inherits BaseRectButton, adds active state)
const SectionRectButton = styled(BaseRectButton)`
  padding: 0 12px; // Horizontal padding
  min-width: 85px; // Ensure text fits

  /* Text Style (Simulated Backlight) & Glow */
  color: ${({ isActive }) => isActive ? lighten(0.1, '#ff9800') : '#a0a5ac' }; 
  text-shadow: ${({ isActive, color }) => isActive
    ? `0 0 10px ${lighten(0.15, color || '#ff9800')}, 0 0 5px ${lighten(0.2, color || '#ff9800')}` 
    : 'none' 
  };
  
  /* Enhance box-shadow for active state (under-glow) */
  box-shadow: ${({ isActive, color }) => isActive 
    ? `
      inset 0 1px 0 rgba(255, 255, 255, 0.1), 
      inset 0 -1px 0 rgba(0, 0, 0, 0.2), 
      0 2px 0 #111315, 
      0 3px 3px rgba(0, 0, 0, 0.4),
      0 5px 15px -2px ${lighten(0.1, color || '#ff9800')}60 /* Active glow */
    ` 
    : `
      inset 0 1px 0 rgba(255, 255, 255, 0.1), 
      inset 0 -1px 0 rgba(0, 0, 0, 0.2), 
      0 2px 0 #111315, 
      0 3px 3px rgba(0, 0, 0, 0.4)
    ` 
  };
  
  /* Keep transform consistent */
  transform: translateY(-1px);

  &:hover:not(:disabled) {
     color: ${({ isActive }) => isActive ? lighten(0.2, '#ff9800') : '#c0c5cc' };
     transform: translateY(-2px); // Consistent hover lift
     /* Keep active glow on hover if active */
     box-shadow: ${({ isActive, color }) => isActive 
        ? `
          inset 0 1px 0 rgba(255, 255, 255, 0.15), 
          inset 0 -1px 0 rgba(0, 0, 0, 0.2), 
          0 3px 0 #111315, 
          0 4px 5px rgba(0, 0, 0, 0.5),
          0 6px 18px -2px ${lighten(0.15, color || '#ff9800')}70 /* Enhanced active glow on hover */
        ` 
        : `
          inset 0 1px 0 rgba(255, 255, 255, 0.15), 
          inset 0 -1px 0 rgba(0, 0, 0, 0.2), 
          0 3px 0 #111315, 
          0 4px 5px rgba(0, 0, 0, 0.5)
        ` 
     };
  }

   /* Active press state should still look pressed */
   &:active:not(:disabled) {
     background: linear-gradient(to top, #3a3f44, #25292d); 
     transform: translateY(1px); 
     box-shadow: 
       inset 0 1px 2px rgba(0, 0, 0, 0.7), 
       0 1px 1px rgba(0,0,0,0.3); 
     color: ${({ isActive }) => isActive ? darken(0.1, '#ff9800') : '#70757c' }; // Dim active color on press
     text-shadow: none; // Remove text glow on press
     animation: ${pressPulse} 0.2s ease-out;
   }
`;

// Navigation Button Styling (Tactile Rubber)
const NavRectButton = styled(BaseRectButton)`
  min-width: 35px; // Slightly wider
  height: 30px; // Slightly shorter
  padding: 0 8px;
  font-size: 14px; // Larger arrow symbols
  border-radius: 6px; // More rounded for rubber feel

  /* Override Appearance for Tactile Rubber */
  background: linear-gradient(to bottom, #2a2e32, #1c1f22); // Darker rubbery look
  color: #80858c; // Dimmer symbols
  text-shadow: none; // No text glow
  /* Deeper shadows for rubber */
  box-shadow: 
    inset 0 1px 0 rgba(255, 255, 255, 0.05), /* Fainter highlight */
    inset 0 -1px 1px rgba(0, 0, 0, 0.4), /* Deeper inner bottom shadow */
    0 3px 0 #08090a, /* Very dark bottom edge */
    0 4px 4px rgba(0, 0, 0, 0.5); /* Softer drop shadow */
  transform: translateY(-1px); // Default lift

  &:hover:not(:disabled) {
     background: linear-gradient(to bottom, #32363a, #222528);
     color: #a0a5ac;
     transform: translateY(-2px);
     box-shadow: 
        inset 0 1px 0 rgba(255, 255, 255, 0.08), 
        inset 0 -1px 1px rgba(0, 0, 0, 0.4), 
        0 4px 0 #08090a, 
        0 5px 6px rgba(0, 0, 0, 0.6);
  }

   &:active:not(:disabled) {
     background: linear-gradient(to top, #25292d, #181b1e); // Darkest pressed
     transform: translateY(2px); // Press deeper
     box-shadow: 
       inset 0 2px 3px rgba(0, 0, 0, 0.8), /* Very deep inner shadow */
       0 1px 0px rgba(0,0,0,0.4); /* Minimal outer */
     color: #60656c; 
     animation: none; // No pulse for nav buttons
   }

   &:disabled {
      background: linear-gradient(to bottom, #202225, #1a1c1f); // Darker disabled
      color: #444;
      cursor: not-allowed;
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.4);
      border-color: #000;
      transform: none;
      text-shadow: none;
   }
`;


// --- Decorative Elements for Side Panels (Enhanced) ---
const DecorativeControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding: 15px;
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const IndicatorLight = styled.div`
  width: 14px; /* Slightly larger */
  height: 14px;
  border-radius: 50%;
  background-color: #1a1d20; // Darker off state
  border: 1px solid #0a0b0c;
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.8);
  position: relative;
  transition: background-color 0.3s ease, box-shadow 0.3s ease; /* Smooth transition */

  &.on {
    background-color: ${({ color = '#ff4136' }) => color};
    box-shadow: inset 0 1px 2px rgba(0,0,0,0.6), 
                0 0 8px ${({ color = '#ff4136' }) => color}cc, /* Stronger glow */
                0 0 15px ${({ color = '#ff4136' }) => color}99; /* Wider glow */
    animation: ${pulseGlow} 1.8s infinite ease-in-out;
    filter: drop-shadow(0 0 5px ${({ color = '#ff4136' }) => color}b0); /* Enhance bloom */
  }
`;

// Base for Displays (Frame Enhancement)
const DisplayBase = styled.div`
  width: 90%;
  max-width: 140px; /* Slightly larger */
  aspect-ratio: 1 / 1;
  /* Frame Gradient */
  background: linear-gradient(to bottom, #40454a, #282c30); 
  border-radius: 5px; /* Match subpanel */
  padding: 6px; /* Thicker frame */
  box-sizing: border-box;
  /* Enhanced Frame Shadow */
  box-shadow: 
    inset 0 0 2px rgba(0,0,0,0.6), 
    inset 0 1px 1px rgba(255,255,255,0.08), 
    0 3px 6px rgba(0,0,0,0.5); 
  position: relative;
  overflow: hidden; /* Hide sweep overflow */

  /* Screen Surface */
  &::before {
    content: '';
    position: absolute;
    top: 6px; left: 6px; right: 6px; bottom: 6px; /* Match padding */
    background-color: #030405; /* Even darker screen */
    border-radius: 3px; /* Inner screen rounding */
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.9); /* Deeper screen inset */
    z-index: 1;
  }
`;

// Radar Display (No visual changes needed here unless specified)
const RadarDisplay = styled(DisplayBase)`
  &::before {
    background: radial-gradient(circle, #0c280c 30%, #051005 90%); /* Tweaked radar colors */
  }

  & > div.ring, & > div.sweep {
    position: absolute;
    z-index: 2;
  }
  & > div.ring {
    left: 50%; top: 50%;
    border: 1px solid rgba(70, 220, 70, 0.18); /* Slightly brighter rings */
    border-radius: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
  }
  & > div.ring.outer { 
    width: calc(100% - 18px); /* Adjust for padding */
    height: calc(100% - 18px);
  }
  & > div.ring.inner { 
    width: calc(50% + 12px); /* Adjust for padding */
    height: calc(50% + 12px);
  }
  & > div.sweep {
      width: 50%;
      height: calc(100% - 12px); /* Adjust for padding */
      top: 6px; 
      left: 50%; 
      transform-origin: 0 50%; 
      animation: ${radarSweep} 3.5s linear infinite; /* Faster sweep */
      background: linear-gradient(to right, transparent, rgba(70, 220, 70, 0.35) 70%); /* Brighter sweep */
      border-radius: 0 50% 50% 0 / 0 100% 100% 0; 
      mix-blend-mode: screen; /* Blend sweep better */
  }
`;

// Gyroscope Display (No visual changes needed here unless specified)
const GyroscopeDisplay = styled(DisplayBase)`
  & > div {
     position: absolute;
     z-index: 2;
  }

  /* Horizon Line */
  & > div.horizon {
    width: calc(100% - 12px); 
    height: 2px; /* Thicker line */
    background-color: #40e0d0; /* Cyan color */
    top: 50%;
    left: 6px; 
    transform: translateY(-50%);
    box-shadow: 0 0 5px #40e0d0b0, 0 0 10px #40e0d080; /* Enhanced glow */
  }

  /* Center Dot */
  & > div.center-dot {
      width: 8px; height: 8px;
      background-color: #40e0d0;
      border-radius: 50%;
      left: 50%; top: 50%;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 8px #40e0d0;
      z-index: 3; 
  }
  
  /* Pitch lines */
  & > div.pitch {
    width: 35%; /* Slightly wider */
    height: 1px;
    background-color: rgba(64, 224, 208, 0.6); /* Cyan pitch lines */
    left: 50%;
    transform: translateX(-50%);
  }
  & > div.pitch.up { top: calc(6px + 25%); } 
  & > div.pitch.down { bottom: calc(6px + 25%); }
`;


// --- Main Component --- (Layout logic unchanged)
const FlightControls = ({ sections, currentSection, onNavigate }) => {
  const handlePrevious = () => {
    if (currentSection > 0) onNavigate(currentSection - 1);
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) onNavigate(currentSection + 1);
  };

  const gridSections = sections;
  const keypadKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];

  return (
    <FlightControlsContainer>
      <OuterLeftPanel>
        <DecorativeControlGroup>
          <GyroscopeDisplay>
              <div className="horizon" />
              <div className="pitch up" />
              <div className="pitch down" />
              <div className="center-dot" />
          </GyroscopeDisplay>
          <div style={{ display: 'flex', gap: '10px' }}> {/* Increased gap */ }
             <IndicatorLight />
             <IndicatorLight className="on" color="#00bcd4" /> 
             <IndicatorLight className="on" color="#f44336" /> {/* Add another light */}
          </div>
        </DecorativeControlGroup>
      </OuterLeftPanel> 
      
      <ControlPanel> 
        <MainControlsWrapper>

          <LeftPanel>
            <SectionButtonGrid>
              {gridSections.map((section, index) => (
                <SectionRectButton
                  key={index}
                  isActive={currentSection === index}
                  color={section.color} 
                  onClick={() => onNavigate(index)}
                  title={section.name}
                  disabled={!section.enabled} // Example: handle disabled state
                >
                  {section.name}
                </SectionRectButton>
              ))}
            </SectionButtonGrid>
          </LeftPanel>

          <CenterPanel>
            <NavRectButton onClick={handlePrevious} disabled={currentSection === 0} title="Previous">
              ◄
            </NavRectButton>
            <NavRectButton onClick={handleNext} disabled={currentSection === sections.length - 1} title="Next">
              ►
            </NavRectButton>
          </CenterPanel>

          {/* Keypad inside the tilted RightPanel */}
          <RightPanel> 
            <Keypad>
              {keypadKeys.map(key => <KeypadButton key={key}>{key}</KeypadButton>)}
            </Keypad>
          </RightPanel>

        </MainControlsWrapper>
      </ControlPanel>

      <OuterRightPanel>
        <DecorativeControlGroup>
           <RadarDisplay>
               <div className="ring outer" />
               <div className="ring inner" />
               <div className="sweep" />
           </RadarDisplay>
           <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}> {/* Increased gap */}
             <IndicatorLight className="on" color="#ffeb3b" />
             <IndicatorLight className="on" color="#8bc34a"/> {/* Add another light */}
             <IndicatorLight />
           </div>
          </DecorativeControlGroup>
      </OuterRightPanel>

    </FlightControlsContainer>
  );
};

export default FlightControls;

// Cleanup comments if needed

// IMPORTANT: Add color manipulation (like lighten) if you use it.
// e.g., using polished.js: import { lighten } from 'polished';
// Or define a helper function:
/*
const lighten = (color, percent) => {
  try {
    let num = parseInt(color.replace("#",""), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt, B = (num >> 8 & 0x00FF) + amt, G = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (B<255?B<1?0:B:255)*0x100 + (G<255?G<1?0:G:255)).toString(16).slice(1);
  } catch(e) { return color; }
};
*/ 