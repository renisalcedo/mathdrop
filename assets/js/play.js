const playState = {
  create: function() {
    /* ---------------- */
    /* ---- SPRITES --- */
    /* ---------------- */
    const background = Game.add.sprite(0, 0, 'background')
    background.scale.setTo(0.5, 0.5)

    // WATER DROP AND TEXT
    this.waterDrop = Game.add.sprite(Game.world.centerX, -120, 'drop')
    this.waterDrop.scale.setTo(0.2, 0.2)

    const mathTextStyle = {
      font: '32px Arial',
      fill: '#fff',
      wordWrap: true,
      wordWrapWith: this.waterDrop.width,
      align: 'center'
    }

    this.mathText = Game.add.text(0, 0, '1 + 5', mathTextStyle)
    this.mathText.anchor.setTo(0.5)

    // Add Physics
    Game.physics.arcade.enable(this.waterDrop)
    Game.physics.arcade.gravity.y = 250
    this.waterDrop.collideWorldBounds = true
  },

  update: function() {
    this.mathText.x = Math.floor(this.waterDrop.x + this.waterDrop.width / 2)
    this.mathText.y = Math.floor(
      this.waterDrop.y + this.waterDrop.height / 2 + 55
    )

    if (this.waterDrop.y >= 435) {
      console.log('COLLIDE!')
      this.waterDrop.destroy()
    }
  },

  mathProblem: function(operation, max = 15) {
    // OPERATION SYMBOL
    const operations = ['+', '-', '*', '/']
    const rand = Math.floor(Math.random() * operations.length)
    const symbol = operation || operations[rand]

    // NUMBERS
    const left = Math.floor(Math.random() * max + 1)
    const right = Math.floor(Math.random() * max + 1)
    const problem = `${left} ${symbol} ${right}`

    return mathProblem
  },

  gameOver: function() {
    Game.state.start('over')
  }
}
