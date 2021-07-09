// Code has been taken from this git repo 
// https://github.com/clementmihailescu/Pathfinding-Visualizer-Tutorial/blob/master/src/algorithms/dijkstra.js

// Dijkstra's algorithm for finding the shortest distance between two nodes
// takes in a grid, which includes any walls in it
// Returns, in order, all the nodes visited from the start to the end
export function dijkstra (grid, startNode, finishNode) {
  // The array of nodes we are returning
  const nodesVisited = [];

  // 
  const unvisitedNodes = getAllNodes(grid);

  // 1: Set starting node distance to 0 
  startNode.distance = 0;

  // Loop until there are no more unvisited nodes
  while (!!unvisitedNodes.length) {
    // Sort the unvisited nodes every time by their shortest distance
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    // If we encounter a wall, we skip it.
    // if (closestNode.isWall) continue;
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) return nodesVisited;
    closestNode.isVisited = true;
    nodesVisited.push(closestNode);
    if (closestNode === finishNode) return nodesVisited;
    updateUnvisitedNeighbors(closestNode, grid);
  }
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}