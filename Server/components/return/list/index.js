import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { useTable, useBlockLayout, useResizeColumns, useRowSelect } from 'react-table';
import COLOR from "../../../constants/color";
import { RECEIPT, CUSTOMER, STORE, PRODUCT } from "../../../constants/field";
import {
  STORE_TYPE,
  RECEIPT_CATEGORY_TYPE,
  RECEIPT_TYPE,
  STORE_CATEGORY,
} from "../../../constants/type";
import store from '../../../store/store'


const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
)
IndeterminateCheckbox.displayName = "return/list";

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
    state: { selectedRowIds },
    selectedFlatRows,
    resetResizing,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useBlockLayout,
    useResizeColumns,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox
                {...getToggleAllRowsSelectedProps()}
              />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ])
    }
  )
  store.dispatch({type:"SELECTED_DATA", selected_data:{selectedFlatRows}})
  
  
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
                <div key={i} {...row.getRowProps({ onClick: () => (rows[row.id].toggleRowSelected())})} className="tr">
                  {row.cells.map((cell, j) => {
                    return (
                      <div key={j} {...cell.getCellProps(
                        {
                          style: { 
                            color: row.original["전표 발행 여부"] == "전표 발행" ? 'white' : 'black',
                            background: row.original["전표 발행 여부"] == "전표 발행" ? 'red' : 'orange'
                          }
                          // red
                          // orange: #ffa203
                        }
                        
                      )} className="td">
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
      
      {/* <pre>
        <code>
          {JSON.stringify(
            {
              // selectedRowIds: selectedRowIds,
              'selectedFlatRows[].original': selectedFlatRows.map(value => value.values["서비스카드#"]),
              // 'storedData': store.getState("SELECTED_DATA")
              
            },
            null,
            2
          )}
        </code>
      </pre> */}
      
    </>
  )
}

const ReturnList = ({ data, user }) => {

  const columns = React.useMemo(() => [

    // ASIS
    { Header: '서비스카드#', accessor: '서비스카드#' },
    { Header: '매장코드', accessor: '매장코드' },
    { Header: '매장명', accessor: '매장명' },
    { Header: '매장구분', accessor: '매장구분' },
    { Header: '매장연락처', accessor: '매장연락처' },

    // TOBE
    { Header: '등록일', accessor: '등록일' },

    // ASIS
    { Header: '고객ID', accessor: '고객ID' },
    { Header: '고객', accessor: '고객' },
    { Header: '고객연락처', accessor: '고객연락처' },
    { Header: '시즌', accessor: '시즌' },
    { Header: '스타일', accessor: '스타일' },
    { Header: '컬러', accessor: '컬러' },
    { Header: '사이즈', accessor: '사이즈' },
    { Header: '판매가', accessor: '판매가' },
    { Header: '고객요구', accessor: '고객요구' },
    { Header: '매장접수내용', accessor: '매장접수내용' },

    // TOBE
    { Header: '본사접수일', accessor: '본사접수일' },
    { Header: '발송일 to S', accessor: '발송일 to S' },

    // ASIS
    { Header: '과실구분', accessor: '과실구분' },
    { Header: '내용분석', accessor: '내용분석' },
    { Header: '판정결과', accessor: '판정결과' },
    // { Header: '고객약속일', accessor: '고객약속일' },
    // { Header: '본사접수일', accessor: '본사접수일' },

    // TOBE
    { Header: '유상수선비', accessor: '유상수선비' },
    { Header: '유상수선 유/무', accessor: '유상수선 유/무' },
    { Header: '수선처1', accessor: '수선처1' },
    { Header: '총수선비1', accessor: '총수선비1' },
    { Header: '수선처접수일1', accessor: '수선처접수일1' },
    { Header: '재수선1', accessor: '재수선1' },
    { Header: '수선처2', accessor: '수선처2' },
    { Header: '총수선비2', accessor: '총수선비2' },
    { Header: '수선처접수일2', accessor: '수선처접수일2' },
    { Header: '재수선2', accessor: '재수선2' },
    { Header: '수선처3', accessor: '수선처3' },
    { Header: '총수선비3', accessor: '총수선비3' },
    { Header: '수선처접수일3', accessor: '수선처접수일3' },
    { Header: '재수선3', accessor: '재수선3' },
    { Header: '생산업체', accessor: '생산업체' },
    { Header: '발송일 to M', accessor: '발송일 to M' },
    { Header: '본사설명', accessor: '본사설명' },
    { Header: '하자코드', accessor: '하자코드' },
    { Header: '심의', accessor: '심의' },
    { Header: '등록자', accessor: '등록자' },
    { Header: '수정자', accessor: '수정자' },
    { Header: '수정일시', accessor: '수정일시' },
    { Header: 'SMS', accessor: 'SMS' },
    { Header: '감가반품', accessor: '감가반품' },

  ], [])

  const value = data.map((productReturn) => ({
    "receipt_id": productReturn[RECEIPT.ID],
    "서비스카드#": productReturn[RECEIPT.CODE],
    "매장코드": productReturn[STORE.CODE],
    "매장명": productReturn[STORE.NAME],
    "매장구분": STORE_CATEGORY[productReturn[STORE.CATEGORY]],
    "매장연락처": productReturn[STORE.CONTACT],
    "등록일": productReturn[RECEIPT.RECEIPT_DATE] ? moment(productReturn[RECEIPT.DUE_DATE]).format("YYYY-MM-DD") : "",
    "고객ID": productReturn[CUSTOMER.ID],
    "고객": productReturn[CUSTOMER.NAME],
    "고객연락처": productReturn[CUSTOMER.CONTACT],
    "시즌": productReturn[PRODUCT.SEASON],
    "스타일": productReturn[PRODUCT.STYLE],
    "컬러": productReturn[PRODUCT.COLOR],
    "사이즈": productReturn[PRODUCT.SIZE],
    "판매가": productReturn[PRODUCT.PRICE],
    "고객요구": RECEIPT_TYPE[productReturn[RECEIPT.TYPE]],
    "매장접수내용": productReturn[RECEIPT.STORE_MESSAGE],
    "본사접수일": productReturn[RECEIPT.REGISTER_DATE] ? moment(productReturn[RECEIPT.REGISTER_DATE]).format("YYYY-MM-DD") : "",
    "발송일 to S": productReturn.complete_date ? moment(productReturn.complete_date).format("YYYY-MM-DD") : "",
    "과실구분": productReturn[RECEIPT.FAULT_NAME],
    "내용분석": productReturn[RECEIPT.ANALYSIS_NAME],
    "판정결과": productReturn[RECEIPT.RESULT_NAME],
    "유상수선비": productReturn.fee,
    "유상수선 유/무": (productReturn.fee > 0) ? ("유") : ("무"),
    "수선처1": "",
    "총수선비1": "",
    "수선처접수일1": "",
    "재수선1": "",
    "수선처2": "",
    "총수선비2": "",
    "수선처접수일2": "",
    "재수선2": "",
    "수선처3": "",
    "총수선비3": "",
    "수선처접수일3": "",
    "재수선3": "",
    "생산업체": productReturn.manufacturer_name,
    "발송일 to M": "",
    "본사설명": productReturn.message,
    "하자코드": "",
    "심의": (productReturn[RECEIPT.TYPE] == 2) ? ("심의") : (""),
    "등록자": "",
    "수정자": "",
    "수정일시": "",
    "SMS": "",
    "감가반품": "",
    "전표 발행 여부":productReturn.issued == 1 ? "전표 발행" : "전표 미발행",
  }))


  // console.log(rows)

  return (
    <Wrapper>
      
      <Styles >
        <Table columns={columns} data={value}/>
      </Styles>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  
  height: 90%;//50
  width: 100%;
  overflow: auto;
  border-bottom: 2px solid;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
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
  :last-child {
    
  }
  
`
const Styles = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  height: 80%;

  .table {
    display: inline-block;
    border-spacing: 0;
    border: 1px solid black;
    border-top : 0px ;

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
