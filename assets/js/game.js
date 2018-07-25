// Initial setup for the game
const Game = new Phaser.Game(1280, 720, Phaser.AUTO)

// All the states on the game
Game.state.add('boot', bootState)
Game.state.add('load', loadState)
Game.state.add('menu', menuState)
Game.state.add('play', playState)
Game.state.add('over', gameOver)

// Initial Booting State
Game.state.start('boot')
