import Player from '../lib/player';

export default class PlayerStub extends Player {
  constructor(symbol) {
    super(symbol);
    this.moves = [];
  }

  getInput() {
    return { move: this.moves.shift() };
  }
}
