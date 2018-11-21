const playState = {
  create: function() {
    // INITIAL VARIABLES
    this.currentProblem = ''
    this.currentSolution = 0
    this.problems = 0
    this.waterLevel = 0
    this.choicesLength = 4

    // BACKGROUND IMAGE
    const background = Game.add.sprite(0, 0, 'background')
    background.scale.setTo(0.5, 0.5)

    // Option Text with styles
    const optionTextStyle = { font: '32px Arial', fill: '#ff0000' }
    this.opt1 = Game.add.text( Game.world.centerX - 100, 150 + 40, "", optionTextStyle)
    this.opt2 = Game.add.text( Game.world.centerX - 100, 150 + 80, "", optionTextStyle)
    this.opt3 = Game.add.text( Game.world.centerX - 100, 150 + 120, "", optionTextStyle)
    this.opt4 = Game.add.text( Game.world.centerX - 100, 150 + 160, "", optionTextStyle)
    this.option = [this.opt1, this.opt2, this.opt3, this.opt4]

    // Initialize click events for the text
    this.addClickEvents()

    // WATER SPRITE
    this.water = Game.add.sprite(0, Game.world.centerY * 2, 'water')
    this.water.scale.setTo(2, 0)

    // GENERATE WATER DROPS WITH TEXT
    Game.time.events.repeat(
      Phaser.Timer.SECOND * 3.5,
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
        this.failedAttempt()
      }
    }
  },

  failedAttempt: function() {
    this.waterDrop.destroy()
    this.mathText.destroy()
  },

  attempt: function(opt) {
    if (parseInt(opt.text) === this.currentSolution) {
      console.log("Correct")
    } else {
      this.failedAttempt()
    }
  },

  waterLevelIncreases: function() {
    this.waterLevel -= 0.2
    this.water.scale.setTo(2, this.waterLevel)
  },

  generateDrop: function() {
    // WATER DROP
    this.waterDrop = Game.add.sprite(Game.world.centerX, -120, 'drop')
    this.waterDrop.events.onDestroy.add(this.waterLevelIncreases, this)
    this.waterDrop.scale.setTo(0.2, 0.2)
    this.problems++

    // TEXT STYLES
    const mathTextStyle = {
      font: '25px Arial',
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

    // INITIALIZES THE TEXT CHOICES
    this.initChoices()

    // Add Physics
    Game.physics.arcade.enable(this.waterDrop)
  },

  initChoices: function() {
    let choices = this.populateChoices()

    for (let i = 0; i < choices.length; i++) {
      this.option[i].setText(choices[i])
    }
  },

  populateChoices: function() {
    let choices = []
    choices.push(this.currentSolution)
    for (let i = 0; i < 3; i++) {
      choices.push(Math.floor(Math.random() * 99))
    }

    return this.shuffle(choices)
  },

  shuffle: function(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
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

  addClickEvents: function() {
    for(let i = 0; i < this.option.length; i++) {
      this.option[i].inputEnabled = true
      this.option[i].events.onInputDown.add(this.attempt, this, this.option[i])
    }
  },

  gameOver: function() {
    Game.state.start('over')
  }
}
