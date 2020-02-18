import React from 'react';
import styled from 'styled-components';

export default props => {
  const { value, handleClick } = props.children;

  return (
    <Box value={value} onClick={handleClick}>
      {value}
    </Box>
  );
};

const Box = styled.button`
  flex-basis: 33%;
  border: 1px dashed #000; // black;
  font-size: 100px;
  font-weight: bold;
  &:focus {
    outline: 0;
  }
`;
