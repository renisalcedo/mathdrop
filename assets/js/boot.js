// Will boot initial game state
const bootState = {
  create: function() {
    // Will start the physics system
    Game.physics.startSystem(Phaser.Physics.ARCADE);

    // Call load state
    Game.state.start('load');
  }
};
