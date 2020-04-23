import React, { Component } from "react";
import TicTacCell from "./ticTacCell";
import "./ticTacBoard.css";
class TicTacBoard extends Component {
  state = {
    cells: this.props.cells,
    n: 3,
    selectedPlayer: this.props.selectedPlayer,
    cellSelectedCount: 0,
  };

  onCellClick = (cell) => {
    if (cell.catchby) {
      return;
    }
    let newCells = [...this.state.cells];
    newCells[cell.index.row][
      cell.index.col
    ].catchby = this.props.selectedPlayer;

    this.setState({ cells: newCells }, function () {});
    if (this.state.cellSelectedCount >= 2) {
      const isCurrontPlayerWin = this.checkVictory(cell);
      if (isCurrontPlayerWin) {
        alert(`Player :` + cell.catchby.name + " is Win");
      }
    }
    this.setState(
      { cellSelectedCount: ++this.state.cellSelectedCount },
      function () {}
    );
    this.props.changePlayer();
  };
  checkVictory = (cell) => {
    return this.checkBoard(cell);
  };
  checkBoard = (cell) => {
    let rowSelectedCellCounter = 0;
    let colSelectedCellCounter = 0;
    let diagSelectedCellCounter = 0;

    const n = this.state.n;
    const row = cell.index.row;
    const col = cell.index.col;

    for (let i = 0; i < n; i++) {
      debugger;
      if (this.state.cells[row][i].catchby === cell.catchby) {
        rowSelectedCellCounter++;
      }
      if (this.state.cells[i][col].catchby === cell.catchby) {
        colSelectedCellCounter++;
      }
      if (this.isCellOnDiag(row, col, n, i, cell.catchby)) {
        diagSelectedCellCounter++;
      }
    }

    return rowSelectedCellCounter === 3 ||
      colSelectedCellCounter === 3 ||
      diagSelectedCellCounter === 3
      ? true
      : false;
  };

  isCellOnDiag = (row, col, n, i, catchby) => {
    debugger;
    if (row === col) {
      // main diag
      return catchby === this.state.cells[i][i].catchby;
    } else if (row + col === n - 1) {
      // second diag
      return catchby === this.state.cells[i][n - i - 1];
    }
  };

  createCell(index) {}
  render() {
    // this.state.cells = ;
    var element = null;
    var elements = [];

    this.state.cells.forEach((cells) => {
      element = cells.map((cellEl, index) => {
        return (
          <TicTacCell
            cell={cellEl}
            selectedPlayer={this.state.selectedPlayer}
            onCellClick={this.onCellClick}
          ></TicTacCell>
        );
      });

      elements = elements.concat(element);
    });

    return elements;
  }
}

export default TicTacBoard;
