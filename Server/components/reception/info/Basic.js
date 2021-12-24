import React, { useCallback } from "react";
import styled from "styled-components";

import COLOR from "../../../constants/color";
import { COMPANY, STORE, RECEIPT } from "../../../constants/field";
import { DEFAULT_OPTION } from "../../../constants/select-option";
import Input from "../../Input";
import SelectOption from "../../SelectOption";

const BasicInfo = ({ options, data = {}, handleValueChange = () => {}, handleCodeEnter = () => {} }) => {
  const handleKeyPress = useCallback((e) => {
    if (e.key !== "Enter") return;
    handleCodeEnter(data["receiptCode"]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return (
    <Wrapper>
      <Input
        title="회사코드:"
        name={COMPANY.ID}
        type="text"
        value={process.env.HEADQUARTER_ID}
        onChange={handleValueChange}
        disabled={true}
        styleOptions={{ width: "20px" }}
      />
      <SelectOption
        title="브랜드:"
        name={"brandId"}
        options={options.brandList}
        value={data["brandId"]}
        onChange={handleValueChange}
        styleOptions={{ width: "200px" }}
      />
      <Input
        title="서비스카드 번호 or RFID:"
        name={"receiptCode"}
        type="text"
        value={data["receiptCode"]}
        onChange={handleValueChange}
        onKeyPress={handleKeyPress}
      />
      {/* <ScanButton>바코드/QR 스캔</ScanButton> */}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  margin: 5px 15px 0 15px;
  display: flex;
  flex-wrap: wrap;
  > * {
    margin-right: 30px;
  }
`;

const ScanButton = styled.button`
  min-height: max-content;
  background-color: ${COLOR.BLACK};
  color: ${COLOR.WHITE};
  margin: 2px 15px;
  padding: 2px 20px;
  border-radius: 10px;
  border: none;
`;

export default BasicInfo;
