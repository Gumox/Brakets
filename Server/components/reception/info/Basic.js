import React from "react";
import styled from "styled-components";

import COLOR from "../../../constants/color";
import { RECEIPT } from "../../../constants/field";
import Input from "../../Input";

const BasicInfo = ({ data = {}, handleValueChange = () => {} }) => {
  return (
    <Wrapper>
      <Input
        title="회사코드:"
        name="headquarterId"
        type="text"
        value={data["headquarterId"]}
        onChange={handleValueChange}
      />
      <Input
        title="브랜드:"
        name="brand"
        type="text"
        value={data["brand"]}
        onChange={handleValueChange}
      />
      <Input
        title={RECEIPT.CODE.title}
        name={RECEIPT.CODE.id}
        type="text"
        value={data[RECEIPT.CODE.id]}
        onChange={handleValueChange}
      />
      <ScanButton>바코드/QR 스캔</ScanButton>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  margin: 5px 15px 0 15px;
  display: flex;
  > * {
    margin-right: 30px;
  }
`;

const ScanButton = styled.button`
  background-color: ${COLOR.BLACK};
  color: ${COLOR.WHITE};
  margin: 0 15px;
  padding: 0 20px;
  border-radius: 10px;
  border: none;
`;

export default BasicInfo;
