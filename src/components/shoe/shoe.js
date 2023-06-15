import { Sprite } from "@pixi/react";
import React, { useState, useEffect } from "react";

const id = Math.random(1000);

export default function Shoe(props) {
  const getRandomX = () => {
    const containerWidth = window.innerWidth; // Replace with your container's width
    const shoeWidth = 50; // Width of the shoe sprite
    const maxOffset = containerWidth - shoeWidth * 2; // Consider the shoe's width to prevent overlapping
    return Math.floor(Math.random() * maxOffset);
  };

  const [randomX, setRandomX] = useState(getRandomX());
  const [Y, setY] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRandomX(getRandomX());
    }, 600);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const animationIntervalId = setInterval(() => {
      console.log(props.stageHeight + "Y" + Y);

      setY((prevY) => {
        const newY = prevY + 40; // Increment the y coordinate

        if (newY >= props.stageHeight) {
          setRandomX(getRandomX()); // Reset the x coordinate
          return 0; // Reset the y coordinate
        }

        return newY;
      });
    }, 300);

    return () => {
      clearInterval(animationIntervalId);
    };
  }, []);

  return (
    <Sprite
      image={props.shoe.image} // Replace with your shoe image source
      width={50}
      height={50}
      x={randomX}
      y={Y}
    />
  );
}
