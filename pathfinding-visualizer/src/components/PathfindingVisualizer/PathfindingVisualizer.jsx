import React, { useState, useEffect } from 'react';
import Node from '../Node/Node';
import {
  dijkstra,
  getNodesInShortestPathOrder,
} from '../../algorithms/dijkstra';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const START_NODE_ROW = 10;
const START_NODE_COL = 5;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 45;

const useStyles = makeStyles({
  root: { display: 'flex', justifyContent: 'center', flexDirection: 'column' },
  visualizeBtn: {
    margin: 'auto',
    marginTop: '20px',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    width: 350,
    padding: '0 30px',
  },
  resetBtn: {
    marginTop: '20px',
    margin: 'auto',
    height: 48,
    width: 150,
  },
  grid: {
    margin: '30px',
  },
});

// Given row, col, creates a new Node object
// which just holds information for that specific node
const createNode = (row, col) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isWall: false,
    isVisited: false,
    previousNode: null,
  };
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
      if (!(node.isStart || node.isFinish)) {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }
    }, timeoutTimer);
  }
};

// Creates the visualization for the shortest path
const visualizeShortestPath = (shortestPath) => {
  for (let i = 0; i < shortestPath.length; i++) {
    const timeoutTimer = 40 * i;
    setTimeout(() => {
      const node = shortestPath[i];
      if (!(node.isStart || node.isFinish)) {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest';
      }
    }, timeoutTimer);
  }
};

function PathfindingVisualizer() {
  const classes = useStyles();
  const [grid, setGrid] = useState([]);
  const [mouseDown, setMouseDown] = useState(false);

  const handleOnMouseDown = (row, col) => {
    createWall(grid, row, col);
    setMouseDown(true);
  };

  const handleOnMouseUp = () => {
    setMouseDown(false);
  };

  // Turn the nodes the mouse drags over into walls
  const handleOnMouseEnter = (row, col) => {
    if (mouseDown) {
      createWall(grid, row, col);
    }
  };

  // Creates a wall at a given row, col
  const createWall = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    setGrid(newGrid);
  };

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

  // Resets the grid
  const handleResetGrid = () => {
    for (let row of grid) {
      for (let node of row) {
        if (node.isStart) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-start';
        } else if (node.isFinish) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-finish';
        } else {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node';
        }
      }
    }
    loadGrid();
  };

  // Load Grid
  // here we are passing [] as the second
  // argument so useEffect behaves like componentDidMount
  useEffect(() => {
    loadGrid();
  }, []);

  return (
    <div className={classes.root}>
      <Button
        variant='contained'
        onClick={handleDijkstraBtn}
        className={classes.visualizeBtn}
      >
        Visualize Dijkstra's algorithm
      </Button>
      <Button
        variant='contained'
        onClick={handleResetGrid}
        className={classes.resetBtn}
      >
        Reset
      </Button>

      <div className={classes.grid}>
        {grid.map((row, rowIndex) => {
          return (
            <div key={rowIndex}>
              {row.map((node, nodeIndex) => {
                const { row, col, isStart, isFinish, isVisited, isWall } = node;
                return (
                  <Node
                    key={nodeIndex}
                    isStart={isStart}
                    isFinish={isFinish}
                    isVisited={isVisited}
                    isWall={isWall}
                    col={col}
                    row={row}
                    handleOnMouseDown={handleOnMouseDown}
                    handleOnMouseUp={handleOnMouseUp}
                    handleOnMouseEnter={handleOnMouseEnter}
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
