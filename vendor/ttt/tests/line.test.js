const expect = require('chai').expect;

import Line from '../lib/line';
import Cell from '../lib/cell';

it('identifies a win', () => {
  let line = new Line(new Cell(1), new Cell(2), new Cell(3));

  line.cells.forEach((cell) => {
    cell.markWithSymbol('X');
  });

  expect(line.hasWin()).to.equal(true);
});
