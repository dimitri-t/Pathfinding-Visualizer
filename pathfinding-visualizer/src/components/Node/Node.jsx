import React from 'react';
import './Node.css';

function Node({ isStart, isFinish, col, row }) {
  console.log(isStart);

  const className = isStart ? 'node-start' : isFinish ? 'node-finish' : '';

  return <div className={`node ${className}`}></div>;
}

export default Node;
