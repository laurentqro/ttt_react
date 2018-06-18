export default class Line {
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
    return this.markedCells().every(cell => cell.symbol === this.cells[0].symbol);
  }

  markedCells() {
    return this.cells.filter(cell => cell.isTaken());
  }
}
