const menuState = {
  create: function() {
    this.start()
  },

  start: function() {
    Game.state.start('play')
  }
}
