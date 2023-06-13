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
        }, 200);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    useEffect(() => {
        const animationIntervalId = setInterval(() => {
          setY((prevY) => prevY + 40); // Update the y coordinate gradually by incrementing it
        }, 100);
    
        return () => {
          clearInterval(animationIntervalId);
        };
    }, []);


    console.log(id);
    console.log(randomX);

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
