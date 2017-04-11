// Create new Phaser Game object, with dimensions
Battleship.game = new Phaser.Game(664, 730, Phaser.AUTO, 'game-canvas');
// Add first state to game object
Battleship.game.state.add('GameState', Battleship.GameState);
Battleship.game.state.start('GameState');