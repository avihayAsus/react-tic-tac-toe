import React, { Component } from "react";
import TicTacPlayer from "./TicTacPlayer";
import "./ticTacCell.css";
import Cell from "./Cell";

class TicTacCell extends Component {
  state = { cell: null, data: "", selectedPlayer: this.props.selectedPlayer };
  // selectCell = (e) => {
  //   console.log(e);
  //   this.setState({ cell: new Cell(this.state.selectedPlayer) });
  //   this.setState({ data: this.getShape(this.state.cell.catchby.shape) });
  //   //this.state.cell.catchby = this.state.firstPlayer;
  // };
  getShape(catchby) {
    if (!catchby) return "";
    return catchby.shape === 0 ? "x" : "o";
  }
  render() {
    //this.setState({ cell: this.props.cell });
    //console.log("cell " + this.state.cell);

    this.state.cell = this.props.cell;
    this.state.selectedPlayer = this.props.selectedPlayer;

    return (
      <div
        onClick={() => this.props.onCellClick(this.props.cell)}
        className="cell"
      >
        {this.getShape(this.state.cell.catchby)}
      </div>
    );
  }
}

export default TicTacCell;
