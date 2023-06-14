import shoeBox from "../..//assets/box-test.png";
import { useCallback, useEffect, useState } from "react";
import { Sprite } from "@pixi/react";
import Hammer from 'hammerjs';


export default function Box(props) {
  const [shoeX, setShoeX] = useState(props.stageWidth / 2 - 25); // Ball's vertical position

  useEffect(() => {
    const handleKey = (event) => {
      switch (event.key) {
        case "ArrowLeft":
          setShoeX((prevShoeX) => prevShoeX - 20);
          break;
        case "ArrowRight":
          setShoeX((prevShoeX) => prevShoeX + 20);
          break;
        default:
          break;
      }
    };
  
    const handleMouse = (event) => {
      if (event.button === 0) {
        if (event.clientX < window.innerWidth / 2) {
          // Left side clicked
          setShoeX((prevShoeX) => prevShoeX - 20);
        } else {
          // Right side clicked
          setShoeX((prevShoeX) => prevShoeX + 20);
        }
      }
    };
  
    const handleTouchStart = (event) => {
      const touch = event.touches[0];
      const touchX = touch.clientX;
  
      if (touchX < window.innerWidth / 2) {
        setShoeX((prevShoeX) => prevShoeX - 20);
      } else {
        setShoeX((prevShoeX) => prevShoeX + 20);
      }
    };
  
    const handleSwipe = (event) => {
      let interval;
      if (event.direction === Hammer.DIRECTION_LEFT) {
        interval = setInterval(() => {
          setShoeX((prevShoeX) => prevShoeX - 20);
        }, 100); // Adjust the interval duration for continuous movement
      } else if (event.direction === Hammer.DIRECTION_RIGHT) {
        interval = setInterval(() => {
          setShoeX((prevShoeX) => prevShoeX + 20);
        }, 100); // Adjust the interval duration for continuous movement
      }
  
      setTimeout(() => {
        clearInterval(interval);
      }, 500); // Adjust the duration for continuous movement as needed
    };
  
    const hammerManager = new Hammer.Manager(window);
    const swipeRecognizer = new Hammer.Swipe();
    hammerManager.add(swipeRecognizer);
    hammerManager.on("swipe", handleSwipe);
  
    window.addEventListener("keydown", handleKey);
    window.addEventListener("mousedown", handleMouse);
    window.addEventListener("touchstart", handleTouchStart);
  
    return () => {
      hammerManager.off("swipe", handleSwipe);
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("mousedown", handleMouse);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);
    
  return (
    <Sprite
      image={shoeBox} // Replace with your ball image source
      width={100}
      height={100}
      x={shoeX}
      y={props.stageHeight * 0.8}
    />
  );
}
