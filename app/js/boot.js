// On initial boot of game, define constants
var Battleship = Battleship || {};
Battleship.GameState = Battleship.GameState || {};

Battleship.GameState.SHOT_DELAY = 200; // milliseconds
Battleship.GameState.BULLET_SPEED = 850; // pixels per second
Battleship.GameState.NUMBER_OF_BULLETS = 20;

// board constants
Battleship.GameState.BOARD_COLS; // columns
Battleship.GameState.BOARD_ROWS; // rows
Battleship.GameState.CELL_SIZE = 64; // pixels
Battleship.GameState.CELL_SPACING = 2; // margin/spacing
Battleship.GameState.CELL_SIZE_SPACED = Battleship.GameState.CELL_SIZE + Battleship.GameState.CELL_SPACING; // total size of cell

Battleship.GameState.lastBulletShotAt = undefined;
Battleship.GameState.cells;
Battleship.GameState.selectedCell = null;
Battleship.GameState.selectedCellStartPos = { x: 0, y: 0 };
Battleship.GameState.levels = {};
Battleship.GameState.ship2 = {};
Battleship.GameState.ship3 = {};
Battleship.GameState.ship4 = {};
Battleship.GameState.ship5 = {};
Battleship.GameState.ship6 = {};
Battleship.GameState.gameOver = false;

/* 
  ships are objects and created with the board
  they have an angle property
  uses switch statements for checking the ships location
*/