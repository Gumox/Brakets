import React from "react";
import styled from "styled-components";

const Content = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 50px);
  overflow: scroll;
`;

export default Content;
