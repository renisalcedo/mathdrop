const loadState = {
  preload: function() {
    // Loading text with styles
    let loadingLabel = Game.add.text(80, 150, 'loading...', {
      font: '30px Courier',
      fill: '#ffffff'
    })

    // All preloading assets
    this.load.image(
      'background',
      'assets/images/background/full-background.png'
    )
    this.load.image('water', 'assets/images/water.png')
    this.load.image('drop', 'assets/images/drop.png')
  },

  create: function() {
    // ADDS RESPONSIVENESS
    Game.scale.pageAlignHorizontally = true
    Game.scale.pageAlignVertically = true
    // Call the menu state
    Game.state.start('menu')
  }
}
