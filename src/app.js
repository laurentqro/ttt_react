import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CoreBoard from './core/board';

function Cell(props) {
  let className = props.value ? 'spin ' : '';
  className += props.value

  return (
    <button className="cell" onClick={props.onClick}>
      <div className={className}>{props.value}</div>
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: new CoreBoard(),
      currentPlayer: 'X',
    };
  }

  handleClick(i) {
    let board = this.state.board.markCellAtPosition(i + 1, this.state.currentPlayer);
    let nextPlayer = this.state.currentPlayer == 'X' ? 'O' : 'X';
    this.setState({board: board, currentPlayer: nextPlayer});
  }

  renderCell(i) {
    return (
      <Cell
        value={this.state.board.cellAtPosition(i + 1).symbol}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  renderStatus() {
    if (this.state.board.hasWin()) {
      return `Player ${this.state.board.winningSymbol()} wins!`;
    } else if (this.state.board.hasTie()) {
      return 'Tie!';
    } else {
      return `${this.state.currentPlayer}'s turn`;
    }
  }

  render() {
    return (
      <div>
        <div className="status">{this.renderStatus()}</div>
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
