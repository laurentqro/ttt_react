import React from 'react';
import Player from '../vendor/ttt/lib/player';

export default class WebPlayer extends Player {
  constructor(symbol) {
    super(symbol)

    this.nextMove = 1
  }

  getInput() {
    return {
      move: this.nextMove
    }
  }
}
