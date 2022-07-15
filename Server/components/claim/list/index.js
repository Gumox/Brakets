import React, {useMemo} from "react";
import styled from "styled-components";
import moment from "moment";
import { useTable, useBlockLayout, useResizeColumns, useRowSelect } from 'react-table';
import COLOR from "../../../constants/color";
import { RECEIPT, CUSTOMER, STORE, PRODUCT } from "../../../constants/field";
import {
  STORE_TYPE,
  RECEIPT_CATEGORY_TYPE,
  RECEIPT_TYPE,
  STORE_CATEGORY
} from "../../../constants/type";
import Checkbox from "../../Checkbox";
import store from "../../../store/store";


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
IndeterminateCheckbox.displayName = "claim/list";

function Table({ columns, data, searchList, getTargetData }) {

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
      selectedFlatRows,
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
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
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
                              <div key={i} {...row.getRowProps({onClick: () => (rows[row.id].toggleRowSelected())})} className="tr">
                                  {row.cells.map((cell,j) => {
                                      return (
                                          <div key={j} {...cell.getCellProps(
                                            {
                                              style:{color:'navy', background: '#ebe8e8'}
                                              // navy
                                              // #06859c
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
      </>
  )
}

const ReturnList = ({ data, handleDataClick = () => {} }) => {
  
  const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const columns = React.useMemo(() => [
    
    // ASIS
    {Header: () => (<div style={{textAlign:"center"}}>{ '서비스카드#'}</div>), accessor: '서비스카드#',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '매장코드'}</div>), accessor: '매장코드',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '매장명'}</div>), accessor: '매장명',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '매장구분'}</div>), accessor: '매장구분',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '매장연락처'}</div>), accessor: '매장연락처',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},

    // TOBE
    {Header: () => (<div style={{textAlign:"center"}}>{ '매장접수일'}</div>), accessor: '매장접수일',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},

    // ASIS
    // {Header: () => (<div style={{textAlign:"center"}}>{ '등록일'}</div>), accessor: '등록일',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '고객'}</div>), accessor: '고객',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '고객연락처'}</div>), accessor: '고객연락처',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '시즌'}</div>), accessor: '시즌',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '스타일'}</div>), accessor: '스타일',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '컬러'}</div>), accessor: '컬러',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '사이즈'}</div>), accessor: '사이즈',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '판매가'}</div>), accessor: '판매가',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    //{Header: () => (<div style={{textAlign:"center"}}>{ '매장처리여부'}</div>), accessor: '매장처리여부',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '클레임가구분'}</div>), accessor: '클레임가구분',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '클레임가'}</div>), accessor: '클레임가',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},  
    {Header: () => (<div style={{textAlign:"center"}}>{ '업체처리여부'}</div>), accessor: '업체처리여부',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '클레임업체'}</div>), accessor: '클레임업체',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '업체코드'}</div>), accessor: '업체코드',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '업체코드(유통)'}</div>), accessor: '업체코드(유통)',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '고객ID'}</div>), accessor: '고객ID',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '고객요구'}</div>), accessor: '고객요구',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '매장접수내용'}</div>), accessor: '매장접수내용',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    // {Header: () => (<div style={{textAlign:"center"}}>{ '내용분석'}</div>), accessor: '내용분석',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    // {Header: () => (<div style={{textAlign:"center"}}>{ '판정결과'}</div>), accessor: '판정결과',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},

    // TOBE
    {Header: () => (<div style={{textAlign:"center"}}>{ '본사접수일'}</div>), accessor: '본사접수일',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '발송일 to S'}</div>), accessor: '발송일 to S',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '과실구분'}</div>), accessor: '과실구분',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '내용분석'}</div>), accessor: '내용분석',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '판정결과'}</div>), accessor: '판정결과',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '수선미입고'}</div>), accessor: '수선미입고',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '유상수선비'}</div>), accessor: '유상수선비',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '유상수선 유/무'}</div>), accessor: '유상수선 유/무',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '수선처1'}</div>), accessor: '수선처1',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '총수선비1'}</div>), accessor: '총수선비1',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '수선처접수일1'}</div>), accessor: '수선처접수일1',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '재수선1'}</div>), accessor: '재수선1',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '수선처2'}</div>), accessor: '수선처2',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '총수선비2'}</div>), accessor: '총수선비2',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '수선처접수일2'}</div>), accessor: '수선처접수일2',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '재수선2'}</div>), accessor: '재수선2',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '수선처3'}</div>), accessor: '수선처3',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '총수선비3'}</div>), accessor: '총수선비3',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '수선처접수일3'}</div>), accessor: '수선처접수일3',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '재수선3'}</div>), accessor: '재수선3',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '발송일 to M'}</div>), accessor: '발송일 to M',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '본사설명'}</div>), accessor: '본사설명',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '하자코드'}</div>), accessor: '하자코드',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '심의'}</div>), accessor: '심의',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '등록자'}</div>), accessor: '등록자',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '등록일시'}</div>), accessor: '등록일시',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '수정자'}</div>), accessor: '수정자',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '수정일시'}</div>), accessor: '수정일시',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ 'SMS'}</div>), accessor: 'SMS',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '감가반품'}</div>), accessor: '감가반품',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    
  ],[])

  const value = data.map((claim) => ({
    "서비스카드#" : claim[RECEIPT.CODE],
    "매장코드" : claim[STORE.CODE],
    "매장명":claim[STORE.NAME],
    "매장구분":STORE_CATEGORY[claim[STORE.CATEGORY]],
    "매장연락처":claim[STORE.CONTACT],
    "매장접수일":claim.receipt_date ? moment(claim.receipt_date).format("YYYY-MM-DD") : "",
    "고객":claim[CUSTOMER.NAME],
    "고객연락처":claim[CUSTOMER.CONTACT],
    "시즌":claim[PRODUCT.SEASON],
    "스타일":claim[PRODUCT.STYLE],
    "컬러":claim[PRODUCT.COLOR],
    "사이즈":claim[PRODUCT.SIZE], 
    "판매가":claim[PRODUCT.TAG_PRICE] ? numberWithCommas(claim[PRODUCT.TAG_PRICE]): "",
    //"매장처리여부" : "",
    "클레임가구분" : claim.claim_text ? numberWithCommas(claim.claim_text) : "",
    "클레임가" : claim[RECEIPT.CLAIM_PRICE] ? numberWithCommas(claim[RECEIPT.CLAIM_PRICE]): "",
    "업체처리여부" : "",
    "클레임업체" : "",
    "업체코드" : "",
    "업체코드(유통)" : "",
    "고객ID":claim[CUSTOMER.ID],
    "고객요구":RECEIPT_TYPE[claim[RECEIPT.TYPE]],
    "매장접수내용":claim[RECEIPT.STORE_MESSAGE],
    "본사접수일" : claim[RECEIPT.REGISTER_DATE] ? moment(claim[RECEIPT.REGISTER_DATE]).format("YYYY-MM-DD") : "",
    "발송일 to S" : claim[RECEIPT.COMPLETE_DATE] ? moment(claim[RECEIPT.COMPLETE_DATE]).format("YYYY-MM-DD") : "",
    "과실구분" : claim[RECEIPT.FAULT_NAME],
    "내용분석":claim[RECEIPT.ANALYSIS_NAME],
    "판정결과":claim[RECEIPT.RESULT_NAME],
    "수선미입고" : claim[RECEIPT.RESULT_DETAIL_NAME],
    "유상수선비" : claim.fee ? numberWithCommas(claim.fee):"",
    "유상수선 유/무" : (claim.paid > 0) ? "유" : "무",
    "수선처1": claim.repair1_store_name ?  claim.repair1_store_name : "",
    "총수선비1": claim.repair1_repair1_price ?  numberWithCommas(claim.repair1_repair1_price + claim.repair1_repair2_price + claim.repair1_repair3_price ) : "",

    "수선처접수일1": claim.repair1_register_date ? moment(claim.repair1_register_date).format("YYYY-MM-DD") : "",
    "재수선1": (claim.repair1_repair1_redo > 0 || claim.repair1_repair2_redo > 0 || claim.repair1_repair3_redo > 0) ? ("Y") : ("N"),
    "수선처2":  claim.repair2_store_name ?  claim.repair2_store_name : "",
    "총수선비2":  claim.repair2_repair1_price ?  numberWithCommas(claim.repair2_repair1_price + claim.repair2_repair2_price + claim.repair2_repair3_price ) : "",
    "수선처접수일2": claim.repair2_register_date ? moment(claim.repair2_register_date).format("YYYY-MM-DD") : "",
    "재수선2": (claim.repair2_repair1_redo > 0 || claim.repair2_repair2_redo > 0 || claim.repair2_repair3_redo > 0) ? ("Y") : ("N"),
    "수선처3":  claim.repair3_store_name ?  claim.repair3_store_name : "",
    "총수선비3":  claim.repair3_repair1_price ?  numberWithCommas(claim.repair3_repair1_price + claim.repair3_repair2_price + claim.repair3_repair3_price ) : "",
    "수선처접수일3": claim.repair3_register_date ? moment(claim.repair3_register_date).format("YYYY-MM-DD") : "",
    "재수선3": (claim.repair3_repair1_redo > 0 || claim.repair3_repair2_redo > 0 || claim.repair3_repair3_redo > 0) ? ("Y") : ("N"),
    '발송일toM':claim[RECEIPT.MANUFACTURER_DETAIL.SEND_DATE] ? moment(claim[RECEIPT.MANUFACTURER_DETAIL.SEND_DATE]).format("YYYY-MM-DD") : "",
    "본사설명" :claim[RECEIPT.MESSAGE] ? claim[RECEIPT.MESSAGE] : "",
    "하자코드" : "",
    "심의" : (claim[RECEIPT.TYPE] == 2) ? ("심의") : (""),
    "등록자" : "",
    "등록일시" : "",
    "수정자" : "",
    "수정일시" : "",
    "SMS" : "",
    "감가반품" : "",    

  }));


  return (    
    <Wrapper>
      <Styles>
        <Table columns={columns} data={value}/>
      </Styles>
    </Wrapper>
  );
};
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

const Wrapper = styled.div`
  height: calc(92% - 25px);//50%
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

export default ReturnList;
