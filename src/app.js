import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const API_HOST = 'http://localhost:4000';

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
        value={this.props.board[i]}
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
      game: null,
      isLoaded: false,
      message: '',
    }
  }

  componentDidMount() {
    this.newGame();

  }

  render() {
    if (!this.state.isLoaded) {
      return <div>Loading ...</div>;
    } else {
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
  }

  renderReplayButton() {
    if (this.state.game.game_state == 'won' || this.state.game.game_state == 'tie') {
      return (
        <div className="replay">
          <button onClick={() => this.newGame()}>Play Again</button>
        </div>
      );
    }
  }

  handleClick(i) {
    fetch(this.state.gameUrl + '/move/' + (i + 1))
    .then(response => response.json())
    .then(game => {
      this.setState({
        game: game,
        board: game["board"],
        message: this.makeAnnouncement(game),
      });
    });
  }

  makeAnnouncement(game) {
    if (game["game_state"] == "won") {
      return `${game["current_player"]["mark"]} wins!`;
    }

    if (game["game_state"] == "tie") {
      return "Tie!";
    }
  }

  newGame() {
    fetch(API_HOST + '/play', { redirect: "follow" } )
    .then(response => {
      this.setState({
        gameUrl: response.url
      });

      response.json().then(game => {
        this.setState({
          isLoaded: true,
          game: game,
          board: game["board"],
          message: 'Human, you go first',
        });
      });
    });
  }
}

const app = document.getElementById('app')
ReactDOM.render(<Main />, app)
