import React, { Component } from 'react';
import styled from 'styled-components';
import Box from './Box';

export default class Gameboard extends Component {
  state = {
    nextMove: 'X',
    boxes: Array(9).fill(' ')
  };

  changePlayer = nextMove => {
    this.setState({ nextMove: nextMove === 'X' ? 'O' : 'X' });
    return nextMove;
  };

  render() {
    return (
      <Board data-testid="gameboard">
        {this.state.boxes.map((b, i) => (
          <Box key={i}>
            {{
              value: b,
              handleClick: () => {
                const tempA = [...this.state.boxes];
                tempA[i] =
                  tempA[i] === ' '
                    ? this.changePlayer(this.state.nextMove)
                    : tempA[i];

                this.setState({ boxes: tempA });
              }
            }}
          </Box>
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
