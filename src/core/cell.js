export default class Cell {
  constructor(position) {
    this.position = position;
    this.symbol = null;
  }

  markWithSymbol(symbol) {
    this.symbol = symbol;
  }

  isAvailable() {
    return this.symbol === null;
  }

  isTaken() {
    return !this.isAvailable();
  }
}
