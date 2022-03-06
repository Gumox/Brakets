import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { useTable, useBlockLayout, useResizeColumns } from 'react-table';

import COLOR from "../../../constants/color";
import { RECEIPT, CUSTOMER, STORE, PRODUCT } from "../../../constants/field";
import { STORE_TYPE, RECEIPT_CATEGORY_TYPE, STORE_CATEGORY, RECEIPT_TYPE } from "../../../constants/type";


    // {Header: '출고율', accessor: '출고율'},
    // {Header: '출고금액', accessor: '출고금액'},  
    // {Header: '부과세', accessor: '부과세'},
    // {Header: '출고금액적용일', accessor: '출고금액적용일'},
    // {Header: 'SORDER NO.', accessor: 'SORDER NO.'},
    // {Header: 'INVOICE NO.', accessor: 'INVOICE NO.'},


function Table({ columns, data }) {

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
                                  // {onClick: () => (getTargetData(row.original["서비스카드 번호"]))}
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

const List = ({ data, handleDataClick = () => {} }) => {

  const columns = React.useMemo(() => [
    {Header: 'No', accessor: 'No'},
    {Header: '서비스카드 코드',   accessor: '서비스카드 코드'},
    {Header: '매장명', accessor: '매장명'},
    {Header: '출고일', accessor: '출고일'},
    {Header: '상태', accessor: '상태'},
    {Header: '시즌', accessor: '시즌'},
    {Header: 'PartCode', accessor: 'PartCode'},
    {Header: '컬러', accessor: '컬러'},
    {Header: '사이즈', accessor: '사이즈'},
    {Header: '수량', accessor: '수량'},
    {Header: '금액', accessor: '금액'},
    {Header: '최초생성자', accessor: '최초생성자'},
    {Header: '최초생성일', accessor: '최초생성일'},
    {Header: '최초수정자', accessor: '최초수정자'},
    {Header: '최초수정일', accessor: '최초수정일'},
  ],[])

    let invoiceData = (
                    data == ""
                  ) ? (
                    "empty"
                  ) : (
                    data.data.flat().map((v, index) => ({
                    "No": index + 1,
                    "서비스카드 코드":"",
                    '매장명':"",
                    '출고일':v.release_date == "" ? "" : moment(v.release_date).format("YYYY-MM-DD"),
                    '상태':v.status,
                    '시즌':v.season,
                    'PartCode':v.partcode,
                    '컬러':v.color,
                    '사이즈':v.size,
                    '수량':v.qty,
                    '금액':v.amount,
                    '최초생성자':v.created,
                    '최초생성일':v.created_date == "" ? "" : moment(v.created_date).format("YYYY-MM-DD HH:mm:SS"),
                    '최초수정자':v.edited,
                    '최초수정일':v.edited_date == "" ? "" : moment(v.edited_date).format("YYYY-MM-DD HH:mm:SS"),
                   }))
                  )

    useEffect(()=>{
      
    console.log("data is")
    console.log(data)
    console.log(data == "" ? "true" : invoiceData)
    },[])

    console.log("data is")
    console.log(invoiceData)
  return (
    <Wrapper>
      <Styles>
        <Table columns={columns} data={invoiceData == "empty" ? [] : invoiceData}/>
      </Styles>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* height: calc(100% - 120px); */
  height: 70%;
  height: 100%;
  width: 100%;
  overflow: scroll;
  border-bottom: 2px solid;
`;

const Styles = styled.div`
  padding: 1rem;
  height: 80%;

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

export default List;
