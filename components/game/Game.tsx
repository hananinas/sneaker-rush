// components/PhaserComponent.js
import { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const PhaserComponent = () => {
  const phaserContainerRef = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      scene: {
        create: create,
      },
    };

    const game = new Phaser.Game(config);

    function create() {
      const graphics = this.add.graphics();
      graphics.fillStyle(0xff0000, 1);
      graphics.fillRect(100, 100, 200, 200);
    }

    return () => {
      game.destroy();
    };
  }, []);

  return <div ref={phaserContainerRef} />;
};

export default PhaserComponent;
