import React, { Component } from "react";
import styled from "styled-components";
import Box from "./Box";

export default class Gameboard extends Component {
  boxes = new Array(9).fill("");
  render() {
    return (
      <Board data-testid="gameboard">
        {this.boxes.map(b => (
          <Box />
        ))}
      </Board>
    );
  }
}

const Board = styled.div`
  width: 600px;
  height: 600px;
  display: flex;
  flex-wrap: wrap;
  margin: 50px auto;
`;
