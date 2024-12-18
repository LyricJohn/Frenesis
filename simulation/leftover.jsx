import React, { useState, useEffect, useRef } from "react";

const Speeds = [
  { color: "blue", speed: 10 },
  { color: "green", speed: 8 },
  { color: "yellow", speed: 6 },
  { color: "orange", speed: 4 },
  { color: "red", speed: 2 },
];

const Grid = () => {
  const [grid, setGrid] = useState(
    Array.from({ length: GRID_SIZE }, () =>
      Array.from({ length: GRID_SIZE }, () => null)
    )
  );
  const [points, setPoints] = useState([]);

  const growPixel = (x, y, speedIndex) => {
    const adjacentCells = [
      [x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1], [x + 1, y + 1], [x - 1, y - 1], [x + 1, y - 1], [x - 1, y + 1], 
    ];

    // Filter check adjacentCells to see if they're "free"
    const freeCells = adjacentCells.filter(([nx, ny]) =>
      grid[ny]?.[nx] == null
    );

    if (freeCells.length > 0) {
      const [newX, newY] = freeCells[Math.floor(Math.random() * freeCells.length)];

      
    }
  };
};
