import React from "react";
import styled from "styled-components";

import COLOR from "../constants/color";

const Checkbox = ({
  type = "checkbox",
  title,
  name,
  value = "",
  onChange = () => {},
  styleOptions = {},
}) => {
  return (
    <Wrapper>
      <CustomInput
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
      <CustomLabel {...styleOptions}>{title}</CustomLabel>
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
  font-size: ${({ labelFontSize = "14px" }) => labelFontSize};
`;

const CustomInput = styled.input`
  margin-right: 5px;
`;

export default Checkbox;
