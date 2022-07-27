import React from "react";
import styled from "styled-components";

import COLOR from "../../constants/color";
import _ from "lodash";

const ClaimModal = ({
  title,
  name,
  options,
  value = "",
  onChange = () => {},
  styleOptions = {},
  disabled = false,
}) => {
  let claimOptions = claimSort(options)
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
          {claimOptions.map(({ value, text ,claim_type},index) => (
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

const claimSort =(array)=>{
  let sort1=_.sortBy(array,"claim_value")
  let sort2=_.sortBy(sort1,"claim_type").reverse();
  
  return(sort2)
}

export default ClaimModal;
