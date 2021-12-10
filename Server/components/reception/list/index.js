import React from "react";
import styled from "styled-components";
import moment from "moment";

import COLOR from "../../../constants/color";
import { RECEIPT, CUSTOMER, STORE, PRODUCT } from "../../../constants/field";
import { STORE_TYPE, RECEIPT_CATEGORY_TYPE, RECEIPT_TYPE } from "../../../constants/type";

const ReceptionList = ({ data, handleDataClick = () => {} }) => {
  return (
    <Wrapper>
      <Table>
        <TableHeader>
          <tr>
            <TableHeaderCell>No.</TableHeaderCell>
            <TableHeaderCell>Shop</TableHeaderCell>
            <TableHeaderCell width="150px">매장명</TableHeaderCell>
            <TableHeaderCell width="70px">구분</TableHeaderCell>
            <TableHeaderCell width="150px">매장 연락처</TableHeaderCell>
            <TableHeaderCell width="120px">등록일</TableHeaderCell>
            <TableHeaderCell>고객ID</TableHeaderCell>
            <TableHeaderCell>접수구분</TableHeaderCell>
            <TableHeaderCell>고객</TableHeaderCell>
            <TableHeaderCell width="150px">연락처</TableHeaderCell>
            <TableHeaderCell width="70px">시즌</TableHeaderCell>
            <TableHeaderCell>스타일</TableHeaderCell>
            <TableHeaderCell width="70px">차수</TableHeaderCell>
            <TableHeaderCell width="70px">컬러</TableHeaderCell>
            <TableHeaderCell width="70px">사이즈</TableHeaderCell>
            <TableHeaderCell>판매가</TableHeaderCell>
            <TableHeaderCell>고객요구</TableHeaderCell>
            <TableHeaderCell width="150px">접수내용</TableHeaderCell>
            <TableHeaderCell>과실구분</TableHeaderCell>
            <TableHeaderCell width="120px">약속일</TableHeaderCell>
            <TableHeaderCell width="120px">본사접수일</TableHeaderCell>
            <TableHeaderCell>내용분석</TableHeaderCell>
            <TableHeaderCell>판정결과</TableHeaderCell>
          </tr>
        </TableHeader>
        <tbody>
          {data.map((receipt) => (
            <TableRow
              key={receipt[RECEIPT.ID]}
              onClick={() => handleDataClick(receipt[RECEIPT.CODE])}
            >
              <TableData>{receipt[RECEIPT.CODE]}</TableData>
              <TableData>{receipt[STORE.ID]}</TableData>
              <TableData title={receipt[STORE.NAME]} width="200px">
                {receipt[STORE.NAME]}
              </TableData>
              <TableData width="70px">{STORE_TYPE[receipt[STORE.TYPE]]}</TableData>
              <TableData width="150px">{receipt[STORE.CONTACT]}</TableData>
              <TableData width="120px">
                {receipt[RECEIPT.RECEIPT_DATE]
                  ? moment(receipt[RECEIPT.RECEIPT_DATE]).format("YYYY-MM-DD")
                  : ""}
              </TableData>
              <TableData>{receipt[CUSTOMER.ID]}</TableData>
              <TableData>{RECEIPT_CATEGORY_TYPE[receipt[RECEIPT.CATEGORY]]}</TableData>
              <TableData>{receipt[CUSTOMER.NAME]}</TableData>
              <TableData width="150px">{receipt[CUSTOMER.CONTACT]}</TableData>
              <TableData width="70px">{receipt[PRODUCT.SEASON]}</TableData>
              <TableData>{receipt[PRODUCT.STYLE]}</TableData>
              <TableData width="70px">{receipt[PRODUCT.DEGREE]}</TableData>
              <TableData width="70px">{receipt[PRODUCT.COLOR]}</TableData>
              <TableData width="70px">{receipt[PRODUCT.SIZE]}</TableData>
              <TableData>{receipt[PRODUCT.PRICE]}</TableData>
              <TableData>{RECEIPT_TYPE[receipt[RECEIPT.TYPE]]}</TableData>
              <TableData width="150px"></TableData>
              <TableData>{receipt[RECEIPT.FAULT_NAME]}</TableData>
              <TableData width="120px">
                {receipt[RECEIPT.DUE_DATE]
                  ? moment(receipt[RECEIPT.DUE_DATE]).format("YYYY-MM-DD")
                  : ""}
              </TableData>
              <TableData width="120px">
                {receipt[RECEIPT.REGISTER_DATE]
                  ? moment(receipt[RECEIPT.REGISTER_DATE]).format("YYYY-MM-DD")
                  : ""}
              </TableData>
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
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 35%;
  width: 100%;
  overflow: scroll;
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

  &:hover {
    background-color: ${COLOR.CYAN_BLUE};
  }
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

export default ReceptionList;
