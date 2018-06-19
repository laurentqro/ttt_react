const Line = require('./line.js');
const Cell = require('./cell.js');

module.exports = class Board {
  constructor() {
    this.grid = [
      new Cell(), new Cell(), new Cell(),
      new Cell(), new Cell(), new Cell(),
      new Cell(), new Cell(), new Cell()
    ]
  }

  isEmpty() {
    return this.grid.every(cell => cell.isAvailable());
  }

  markCellAtPosition(position, symbol) {
    this.getCellAtPosition(position).markWithSymbol(symbol);
  }

  getCellAtPosition(position) {
    return this.grid[position - 1];
  }

  hasTie() {
    return (this.isFull() && !this.hasWin());
  }

  isFull() {
    return this.grid.every(cell => !cell.isAvailable());
  }

  hasWin() {
    return this.lines().some(line => line.hasWin());
  }

  lines() {
    return this.rows().concat(this.columns()).concat(this.diagonals());
  }

  rows() {
    return [
      new Line(this.grid[0], this.grid[1], this.grid[2]),
      new Line(this.grid[3], this.grid[4], this.grid[5]),
      new Line(this.grid[6], this.grid[7], this.grid[8])
    ]
  }

  columns() {
    return [
      new Line(this.grid[0], this.grid[3], this.grid[6]),
      new Line(this.grid[1], this.grid[4], this.grid[7]),
      new Line(this.grid[2], this.grid[5], this.grid[8])
    ]
  }

  diagonals() {
    return [
      new Line(this.grid[0], this.grid[4], this.grid[8]),
      new Line(this.grid[2], this.grid[4], this.grid[6])
    ]
  }

  getWinningSymbol() {
    if (!this.hasWin()) {
      return null;
    } else {
      let winningLine = this.lines().filter(line => line.hasWin())[0];
      let winningSymbol = winningLine.cells[0].getSymbol();
      return winningSymbol;
    }
  }
}
