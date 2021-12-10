import React from "react";
import styled from "styled-components";

import { YEARLY_OPTIONS, MONTHLY_OPTIONS } from "../../constants/select-option";
import COLOR from "../../constants/color";
import Input from "../Input";
import SelectOption from "../SelectOption";
import Checkbox from "../Checkbox";
import { Row, Field } from "../styled";

const Total = ({
  total = 0,
}) => {
  return (
    <Wrapper>
        {total} 건
    </Wrapper>
  );
};
const Wrapper = styled.div`
  height: 30px;
  padding: 0 20%;
  display: flex;
  align-items: center;
`;

export default Total;
