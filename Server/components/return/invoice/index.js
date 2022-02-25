import React from "react";
import styled from "styled-components";
import moment from "moment";

import COLOR from "../../../constants/color";
import Options from "./Options";
import List from "./List";
import Sum from "./Sum";
import store from "../../../pages/store"

const ReturnInvoice = ({data}) => {
  return (
    <Wrapper>
        {/* <Options /> */}
        <List data={data}/>
        <Sum />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: calc(40% - 85px);
  width: 100%;
`;

export default ReturnInvoice;
