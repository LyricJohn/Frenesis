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

  const getRandomSpeed = (hiSpeed, loSpeed) => {
    return Math.floor(Math.random() * (loSpeed - hiSpeed + 1)) + hiSpeed;
  };
  
  const growPixel = (point) => {
    const { x, y, speedIndex, movesLeft } = point;
    
    const adjacentCells = [
      [x + 1, y], [x - 1, y], [x, y + 1],
      [x, y - 1], [x + 1, y + 1], [x - 1, y - 1], 
      [x + 1, y - 1], [x - 1, y + 1],
    ];
    const freeCells = adjacentCells.filter(([nx, ny]) => {
      const wrappedX = (nx + GRID_SIZE) % GRID_SIZE;
      const wrappedY = (ny + GRID_SIZE) % GRID_SIZE;
      return !grid[wrappedY][wrappedX];
    });

    if (freeCells.length > 0) {
      const [newX, newY] = freeCells[Math.floor(Math.random() * freeCells.length)];
      const newSpeedIndex = getRandomSpeed(
        SPEEDS[speedIndex].hiSpeed,
        SPEEDS[speedIndex].loSpeed
      );
      /* if (Math.random() > 0.98) {
        newSpeedIndex = Math.max(0, speedIndex - 1);
      }; */

      // Initialise movesLeft (1 to 5 inclusively) for purple pixel
      if (SPEEDS[speedIndex].color === "purple" && movesLeft === undefined) {
        newMovesLeft = Math.floor(Math.random() * 5) + 1;
      }

      const newPoint = {
        x: (newX + GRID_SIZE) % GRID_SIZE,
        y: (newY + GRID_SIZE) % GRID_SIZE,
        speedIndex: newSpeedIndex,
        color: SPEEDS[speedIndex].color,
        movesLeft: newMovesLeft,
        speed: newSpeed,
      };

      setPoints((prev) => [...prev, newpoint]);
      setGrid((prev) => {
        const newGrid = [...prev];
        newGrid[newPoint.y][newPoint.x] = newPoint.color;
        return newGrid;
      });

      // Camera zoom-out logic
      if (newX <= 2 || newY <= 2 || newX >= GRID_SIZE - 2 || newY >= GRID_SIZE - 2) {
        setCameraZoom((prev) => prev + );
      }
    }
  };

  useEffect(() => {
    const timers = points.map((point, idx) => {
      const speed = point.speed * 1000;

      return setTimeout(() => {
        if (point.color === "purple") {
          if (point.movesLeft > 0) {
            // Unless purple, and/or purple with 0 movesLeft
            growPixel({ ...point, movesLeft: point.movesLeft - 1 });
          }
        } else {
          growPixel({
            ...point,
            speedIndex: 0,
            color: "blue",
            speed: getRandomSpeed(SPEEDS[0].hiSpeed, SPEEDS[0].loSpeed),
          });
        }
      } else {
        // All other colors grow normally
        growPixel(point);
      }

        setPoints((prev) => prev.filter((_, i) => i !==idx));
      }, speed);
    });

    return () => timers.forEach(clearTimeout);
  }, [points]);
  

  const handleCellClick = (x, y) => {
    if (grid[y][x]) return;

    const newPoint = {
      x,
      y,
      speedIndex: SPEEDS.LENGTH - 2,
      color: "blue",
    };
    setPoints((prev) => [...prev, newPoint]);
    setGrid((prev) => {
      const newGrid = [...prev];
      newGrid[y][x] = "blue";
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
            color={cell}
            onClick{() => handleCellClick(x, y)}
          />
        ))
      )}
    </>
  );
};

const App = () => {
  const [cameraZoom, setCameraZoom] = useState(INITIAL_ZOOM);
  const cameraRef = useRef();

  useFrame(() => {
    if (cameraRef.current) {
      cameraRef.current.position.z = cameraZoom;
    }
  });
  
  return (
    <Canvas>
      <PerspectiveCamera makeDefault ref={cameraRef} position={{position: [0, 0, cameraZoom]}} />
      <ambientLight intensity {0.5} />
      <EffectComposer>
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
      </EffectComposer>
      <Grid setCameraZoom={setCameraZoom} />
    </Canvas>
  )
}

export default App;
