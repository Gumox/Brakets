import React from "react";
import styled from "styled-components";

import COLOR from "../constants/color";

const SelectOption = ({
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
          value={value}
          disabled={disabled}
        >
          {options.map(({ value, text }) => (
            <option key={value} value={value}>
              {text}
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
  margin-right: 5px;
  font-size: ${({ labelFontSize = "15px" }) => labelFontSize};
  color: ${({ disabled }) => (disabled ? COLOR.GRAY : COLOR.BLACK)};
`;

const CustomSelect = styled.select`
  width: 100%;
  max-width: ${({ maxWidth = "100px" }) => maxWidth};
  height: ${({ height = "20px" }) => height};
  outline: none;
  border: none;
  font-size: 12px;
`;

const SelectBox = styled.div`
  width: 100%;
  height: 100%;
  padding: 1px 0px 1px 5px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid
    ${({ disabled }) => (disabled ? COLOR.GRAY : COLOR.BLACK)};
`;

export default SelectOption;
