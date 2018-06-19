export default class Player {
  constructor(symbol, cli) {
    this.symbol = symbol;
    this.cli = cli;
  }

  getInput() {
    const questions = [
      {
        name: 'move',
        type: 'input',
        message: 'Please pick your move:',
      }
    ];

    return this.cli.prompt(questions);
  }

  getSymbol() {
    return this.symbol;
  }
}
