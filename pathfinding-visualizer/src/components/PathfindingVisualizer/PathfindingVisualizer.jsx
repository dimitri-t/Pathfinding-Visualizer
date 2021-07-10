import React, { useState, useEffect } from 'react';
import Node from '../Node/Node';
import './PathfindingVisualizer.css';
import {
  dijkstra,
  getNodesInShortestPathOrder,
} from '../../algorithms/dijkstra';

const START_NODE_ROW = 10;
const START_NODE_COL = 5;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 45;

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
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      previousNode: null,
    };
  };

  // Handles onClick for Dijkstra's algo
  const handleDijkstraBtn = () => {
    const visitedNodes = dijkstra(
      grid,
      grid[START_NODE_ROW][START_NODE_COL],
      grid[FINISH_NODE_ROW][FINISH_NODE_COL]
    );

    // get shortest path to finish node
    const shortestPath = getNodesInShortestPathOrder(
      grid[FINISH_NODE_ROW][FINISH_NODE_COL]
    );

    // visualize it
    visualizeDijkstra(shortestPath, visitedNodes);
  };

  // Creates the visualization for Dijkstra's algorithm
  // Shows the shortest path in orange, and the other visited nodes in green
  const visualizeDijkstra = (shortestPath, visitedNodes) => {
    for (let i = 0; i <= visitedNodes.length; i++) {
      // 5 milliseconds * counter
      const timeoutTimer = 5 * i;

      // Visualize the shortest path if we have visited all nodes
      if (i === visitedNodes.length) {
        setTimeout(() => {
          visualizeShortestPath(shortestPath);
        }, timeoutTimer);
        return;
      }

      // Visualize all visited nodes
      setTimeout(() => {
        const node = visitedNodes[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, timeoutTimer);
    }
  };

  // Creates the visualization for the shortest path
  const visualizeShortestPath = (shortestPath) => {
    for (let i = 0; i < shortestPath.length; i++) {
      const timeoutTimer = 40 * i;
      setTimeout(() => {
        const node = shortestPath[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest';
      }, timeoutTimer);
    }
  };

  // const handleOnMouseDown = () => {
  //   console.log('hi');
  // };

  // Load Grid
  // here we are passing [] as the second
  // argument so useEffect behaves like componentDidMount
  useEffect(() => {
    loadGrid();
  }, []);

  return (
    <div>
      <button onClick={handleDijkstraBtn}>
        Visualize Dijkstra's algorithm
      </button>

      <div className='grid'>
        {grid.map((row, rowIndex) => {
          return (
            <div key={rowIndex}>
              {row.map((node, nodeIndex) => {
                const { row, col, isStart, isFinish, isVisited } = node;
                return (
                  <Node
                    key={nodeIndex}
                    isStart={isStart}
                    isFinish={isFinish}
                    isVisited={isVisited}
                    col={col}
                    row={row}
                    // handleOnMouseDown={handleOnMouseDown}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PathfindingVisualizer;
