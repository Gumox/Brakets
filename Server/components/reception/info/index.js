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
  repairData = [],
  mfrData = {},
  handleInputCheckboxChange = () => {},
  handleInputValueChange = () => {},
  handleTargetValueChange = () => {},
  handleTargetCheckboxChange = () => {},
  handleSearchButtonClick = () => {},
  handleProductImageClick = () => {},
  handleCodeEnter = () => {},
}) => {
  return (
    <Wrapper>
      <SubWrapper>
        <BasicInfo
          options={options}
          data={inputData}
          handleValueChange={handleInputValueChange}
          handleCodeEnter={handleCodeEnter}
        />
        <FilterInfo
          options={options}
          data={inputData}
          handleCheckboxChange={handleInputCheckboxChange}
          handleValueChange={handleInputValueChange}
          handleSearchButtonClick={handleSearchButtonClick}
        />
        <Section>
          <StoreInfo
            options={options}
            data={data}
            handleValueChange={handleTargetValueChange}
          />
          <ProducInfo
            options={options}
            data={data}
            handleValueChange={handleTargetValueChange}
            handleProductImageClick={handleProductImageClick}
          />
        </Section>
        <Section>
          <DetailInfo
            options={options}
            data={data}
            mfrData={mfrData}
            repairData={repairData}
            handleValueChange={handleTargetValueChange}
          />
          <ReceiptInfo
            options={options}
            data={data}
            mfrData={mfrData}
            repairData={repairData}
            handleValueChange={handleTargetValueChange}
            handleCheckboxChange={handleTargetCheckboxChange}
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
  min-width: 1600px;
`;

const Section = styled.div`
  display: flex;
`;

export default ReceptionInfo;
