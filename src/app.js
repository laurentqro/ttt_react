import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from '../vendor/ttt/lib/game';
import Player from '../vendor/ttt/lib/player';

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
        value={this.props.board.getCellAtPosition(i + 1).symbol}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
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

class WebPlayer extends Player {
  constructor(symbol) {
    super(symbol)

    this.nextMove = 1
  }

  getInput() {
    return {
      move: this.nextMove
    }
  }
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    const playerX = new WebPlayer('X');
    const playerO = new WebPlayer('O');

    const game = new Game(this, playerX, playerO)
    this.state = {
      game: game,
      board: game.board
    }
  }

  componentDidMount() {
    this.state.game.playTurn();
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <div className="status">
            {this.state.message}
          </div>

          <Board
            board={this.state.board}
            onClick={(i) => this.handleClick(i)}
          />
          {this.renderReplayButton()}
        </div>
      </div>
    );
  }

  renderReplayButton() {
    if (this.state.game.isOver()) {
      return (
        <div className="replay">
          <button onClick={() => this.handleReplay()}>Play Again</button>
        </div>
      );
    }
  }

  handleClick(i) {
    this.state.game.currentPlayer.nextMove = i + 1;
    this.state.game.playTurn();
  }

  handleReplay() {
    this.setState({
      game: new Game(),
    });
  }

  printBoard(board) {
    this.setState({
      board: board
    });
  }

  announcePlayerTurn(message) {
    this.setState({
      message: message
    })
  }
}

const app = document.getElementById('app')
ReactDOM.render(<Main />, app)
