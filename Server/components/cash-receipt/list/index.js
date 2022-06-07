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
          minWidth: 50,
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
                  <div style={{top:0,position:"sticky",zIndex:10}}>
                    {headerGroups.map((headerGroup, i) => (
                      <StickyStyles key={i}{...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column, j) => (
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
                      </StickyStyles>
                    ))}
                  </div>

                  <div {...getTableBodyProps()}>
                      {rows.map((row, i) => {
                          prepareRow(row)
                          return (
                              <div key={i} {...row.getRowProps(
                                  {onClick: () => (handleDataClick(row.original["서비스카드#"]))}
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
    {Header: () => (<div style={{textAlign:"center"}}>{ '서비스카드#'}</div>), accessor: '서비스카드#',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '현금영수증번호'}</div>),   accessor: '현금영수증번호',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '매장코드'}</div>), accessor: '매장코드',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '매장명'}</div>), accessor: '매장명',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '매장구분'}</div>), accessor: '매장구분',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '매장연락처'}</div>), accessor: '매장연락처',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '등록일'}</div>), accessor: '등록일',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '고객ID'}</div>), accessor: '고객ID',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '고객'}</div>), accessor: '고객',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '고객연락처'}</div>), accessor: '고객연락처',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '시즌'}</div>), accessor: '시즌',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '스타일'}</div>), accessor: '스타일',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '컬러'}</div>), accessor: '컬러',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '사이즈'}</div>), accessor: '사이즈',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '판매가'}</div>), accessor: '판매가',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '고객요구'}</div>), accessor: '고객요구',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '매장접수내용'}</div>), accessor: '매장접수내용',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '과실구분'}</div>), accessor: '과실구분',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},  
    {Header: () => (<div style={{textAlign:"center"}}>{ '고객약속일'}</div>), accessor: '고객약속일',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '본사접수일'}</div>), accessor: '본사접수일',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '내용분석'}</div>), accessor: '내용분석',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '판정결과'}</div>), accessor: '판정결과',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
  ],[])

    console.log("data is")
    console.log(data)

    const value = data.map((cashReceipt) => ({
      "서비스카드#":cashReceipt[RECEIPT.CODE],
      "현금영수증번호":cashReceipt[RECEIPT.CASHRECEIPT_NUM] == null ? "미 발행 건" : cashReceipt[RECEIPT.CASHRECEIPT_NUM],
      "매장코드":cashReceipt[STORE.CODE],
      "매장명":cashReceipt[STORE.NAME],
      "매장구분":STORE_CATEGORY[cashReceipt[STORE.CATEGORY]],
      "매장연락처":cashReceipt[STORE.CONTACT],
      "등록일": cashReceipt.receipt_date ? moment(cashReceipt.receipt_date).format("YYYY-MM-DD") : "",
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

const Wrapper = styled.nav`
  height: calc(95% - 25px);//100% - 110px
  width: 100%;
  overflow: auto;
  border-bottom: 2px solid;
  &::-webkit-scrollbar {
    width: 8px;
    height: 10px;
    background: rgba(210, 210, 210, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(96, 96, 96, 0.7);
    border-radius: 6px;
  }
`;
const StickyStyles = styled.div`
  background-color:${COLOR.WHITE};
  border-top:1px solid;
  
`
const Styles = styled.div`
  padding: 1rem;

  .table {
    display: inline-block;
    border-spacing: 0;
    border: 1px solid black;
    border-top: 0px;

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

export default ReturnList;
