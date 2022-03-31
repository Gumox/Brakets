import React from "react";
import styled from "styled-components";

import COLOR from "../constants/color";

const Input = ({
  title,
  name,
  type = "text",
  value = "",
  onChange = () => {},
  onKeyPress = () => {},
  styleOptions = {},
  disabled = false,
  min,
}) => {
  let minInput
  if(min){
    if(type == 'date'){
      minInput =(<CustomInput
                  {...styleOptions}
                  type={type}
                  name={name}
                  min ={min}
                  value={value || ""}
                  onChange={onChange}
                  onKeyPress={onKeyPress}
                  disabled={disabled}
                />)

    }
  }else{
    minInput =(<CustomInput
                {...styleOptions}
                type={type}
                name={name}
                value={value || ""}
                onChange={onChange}
                onKeyPress={onKeyPress}
                disabled={disabled}
              />)
  }
  return (
    <Wrapper>
      <CustomLabel {...styleOptions} disabled={disabled}>{title}</CustomLabel>
      <InputBox {...styleOptions} disabled={disabled}>
        {minInput}
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
  font-size: ${({ labelFontSize = "12px" }) => labelFontSize};
  color: ${({ disabled, color }) =>
    color ? color : disabled ? COLOR.GRAY : COLOR.BLACK};
`;

const CustomInput = styled.input`
  width: ${({ width = "140px" }) => width};
  height: ${({ height = "20px" }) => height};
  outline: none;
  border: none;
  font-size: 12px;

  &[type="date"] {
    max-width: 140px;
  }
`;

const InputBox = styled.div`
  width: 100%;
  height: 100%;
  padding: ${({ padding = "1px 2px" }) => padding};
  border-radius: 5px;
  border: 1px solid 
    ${({ disabled }) => (disabled ? 'none' : COLOR.GRAY)};
  background-color: ${({ disabled }) => (disabled ? COLOR.LIGHT_GRAY : COLOR.WHITE)};
`;

export default Input;
