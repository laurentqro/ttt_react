import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Game from '../vendor/ttt/lib/game';
import Player from '../vendor/ttt/lib/player';

import Cell from './cell';
import Board from './board';
import WebPlayer from './webPlayer';

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
    this.state.game.start();
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
    console.log('replay');
    const playerX = new WebPlayer('X');
    const playerO = new WebPlayer('O');

    const game = new Game(this, playerX, playerO)
    this.setState({
      game: game,
      board: game.board,
    });
    this.announcePlayerTurn(playerX.getSymbol());
  }

  printBoard(board) {
    this.setState({
      board: board
    });
  }

  announcePlayerTurn(currentPlayer) {
    this.setState({
      message: `${currentPlayer}, it's your turn`
    })
  }

  announceWinner(winningSymbol) {
    this.setState({
      message: `Player ${winningSymbol} wins!`
    })
  }

  announceTie() {
    this.setState({
      message: `It's a tie!`
    })
  }

  greetPlayers() {
    this.setState({
      message: `Welcome to Reactictoe! X, it's your turn`
    })
  }
}

const app = document.getElementById('app')
ReactDOM.render(<Main />, app)
