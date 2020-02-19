import React, { Component } from "react";
import styled from "styled-components";
import Box from "./Box";

export default class Gameboard extends Component {
  state = {
    nextMove: "X",
    boxes: Array(9).fill(" "),
    winner: null
  };

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

    winners.forEach(win => {
      if (
        boxes[win[0]] !== " " &&
        boxes[win[0]] === boxes[win[1]] &&
        boxes[win[0]] === boxes[win[2]]
      ) {
        winner = boxes[win[0]];
        this.setState({ winner: winner });
      }
    });
    return winner;
  }

  componentDidUpdate(prevProps, prevState) {
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
                  if (this.state.winner === null) {
                    const tempA = [...this.state.boxes]; // shallow copy array
                    tempA[i] =
                      tempA[i] === " "
                        ? this.changePlayer(this.state.nextMove)
                        : tempA[i];

                    this.setState({ boxes: tempA }); // use shallow copy to update state-array
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
