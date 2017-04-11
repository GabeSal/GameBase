Battleship.GameState.enemyHit = function(cell) {
  // mark off enemy ship
  cell.marker = 0;
  cell.hasEnemy = false;
  console.log("enemy found!");
};

Battleship.GameState.miss = function(cell) {
  // mark a miss sprite on the board
  if (cell.marker === 0 && !cell.hasEnemy) {
    console.log("nothing here");
  }
};