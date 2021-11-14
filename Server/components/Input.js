import React from "react";
import styled from "styled-components";

import COLOR from "../constants/color";

const Input = ({
  title,
  name,
  type = "text",
  value = "",
  onChange = () => {},
  styleOptions = {},
  disabled = false,
}) => {
  return (
    <Wrapper>
      <CustomLabel>{title}</CustomLabel>
      <InputBox {...styleOptions}>
        <CustomInput
          {...styleOptions}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      </InputBox>
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

const CustomInput = styled.input`
  width: ${({ width = "140px" }) => width};
  height: ${({ height = "20px" }) => height};
  outline: none;
  border: none;
  font-size: 12px;

  &[type="date"] {
    max-width: 130px;
  }
`;

const InputBox = styled.div`
  width: 100%;
  height: 100%;
  padding: ${({ padding = "1px 10px" }) => padding};
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid;
`;

export default Input;
