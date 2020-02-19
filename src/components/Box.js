import React from "react";
import styled from "styled-components";

export default props => {
  const { value, handleClick } = props.children;

  return (
    <Box value={value} onClick={handleClick}>
      {value}
    </Box>
  );
};

// STYLED COMPONENTS

const Box = styled.button`
  flex-basis: 33%;
  height: 200px;
  margin: 2px 2px 0 0;
  border: 1px dashed #000; // black;
  font-size: 100px;
  font-weight: bold;
  &:focus {
    outline: 0;
  }
`;
