import React, { useState, useRef, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { EffectCOmposer, Bloom } from "@react-three/postprocessing";

const GRID_SIZE = 20;

const SPEEDS = [
  { color : "blue", hiSpeed: 10, loSpeed: 16 },
  { color : "green", hiSpeed: 8, loSpeed: 12 },
  { color : "yellow", hiSpeed: 6, loSpeed: 10 },
  { color : "orange", hiSpeed: 4, loSpeed: 8 },
  { color : "red", hiSpeed: 2, loSpeed: 6 },
  { color : "purple", hiSpeed: 1, loSpeed: 4 },
];

const INITIAL_ZOOM = 20;

const Cell = ({ position, color, onClick }) => {
  return (
    <mesh
      position={position}
      onClick={onClick}
    >
      <boxGeometry args={[1, 1, 0.5]} />
      <meshStandardMaterial
        color={color || "black"}
        roughness={0.2}
        transparent
        opacity={color ? 0.8 : 0.2}
      />
    </mesh>
  );
};

const Grid = ({ setCameraZoom }) => {
  const [grid, setgrid] = useState(
    Array.from({ length: GRID_SIZE }, () =>
      Array.from({ length: GRID_SIZE }, () => null)
    )
  );

  const [points, setPoints] = useState([]); // List for active points

  const growPixel = (point) => {
    const { x, y, speedIndex, movesLeft } = point;
    const adjacentCells = [
      
    ];
  }

  const handleCellClick = (x, y) => {
    setGrid((prev) => {
      const newGrid = [...prev];
      newGrid[y][x] = { color: "blue", speed: 10 };
      return newGrid;
    });
  };

  return (
    <>
      {grid.map((row, y) =>
        row.map((cell, x) => (
          <Cell
            key={`${x}-${y}`}
            position={[x - GRID_SIZE / 2, -y + GRID_SIZE, 0]}
            filled={!!cell}
            color={cell?.color}
            onClick{() => handleCellClick(x, y)}
          />
        ))
      )}
    </>
  );
};

const App = () => {
  return (
    <Canvas camera={{position: [0, 0, 20]}}>
      <ambientLight />
      <Grid />
    </Canvas>
  )
}
