Battleship.GameState.enemyHit = function(cell) {
  // mark off enemy ship
  cell.hasEnemy = false;
  cell.frame = 1;
  console.log("enemy found!");
};

Battleship.GameState.sunkEnemyBattleship = function(cell) {
    // check to see if all markers of the enemy have been hit
    switch (cell.enemyContact)
    {
        case 2:
            this.cells.ship2 += cell.enemyContact;
            if (this.cells.ship2 === 4) {
                this.ship2.location.visible = true;
            }
        break;

        case 3:
            this.cells.ship3 += cell.enemyContact;
            if (this.cells.ship3 === 9) {
                this.ship3.location.visible = true;
            }
        break;

        case 4:
            this.cells.ship4 += cell.enemyContact;
            if (this.cells.ship4 === 16) {
                this.ship4.location.visible = true;
            }
        break;

        case 5:
            this.cells.ship5 += cell.enemyContact;
            if (this.cells.ship5 === 25) {
                this.ship5.location.visible = true;
            }
        break;

        case 6:
            this.cells.ship6 += cell.enemyContact;
            if (this.cells.ship6 === 36) {
                this.ship6.location.visible = true;
            }
        break;

    }
    
};

Battleship.GameState.miss = function(cell) {
  // mark a miss sprite on the board
  cell.frame = 2;
  console.log("nothing here");
};