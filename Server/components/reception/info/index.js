import React from "react";
import styled from "styled-components";

import BasicInfo from "./Basic";
import DetailInfo from "./Detail";
import FilterInfo from "./Filter";
import ProducInfo from "./Product";
import ReceiptInfo from "./Receipt";
import StoreInfo from "./Store";

const ReceptionInfo = ({
  options,
  inputData = {},
  data = {},
  handleInputCheckboxChange = () => {},
  handleInputValueChange = () => {},
  handleTargetValueChange = () => {},
  handleSearchButtonClick = () => {},
}) => {
  return (
    <Wrapper>
      <SubWrapper>
        <BasicInfo
          data={inputData}
          handleValueChange={handleInputValueChange}
        />
        <FilterInfo
          options={options}
          data={inputData}
          handleCheckboxChange={handleInputCheckboxChange}
          handleValueChange={handleInputValueChange}
          handleSearchButtonClick={handleSearchButtonClick}
        />
        <Section>
          <ProducInfo data={data} handleValueChange={handleTargetValueChange} />
          <StoreInfo
            options={options}
            data={data}
            handleValueChange={handleTargetValueChange}
          />
        </Section>
        <Section>
          <DetailInfo
            options={options}
            data={data}
            handleValueChange={handleTargetValueChange}
          />
          <ReceiptInfo
            options={options}
            data={data}
            handleValueChange={handleTargetValueChange}
          />
        </Section>
      </SubWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  height: 65%;
  overflow: scroll;
`;

const SubWrapper = styled.div`
  min-width: 1520px;
`;

const Section = styled.div`
  display: flex;

  > div {
    width: 50%;
  }
`;

export default ReceptionInfo;
