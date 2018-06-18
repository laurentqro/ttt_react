import Line from './line';
import Cell from './cell';

export default class Board {
  constructor(cells) {
    this.cells = cells || [
      new Cell(1), new Cell(2), new Cell(3),
      new Cell(4), new Cell(5), new Cell(6),
      new Cell(7), new Cell(8), new Cell(9)
    ]
  }

  isEmpty() {
    return this.cells.every(cell => cell.isAvailable());
  }

  markCellAtPosition(position, symbol) {
    const cells = this.cells.slice();
    cells[position - 1].markWithSymbol(symbol);
    return new Board(cells);
  }

  cellAtPosition(position) {
    return this.cells[position - 1];
  }

  hasTie() {
    return this.isFull() && !this.hasWin();
  }

  isFull() {
    return this.cells.every(cell => !cell.isAvailable());
  }

  hasWin() {
    return this.lines().some(line => line.hasWin());
  }

  lines() {
    return this.rows().concat(this.columns()).concat(this.diagonals());
  }

  rows() {
    return [
      new Line(this.cells[0], this.cells[1], this.cells[2]),
      new Line(this.cells[3], this.cells[4], this.cells[5]),
      new Line(this.cells[6], this.cells[7], this.cells[8])
    ]
  }

  columns() {
    return [
      new Line(this.cells[0], this.cells[3], this.cells[6]),
      new Line(this.cells[1], this.cells[4], this.cells[7]),
      new Line(this.cells[2], this.cells[5], this.cells[8])
    ]
  }

  diagonals() {
    return [
      new Line(this.cells[0], this.cells[4], this.cells[8]),
      new Line(this.cells[2], this.cells[4], this.cells[6])
    ]
  }

  winningSymbol() {
    if (!this.hasWin()) {
      return null;
    } else {
      let winningLine = this.lines().filter(line => line.hasWin())[0];
      let winningSymbol = winningLine.cells[0].symbol;
      return winningSymbol;
    }
  }

  availableMoves() {
    return this.cells.filter(cell => cell.isAvailable()).map(cell => cell.position);
  }
}
