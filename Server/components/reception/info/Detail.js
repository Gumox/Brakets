import React from "react";
import styled from "styled-components";

import COLOR from "../../../constants/color";

const DetailInfo = () => {
  return <Wrapper>수선 상세 내용</Wrapper>;
};
const Wrapper = styled.div`
  border: 2px dotted ${COLOR.PURPLE};
  margin: 0px 5px 5px 15px;
`;

export default DetailInfo;
