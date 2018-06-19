import Player from './player';
import Board from './board';

export default class Game {
  constructor(playerX, playerO) {
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
    console.log("Welcome to Tic Tac Toe");
  }

  async playTurn() {
    this.printBoard();
    console.log(`Player ${this.currentPlayer.getSymbol()}, it's your turn.`);

    let input = await this.currentPlayer.getInput();

    this.markBoard(input.move);
    this.switchPlayers();
    this.play();
  }

  markBoard(position) {
    this.board.markCellAtPosition(position, this.currentPlayer.getSymbol());
  }

  switchPlayers() {
    let nextPlayer = this.currentPlayer.getSymbol() === this.playerX.getSymbol() ? this.playerO : this.playerX;
    this.currentPlayer = nextPlayer;
  }

  printBoard() {
    console.log(this.board);
  }

  endGame() {
    if (this.board.hasWin()) {
      console.log(`Player ${this.board.getWinningSymbol()} wins!`);
    } else {
      console.log(`It's a tie!`);
    }
  }
}
