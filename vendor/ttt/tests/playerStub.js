const Player = require('../lib/player.js');

module.exports = class PlayerStub extends Player {
  constructor(symbol) {
    super(symbol);
    this.moves = [];
  }

  getInput() {
    return { move: this.moves.shift() };
  }
}
