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
          minWidth: 20,
          width: 40,
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div style={{textAlign:"center"}}>
              <IndeterminateCheckbox
                {...getToggleAllRowsSelectedProps()}
              />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div style={{textAlign:"center"}}>
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
                            background: row.original["전표 발행 여부"] == "전표 발행" ? 'rgba(255,0,0,0.7)' : 'orange'
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

  const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const columns = React.useMemo(() => [

    // ASIS
    {Header: () => (<div style={{textAlign:"center"}}>{ '서비스카드#'}</div>), accessor: '서비스카드#' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '매장코드'}</div>), accessor: '매장코드' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '매장명'}</div>), accessor: '매장명' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '매장구분'}</div>), accessor: '매장구분' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '매장연락처'}</div>), accessor: '매장연락처' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},

    // TOBE
    {Header: () => (<div style={{textAlign:"center"}}>{ '등록일'}</div>), accessor: '등록일' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},

    // ASIS
    {Header: () => (<div style={{textAlign:"center"}}>{ '고객ID'}</div>), accessor: '고객ID' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '고객'}</div>), accessor: '고객' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '고객연락처'}</div>), accessor: '고객연락처' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '시즌'}</div>), accessor: '시즌' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '스타일'}</div>), accessor: '스타일' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '컬러'}</div>), accessor: '컬러' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '사이즈'}</div>), accessor: '사이즈' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '판매가'}</div>), accessor: '판매가' ,Cell: row => <div style={{ textAlign: "right" ,marginRight:10 }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '고객요구'}</div>), accessor: '고객요구' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '매장접수내용'}</div>), accessor: '매장접수내용' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},

    // TOBE
    {Header: () => (<div style={{textAlign:"center"}}>{ '본사접수일'}</div>), accessor: '본사접수일' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '발송일 to S'}</div>), accessor: '발송일 to S' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},

    // ASIS
    {Header: () => (<div style={{textAlign:"center"}}>{ '과실구분'}</div>), accessor: '과실구분' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '내용분석'}</div>), accessor: '내용분석' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '판정결과'}</div>), accessor: '판정결과' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    // {Header: () => (<div style={{textAlign:"center"}}>{ '고객약속일'}</div>), accessor: '고객약속일' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    // {Header: () => (<div style={{textAlign:"center"}}>{ '본사접수일'}</div>), accessor: '본사접수일' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},

    // TOBE
    {Header: () => (<div style={{textAlign:"center"}}>{ '유상수선비'}</div>), accessor: '유상수선비' ,Cell: row => <div style={{ textAlign: "right" ,marginRight:10 }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '유상수선 유/무'}</div>), accessor: '유상수선 유/무' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '수선처1'}</div>), accessor: '수선처1' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '총수선비1'}</div>), accessor: '총수선비1' ,Cell: row => <div style={{ textAlign: "right" ,marginRight:10 }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '수선처접수일1'}</div>), accessor: '수선처접수일1' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '재수선1'}</div>), accessor: '재수선1' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '수선처2'}</div>), accessor: '수선처2' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '총수선비2'}</div>), accessor: '총수선비2' ,Cell: row => <div style={{ textAlign: "right" ,marginRight:10 }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '수선처접수일2'}</div>), accessor: '수선처접수일2' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '재수선2'}</div>), accessor: '재수선2' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '수선처3'}</div>), accessor: '수선처3' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '총수선비3'}</div>), accessor: '총수선비3' ,Cell: row => <div style={{ textAlign: "right" ,marginRight:10 }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '수선처접수일3'}</div>), accessor: '수선처접수일3' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '재수선3'}</div>), accessor: '재수선3' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '생산업체'}</div>), accessor: '생산업체' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '발송일 to M'}</div>), accessor: '발송일 to M' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '본사설명'}</div>), accessor: '본사설명' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '하자코드'}</div>), accessor: '하자코드' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '심의'}</div>), accessor: '심의' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    /*{Header: () => (<div style={{textAlign:"center"}}>{ '등록자'}</div>), accessor: '등록자' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '수정자'}</div>), accessor: '수정자' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '수정일시'}</div>), accessor: '수정일시' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ 'SMS'}</div>), accessor: 'SMS' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},*/
    {Header: () => (<div style={{textAlign:"center"}}>{ '감가반품'}</div>), accessor: '감가반품' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},

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
    "판매가": productReturn.product_tag_price ? numberWithCommas(productReturn.product_tag_price) : "",
    "고객요구": RECEIPT_TYPE[productReturn[RECEIPT.TYPE]],
    "매장접수내용": productReturn[RECEIPT.STORE_MESSAGE],
    "본사접수일": productReturn[RECEIPT.REGISTER_DATE] ? moment(productReturn[RECEIPT.REGISTER_DATE]).format("YYYY-MM-DD") : "",
    "발송일 to S": productReturn.complete_date ? moment(productReturn.complete_date).format("YYYY-MM-DD") : "",
    "과실구분": productReturn[RECEIPT.FAULT_NAME],
    "내용분석": productReturn[RECEIPT.ANALYSIS_NAME],
    "판정결과": productReturn[RECEIPT.RESULT_NAME],
    "유상수선비": productReturn.fee ? numberWithCommas(productReturn.fee) : "",
    "유상수선 유/무": (productReturn.fee > 0) ? ("유") : ("무"),
    "수선처1": productReturn.repair1_store_name ?  productReturn.repair1_store_name : "",
    "총수선비1": productReturn.repair1_repair1_price ?  numberWithCommas(productReturn.repair1_repair1_price + productReturn.repair1_repair2_price + productReturn.repair1_repair3_price ) : "",
    "수선처접수일1": productReturn.repair1_register_date ? moment(productReturn.repair1_register_date).format("YYYY-MM-DD") : "",
    "재수선1": (productReturn.repair1_repair1_redo > 0 || productReturn.repair1_repair2_redo > 0 || productReturn.repair1_repair3_redo > 0) ? ("Y") : ("N"),
    "수선처2":  productReturn.repair2_store_name ?  productReturn.repair2_store_name : "",
    "총수선비2":  productReturn.repair2_repair1_price ?  numberWithCommas(productReturn.repair2_repair1_price + productReturn.repair2_repair2_price + productReturn.repair2_repair3_price ) : "",
    "수선처접수일2": productReturn.repair2_register_date ? moment(productReturn.repair2_register_date).format("YYYY-MM-DD") : "",
    "재수선2": (productReturn.repair2_repair1_redo > 0 || productReturn.repair2_repair2_redo > 0 || productReturn.repair2_repair3_redo > 0) ? ("Y") : ("N"),
    "수선처3":  productReturn.repair3_store_name ?  productReturn.repair3_store_name : "",
    "총수선비3":  productReturn.repair3_repair1_price ?  numberWithCommas(productReturn.repair3_repair1_price + productReturn.repair3_repair2_price + productReturn.repair3_repair3_price ) : "",
    "수선처접수일3": productReturn.repair3_register_date ? moment(productReturn.repair3_register_date).format("YYYY-MM-DD") : "",
    "재수선3": (productReturn.repair3_repair1_redo > 0 || productReturn.repair3_repair2_redo > 0 || productReturn.repair3_repair3_redo > 0) ? ("Y") : ("N"),
    "생산업체": productReturn.manufacturer_name,
    "발송일 to M":  productReturn.mfr_send_date ?  moment(productReturn.mfr_send_date).format("YYYY-MM-DD") : "",
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


  return (
    <Wrapper>
      
      <Styles >
        <Table columns={columns} data={value}/>
      </Styles>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  
  height: calc(95.5% - 23px);;//50
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
