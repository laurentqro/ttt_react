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

  startGame() {
    ui.greetPlayers();
  }

  async playTurn() {
    this.ui.printBoard(this.board);
    this.ui.announcePlayerTurn(`Player ${this.currentPlayer.getSymbol()}, it's your turn.`);

    let input = await this.currentPlayer.getInput();

    this.markBoard(input.move);
    this.switchPlayers();
    this.ui.printBoard(this.board);
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
      this.ui.announceWinner(`Player ${this.board.getWinningSymbol()} wins!`);
    } else {
      this.ui.announceTie(`It's a tie!`);
    }
  }
}
