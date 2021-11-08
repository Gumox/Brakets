import React from "react";
import styled from "styled-components";

import COLOR from "../../../constants/color";

const ReceptionList = () => {
  return <Wrapper>List Area</Wrapper>;
};

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 35%;
  background-color: ${COLOR.GRAY};
`;

export default ReceptionList;
