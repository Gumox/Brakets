import React, {useMemo} from "react";
import styled from "styled-components";
import moment from "moment";
import { useTable, useBlockLayout, useResizeColumns } from 'react-table';
import COLOR from "../../../constants/color";
import { RECEIPT, CUSTOMER, STORE, PRODUCT } from "../../../constants/field";
import { STORE_TYPE, RECEIPT_CATEGORY_TYPE, STORE_CATEGORY, RECEIPT_TYPE } from "../../../constants/type";


function Table({ columns, data, searchList, handleDataClick }) {

  const defaultColumn = React.useMemo(
      () => ({
          minWidth: 100,
          width: 100,
          maxWidth: 150,
      }),
      []
  )

  const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      state,
      resetResizing,
  } = useTable(
      {
          columns,
          data,
          defaultColumn,
      },
      useBlockLayout,
      useResizeColumns
  )

  return (
      <>
          <div>
              <div {...getTableProps()} className="table">
                  <div>
                      {headerGroups.map((headerGroup,i) => (
                          <div key={i}{...headerGroup.getHeaderGroupProps()} className="tr">
                              {headerGroup.headers.map((column,j) => (
                                  <div key={j} {...column.getHeaderProps()} className="th">
                                      {column.render('Header')}
                                      {/* Use column.getResizerProps to hook up the events correctly */}
                                      <div
                                          {...column.getResizerProps()}
                                          className={`resizer ${column.isResizing ? 'isResizing' : ''
                                              }`}
                                      />
                                  </div>
                              ))}
                          </div>
                      ))}
                  </div>

                  <div {...getTableBodyProps()}>
                      {rows.map((row, i) => {
                          prepareRow(row)
                          return (
                              <div key={i} {...row.getRowProps(
                                  {onClick: () => (handleDataClick(row.original["서비스카드 번호"]))}
                              )} className="tr">
                                  {row.cells.map((cell,j) => {
                                      return (
                                          <div key={j} {...cell.getCellProps()} className="td">
                                              {cell.render('Cell')}
                                          </div>
                                      )
                                  })}
                              </div>
                          )
                      })}
                  </div>
              </div>
          </div>
      </>
  )
}


const ReturnList = ({ data, handleDataClick = () => {} }) => {

  const columns = React.useMemo(() => [
    {Header: '서비스카드 번호', accessor: '서비스카드 번호'},
    {Header: '현금영수증번호',   accessor: '현금영수증번호'},
    {Header: '매장코드', accessor: '매장코드'},
    {Header: '매장명', accessor: '매장명'},
    {Header: '매장구분', accessor: '매장구분'},
    {Header: '매장연락처', accessor: '매장연락처'},
    {Header: '등록일', accessor: '등록일'},
    {Header: '고객ID', accessor: '고객ID'},
    {Header: '고객', accessor: '고객'},
    {Header: '고객연락처', accessor: '고객연락처'},
    {Header: '시즌', accessor: '시즌'},
    {Header: '스타일', accessor: '스타일'},
    {Header: '컬러', accessor: '컬러'},
    {Header: '사이즈', accessor: '사이즈'},
    {Header: '판매가', accessor: '판매가'},
    {Header: '고객요구', accessor: '고객요구'},
    {Header: '매장접수내용', accessor: '매장접수내용'},
    {Header: '과실구분', accessor: '과실구분'},  
    {Header: '고객약속일', accessor: '고객약속일'},
    {Header: '본사접수일', accessor: '본사접수일'},
    {Header: '내용분석', accessor: '내용분석'},
    {Header: '판정결과', accessor: '판정결과'},
  ],[])

    const value = data.map((cashReceipt) => ({
      "서비스카드 번호":cashReceipt[RECEIPT.CODE],
      "현금영수증번호":cashReceipt[RECEIPT.CASHRECEIPT_NUM] == null ? "미 발행 건" : cashReceipt[RECEIPT.CASHRECEIPT_NUM],
      "매장코드":cashReceipt[STORE.CODE],
      "매장명":cashReceipt[STORE.NAME],
      "매장구분":STORE_CATEGORY[cashReceipt[STORE.CATEGORY]],
      "매장연락처":cashReceipt[STORE.CONTACT],
      "등록일":"?",
      "고객ID":cashReceipt[CUSTOMER.ID],
      "고객":cashReceipt[CUSTOMER.NAME],
      "고객연락처":cashReceipt[CUSTOMER.CONTACT],
      "시즌":cashReceipt[PRODUCT.SEASON],
      "스타일":cashReceipt[PRODUCT.STYLE],
      "컬러":cashReceipt[PRODUCT.COLOR],
      "사이즈":cashReceipt[PRODUCT.SIZE], 
      "판매가":cashReceipt[PRODUCT.PRICE],
      "고객요구":RECEIPT_TYPE[cashReceipt[RECEIPT.TYPE]],
      "매장접수내용":cashReceipt[RECEIPT.STORE_MESSAGE],
      "과실구분":cashReceipt[RECEIPT.FAULT_NAME],
      "고객약속일":cashReceipt[RECEIPT.DUE_DATE]
      ? moment(cashReceipt[RECEIPT.DUE_DATE]).format("YYYY-MM-DD")
      : "",
      "본사접수일":cashReceipt[RECEIPT.REGISTER_DATE]
      ? moment(cashReceipt[RECEIPT.REGISTER_DATE]).format("YYYY-MM-DD")
      : "",
      "내용분석":cashReceipt[RECEIPT.ANALYSIS_NAME],
      "판정결과":cashReceipt[RECEIPT.RESULT_NAME],
    }));

  return (
    <Wrapper>
      <Styles>
        <Table columns={columns} data={value} handleDataClick={handleDataClick}/>
      </Styles>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: calc(100% - 110px);
  width: 100%;
  overflow: scroll;
  border-bottom: 2px solid;
`;

const Styles = styled.div`
  padding: 1rem;

  .table {
    display: inline-block;
    border-spacing: 0;
    border: 1px solid black;

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }

    .th,
    .td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      ${'' /* In this example we use an absolutely position resizer,
       so this is required. */}
      position: relative;

      :last-child {
        border-right: 0;
      }

      .resizer {
        display: inline-block;
        /* background: black; */
        width: 2px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        transform: translateX(50%);
        z-index: 1;
        ${'' /* prevents from scrolling while dragging on touch devices */}
        touch-action:none;
      }
    }
  }
`


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
