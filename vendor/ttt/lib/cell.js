module.exports = class Cell {
  constructor() {
    this.symbol = null;
  }

  getSymbol() {
    return this.symbol;
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
