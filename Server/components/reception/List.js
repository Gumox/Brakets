import React, { useContext } from "react";
import styled from "styled-components";
import moment from "moment";

import { OptionContext } from "../../store/Context";
import COLOR from "../../constants/color";
import { RECEIPT, CUSTOMER, STORE, PRODUCT } from "../../constants/field";
import {
  STORE_CATEGORY,
  RECEIPT_CATEGORY_TYPE,
  RECEIPT_TYPE,
  TRANSPORT_TYPE,
  SHIPPING_TYPE,
} from "../../constants/type";

const ReceptionList = ({ searchList, getTargetData = () => {} }) => {
  return (
    <Wrapper>
      <Table>
        <TableHeader>
          <tr>
            <TableHeaderCell>서비스카드 번호</TableHeaderCell>
            <TableHeaderCell width="60px">매장코드</TableHeaderCell>
            <TableHeaderCell width="90px">매장명</TableHeaderCell>
            <TableHeaderCell width="70px">매장구분</TableHeaderCell>
            <TableHeaderCell width="100px">매장연락처</TableHeaderCell>
            <TableHeaderCell width="100px">매장접수일</TableHeaderCell>
            <TableHeaderCell width="60px">고객ID</TableHeaderCell>
            <TableHeaderCell width="90px">접수구분</TableHeaderCell>
            <TableHeaderCell width="90px">고객</TableHeaderCell>
            <TableHeaderCell width="100px">고객연락처</TableHeaderCell>
            <TableHeaderCell width="50px">시즌</TableHeaderCell>
            <TableHeaderCell width="90px">스타일</TableHeaderCell>
            <TableHeaderCell width="50px">차수</TableHeaderCell>
            <TableHeaderCell width="60px">컬러</TableHeaderCell>
            <TableHeaderCell width="50px">사이즈</TableHeaderCell>
            <TableHeaderCell width="80px">판매가</TableHeaderCell>
            <TableHeaderCell width="70px">고객요구</TableHeaderCell>
            <TableHeaderCell width="150px">매장접수내용</TableHeaderCell>
            <TableHeaderCell width="100px">고객약속일</TableHeaderCell>
            <TableHeaderCell width="100px">본사접수일</TableHeaderCell>
            <TableHeaderCell width="100px">발송일toS</TableHeaderCell>
            <TableHeaderCell width="80px">과실구분</TableHeaderCell>
            <TableHeaderCell width="80px">내용분석</TableHeaderCell>
            <TableHeaderCell width="80px">판정결과</TableHeaderCell>
            {RECEIPT.REPAIR_DETAILS.map((_, index) => (
              <>
                <TableHeaderCell width="80px">
                  수선처{index + 1}
                </TableHeaderCell>
                <TableHeaderCell width="80px">
                  총수선비{index + 1}
                </TableHeaderCell>
                <TableHeaderCell width="100px">
                  수선처접수일{index + 1}
                </TableHeaderCell>
                <TableHeaderCell width="55px">
                  재수선{index + 1}
                </TableHeaderCell>
              </>
            ))}
            <TableHeaderCell width="80px">생산업체</TableHeaderCell>
            <TableHeaderCell width="100px">발송일toM</TableHeaderCell>
            <TableHeaderCell width="150px">본사설명</TableHeaderCell>
            <TableHeaderCell width="100px">현금영수증번호</TableHeaderCell>
            {RECEIPT.REPAIR_DETAILS.map((_, index) => (
              <>
                <TableHeaderCell width="100px">
                  수선처설명{index + 1}
                </TableHeaderCell>
                <TableHeaderCell width="80px">
                  운송형태{index + 1}
                </TableHeaderCell>
                <TableHeaderCell width="80px">
                  발송방법{index + 1}
                </TableHeaderCell>
                <TableHeaderCell width="80px">
                  발송비용{index + 1}
                </TableHeaderCell>
              </>
            ))}
          </tr>
        </TableHeader>
        <tbody>
          {searchList.map((receipt) => (
            <TableRow
              key={receipt[RECEIPT.ID]}
              onClick={() => getTargetData(receipt[RECEIPT.CODE])}
            >
              <TableData title={receipt[RECEIPT.CODE]}>
                {receipt[RECEIPT.CODE]}
              </TableData>
              <TableData title={receipt[STORE.CODE]} width="60px">
                {receipt[STORE.CODE]}
              </TableData>
              <TableData title={receipt[STORE.NAME]} width="90px">
                {receipt[STORE.NAME]}
              </TableData>
              <TableData
                title={STORE_CATEGORY[receipt[STORE.CATEGORY]]}
                width="70px"
              >
                {STORE_CATEGORY[receipt[STORE.CATEGORY]]}
              </TableData>
              <TableData title={receipt[STORE.CONTACT]} width="100px">
                {receipt[STORE.CONTACT]}
              </TableData>
              <TableData width="100px">
                {receipt[RECEIPT.RECEIPT_DATE]
                  ? moment(receipt[RECEIPT.RECEIPT_DATE]).format("YYYY-MM-DD")
                  : ""}
              </TableData>
              <TableData title={receipt[CUSTOMER.ID]} width="60px">
                {receipt[CUSTOMER.ID]}
              </TableData>
              <TableData
                title={RECEIPT_CATEGORY_TYPE[receipt[RECEIPT.CATEGORY]]}
                width="90px"
              >
                {RECEIPT_CATEGORY_TYPE[receipt[RECEIPT.CATEGORY]]}
              </TableData>
              <TableData title={receipt[CUSTOMER.NAME]} width="90px">
                {receipt[CUSTOMER.NAME]}
              </TableData>
              <TableData title={receipt[CUSTOMER.CONTACT]} width="100px">
                {receipt[CUSTOMER.CONTACT]}
              </TableData>
              <TableData title={receipt[PRODUCT.SEASON]} width="50px">
                {receipt[PRODUCT.SEASON]}
              </TableData>
              <TableData title={receipt[PRODUCT.STYLE]} width="90px">
                {receipt[PRODUCT.STYLE]}
              </TableData>
              <TableData title={receipt[PRODUCT.DEGREE]} width="50px">
                {receipt[PRODUCT.DEGREE]}
              </TableData>
              <TableData title={receipt[PRODUCT.COLOR]} width="60px">
                {receipt[PRODUCT.COLOR]}
              </TableData>
              <TableData title={receipt[PRODUCT.SIZE]} width="50px">
                {receipt[PRODUCT.SIZE]}
              </TableData>
              <TableData title={receipt[PRODUCT.PRICE]} width="80px">
                {receipt[PRODUCT.PRICE]}
              </TableData>
              <TableData
                title={RECEIPT_TYPE[receipt[RECEIPT.TYPE]]}
                width="70px"
              >
                {RECEIPT_TYPE[receipt[RECEIPT.TYPE]]}
              </TableData>
              <TableData title={receipt[RECEIPT.STORE_MESSAGE]} width="150px">
                {receipt[RECEIPT.STORE_MESSAGE]}
              </TableData>
              <TableData width="100px">
                {receipt[RECEIPT.DUE_DATE]
                  ? moment(receipt[RECEIPT.DUE_DATE]).format("YYYY-MM-DD")
                  : ""}
              </TableData>
              <TableData width="100px">
                {receipt[RECEIPT.REGISTER_DATE]
                  ? moment(receipt[RECEIPT.REGISTER_DATE]).format("YYYY-MM-DD")
                  : ""}
              </TableData>
              <TableData width="100px">
                {receipt[RECEIPT.COMPLETE_DATE]
                  ? moment(receipt[RECEIPT.COMPLETE_DATE]).format("YYYY-MM-DD")
                  : ""}
              </TableData>
              <TableData title={receipt[RECEIPT.FAULT_NAME]} width="80px">
                {receipt[RECEIPT.FAULT_NAME]}
              </TableData>
              <TableData title={receipt[RECEIPT.ANALYSIS_NAME]} width="80px">
                {receipt[RECEIPT.ANALYSIS_NAME]}
              </TableData>
              <TableData title={receipt[RECEIPT.RESULT_NAME]} width="80px">
                {receipt[RECEIPT.RESULT_NAME]}
              </TableData>
              {RECEIPT.REPAIR_DETAILS.map((REPAIR) => (
                <>
                  <TableData title={receipt[REPAIR.PLACE_NAME]} width="80px">
                    {receipt[REPAIR.PLACE_NAME]}
                  </TableData>
                  <TableData title={receipt[REPAIR.TOTAL_PRICE]} width="80px">
                    {receipt[REPAIR.TOTAL_PRICE]}
                  </TableData>
                  <TableData width="100px">
                    {receipt[REPAIR.REGISTER_DATE]
                      ? moment(receipt[REPAIR.REGISTER_DATE]).format(
                          "YYYY-MM-DD"
                        )
                      : ""}
                  </TableData>
                  <TableData width="55px">
                    {receipt[REPAIR.DETAILS[0].REDO] === 1 ? "Y" : "N"}
                  </TableData>
                </>
              ))}
              <TableData
                title={receipt[RECEIPT.MANUFACTURER_NAME]}
                width="80px"
              >
                {receipt[RECEIPT.MANUFACTURER_NAME]}
              </TableData>
              <TableData width="100px">
                {receipt[RECEIPT.MANUFACTURER_DETAIL.SEND_DATE]
                  ? moment(
                      receipt[RECEIPT.MANUFACTURER_DETAIL.SEND_DATE]
                    ).format("YYYY-MM-DD")
                  : ""}
              </TableData>
              <TableData title={receipt[RECEIPT.MESSAGE]} width="150px">
                {receipt[RECEIPT.MESSAGE]}
              </TableData>
              <TableData title={receipt[RECEIPT.CASHRECEIPT_NUM]} width="100px">
                {receipt[RECEIPT.CASHRECEIPT_NUM]}
              </TableData>
              {RECEIPT.REPAIR_DETAILS.map((REPAIR) => (
                <>
                  <TableData title={receipt[REPAIR.MESSAGE]} width="100px">
                    {receipt[REPAIR.MESSAGE]}
                  </TableData>
                  <TableData
                    title={TRANSPORT_TYPE[receipt[REPAIR.DELIVERY_TYPE]]}
                    width="80px"
                  >
                    {TRANSPORT_TYPE[receipt[REPAIR.DELIVERY_TYPE]]}
                  </TableData>
                  <TableData
                    title={SHIPPING_TYPE[receipt[REPAIR.SHIPMENT_TYPE]]}
                    width="80px"
                  >
                    {SHIPPING_TYPE[receipt[REPAIR.SHIPMENT_TYPE]]}
                  </TableData>
                  <TableData
                    title={receipt[REPAIR.SHIPMENT_PRICE]}
                    width="80px"
                  >
                    {receipt[REPAIR.SHIPMENT_PRICE]}
                  </TableData>
                </>
              ))}
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
