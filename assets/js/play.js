const playState = {
  create: function() {
    // INITIAL VARIABLES
    this.currentProblem = ''
    this.currentSolution = 0
    this.problems = 0
    this.waterLevel = 0

    // BACKGROUND IMAGE
    const background = Game.add.sprite(0, 0, 'background')
    background.scale.setTo(0.5, 0.5)

    // WATER SPRITE
    this.water = Game.add.sprite(0, Game.world.centerY * 2, 'water')
    this.water.scale.setTo(2, 0)

    // GENERATE WATER DROPS WITH TEXT
    Game.time.events.repeat(
      Phaser.Timer.SECOND * 3.5,
      10000,
      this.generateDrop.bind(this)
    )

    // INITIALIZES THE TEXT CHOICES
    this.initChoices()
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
        this.failedAttempt()
      }

      this.waterDrop.events.onDestroy.add(this.waterLevelIncreases, this)
    }
  },

  failedAttempt: function() {
    this.waterDrop.destroy()
    this.mathText.destroy()
  },

  waterLevelIncreases: function() {
    this.waterLevel -= 0.2
    this.water.scale.setTo(2, this.waterLevel)
  },

  generateDrop: function() {
    // WATER DROP
    this.waterDrop = Game.add.sprite(Game.world.centerX, -120, 'drop')
    this.waterDrop.scale.setTo(0.2, 0.2)
    this.problems++

    // TEXT STYLES
    const mathTextStyle = {
      font: '32px Arial',
      fill: '#fff',
      wordWrap: true,
      wordWrapWith: this.waterDrop.width,
      align: 'center'
    }

    // WATER TEXT
    this.currentProblem = this.mathProblem()
    this.currentSolution = this.problemResult(this.currentProblem)
    this.mathText = Game.add.text(0, 0, this.currentProblem, mathTextStyle)
    this.mathText.anchor.setTo(0.5)

    // CALLS MULTIPLE CHOICES TEXT
    // this.multipleChoices()

    // Add Physics
    Game.physics.arcade.enable(this.waterDrop)
  },

  initChoices: function() {
    // TEXT STYLES
    const optionTextStyle = {
      font: '32px Arial',
      fill: '#ff0000',
      align: 'center'
    }

    this.optionOne = Game.add.text(
      Game.world.centerX - 100,
      150,
      '5',
      optionTextStyle
    )
    this.optionTwo = Game.add.text(
      Game.world.centerX - 100,
      195,
      '20',
      optionTextStyle
    )
    this.optionThree = Game.add.text(
      Game.world.centerX - 100,
      235,
      '30',
      optionTextStyle
    )
    this.optionFour = Game.add.text(
      Game.world.centerX - 100,
      275,
      '3',
      optionTextStyle
    )
  },

  mathProblem: function(operation, max = 15) {
    // OPERATION SYMBOL
    const operations = ['+', '-', '*']
    const rand = Math.floor(Math.random() * operations.length)
    const symbol = operation || operations[rand]

    // NUMBERS
    const left = Math.floor(Math.random() * max + 1)
    const right = Math.floor(Math.random() * max + 1)
    const problem = `${left} ${symbol} ${right}`

    return problem
  },

  problemResult: function(problem) {
    const values = problem.split(' ')
    // CONVERTS LEFT AND RIGHT TO INTEGERS
    const left = parseInt(values[0])
    const right = parseInt(values[2])

    // RETURN RESULT BASED ON OPERATION
    switch (values[1]) {
      case '+':
        return left + right
        break
      case '-':
        return left - right
        break
      case '*':
        return left * right
        break
    }
  },

  gameOver: function() {
    Game.state.start('over')
  }
}
