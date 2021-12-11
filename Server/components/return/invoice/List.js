import React from "react";
import styled from "styled-components";
import moment from "moment";

import COLOR from "../../../constants/color";

const List = ({ data, handleDataClick = () => {} }) => {
  return (
    <Wrapper>
      <Table>
        <TableHeader>
          <tr>
            <TableHeaderCell>No.</TableHeaderCell>
            <TableHeaderCell>매장코드</TableHeaderCell>
            <TableHeaderCell width="150px">매장명</TableHeaderCell>
            <TableHeaderCell width="120px">출고일</TableHeaderCell>
            <TableHeaderCell>상태</TableHeaderCell>
            <TableHeaderCell width="70px">시즌</TableHeaderCell>
            <TableHeaderCell>Partcode</TableHeaderCell>
            <TableHeaderCell width="70px">Color</TableHeaderCell>
            <TableHeaderCell width="70px">Siz</TableHeaderCell>
            <TableHeaderCell width="70px">Qty</TableHeaderCell>
            <TableHeaderCell>금액</TableHeaderCell>
            <TableHeaderCell>출고율</TableHeaderCell>
            <TableHeaderCell width="150px">출고금액</TableHeaderCell>
            <TableHeaderCell>Vat</TableHeaderCell>
            <TableHeaderCell width="120px">출고금액적용일</TableHeaderCell>
            <TableHeaderCell width="120px">SORDER no.</TableHeaderCell>
            <TableHeaderCell>INVOICE no.</TableHeaderCell>
            <TableHeaderCell>최초생성자</TableHeaderCell>
            <TableHeaderCell>최초생성일</TableHeaderCell>
            <TableHeaderCell>최초수정자</TableHeaderCell>
            <TableHeaderCell>최초수정일</TableHeaderCell>
          </tr>
        </TableHeader>
        <tbody>
        </tbody>
      </Table>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: calc(100% - 120px);
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

export default List;
