import React, { useState, useCallback, useContext, useEffect } from "react";
import styled from "styled-components";

import { OptionContext, UserContext } from "../../store/Context";
import COLOR from "../../constants/color";
import { COMPANY, STORE, RECEIPT } from "../../constants/field";
import { DEFAULT_OPTION } from "../../constants/select-option";
import Input from "../Input";
import SelectOption from "../SelectOption";
import axios from "axios";

const BasicInfo = ({
  targetBrandId,
  setTargetBrandId = () => {},
  getTargetData = () => {},
  handleChangeInputData = () => {},
  searchReceipts= () => {},
  searchCode = () => {}
  
}) => {
  const {headquarter_id: headquarterId,level:level} = useContext(UserContext);
  const { brandList } = useContext(OptionContext);
  const [headquarterCode, setHeadquarterCode] = useState("");
  const [receiptCode, setReceiptCode] = useState("");
  const handleKeyPress = useCallback(
    (e) => {
      if (e.key !== "Enter") return;
      console.log(e.target.value)
      handleChangeInputData(e)
      getTargetData(receiptCode);
      searchCode(e.target.value);
    },
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [receiptCode]
  );

  const getHeadquarterInfo=async()=>{
    let hq_id
    if(level === 5){
      hq_id = sessionStorage.getItem('ADMIN_HEADQURTER');
    }else if(level <2){
      hq_id = headquarterId
    }
    const [data] = await Promise.all([
      axios
      .get(`${process.env.API_URL}/headquarter/headquarterInfo`,{
      params: { headquarterId: hq_id},})
      .then(({ data }) => data.body)
      .catch(error=>{

      })
    ]);
    setHeadquarterCode(data.headquarter_code)
  }

  useEffect(()=>{
    getHeadquarterInfo()
  },[])

  return (
    <Wrapper>
      <Input
        title="회사코드:"
        type="text"
        value={headquarterCode}
        disabled={true}
        styleOptions={{ width: "88px" }}
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
        title="서비스카드 번호 :"
        name={"receiptCode"}
        type="text"
        value={receiptCode}
        onChange={(e) => setReceiptCode(e.target.value.replace(/[^0-9]/g, ''))}
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
