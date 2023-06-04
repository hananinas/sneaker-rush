import { BlurFilter } from 'pixi.js';
import { Stage, Container, Sprite, Text } from '@pixi/react';
import { useMemo } from 'react';



export const MyComponent = () => {
  const blurFilter = useMemo(() => new BlurFilter(4), []);

  return (
    <div style={{ width: '100%', height: '100%' }} className=' bg-slate-400'>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        style={{ 
            position: 'absolute',
            backgroundColor: 'blue' // Set the background color to blue
        }}
      >

        <Sprite
          image="https://pixijs.io/pixi-react/img/bunny.png"
          x={700}
          y={270}
          anchor={{ x: 0.5, y: 0.5 }}
        />

        <Container x={400} y={330}>
          <Text text="Hello World" anchor={{ x: 0.5, y: 0.5 }} filters={[blurFilter]} />
        </Container>
      </Stage>
    </div>
  );
};
