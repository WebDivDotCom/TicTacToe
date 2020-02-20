import React, { Component } from "react";
import styled from "styled-components";
import Box from "./Box";

export default class Gameboard extends Component {
  // REACT STATE

  state = {
    // REQ: X always goes first
    nextMove: "X",
    boxes: Array(9).fill(" "),
    winner: null
  };

  // HELPER FUNCTIONS
  changePlayer = nextMove => {
    this.setState({ nextMove: nextMove === "X" ? "O" : "X" });
    return nextMove;
  };

  getWinner() {
    let winner = null;
    const boxes = this.state.boxes;
    const winners = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    // REQ: If a player is able to draw three X’s or three O’s in a row, that player wins
    winners.forEach(win => {
      if (
        boxes[win[0]] !== " " &&
        boxes[win[0]] === boxes[win[1]] &&
        boxes[win[0]] === boxes[win[2]]
      ) {
        winner = boxes[win[0]];
      }
    });

    if (winner !== null) this.setState({ winner: winner });
    // REQ: If all nine squares are filled and neither player has three in a row, the game is a draw
    else if (!boxes.includes(" ")) this.setState({ winner: "It's a draw" });
  }

  // REACT LIFECYCLE METHODS
  componentDidUpdate() {
    if (this.state.winner === null) this.getWinner(); // Do not check for winner if there's one to prevent infinite loop
  }

  render() {
    return (
      <>
        <Board data-testid="gameboard">
          {this.state.boxes.map((b, i) => (
            <Box key={i}>
              {{
                value: b,
                handleClick: () => {
                  // Do not handle the Box-click when there is a winner
                  if (this.state.winner === null) {
                    const tempA = [...this.state.boxes]; // shallow copy array
                    {
                      /* 
                      REQ: Players alternate placing X’s and O’s on the board
                      REQ: Players cannot play on a played position 
                      */
                    }
                    tempA[i] =
                      tempA[i] === " "
                        ? this.changePlayer(this.state.nextMove)
                        : tempA[i];

                    this.setState({ boxes: tempA }); // use a shallow copy to update state-array
                  }
                }
              }}
            </Box>
          ))}
        </Board>
        <Playinfo>
          {this.state.winner === null && (
            <span>Its's the turn of: {this.state.nextMove}</span>
          )}
          {this.state.winner !== null && (
            <span id="winner">
              The winner is:{" "}
              <span data-testid="winner">{this.state.winner}</span>
            </span>
          )}
        </Playinfo>
      </>
    );
  }
}

// STYLED COMPONENTS

const Board = styled.div`
  width: 600px;
  height: 600px;
  display: flex;
  flex-wrap: wrap;
  margin: 50px auto;
`;

const Playinfo = styled.div`
  width: 600px;
  display: flex;
  flex-wrap: wrap;
  margin: 50px auto;
  & > span {
    width: 100%;
    font-size: 50px;
  }
`;
