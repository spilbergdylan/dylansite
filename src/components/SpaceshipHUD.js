import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const twinkle = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
`;

const HUDContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 2;
`;

const Windows = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  background: transparent;
  perspective: 1200px;
  perspective-origin: 50% 55%;
  overflow: hidden;
  z-index: 1;

  .window {
    flex: 1;
    position: relative;
    transform-style: preserve-3d;
    transform: rotateY(-35deg) rotateX(8deg) translateZ(-50px);
    margin: 0;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.03) 0%,
        transparent 50%,
        rgba(0, 0, 0, 0.03) 100%
      );
      z-index: 2;
      pointer-events: none;
    }
  }

  .window.main {
    flex: 2;
    transform: rotateX(5deg) translateZ(-30px);
    z-index: 1;
  }

  .window.right {
    transform: rotateY(35deg) rotateX(8deg) translateZ(-50px);
  }

  .cockpit-frame {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 2;
    transform-style: preserve-3d;
  }

  .frame-section {
    position: absolute;
    background: #1a1a1a;
    box-shadow: 
      inset 0 0 10px rgba(0, 0, 0, 0.5),
      0 0 20px rgba(0, 0, 0, 0.3);
    pointer-events: none;
  }

  .vertical-frame {
    width: 60px;
    top: 0;
    bottom: 12vh;
    background: linear-gradient(
      to right,
      #1a1a1a 0%,
      #252525 100%
    );
    transform-style: preserve-3d;
    z-index: 3;
    
    &.left {
      left: 25%;
      transform: translateX(-50%) rotateY(-35deg) translateZ(-80px) rotateX(15deg);
      transform-origin: center;
    }

    &.right {
      right: 25%;
      transform: translateX(50%) rotateY(35deg) translateZ(-80px) rotateX(15deg);
      transform-origin: center;
    }
  }

  .top-frame {
    top: -50px;
    left: -10%;
    right: -10%;
    height: 200px;
    background: linear-gradient(
      to bottom,
      #1a1a1a 0%,
      #252525 100%
    );
    transform-origin: top center;
    transform: perspective(1000px) rotateX(35deg) translateZ(-20px);
    border-bottom: 2px solid #333;
    border-radius: 0 0 50% 50% / 0 0 100% 100%;
    z-index: 4;
  }

  .bottom-frame {
    bottom: -50px;
    left: -10%;
    right: -10%;
    height: 300px;
    background: linear-gradient(
      to top,
      #1a1a1a 0%,
      #252525 100%
    );
    transform-origin: bottom center;
    transform: perspective(1000px) rotateX(-55deg) translateZ(-20px);
    border-top: 2px solid #333;
    border-radius: 50% 50% 0 0 / 100% 100% 0 0;
    z-index: 1;
  }

  .window-inner {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: transparent;
    pointer-events: none;
  }

  .screen-reflection {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      165deg,
      transparent 0%,
      rgba(255, 255, 255, 0.03) 45%,
      rgba(255, 255, 255, 0.04) 50%,
      rgba(255, 255, 255, 0.03) 55%,
      transparent 100%
    );
    pointer-events: none;
    z-index: 4;
  }
`;

const SpaceshipHUD = () => {
  return (
    <HUDContainer>
      <Windows>
        <div className="window">
          <div className="window-inner" />
          <div className="screen-reflection" />
        </div>
        <div className="window main">
          <div className="window-inner" />
          <div className="screen-reflection" />
        </div>
        <div className="window right">
          <div className="window-inner" />
          <div className="screen-reflection" />
        </div>
        <div className="cockpit-frame">
          <div className="frame-section top-frame" />
          <div className="frame-section bottom-frame" />
          <div className="frame-section vertical-frame left" />
          <div className="frame-section vertical-frame right" />
        </div>
      </Windows>
    </HUDContainer>
  );
};

export default SpaceshipHUD; 