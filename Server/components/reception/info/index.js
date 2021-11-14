import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";

import { RECEIPT } from "../../../constants/dummy";
import BasicInfo from "./Basic";
import DetailInfo from "./Detail";
import FilterInfo from "./Filter";
import ProducInfo from "./Product";
import ReceiptInfo from "./Receipt";
import StoreInfo from "./Store";

const ReceptionInfo = ({ data }) => {
  const [inputData, setInputData] = useState({});
  const [searchData, setSearchData] = useState(data);
  const handleInputCheckboxChange = useCallback(
    (e) => {
      setInputData({ ...inputData, [e.target.name]: e.target.checked });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [inputData]
  );
  const handleInputValueChange = useCallback(
    (e) => {
      setInputData({ ...inputData, [e.target.name]: e.target.value });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inputData]
  );
  const handleSearchCheckboxChange = useCallback(
    (e) => {
      setSearchData({ ...searchData, [e.target.name]: e.target.checked });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [searchData]
  );
  const handleSearchValueChange = useCallback(
    (e) => {
      setSearchData({ ...searchData, [e.target.name]: e.target.value });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchData]
  );

  useEffect(() => {
    console.log(inputData);
  }, [inputData]);
  return (
    <Wrapper>
      <SubWrapper>
        <BasicInfo
          data={inputData}
          handleValueChange={handleSearchValueChange}
        />
        <FilterInfo
          data={inputData}
          handleCheckboxChange={handleInputCheckboxChange}
          handleValueChange={handleInputValueChange}
        />
        <Section>
          <ProducInfo
            data={searchData}
            handleValueChange={handleSearchValueChange}
          />
          <StoreInfo
            data={searchData}
            handleValueChange={handleSearchValueChange}
          />
        </Section>
        <Section>
          <DetailInfo />
          <ReceiptInfo />
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
