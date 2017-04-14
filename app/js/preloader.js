Battleship.GameState.init = function() {
  // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  this.game.physics.startSystem(Phaser.Physics.ARCADE);
};

Battleship.GameState.preload = function() {
  this.load.image('bullet', 'img/assets/gfx/rocket.png');
  this.load.image('player', 'img/assets/gfx/bullet.png');
  this.load.image('enemy', 'img/assets/gfx/player.png');
  this.load.image('ground', 'img/assets/gfx/ground.png');
  this.load.image('ship2', 'img/assets/gfx/ship2.png');
  this.load.image('ship3', 'img/assets/gfx/ship3.png');
  this.load.image('ship4', 'img/assets/gfx/ship4.png');
  this.load.image('ship5', 'img/assets/gfx/ship5.png');
  this.load.image('ship6', 'img/assets/gfx/ship6.png');

  this.load.spritesheet('explosion', 'img/assets/gfx/explosion.png', 128, 128);
  this.load.spritesheet('cell', 'img/assets/gfx/cells.png', 64, 64);
};

Battleship.GameState.positionData = function() {
  this.matrix = [
    [0, 0, 0, 0, 0, 0, 0, 0, 2, 2],
    [0, 5, 5, 5, 5, 5, 0, 0, 0, 0],
    [0, 0, 0, 6, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 6, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 6, 0, 0, 0, 0, 0, 0],
    [0, 3, 0, 6, 0, 0, 0, 0, 0, 0],
    [0, 3, 0, 6, 0, 0, 0, 0, 0, 0],
    [0, 3, 0, 6, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 4, 4, 4, 4, 0, 0, 0],
  ];

  this.levels.ships = [
  {
    'ship2': {
      'angle': 0
    },
    'ship3': {
      'angle': 90
    },
    'ship4': {
      'angle': 0
    }, 
    'ship5': {
      'angle': 0
    },
    'ship6': {
      'angle': 90
    }
  }
  ];
};

Battleship.GameState.create = function() {
  this.game.stage.backgroundColor = '#4488cc';

  this.positionData();
  this.spawnBoard();

  this.gun = this.game.add.sprite(this.game.width / 2, this.game.height - 10, 'player');
  this.gun.anchor.setTo(0.5, 0.5);

  this.bulletPool = this.game.add.group();
  for (var i = 0; i < this.NUMBER_OF_BULLETS; i++) {
    var bullet = this.game.add.sprite(0, 0, 'bullet');
    this.bulletPool.add(bullet);

    bullet.anchor.setTo(0.5, 0.5);

    this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
    bullet.kill();
  }

  // simulates mouse pointer in center of stage
  this.game.input.activePointer.x = this.game.width / 2;
  this.game.input.activePointer.y = this.game.height / 2;

  this.explosionGroup = this.game.add.group();
};

