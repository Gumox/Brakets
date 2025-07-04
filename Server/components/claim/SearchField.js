import React, { useContext } from "react";
import styled from "styled-components";

import { OptionContext } from "../../store/Context";
import { YEARLY_OPTIONS, MONTHLY_OPTIONS } from "../../constants/select-option";
import { RECEIPT, CUSTOMER, STORE, PRODUCT } from "../../constants/field";
import {
  STORE_TYPE,
  RECEIPT_CATEGORY_TYPE,
  RECEIPT_TYPE,
  STORE_CATEGORY,
} from "../../constants/type";
import COLOR from "../../constants/color";
import Input from "../Input";
import SelectOption from "../SelectOption";
import Checkbox from "../Checkbox";
import { Row, Field } from "../styled";
import ReactExport from "react-export-excel";
import moment from 'moment'

const SearchField = ({
  data = {},
  handleCheckboxChange = () => {},
  handleValueChange = () => {},
  handleSearchButtonClick = () => {},
  searchList = {}
}) => {
  const {storeList} = useContext(OptionContext)

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
  
  return (
    <Wrapper>
      <Row>
        <Field>
          <Checkbox
            title="매장별"
            name="isStoreType"
            checked={data["isStoreType"]}
            onChange={handleCheckboxChange}
          />
        </Field>
        <Field>
          <SelectOption
            title="매장명"
            name="storeName"
            disabled={!data["isStoreType"]}
            options={storeList}
            value={data["storeName"]}
            onChange={handleValueChange}
          />
        </Field>
        <Field>
          <Input
            title="발송일 to S"
            type="date"
            name="startDate"
            styleOptions={{ padding: "1px 0px" }}
            value={data["startDate"]}
            onChange={handleValueChange}
            disabled={data["isMonthly"]}
          />
          <span>~</span>
          <Input
            type="date"
            name="endDate"
            styleOptions={{ padding: "1px 0px" }}
            value={data["endDate"]}
            onChange={handleValueChange}
            disabled={data["isMonthly"]}
          />
        </Field>
        <Field>
          {/** TODO: 월별 조건 추가 필요 */}
          <Checkbox
            title="월별"
            name="isMonthly"
            checked={data["isMonthly"]}
            onChange={handleCheckboxChange}
          />
          <SelectOption
            name="year"
            disabled={!data["isMonthly"]}
            options={YEARLY_OPTIONS}
            value={data["year"]}
            onChange={handleValueChange}
          />
          <SelectOption
            name="month"
            disabled={!data["isMonthly"]}
            options={MONTHLY_OPTIONS}
            value={data["month"]}
            onChange={handleValueChange}
          />
        </Field>
        <SearchButton onClick={handleSearchButtonClick}>조회</SearchButton>
      
        <ExcelFile filename="업체 클레임" element={<button
          style={{
            // minHeight:maxContent,
            backgroundColor: "black",
            color: "white",
            margin: "2px",
            padding: "2px 20px",
            borderRadius: "10px",
            border: "none"
          }}

        >Excel</button>}>        
          <ExcelSheet data={searchList} name="업체클레임">
            {/* <ExcelColumn label="Name" value={`${searchList[RECEIPT.ID]}`}/> */}
            <ExcelColumn label="서비스카드 번호" value={(col) => col[RECEIPT.CODE]}/>
            <ExcelColumn label="매장코드" value={(col) => col[RECEIPT.CODE]}/>
            <ExcelColumn label="매장명" value={(col) => col[STORE.CODE]}/>
            <ExcelColumn label="매장구분" value={(col) => STORE_CATEGORY[col[STORE.CATEGORY]]}/>
            <ExcelColumn label="매장연락처" value={(col) => col[STORE.CONTACT]}/>
            <ExcelColumn label="매장접수일" value={(col) => col.receipt_date ? moment(col.receipt_date).format("YYYY-MM-DD") : ""}/>
            <ExcelColumn label="고객" value={(col) => col[CUSTOMER.NAME]}/>
            <ExcelColumn label="고객연락처" value={(col) => col[CUSTOMER.CONTACT]}/>
            <ExcelColumn label="시즌" value={(col) => col[PRODUCT.SEASON]}/>
            <ExcelColumn label="스타일" value={(col) => col[PRODUCT.STYLE]}/>
            <ExcelColumn label="컬러" value={(col) => col[PRODUCT.COLOR]}/>
            <ExcelColumn label="사이즈" value={(col) => col[PRODUCT.SIZE]}/>
            <ExcelColumn label="판매가" value={(col) => col[PRODUCT.PRICE]}/>
            <ExcelColumn label="매장처리여부" value={[]}/>
            <ExcelColumn label="클레임가구분" value={[]}/>
            <ExcelColumn label="클레임가" value={[]}/>
            <ExcelColumn label="업체처리여부" value={[]}/>
            <ExcelColumn label="클레임업체" value={[]}/>
            <ExcelColumn label="업체코드" value={[]}/>
            <ExcelColumn label="업체코드(유통)" value={[]}/>
            <ExcelColumn label="고객ID" value={(col) => col[CUSTOMER.ID]}/>
            <ExcelColumn label="고객요구" value={(col) => RECEIPT_TYPE[col[RECEIPT.TYPE]]}/>
            <ExcelColumn label="매장접수내용" value={(col) => col[RECEIPT.STORE_MESSAGE]}/>
            
            <ExcelColumn label="본사접수일" value={(col) => col[RECEIPT.REGISTER_DATE] ? moment(col[RECEIPT.REGISTER_DATE]).format("YYYY-MM-DD") : ""}/>
            <ExcelColumn label="발송일 to S" value={(col) => col.complete_date ? moment(col.complete_date).format("YYYY-MM-DD") : ""}/>
            <ExcelColumn label="과실구분" value={(col)=> col[RECEIPT.FAULT_NAME]}/>
            <ExcelColumn label="내용분석" value={(col) => col[RECEIPT.ANALYSIS_NAME]}/>
            <ExcelColumn label="판정결과" value={(col) => col[RECEIPT.RESULT_NAME]}/>
            <ExcelColumn label="수선미입고" value={(col) => col[RECEIPT.RESULT_DETAIL_NAME]}/>
            <ExcelColumn label="유상수선비" value={(col) => col.fee}/>
            <ExcelColumn label="유상수선 유/무" value={(col) => (col.fee > 0) ? "유" : "무" }/>
            <ExcelColumn label="수선처1" value={[]}/>
            <ExcelColumn label="총수선비1" value={[]}/>
            <ExcelColumn label="수선처접수일1" value={[]}/>
            <ExcelColumn label="재수선1" value={[]}/>
            <ExcelColumn label="수선처2" value={[]}/>
            <ExcelColumn label="총수선비2" value={[]}/>
            <ExcelColumn label="수선처접수일2" value={[]}/>
            <ExcelColumn label="재수선2" value={[]}/>
            <ExcelColumn label="수선처3" value={[]}/>
            <ExcelColumn label="총수선비3" value={[]}/>
            <ExcelColumn label="수선처접수일3" value={[]}/>
            <ExcelColumn label="재수선3" value={[]}/>
            <ExcelColumn label="발송일 to M" value={[]}/>
            <ExcelColumn label="본사설명" value={(col) => col.message}/>
            <ExcelColumn label="하자코드" value={[]}/>
            <ExcelColumn label="심의" value={(col) => (col[RECEIPT.TYPE] == 2) ? ("심의") : ("")}/>
            <ExcelColumn label="등록자" value={[]}/>
            <ExcelColumn label="등록일시" value={[]}/>
            <ExcelColumn label="수정자" value={[]}/>
            <ExcelColumn label="수정일시" value={[]}/>
            <ExcelColumn label="SMS" value={[]}/>
            <ExcelColumn label="감가반품" value={[]}/>


        </ExcelSheet>
      </ExcelFile>
      </Row>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  margin: 5px 15px 20px 15px;
  display: flex;
  flex-wrap: wrap;
  height:8%;
`;

const SearchButton = styled.button`
  min-height: max-content;
  background-color: ${COLOR.BLACK};
  color: ${COLOR.WHITE};
  margin: 2px 15px;
  padding: 2px 20px;
  border-radius: 10px;
  border: none;
`;

export default SearchField;
