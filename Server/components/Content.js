import React from "react";
import styled from "styled-components";

const Content = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.nav`
  position: relative;
  width: 100%;
  height: calc(100vh - 50px);
  overflow: auto;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background: rgba(210, 210, 210, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(96, 96, 96, 1);
    border-radius: 6px;
    
`;

export default Content;
