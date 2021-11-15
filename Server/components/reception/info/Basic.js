import React from "react";
import styled from "styled-components";

import COLOR from "../../../constants/color";
import { COMPANY, STORE, RECEIPT } from "../../../constants/field";
import { BRAND_OPTIONS } from "../../../constants/select-option";
import Input from "../../Input";
import SelectOption from "../../SelectOption";

const BasicInfo = ({ data = {}, handleValueChange = () => {} }) => {
  return (
    <Wrapper>
      <Input
        title="회사코드:"
        name={COMPANY.ID}
        type="text"
        value={process.env.HEADQUARTER_ID}
        onChange={handleValueChange}
        disabled={true}
      />
      <SelectOption
        title="브랜드:"
        name={STORE.ID}
        options={BRAND_OPTIONS}
        value={data[STORE.ID]}
        onChange={handleValueChange}
        styleOptions={{ maxWidth: "150px" }}
      />
      <Input
        title="서비스카드 번호 or RFID:"
        name={RECEIPT.CODE}
        type="text"
        value={data[RECEIPT.CODE]}
        onChange={handleValueChange}
      />
      <ScanButton>바코드/QR 스캔</ScanButton>
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
