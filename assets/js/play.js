const playState = {
  create: function() {
    this.problems = 0
    // INITIAL GAMEPLAY
    const background = Game.add.sprite(0, 0, 'background')
    background.scale.setTo(0.5, 0.5)

    // GENERATE WATER DROPS WITH TEXT
    Game.time.events.repeat(
      Phaser.Timer.SECOND * 3.3,
      10000,
      this.generateDrop.bind(this)
    )
  },

  update: function() {
    // INITIATES WATER DROP MOVEMENT WHEN DEFINED
    if (this.mathText && this.waterDrop) {
      this.waterDrop.y += 3

      this.mathText.x = Math.floor(this.waterDrop.x + this.waterDrop.width / 2)
      this.mathText.y = Math.floor(
        this.waterDrop.y + this.waterDrop.height / 2 + 55
      )

      if (this.waterDrop.y >= 400) {
        this.destroyProblem()
      }
    }
  },

  destroyProblem: function() {
    this.waterDrop.destroy()
    this.mathText.destroy()
  },

  generateDrop: function() {
    // WATER DROP
    this.waterDrop = Game.add.sprite(Game.world.centerX, -120, 'drop')
    this.waterDrop.scale.setTo(0.2, 0.2)
    this.problems += 1

    // TEXT STYLES
    const mathTextStyle = {
      font: '32px Arial',
      fill: '#fff',
      wordWrap: true,
      wordWrapWith: this.waterDrop.width,
      align: 'center'
    }

    // WATER TEXT
    this.mathText = Game.add.text(0, 0, this.mathProblem(), mathTextStyle)
    this.mathText.anchor.setTo(0.5)

    // Add Physics
    Game.physics.arcade.enable(this.waterDrop)
    this.waterDrop.collideWorldBounds = true
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

    return problem
  },

  gameOver: function() {
    Game.state.start('over')
  }
}
