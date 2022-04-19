import React from "react";
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
import store from "../../../store/store";
import Options from '../Options'

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
IndeterminateCheckbox.displayName = "paid-repair/list";

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
      state: {selectedRowIds},
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
  console.log("-------------------------------------------------------------------")
  const seriveCode = selectedFlatRows.map(value => value.values["서비스카드#"]);
  

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
                                  {
                                    onClick: () => (
                                                    rows[row.id].toggleRowSelected()
                                                    )
                                  }
                              )} className="tr">
                                  {row.cells.map((cell,j) => {
                                      return (
                                          <div key={j} {...cell.getCellProps(
                                            {
                                              style:{color:'green', background: '#ebe8e8'}
                                              // green
                                              // #1b590e
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

const ReturnList = ({ data, user }) => {

  const columns = React.useMemo(() => [

    {Header: () => (<div style={{textAlign:"center"}}>{ '서비스카드#'}</div>), accessor: '서비스카드#',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '매장코드'}</div>), accessor: '매장코드',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '매장명'}</div>), accessor: '매장명',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '매장구분'}</div>), accessor: '매장구분',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '매장 연락처'}</div>), accessor: '매장 연락처',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '등록일'}</div>), accessor: '등록일',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '고객 ID'}</div>), accessor: '고객 ID',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '고객'}</div>), accessor: '고객',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '고객연락처'}</div>), accessor: '고객연락처',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '시즌'}</div>), accessor: '시즌',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '스타일'}</div>), accessor: '스타일',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '컬러'}</div>), accessor: '컬러',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '사이즈'}</div>), accessor: '사이즈',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '판매가'}</div>), accessor: '판매가',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '고객요구'}</div>), accessor: '고객요구',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '매장접수내용'}</div>), accessor: '매장접수내용',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '고객약속일'}</div>), accessor: '고객약속일',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
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
    {Header: () => (<div style={{textAlign:"center"}}>{ '생산업체'}</div>), accessor: '생산업체',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '발송일 to M'}</div>), accessor: '발송일 to M',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '본사 설명'}</div>), accessor: '본사 설명',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '하자코드'}</div>), accessor: '하자코드',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '심의'}</div>), accessor: '심의',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '등록자'}</div>), accessor: '등록자',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '등록일시'}</div>), accessor: '등록일시',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '수정자'}</div>), accessor: '수정자',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ '수정일시'}</div>), accessor: '수정일시',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    {Header: () => (<div style={{textAlign:"center"}}>{ 'SMS'}</div>), accessor: 'SMS',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    ],[])


    console.log("data is")
    console.log(data)
    const value = data.map((pairRepair) => ({
      "receipt_id":pairRepair[RECEIPT.ID],
      "서비스카드#":pairRepair[RECEIPT.CODE],
      "매장코드":pairRepair[STORE.CODE],
      "매장명":pairRepair[STORE.NAME],
      "매장구분":STORE_CATEGORY[pairRepair[STORE.CATEGORY]],
      "매장 연락처":pairRepair[STORE.CONTACT],
      "등록일":pairRepair.receipt_date ? moment(pairRepair.receipt_date).format("YYYY-MM-DD") : "",
      "고객 ID":pairRepair[CUSTOMER.ID],
      "고객":pairRepair[CUSTOMER.NAME],
      "고객연락처":pairRepair[CUSTOMER.CONTACT],
      "시즌":pairRepair[PRODUCT.SEASON],
      "스타일":pairRepair[PRODUCT.STYLE],
      "컬러":pairRepair[PRODUCT.COLOR],
      "사이즈":pairRepair[PRODUCT.SIZE], 
      "판매가":pairRepair[PRODUCT.PRICE],
      "고객요구":RECEIPT_TYPE[pairRepair[RECEIPT.TYPE]],
      "매장접수내용":pairRepair[RECEIPT.STORE_MESSAGE],
      "고객약속일":pairRepair[RECEIPT.DUE_DATE]
      ? moment(pairRepair[RECEIPT.DUE_DATE]).format("YYYY-MM-DD")
      : "",
      "본사접수일":pairRepair[RECEIPT.REGISTER_DATE] ? moment(pairRepair[RECEIPT.REGISTER_DATE]).format("YYYY-MM-DD") : "",
      "발송일 to S":pairRepair.complete_date ? moment(pairRepair.complete_date).format("YYYY-MM-DD") : "",
      "과실구분":pairRepair[RECEIPT.FAULT_NAME],
      "내용분석":pairRepair[RECEIPT.ANALYSIS_NAME],
      "판정결과":pairRepair[RECEIPT.RESULT_NAME],      
      "수선미입고":pairRepair[RECEIPT.RESULT_DETAIL_NAME],
      "유상수선비":pairRepair.fee,
      "유상수선 유/무":(pairRepair.fee > 0) ? "유" : "무",
      "수선처1":"",
      "총수선비1":"",
      "수선처접수일1":"",
      "재수선1":"",
      "수선처2":"",
      "총수선비2":"",
      "수선처접수일2":"",
      "재수선2":"",
      "수선처3":"",
      "총수선비3":"",
      "수선처접수일3":"",
      "재수선3":"",
      "생산업체":pairRepair.manufacturer_name,
      "발송일 to M":"",
      "본사 설명":pairRepair.message,
      "하자코드":"",
      "심의":(pairRepair[RECEIPT.TYPE] == 2) ? ("심의") : (""),

      "등록자":"",
      "등록일시":"",
      "수정자":"",
      "수정일시":"",
      "SMS":"",
    }));

  return (
    <Wrapper>
      <Styles>
        <Table columns={columns} data={value}/>
      </Styles>
      {/**<Options user={user} /> */}
    </Wrapper>
  );
};

const Styles = styled.div`
  padding: 1rem;
  height: 80%;
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

const Wrapper = styled.nav`
  /* position: absolute; */
  height: 91%;
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
export default ReturnList;

        