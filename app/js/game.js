//TODO make sure board correctly calculates 

Battleship.GameState.shootBullet = function() {
  // Enforce a short delay between shots by recording
  // the time that each bullet is shot

  if(this.lastBulletShotAt === undefined) this.lastBulletShotAt = 0;
  if(this.game.time.now - this.lastBulletShotAt < this.SHOT_DELAY) return;
  this.lastBulletShotAt = this.game.time.now;

  // get dead bullet from the pool
  var bullet = this.bulletPool.getFirstDead();

  // if there aren't any bullets in pool, then don't shoot
  if (bullet === null || bullet === undefined) return;

  //revive bullet
  bullet.revive();

  // Bullets will kill themselves when they leave world bounds
  bullet.checkWorldBounds = true;
  bullet.outOfBoundsKill = true;

  bullet.reset(this.gun.x, this.gun.y);
  bullet.rotation = this.gun.rotation;

  // Shoot bullet in the given coordinates
  bullet.body.velocity.x = Math.cos(bullet.rotation) * this.BULLET_SPEED;
  bullet.body.velocity.y = Math.sin(bullet.rotation) * this.BULLET_SPEED;
};

// Update method is called every frame
Battleship.GameState.update = function() {

  this.GameOver();
  // collision method
  this.game.physics.arcade.collide(this.bulletPool, this.cells, function(bullet, cell) {
  // trigger explosion
    console.log("cell x: " + cell.posX + " cell y: " + cell.posY);

    bullet.kill();

    if (cell.hasEnemy) {
      // enemy was hit
      this.getExplosion(cell, cell.posX, cell.posY);
      this.enemyHit(cell);
      // check for sunken ship
      this.sunkEnemyBattleship(cell);

      // destroy gun and ships, reset board
      if (this.gameOver) {
        this.cells.forEach(function (item) {
          item.frame = 0;
        }, this);

        this.gun.destroy();
        this.ship2.location.destroy();
        this.ship3.location.destroy();
        this.ship4.location.destroy();
        this.ship5.location.destroy();
        this.ship6.location.destroy();

        this.create();
      }
    } else {
      // there is nothing in the cell
      this.miss(cell);
    }

    if(cell.body.enable) {
      cell.body.enable = false;
    }
  }, null, this);
  
  //Aim the gun at mouse pointer
  this.gun.rotation = this.game.physics.arcade.angleToPointer(this.gun);
};

Battleship.GameState.getExplosion = function(cell, x, y) {
  var explosion = this.explosionGroup.getFirstDead();

  if (explosion === null) {
    explosion = this.game.add.sprite(0, 0, 'explosion');
    explosion.anchor.setTo(0.5, 0.5);

    var animation = explosion.animations.add('boom', [0, 0, 1, 2, 3], 60, false);
    animation.killOnComplete = true;

    this.explosionGroup.add(explosion);
  }

  explosion.revive();

  explosion.x = x;
  explosion.y = y;

  explosion.angle = this.game.rnd.integerInRange(0, 360);

  explosion.animations.play('boom');

  return explosion;
};

Battleship.GameState.spawnBoard = function() {
  this.BOARD_COLS = Math.floor(this.game.world.width / this.CELL_SIZE_SPACED);
  this.BOARD_ROWS = Math.floor((this.game.world.height / this.CELL_SIZE_SPACED) - 1);

  this.cells = this.game.add.group();

  // used to check if ship is sunk by adding the hit score(enemyContact)
  this.cells.ship2 = 0;
  this.cells.ship3 = 0;
  this.cells.ship4 = 0;
  this.cells.ship5 = 0;
  this.cells.ship6 = 0;

  // sets current visibility to false
  this.ship2.placed = false;
  this.ship3.placed = false;
  this.ship4.placed = false;
  this.ship5.placed = false;
  this.ship6.placed = false;

  // build the board
  for (var col = 0; col < this.BOARD_COLS; col++) {
    for (var row = 0; row < this.BOARD_ROWS; row++) {
      var cell = this.cells.create((col * this.CELL_SIZE_SPACED) + this.CELL_SIZE_SPACED/2 + 2, (row * this.CELL_SIZE_SPACED + this.CELL_SIZE/2 + 2), 'cell', 0);
      cell.anchor.setTo(0.5, 0.5);
      cell.name = 'cell: ' + col.toString() + 'x' + row.toString();
      cell.inputEnabled = true;
      cell.enemyContact = 0; // var used to represent successful hit
      cell.marker = this.matrix[row][col];
      this.shipPlacement(cell, cell.marker);
      cell.posX = cell.x;
      cell.posY = cell.y;
      // check to see if there is a marker in cell
      cell.hasEnemy = cell.marker > 0;
      // click events
      cell.events.onInputDown.add(this.selectCell, this);
      cell.events.onInputUp.add(this.releaseCell, this);
    }
  }
};

Battleship.GameState.shipPlacement = function (cell, ship) {
  switch (ship) {

    case 2: 
      if (this.ship2.placed !== true) {
        if (this.levels.ships[0].ship2.angle === 90) {
          this.ship2.location = this.game.add.sprite(cell.x + 32, cell.y - 32, 'ship2');
        } else if (this.levels.ships[0].ship2.angle === 0) {
          this.ship2.location = this.game.add.sprite(cell.x - 32, cell.y - 32, 'ship2');
        }
        this.ship2.location.angle = this.levels.ships[0].ship2.angle;
        this.ship2.location.visible = false;
        this.ship2.placed = true;
      }
      break;

    case 3: 
      if (this.ship3.placed !== true) {
        if (this.levels.ships[0].ship3.angle === 90) {
          this.ship3.location = this.game.add.sprite(cell.x + 32, cell.y - 32, 'ship3');
        } else if (this.levels.ships[0].ship3.angle === 0) {
          this.ship3.location = this.game.add.sprite(cell.x - 32, cell.y - 32, 'ship3');
        }
        this.ship3.location.angle = this.levels.ships[0].ship3.angle;
        this.ship3.location.visible = false;
        this.ship3.placed = true;
      }
      break;

      case 4: 
      if (this.ship4.placed !== true) {
        if (this.levels.ships[0].ship4.angle === 90) {
          this.ship4.location = this.game.add.sprite(cell.x + 32, cell.y - 32, 'ship4');
        } else if (this.levels.ships[0].ship4.angle === 0) {
          this.ship4.location = this.game.add.sprite(cell.x - 32, cell.y - 32, 'ship4');
        }
        this.ship4.location.angle = this.levels.ships[0].ship4.angle;
        this.ship4.location.visible = false;
        this.ship4.placed = true;
      }
      break;

      case 5: 
      if (this.ship5.placed !== true) {
        if (this.levels.ships[0].ship5.angle === 90) {
          this.ship5.location = this.game.add.sprite(cell.x + 32, cell.y - 32, 'ship5');
        } else if (this.levels.ships[0].ship5.angle === 0) {
          this.ship5.location = this.game.add.sprite(cell.x - 32, cell.y - 32, 'ship5');
        }
        this.ship5.location.angle = this.levels.ships[0].ship5.angle;
        this.ship5.location.visible = false;
        this.ship5.placed = true;
      }
      break;

      case 6: 
      if (this.ship6.placed !== true) {
        if (this.levels.ships[0].ship6.angle === 90) {
          this.ship6.location = this.game.add.sprite(cell.x + 32, cell.y - 32, 'ship6');
        } else if (this.levels.ships[0].ship6.angle === 0) {
          this.ship6.location = this.game.add.sprite(cell.x - 32, cell.y - 32, 'ship6');
        }
        this.ship6.location.angle = this.levels.ships[0].ship6.angle;
        this.ship6.location.visible = false;
        this.ship6.placed = true;
      }
      break;
  }
};

Battleship.GameState.selectCell = function(cell) {

  this.shootBullet();
  // selected cell physics
  this.game.physics.enable(cell, Phaser.Physics.ARCADE);
  cell.body.immovable = true;
  cell.body.allowGravity = false;
  if (cell.hasEnemy) {
    cell.enemyContact = cell.marker;
    cell.marker = 0;
    console.log('found enemy');
  }
};

Battleship.GameState.releaseCell = function(cell) {

};

Battleship.GameState.GameOver = function() {
  var board = {};
  var boardScore = 0;

  board = this.cells.children;
  for (var i = 0; i < board.length; i++) {
    boardScore += board[i].marker;
  }

  if (boardScore <=0) {
    this.gameOver = true;
  } else {
    this.gameOver = false;
  }
};
