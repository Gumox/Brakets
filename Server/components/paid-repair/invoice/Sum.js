import React from "react";
import styled from "styled-components";
import moment from "moment";

import COLOR from "../../../constants/color";

const Sum = ({}) => {
  return (
    <Wrapper>
      <SumArea>Sum.</SumArea>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 8px 0 8px 20px;
  height: 40px;s
  width: 100%;
`;

const SumArea = styled.div`
padding: 1px 10px;
  height: 24px;
  width: 400px;
  margin-right: 20px;
  border: 2px solid ${COLOR.PURPLE};
  border-radius: 10px;
`;

export default Sum;
