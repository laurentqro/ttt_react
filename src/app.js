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
  renderCell(i) {
    return (
      <Cell
        value={this.props.board.cellAtPosition(i + 1).symbol}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="status">{this.props.status}</div>
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
  constructor(props) {
    super(props);
    this.state = {
      board: new CoreBoard(),
      currentPlayer: 'X',
    }
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board
            board={this.state.board}
            currentPlayer={this.state.currentPlayer}
            status={this.status()}
            onClick={(i) => this.handleClick(i)}
        />
          {this.renderReplayButton()}
        </div>
      </div>
    );
  }

  renderReplayButton() {
    if (this.state.board.hasWin() || this.state.board.hasTie()) {
      return (
        <div className="replay">
          <button onClick={() => this.handleReplay()}>Play Again</button>
        </div>
      );
    }
  }

  handleClick(i) {
    if (this.state.board.cellAtPosition(i + 1).isAvailable()) {
      let board = this.state.board.markCellAtPosition(i + 1, this.state.currentPlayer);
      let nextPlayer = this.state.currentPlayer == 'X' ? 'O' : 'X';
      this.setState({board: board, currentPlayer: nextPlayer});
    }
  }

  handleReplay() {
    this.setState({
      board: new CoreBoard(),
      currentPlayer: 'X',
    });
  }

  status() {
    if (this.state.board.hasWin()) {
      return `Player ${this.state.board.winningSymbol()} wins!`;
    } else if (this.state.board.hasTie()) {
      return 'Tie!';
    } else {
      return `${this.state.currentPlayer}'s turn`;
    }
  }

}

const app = document.getElementById('app')
ReactDOM.render(<Game />, app)
