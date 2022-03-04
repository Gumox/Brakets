import React from "react";
import styled from "styled-components";

import COLOR from "../../constants/color";

const ClaimModal = ({
  title,
  name,
  options,
  value = "",
  onChange = () => {},
  styleOptions = {},
  disabled = false,
}) => {
  return (
    <Wrapper>
      <CustomLabel {...styleOptions} disabled={disabled}>
        {title}
      </CustomLabel>
      <SelectBox disabled={disabled}>
        <CustomSelect
          {...styleOptions}
          name={name}
          onChange={onChange}
          value={value || ""}
          disabled={disabled}
        >
          {options.map(({ value, text ,claim_type},index) => (
            <option key={index} value={value}>
               {claim_type} {text} 
            </option>
          ))}
        </CustomSelect>
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

const CustomSelect = styled.select`
  width: ${({ width = "100%" }) => width};
  height: ${({ height = "20px" }) => height};
  outline: none;
  appearance: none;
  padding: 1px 27px 1px 3px;
  background: url('/arrow-down.png') 95% 50% no-repeat;
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

export default ClaimModal;
