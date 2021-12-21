import React from "react";
import styled from "styled-components";

import COLOR from "../constants/color";

const TextArea = ({
  title,
  name,
  value = "",
  onChange = () => {},
  styleOptions = {},
  disabled = false,
}) => {
  return (
    <Wrapper>
      <CustomLabel>{title}</CustomLabel>
      <CustomTextArea
        {...styleOptions}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
`;

const CustomLabel = styled.div`
  white-space: nowrap;
  margin: 5px 0 0 0;
  font-size: ${({ labelFontSize = "13px" }) => labelFontSize};
`;

const CustomTextArea = styled.textarea`
  resize: none;
  width: ${({ width = "250px" }) => width};
  height: ${({ height = "100px" }) => height};
  outline: transparent;
  border-radius: 5px;
`;

export default TextArea;
