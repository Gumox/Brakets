import React, { useState, useCallback, useContext } from "react";
import styled from "styled-components";

import { OptionContext, UserContext } from "../../store/Context";
import COLOR from "../../constants/color";
import { COMPANY, STORE, RECEIPT } from "../../constants/field";
import { DEFAULT_OPTION } from "../../constants/select-option";
import Input from "../Input";
import SelectOption from "../SelectOption";

const BasicInfo = ({
  targetBrandId,
  setTargetBrandId = () => {},
  getTargetData = () => {},
  searchReceipts= () => {}
}) => {
  const {headquarter_id: headquarterId} = useContext(UserContext);
  const { brandList } = useContext(OptionContext);
  const [receiptCode, setReceiptCode] = useState("");
  const handleKeyPress = useCallback(
    (e) => {
      if (e.key !== "Enter") return;
      getTargetData(receiptCode);
      searchReceipts();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [receiptCode]
  );
  return (
    <Wrapper>
      <Input
        title="회사코드:"
        type="text"
        value={headquarterId}
        disabled={true}
        styleOptions={{ width: "20px" }}
      />
      <SelectOption
        title="브랜드:"
        name={"brandId"}
        options={brandList}
        value={targetBrandId}
        onChange={(e) => setTargetBrandId(e.target.value)}
        styleOptions={{ width: "200px" }}
      />
      <Input
        title="서비스카드 번호 or RFID:"
        name={"receiptCode"}
        type="text"
        value={receiptCode}
        onChange={(e) => setReceiptCode(e.target.value)}
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
