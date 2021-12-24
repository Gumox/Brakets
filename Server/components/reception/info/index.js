import React from "react";
import styled from "styled-components";

import { RepairContext, ManufacturerContext } from "../../../store/Context";
import BasicInfo from "./Basic";
import DetailInfo from "./Detail";
import FilterInfo from "./Filter";
import ProducInfo from "./Product";
import ReceiptInfo from "./Receipt";
import StoreInfo from "./Store";

const ReceptionInfo = ({
  inputData = {},
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
          data={inputData}
          handleValueChange={handleInputValueChange}
          handleCodeEnter={handleCodeEnter}
        />
        <FilterInfo
          data={inputData}
          handleCheckboxChange={handleInputCheckboxChange}
          handleValueChange={handleInputValueChange}
          handleSearchButtonClick={handleSearchButtonClick}
        />
        <Section>
          <StoreInfo handleValueChange={handleTargetValueChange} />
          <ProducInfo
            handleValueChange={handleTargetValueChange}
            handleProductImageClick={handleProductImageClick}
          />
        </Section>
        <Section>
          <RepairContext.Provider value={repairData}>
            <ManufacturerContext.Provider value={mfrData}>
              <DetailInfo
                handleValueChange={handleTargetValueChange}
              />
              <ReceiptInfo
                handleValueChange={handleTargetValueChange}
                handleCheckboxChange={handleTargetCheckboxChange}
              />
            </ManufacturerContext.Provider>
          </RepairContext.Provider>
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
