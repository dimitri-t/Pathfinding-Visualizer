import React from 'react';
import './Node.css';

function Node({ isStart, isFinish, isVisited, col, row, handleOnMouseDown }) {
  const className = isStart
    ? 'node-start'
    : isFinish
    ? 'node-finish'
    : isVisited
    ? 'node-visited'
    : '';

  // Adding the ID here so we can reference the Node in the visualizer
  return (
    <div
      className={`node ${className}`}
      id={`node-${row}-${col}`}
      onMouseDown={handleOnMouseDown}
    ></div>
  );
}

export default Node;
