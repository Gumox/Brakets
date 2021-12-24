import React from "react";
import styled from "styled-components";

import COLOR from "../constants/color";

const Checkbox = ({
  type = "checkbox",
  title,
  name,
  value = "",
  checked = false,
  onChange = () => {},
  styleOptions = {},
  disabled = false,
}) => {
  return (
    <Wrapper>
      <CustomInput
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      {title && <CustomLabel {...styleOptions}>{title}</CustomLabel>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CustomLabel = styled.div`
  margin-left: 0px;
  white-space: nowrap;
  font-size: ${({ labelFontSize = "14px" }) => labelFontSize};
  color: ${({ color = COLOR.BLACK }) => color};
`;

const CustomInput = styled.input`
  // margin-right: 5px;
`;

export default Checkbox;
