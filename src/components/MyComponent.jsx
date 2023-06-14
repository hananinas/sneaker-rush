import { BlurFilter, TextStyle } from "pixi.js";
import {
  Stage,
  Container,
  Sprite,
  Text,
  Graphics,
  BitmapText,
} from "@pixi/react";
import { useCallback, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import shoes from "../assets/shoes-test.png";
import test from "../assets/test.png";
import shoeBox from "../assets/box-test.png";
import Shoe from "./shoe/shoe";
import Box from "./box/box";

export default function MyComponent() {

  const shoesList = [
     {
      name: "Nike Air Force 1",
      image: shoes,
     },
     {
      name: "Nike Air Force 1",
      image: test,
     },
     {
      name: "Nike Air Force 1",
      image: shoes,
     },
     {
      name: "Nike Air Force 1",
      image: shoes,
     } 

  ]

  const isMobile = useMediaQuery({ maxWidth: 767 }); // Define mobile breakpoint

  const [stageWidth, setStageWidth] = useState(window.innerWidth);
  const [stageHeight, setStageHeight] = useState(window.innerHeight);
  const [ballSpeed, setBallSpeed] = useState(0); // Ball's vertical speed [px/frame]
  const [shoeX, setShoeX] = useState(stageWidth / 2 - 25); // Ball's vertical position
  const [shoeY, setShoeY] = useState(stageHeight / 2 - 25); // Ball's vertical position
  const [listShoes, setListShoes] = useState(shoesList); // List of shoes

  const box = useCallback((g) => {
    g.clear();
    g.lineStyle(10, 0xffffff);
    g.beginFill(0xff3300);
    g.drawRect(-10, 50, stageWidth * 1.1, 100);
    g.endFill();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setStageWidth(window.innerWidth);
      setStageHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  useEffect(() => {
    setListShoes(shuffleArray(shoesList));
  }, []);


 

  return (
    <div className="w-[100vh] h-[100vh] bg-blue-500">
      <Stage
        width={isMobile ? stageWidth * 1 : stageWidth}
        height={isMobile ? stageHeight * 1 : stageHeight}
        options={{ antialias: true, autoDensity: true, backgroundAlpha: 0 }}
      >
       
        <Graphics draw={box} x={0} y={stageHeight * 0.8} />

        <Container x={stageWidth * 0} y={stageHeight * 0}>
          <Text
            text="Points: "
            style={
              new TextStyle({
                align: "center",
                fontFamily:
                  'Super Mario Font, "Source Sans Pro", Helvetica, sans-serif',
                fontSize: 50,
                fontWeight: "400",
                fill: ["#ff0000"], // gradient
                stroke: "#000000",
                strokeThickness: 5,
                letterSpacing: 0,
                dropShadow: true,
                dropShadowColor: "#000000",
                dropShadowBlur: 4,
                dropShadowAngle: Math.PI / 6,
                dropShadowDistance: 6,
                wordWrap: false,
                wordWrapWidth: 0,
              })
            }
          />
        </Container>
         
         <Box stageHeight={stageHeight} stageWidth={stageWidth} />

         {listShoes.map(
          (shoe) => (
            console.log(shoe),
            (
              <Shoe shoe={shoe} stage={Stage} stageHeight={stageHeight} />
            )
          )
        )}
      </Stage>
    </div>
  );
}
