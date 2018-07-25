const gameOver = {
  create: function() {
    let overLabel = Game.add.text(80, 150, 'GameOver', {
      font: '30px Courier',
      fill: '#ffffff'
    })
    this.restart()
  },

  restart: function() {
    Game.state.start('menu')
  }
}
