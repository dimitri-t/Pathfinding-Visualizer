import React from 'react';
import './Node.css';

function Node({
  isStart,
  isFinish,
  isVisited,
  isWall,
  col,
  row,
  handleOnMouseDown,
  handleOnMouseUp,
  handleOnMouseEnter,
}) {
  const className = isStart
    ? 'node-start'
    : isFinish
    ? 'node-finish'
    : isWall
    ? 'node-wall'
    : isVisited
    ? 'node-visited'
    : '';

  // Adding the ID here so we can reference the Node in the visualizer
  return (
    <div
      className={`node ${className}`}
      id={`node-${row}-${col}`}
      onMouseDown={() => handleOnMouseDown(row, col)}
      onMouseUp={() => handleOnMouseUp()}
      onMouseEnter={() => handleOnMouseEnter(row, col)}
    ></div>
  );
}

export default Node;
