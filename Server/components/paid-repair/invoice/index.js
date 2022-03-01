import React from "react";
import styled from "styled-components";
import moment from "moment";

import COLOR from "../../../constants/color";
import Options from "./Option";
import List from "./List";
import Sum from "./Sum";

const ReturnInvoice = ({}) => {
  return (
    <Wrapper>
        {/* <Options /> */}
        <List />
        <Sum />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: calc(40% - 85px);
  width: 100%;
`;

export default ReturnInvoice;
