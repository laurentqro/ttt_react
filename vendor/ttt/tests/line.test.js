const expect = require('chai').expect;
const Line = require('../lib/line.js');
const Cell = require('../lib/cell.js');

it('identifies a win', () => {
  let line = new Line(new Cell(1), new Cell(2), new Cell(3));

  line.cells.forEach((cell) => {
    cell.markWithSymbol('X');
  });

  expect(line.hasWin()).to.equal(true);
});
