import React from "react";
import styled from "styled-components";

import COLOR from "../../../constants/color";
import { RECEIPT_LIST } from "../../../constants/dummy";
import { RECEIPT, CUSTOMER, STORE, PRODUCT } from "../../../constants/field";

const ReceptionList = () => {
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
            <TableHeaderCell width="150px"></TableHeaderCell>
          </tr>
        </TableHeader>
        <tbody>
          {RECEIPT_LIST.map((receipt) => (
            <TableRow key={receipt[RECEIPT.ID]}>
              <TableData>{receipt[RECEIPT.CODE]}</TableData>
              <TableData>{receipt[STORE.ID]}</TableData>
              <TableData width="150px">{receipt[STORE.NAME]}</TableData>
              <TableData width="70px">{receipt[STORE.TYPE]}</TableData>
              <TableData width="150px">{receipt[STORE.CONTACT]}</TableData>
              <TableData width="120px">
                {receipt[RECEIPT.RECEIPT_DATE]}
              </TableData>
              <TableData>{receipt[CUSTOMER.ID]}</TableData>
              <TableData>{receipt[RECEIPT.CATEGORY]}</TableData>
              <TableData>{receipt[CUSTOMER.NAME]}</TableData>
              <TableData width="150px">{receipt[CUSTOMER.CONTACT]}</TableData>
              <TableData width="70px">{receipt[PRODUCT.SEASON]}</TableData>
              <TableData>{receipt[PRODUCT.STYLE]}</TableData>
              <TableData width="70px">{receipt[PRODUCT.DEGREE]}</TableData>
              <TableData width="70px">{receipt[PRODUCT.COLOR]}</TableData>
              <TableData width="70px">{receipt[PRODUCT.SIZE]}</TableData>
              <TableData>{receipt[PRODUCT.PRICE]}</TableData>
              <TableData>{receipt[RECEIPT.TYPE]}</TableData>
              <TableData width="150px">{receipt[RECEIPT.MESSAGE]}</TableData>
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
  width: ${({ width = "100px" }) => width};
  min-width: ${({ width = "100px" }) => width};
  text-align: ${({ textAlign = "center" }) => textAlign};
  border: 1px solid ${COLOR.GRAY};
`;

export default ReceptionList;
