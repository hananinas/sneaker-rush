import { BlurFilter } from 'pixi.js';
import { Stage, Container, Sprite, Text, Graphics } from '@pixi/react';
import { useCallback, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import shoes from '../assets/shoes-test.png';
import test from '../assets/test.png';
import shoeBox from '../assets/box-test.png';

export default function MyComponent() {
  const isMobile = useMediaQuery({ maxWidth: 767 }); // Define mobile breakpoint

  const [stageWidth, setStageWidth] = useState(window.innerWidth);
  const [stageHeight, setStageHeight] = useState(window.innerHeight);
  const [ballSpeed, setBallSpeed] = useState(0); // Ball's vertical speed [px/frame]
  const [shoeX, setShoeX] = useState(stageWidth / 2 - 25); // Ball's vertical position

  const box = useCallback((g) => {
    g.clear();
    g.lineStyle(10, 0xffffff);
    g.beginFill(0xff3300);
    g.drawRect(50, 100, 300, 120);
    g.endFill();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setStageWidth(window.innerWidth);
      setStageHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {

    let pressTimer = null;

    const handleKey = (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          setShoeX((prevShoeX) => prevShoeX - 10);
          break;
        case 'ArrowRight':
          setShoeX((prevShoeX) => prevShoeX + 10);
          break;
        default:
          break;
      }
    };
  
    const handleMouse = (event) => {
      if (event.button === 0) {
        if (event.clientX < window.innerWidth / 2) {
          // Left side clicked
          setShoeX((prevShoeX) => prevShoeX - 10);
        } else {
          // Right side clicked
          setShoeX((prevShoeX) => prevShoeX + 10);
        }
      } else if (event.pres) {

      } 
    };

    const handleTouchStart = (event) => {
      const touch = event.touches[0];
      const touchX = touch.clientX;
  
      if (touchX < window.innerWidth / 2) {
        // Left side touched
        pressTimer = setTimeout(() => {
          // Long press event
          setShoeX((prevShoeX) => prevShoeX - 10);
        }, 500); // Adjust the duration for a long press as needed
      } else {
        // Right side touched
        pressTimer = setTimeout(() => {
          // Long press event
          setShoeX((prevShoeX) => prevShoeX + 10);
        }, 500); // Adjust the duration for a long press as needed
      }
    };


    const handleTouchEnd = () => {
      clearTimeout(pressTimer);
    };
  
    window.addEventListener('keydown', handleKey);
    window.addEventListener('mousedown', handleMouse);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);


    return () => {
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('mousedown', handleMouse);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);
  


 

  return (
    <div className="w-[100vh] h-[100vh] bg-blue-500">
      <Stage
        width={isMobile ? stageWidth * 1 : stageWidth}
        height={isMobile ? stageHeight * 1 : stageHeight}
        options={{ antialias: true, autoDensity: true, backgroundAlpha: 0 }}
      >
        <Sprite
          image={test}
          width={isMobile ? stageWidth * 1 : stageWidth}
          height={isMobile ? stageHeight * 1 : stageHeight}
        />
        <Graphics draw={box} x={0} y={stageHeight * 0.8} />

        <Container>
          <Text text="Hello World" anchor={{ x: 0, y: 0 }} />
        </Container>

        <Sprite
          image={shoeBox} // Replace with your ball image source
          width={100}
          height={100}
          x={shoeX} // Center the ball horizontally
          y={stageHeight * 0.9}
        />
      </Stage>
    </div>
  );
}
