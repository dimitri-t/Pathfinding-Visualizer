import React, { useState, useEffect } from 'react';
import Node from '../Node/Node';
import './PathfindingVisualizer.css';

function PathfindingVisualizer() {
  const [grid, setGrid] = useState([]);

  // Loads an empty grid
  const loadGrid = () => {
    const newGrid = [];
    for (let row = 0; row < 20; row++) {
      const curRow = [];
      for (let col = 0; col < 50; col++) {
        // Here create a new node and append to row
        curRow.push(createNode(row, col));
      }
      newGrid.push(curRow);
    }
    // Set the grid to the new grid
    setGrid(newGrid);
  };

  // Given row, col, creates a new Node object
  // which just holds information for that specific node
  const createNode = (row, col) => {
    return {
      col,
      row,
      isStart: row === 10 && col === 5,
      isFinish: row === 10 && col === 45,
    };
  };

  // Load Grid
  // here we are passing [] as the second
  // argument so useEffect behaves like componentDidMount
  useEffect(() => {
    loadGrid();
  }, []);

  return (
    // Map out the grid
    <div className='grid'>
      {grid.map((row, rowIndex) => {
        return (
          <div key={rowIndex}>
            {row.map((node, nodeIndex) => {
              const { row, col, isStart, isFinish } = node;
              return (
                <Node
                  key={nodeIndex}
                  isStart={isStart}
                  isFinish={isFinish}
                  col={col}
                  row={row}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default PathfindingVisualizer;
