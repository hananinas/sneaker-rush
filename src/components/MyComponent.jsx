import { BlurFilter } from 'pixi.js';
import { Stage, Container, Sprite, Text, Graphics } from '@pixi/react';
import { useCallback, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

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
    <div className="w-full h-full bg-blue-500">
      <Stage
        width={isMobile ? stageWidth * 0.9 : stageWidth}
        height={isMobile ? stageHeight * 0.9 : stageHeight}
        options={{ antialias: true, autoDensity: true, backgroundColor: 0xeef1f5 }}
      >
        <Sprite
          image="https://cdn.shopify.com/s/files/1/0070/7647/9089/products/ice_1200x720.jpg?v=1614685184"
          x={700}
          y={270}
          anchor={{ x: 0.5, y: 0.5 }}
        />
        <Graphics draw={box} />

        <Container x={400} y={330}>
          <Text text="Hello World" anchor={{ x: 0.5, y: 0.5 }} />
        </Container>
      </Stage>
    </div>
  );
}
