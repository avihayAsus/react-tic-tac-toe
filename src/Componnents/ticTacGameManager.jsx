import React, { Component } from "react";
import TicTacBoard from "./ticTacBoard";
import TicTacPlayer from "./TicTacPlayer";
import { Cell, Index } from "./Cell";
import "./ticTacGameManager.css";

class TicTacGameManager extends Component {
  //shape 0 => x
  //shape 1 => o

  state = {
    player1: new TicTacPlayer("avihay", 0),
    player2: new TicTacPlayer("roni", 1),
    cells: null,
    n: 3,
    selectedPlayer: null,
  };
  buildGame(n) {
    let cells = [];
    this.BuildBoardMatrix(this.state.n, cells);
    this.setState({ selectedPlayer: this.state.player2, cells: cells });
  }
  getShape(shapeType) {
    return shapeType === 0 ? "x" : "o";
  }

  BuildBoardMatrix(n, cells) {
    for (let i = 0; i < n; i++) {
      var row = [];
      for (let j = 0; j < n; j++) {
        row.push(new Cell(null, new Index(i, j)));
      }
      cells[i] = row;
    }
  }

  targetPlayer = (e, data) => {
    this.buildGame(this.state.n);
    // access to e.target here
    this.paintPlayer(e);
  };
  changePlayer = () => {
    if (this.state.selectedPlayer === this.state.player1) {
      this.setState({ selectedPlayer: this.state.player2 }, function () {});
    } else {
      this.setState({ selectedPlayer: this.state.player1 }, function () {});
    }
  };

  paintPlayer(e) {
    if (e.target.id === "player1") {
      this.setState({ selectedPlayer: this.state.player1 }, function () {});
      // this.state.selectedPlayer = this.state.player1;
      e.target.nextElementSibling.style.backgroundColor = "transparent";
    } else {
      this.setState({ selectedPlayer: this.state.player2 }, function () {
        console.log(this.state.selectedPlayer);
      });
      e.target.parentElement.children[0].style.backgroundColor = "transparent";
    }
    e.target.style.backgroundColor = "yellow";
  }

  getBoardElement() {
    if (this.state.cells) {
      return (
        <div className="tic-tac-board">
          <TicTacBoard
            cells={this.state.cells}
            selectedPlayer={this.state.selectedPlayer}
            changePlayer={this.changePlayer}
          />
        </div>
      );
    } else {
      return <div></div>;
    }
  }
  render() {
    //this.setState({ n: 3 });
    //this.buildGame();
    return (
      <main>
        <div
          className="player"
          onClick={(e, data) => this.targetPlayer(e, data)}
          id="player1"
        >
          {this.state.player1.name}: {this.getShape(this.state.player1.shape)}
        </div>
        <div
          className="player"
          onClick={(e, data) => this.targetPlayer(e, data)}
          id="player2"
        >
          {this.state.player2.name}: {this.getShape(this.state.player2.shape)}
        </div>
        {this.getBoardElement()}
      </main>
    );
  }
}

export default TicTacGameManager;
