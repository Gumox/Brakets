import React from "react";
import styled from "styled-components";
import moment from "moment";

import COLOR from "../../../constants/color";
import { RECEIPT, CUSTOMER, STORE, PRODUCT } from "../../../constants/field";
import {
  STORE_TYPE,
  RECEIPT_CATEGORY_TYPE,
  RECEIPT_TYPE,
} from "../../../constants/type";
import Checkbox from "../../Checkbox";

const ReturnList = ({ data, handleDataClick = () => {} }) => {
  return (
    <Wrapper>
      <Table>
        <TableHeader>
          <tr>
            <TableHeaderCell width="40px">선택</TableHeaderCell>
            <TableHeaderCell>No.</TableHeaderCell>
            <TableHeaderCell>Shop</TableHeaderCell>
            <TableHeaderCell width="150px">매장명</TableHeaderCell>
            <TableHeaderCell width="70px">구분</TableHeaderCell>
            <TableHeaderCell width="150px">매장 연락처</TableHeaderCell>
            <TableHeaderCell width="120px">등록일</TableHeaderCell>
            {/* <TableHeaderCell>접수구분</TableHeaderCell> */}
            <TableHeaderCell>고객</TableHeaderCell>
            <TableHeaderCell width="150px">연락처</TableHeaderCell>
            <TableHeaderCell width="70px">시즌</TableHeaderCell>
            <TableHeaderCell>스타일</TableHeaderCell>
            {/* <TableHeaderCell width="70px">차수</TableHeaderCell> */}
            <TableHeaderCell width="70px">컬러</TableHeaderCell>
            <TableHeaderCell width="70px">사이즈</TableHeaderCell>
            <TableHeaderCell>판매가</TableHeaderCell>
            <TableHeaderCell>매장 처리여부</TableHeaderCell>
            <TableHeaderCell>클레임가 구분</TableHeaderCell>
            <TableHeaderCell>클레임가</TableHeaderCell>
            <TableHeaderCell>업체처리여부</TableHeaderCell>
            <TableHeaderCell>클레임 업체</TableHeaderCell>
            <TableHeaderCell>업체코드</TableHeaderCell>
            <TableHeaderCell width="120px">업체코드(유통)</TableHeaderCell>
            <TableHeaderCell>고객ID</TableHeaderCell>
            <TableHeaderCell>고객요구</TableHeaderCell>
            <TableHeaderCell width="150px">접수내용</TableHeaderCell>
            <TableHeaderCell>내용분석</TableHeaderCell>
            <TableHeaderCell>판정결과</TableHeaderCell>
          </tr>
        </TableHeader>
        <tbody>
          {data.map((receipt) => (
            <TableRow key={receipt[RECEIPT.ID]}>
              <TableData width="40px">
                <Checkbox value={receipt[RECEIPT.ID]} />
              </TableData>
              <TableData>{receipt[RECEIPT.CODE]}</TableData>
              <TableData>{receipt[STORE.ID]}</TableData>
              <TableData title={receipt[STORE.NAME]} width="200px">
                {receipt[STORE.NAME]}
              </TableData>
              <TableData width="70px">
                {STORE_TYPE[receipt[STORE.TYPE]]}
              </TableData>
              <TableData width="150px">{receipt[STORE.CONTACT]}</TableData>
              <TableData width="120px">
                {receipt[RECEIPT.RECEIPT_DATE]
                  ? moment(receipt[RECEIPT.RECEIPT_DATE]).format("YYYY-MM-DD")
                  : ""}
              </TableData>
              {/* <TableData>
                {RECEIPT_CATEGORY_TYPE[receipt[RECEIPT.CATEGORY]]}
              </TableData> */}
              <TableData>{receipt[CUSTOMER.NAME]}</TableData>
              <TableData width="150px">{receipt[CUSTOMER.CONTACT]}</TableData>
              <TableData width="70px">{receipt[PRODUCT.SEASON]}</TableData>
              <TableData>{receipt[PRODUCT.STYLE]}</TableData>
              {/* <TableData width="70px">{receipt[PRODUCT.DEGREE]}</TableData> */}
              <TableData width="70px">{receipt[PRODUCT.COLOR]}</TableData>
              <TableData width="70px">{receipt[PRODUCT.SIZE]}</TableData>
              <TableData>{receipt[PRODUCT.PRICE]}</TableData>
              <TableData></TableData>
              <TableData></TableData>
              <TableData></TableData>
              <TableData></TableData>
              <TableData></TableData>
              <TableData></TableData>
              <TableData width="120px"></TableData>
              <TableData>{receipt[CUSTOMER.ID]}</TableData>
              <TableData>{RECEIPT_TYPE[receipt[RECEIPT.TYPE]]}</TableData>
              <TableData width="150px"></TableData>
              <TableData>{receipt[RECEIPT.ANALYSIS_NAME]}</TableData>
              <TableData>{receipt[RECEIPT.RESULT_NAME]}</TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 50%;
  width: 100%;
  overflow: scroll;
  border-bottom: 2px solid;
`;

const Table = styled.table`
  border-collapse: collapse;
  min-width: 100%;
`;

const TableHeader = styled.thead`
  border: 2px solid ${COLOR.BLACK};
`;

const TableHeaderCell = styled.th`
  width: ${({ width = "100px" }) => width};
  min-width: ${({ width = "100px" }) => width};
  border: 2px solid ${COLOR.BLACK};
`;

const TableRow = styled.tr`
  cursor: pointer;
`;

const TableData = styled.td`
  max-width: ${({ width = "100px" }) => width};
  width: ${({ width = "100px" }) => width};
  min-width: ${({ width = "100px" }) => width};
  text-align: ${({ textAlign = "center" }) => textAlign};
  border: 1px solid ${COLOR.GRAY};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export default ReturnList;
