import Player from './player';
import Board from './board';

export default class Game {
  constructor(ui, playerX, playerO) {
    this.ui = ui;
    this.board = new Board();
    this.playerX = playerX;
    this.playerO = playerO;
    this.currentPlayer = playerX;
  }

  play() {
    if (!this.isOver()) {
      this.playTurn();
    } else {
      this.endGame();
    }
  }

  isOver() {
    return this.board.hasWin() || this.board.hasTie();
  }

  start() {
    this.ui.greetPlayers();
  }

  async playTurn() {
    let input = await this.currentPlayer.getInput();
    this.markBoard(input.move);
    this.switchPlayers();
    this.ui.announcePlayerTurn(this.currentPlayer.getSymbol());
    this.ui.printBoard(this.board);
    this.endGame();
  }

  markBoard(position) {
    this.board.markCellAtPosition(position, this.currentPlayer.getSymbol());
  }

  switchPlayers() {
    let nextPlayer = this.currentPlayer.getSymbol() === this.playerX.getSymbol() ? this.playerO : this.playerX;
    this.currentPlayer = nextPlayer;
  }

  endGame() {
    if (this.board.hasWin()) {
      this.ui.announceWinner(this.board.getWinningSymbol());
    } else if (this.board.hasTie()) {
      this.ui.announceTie();
    }
  }
}
