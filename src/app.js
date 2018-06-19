import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from '../vendor/ttt/lib/game';

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

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: new Game()
    }
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <div className="status">
            {this.state.game.status}
          </div>

          <Board
            board={this.state.game.board}
            status={this.state.game.status}
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
    console.log("click");
  }

  handleReplay() {
    this.setState({
      game: new Game()
    });
  }
}

const app = document.getElementById('app')
ReactDOM.render(<Main />, app)
