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
  // collision method
  this.game.physics.arcade.collide(this.bulletPool, this.cells, function(bullet, cell) {
  // trigger explosion
    this.getExplosion(cell, cell.posX, cell.posY);
    console.log("cell x: " + cell.posX + " cell y: " + cell.posY);
    // kill bullet
    bullet.kill();

    if(cell.body.enable) {
      cell.body.enable = false;
    }
    // call for enemy hit
    this.enemyHit(cell);
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

Battleship.GameState.positionData = function() {
  this.matrix = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
  ];
};

Battleship.GameState.spawnBoard = function() {
  this.BOARD_COLS = Math.floor(this.game.world.width / this.CELL_SIZE_SPACED);
  this.BOARD_ROWS = Math.floor((this.game.world.height / this.CELL_SIZE_SPACED) - 1);

  this.cells = this.game.add.group();

  // build the board
  for (var col = 0; col < this.BOARD_COLS; col++) {
    for (var row = 0; row < this.BOARD_ROWS; row++) {
      var cell = this.cells.create((col * this.CELL_SIZE_SPACED) + this.CELL_SIZE_SPACED/2 + 2, (row * this.CELL_SIZE_SPACED + this.CELL_SIZE/2 + 2), 'cell');
      cell.anchor.setTo(0.5, 0.5);
      cell.name = 'cell: ' + col.toString() + 'x' + row.toString();
      cell.inputEnabled = true;
      cell.marker = this.matrix[row][col];
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

Battleship.GameState.selectCell = function(cell) {

  this.shootBullet();
  // selected cell physics
  
  if (cell.hasEnemy) {
    this.game.physics.enable(cell, Phaser.Physics.ARCADE);
    cell.body.immovable = true;
    cell.body.allowGravity = false;
    //cell.body.enable = true;
    console.log('found enemy');
  }
  
  //console.log(cell.name);
};

Battleship.GameState.releaseCell = function(cell) {

};
