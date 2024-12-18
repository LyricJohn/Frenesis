import React, { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";

const GRID_SIZE = 10;

const Cell = ({ position, onClick, filled, color }) => {
  return (
    <mesh
      position={position}
      onClick={onClick}
    >
      {/* Invisible Grid Outline */}
      <boxGeometry args={[1, 1, 0.1]} />
      <meshStandardMaterial
        color={filled ? color : "black"}
        transparent opacity={0.2}
        roughness={0.2}
      />
    </mesh>
  );
};

const Grid = () => {
  const [grid, setgrid] = useState(
    Array.from({ length: GRID_SIZE }, () =>
      Array.from({ length: GRID_SIZE }, () => null)
    )
  );

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
