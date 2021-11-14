import React from "react";
import styled from "styled-components";

import BasicInfo from "./Basic";
import DetailInfo from "./Detail";
import FilterInfo from "./Filter";
import ProducInfo from "./Product";
import ReceiptInfo from "./Receipt";
import StoreInfo from "./Store";

const ReceptionInfo = ({
  initialData = {},
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
          data={inputData}
          handleCheckboxChange={handleInputCheckboxChange}
          handleValueChange={handleInputValueChange}
          handleSearchButtonClick={handleSearchButtonClick}
        />
        <Section>
          <ProducInfo
            data={data}
            handleValueChange={handleTargetValueChange}
          />
          <StoreInfo
            data={data}
            handleValueChange={handleTargetValueChange}
          />
        </Section>
        <Section>
          <DetailInfo
            data={data}
            handleValueChange={handleTargetValueChange}
          />
          <ReceiptInfo
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
