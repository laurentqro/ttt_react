module.exports = class Line {
  constructor(...cells) {
    this.cells = cells;
  }

  hasWin() {
    return this.isFull() && this.hasIdenticalSymbols();
  }

  isFull() {
    return this.cells.every(cell => cell.isTaken());
  }

  hasIdenticalSymbols() {
    return this.getMarkedCells().every(cell => cell.getSymbol() === this.cells[0].getSymbol());
  }

  getMarkedCells() {
    return this.cells.filter(cell => cell.isTaken());
  }
}
