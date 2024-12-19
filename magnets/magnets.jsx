import React from "react";
import { Canvas } from "@react-three/fiber";

const TILE_SIZE = 1000;
const WORLD_TILES = 10;

const VELOCITY = 10;

/* const Particle = ({ type, color, MULTIPLIER }) => {
  const attach = () {};
  
  return (
    <mesh>
      <sphereGeometry args={[{mass}, {mass}, {mass}] />
      <meshStandardMaterial color={color}/>
    </mesh>
  );
} */

const App = () => {
  const particles = [
    { type: "proton", color: "red", MASS: 6 },
    { type: "neutron", color: "blue", MASS: 6 },
    { type: "electron", color: "blue", MASS: 1 },
  ]

  return
}
