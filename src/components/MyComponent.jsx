import { BlurFilter } from 'pixi.js';
import { Stage, Container, Sprite, Text, Graphics } from '@pixi/react';
import { useCallback, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import test from '../assets/test.png';
export default function MyComponent() {
  const isMobile = useMediaQuery({ maxWidth: 767 }); // Define mobile breakpoint

  const [stageWidth, setStageWidth] = useState(window.innerWidth);
  const [stageHeight, setStageHeight] = useState(window.innerHeight);

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

  return (
    <div className="w-[100vh] h-[100vh] bg-blue-500">
      <Stage
        width={isMobile ? stageWidth * 1: stageWidth}
        height={isMobile ? stageHeight * 1 : stageHeight}
        options={{ antialias: true, autoDensity: true, backgroundAlpha: 0 
        }}
      >
        <Sprite
          image={test}
          width={isMobile ? stageWidth * 1 : stageWidth}
          height={isMobile ? stageHeight * 1 : stageHeight}
        />
        <Graphics draw={box}  x={0} y={stageHeight *0.8} />

        <Container>
          <Text text="Hello World" anchor={{ x: 0.5, y: 0.5 }} />
        </Container>
      </Stage>
    </div>
  );
}
