import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Cell(props) {
  return (
    <button className="cell" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: Array(9).fill(null),
      currentPlayer: 'X',
    };
  }

  handleClick(i) {
    const cells = this.state.cells.slice();
    cells[i] = this.state.currentPlayer;
    let nextPlayer = this.state.currentPlayer == 'X' ? 'O' : 'X';
    this.setState({cells: cells, currentPlayer: nextPlayer});
  }

  renderCell(i) {
    return (
      <Cell
        value={this.state.cells[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Current player: ' + (this.state.currentPlayer);

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderCell(0)}
          {this.renderCell(1)}
          {this.renderCell(2)}
        </div>
        <div className="board-row">
          {this.renderCell(3)}
          {this.renderCell(4)}
          {this.renderCell(5)}
        </div>
        <div className="board-row">
          {this.renderCell(6)}
          {this.renderCell(7)}
          {this.renderCell(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

const app = document.getElementById('app')
ReactDOM.render(<Game />, app)
