import React from "react";
import styled from "styled-components";

import COLOR from "../constants/color";

const UnSelectOption = ({
  title,
  name,
  options,
  value = "",
  onChange = () => {},
  styleOptions = {},
  disabled = false,
}) => {
  let text
  options.map((item)=>{
    if(item.value == value){
      text =item.text
    }
  })
  return (
    <Wrapper>
      <CustomLabel {...styleOptions}>
        {title}
      </CustomLabel>
      <SelectBox disabled={disabled}>
        <CustomDiv {...styleOptions}>
          {text}
        </CustomDiv>
      </SelectBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CustomLabel = styled.div`
  white-space: nowrap;
  margin-right: ${({ labelMarginRight = "5px" }) => labelMarginRight};
  font-size: ${({ labelFontSize = "12px" }) => labelFontSize};
  color: ${({ disabled, color }) =>
    color ? color : disabled ? COLOR.GRAY : COLOR.BLACK};
`;

const CustomDiv = styled.div`
  width: ${({ width = "100%" }) => width};
  max-width: ${({ maxWidth = "100px" }) => maxWidth};
  height: ${({ height = "20px" }) => height};
  outline: none;
  appearance: none;
  padding: 1px 5px 1px 5px;
  background-size: 14px 7px;
  border: none;
  font-size: 12px;
`;

const SelectBox = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border: 1px solid ${COLOR.GRAY};
`;

export default UnSelectOption;
