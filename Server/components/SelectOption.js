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
}) => {
  return (
    <Wrapper>
      <CustomLabel {...styleOptions}>{title}</CustomLabel>
      <SelectBox>
        <CustomSelect
          {...styleOptions}
          name={name}
          onChange={onChange}
          value={value}
        >
          <option disabled={true} value=""></option>
          {options.map(({ key, value, text }) => (
            <option key={key} value={value}>
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
  border-bottom: 1px solid;
`;

export default SelectOption;
