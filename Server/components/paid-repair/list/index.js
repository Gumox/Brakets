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
  console.log("-------------------------------------------------------------------")
  const seriveCode = selectedFlatRows.map(value => value.values["서비스카드 번호"]);
  

  return (
      <>
          <div>
              <div {...getTableProps(
              )} className="table">
                  <div>
                      {headerGroups.map((headerGroup,i) => (
                          <div key={i}{...headerGroup.getHeaderGroupProps()} className="tr">
                              {headerGroup.headers.map((column,j) => (
                                  <div key={j} {...column.getHeaderProps({
                                    style: {height: 50, fontSize: 13}
                                  })} className="th">
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
    
    // 단순 조회 기능 -> Check Box 필요 없을 듯?
    // {Header: '선택',  accessor: '선택',},

    // {Header: '서비스카드 번호', accessor: '서비스카드 번호',},
    // {Header: '매장코드',   accessor: '매장코드',},
    // {Header: '매장명', accessor: '매장명',},
    // {Header: '매장구분', accessor: '매장구분',},
    // {Header: '매장연락처', accessor: '매장연락처',},
    // {Header: '등록일', accessor: '등록일',},
    // {Header: '고객ID', accessor: '고객ID',},
    // {Header: '고객', accessor: '고객',},
    // {Header: '고객연락처', accessor: '고객연락처',},
    // {Header: '시즌', accessor: '시즌',},
    // {Header: '스타일', accessor: '스타일',},
    // {Header: '컬러', accessor: '컬러',},
    // {Header: '사이즈', accessor: '사이즈',},
    // {Header: '판매가', accessor: '판매가',},
    // {Header: '고객요구', accessor: '고객요구',},
    // {Header: '매장접수내용', accessor: '매장접수내용',},
    // {Header: '과실구분', accessor: '과실구분',},
    // {Header: '고객약속일', accessor: '고객약속일',},  
    // {Header: '본사접수일', accessor: '본사접수일',},
    // {Header: '내용분석', accessor: '내용분석',},
    // {Header: '판정결과', accessor: '판정결과',},

    {Header: '서비스카드 번호', accessor: '서비스카드 번호',},
    {Header: '매장코드', accessor: '매장코드',},
    {Header: '매장명', accessor: '매장명',},
    {Header: '매장구분', accessor: '매장구분',},
    {Header: '매장 연락처', accessor: '매장 연락처',},
    {Header: '등록일', accessor: '등록일',},
    {Header: '고객 ID', accessor: '고객 ID',},
    {Header: '고객 ', accessor: '고객 ',},
    {Header: '고객연락처', accessor: '고객연락처',},
    {Header: '시즌', accessor: '시즌',},
    {Header: '스타일', accessor: '스타일',},
    {Header: '컬러', accessor: '컬러',},
    {Header: '사이즈', accessor: '사이즈',},
    {Header: '판매가', accessor: '판매가',},
    {Header: '고객요구', accessor: '고객요구',},
    {Header: '매장접수내용', accessor: '매장접수내용',},
    {Header: '고객약속일', accessor: '고객약속일',},
    {Header: '본사접수일', accessor: '본사접수일',},
    {Header: '발송일 to S', accessor: '발송일 to S',},
    {Header: '과실구분', accessor: '과실구분',},
    {Header: '내용분석', accessor: '내용분석',},
    {Header: '판정결과', accessor: '판정결과',},
    {Header: '수선미입고', accessor: '수선미입고',},
    {Header: '유상수선비', accessor: '유상수선비',},
    {Header: '유상수선 유/무', accessor: '유상수선 유/무',},
    {Header: '수선처1', accessor: '수선처1',},
    {Header: '총수선비1', accessor: '총수선비1',},
    {Header: '수선처접수일1', accessor: '수선처접수일1',},
    {Header: '재수선1', accessor: '재수선1',},
    {Header: '수선처2', accessor: '수선처2',},
    {Header: '총수선비2', accessor: '총수선비2',},
    {Header: '수선처접수일2', accessor: '수선처접수일2',},
    {Header: '재수선2', accessor: '재수선2',},
    {Header: '수선처3', accessor: '수선처3',},
    {Header: '총수선비3', accessor: '총수선비3',},
    {Header: '수선처접수일3', accessor: '수선처접수일3',},
    {Header: '재수선3', accessor: '재수선3',},
    {Header: '생산업체', accessor: '생산업체',},
    {Header: '발송일 to M', accessor: '발송일 to M',},
    {Header: '본사 설명', accessor: '본사 설명',},
    {Header: '하자코드', accessor: '하자코드',},
    {Header: '심의', accessor: '심의',},
    {Header: '등록자', accessor: '등록자',},
    {Header: '등록일시', accessor: '등록일시',},
    {Header: '수정자', accessor: '수정자',},
    {Header: '수정일시', accessor: '수정일시',},
    {Header: 'SMS', accessor: 'SMS',},
    ],[])


    console.log("data is")
    console.log(data)
    const value = data.map((pairRepair) => ({
      "receipt_id":pairRepair[RECEIPT.ID],
      "서비스카드 번호":pairRepair[RECEIPT.CODE],
      "매장코드":pairRepair[STORE.CODE],
      "매장명":pairRepair[STORE.NAME],
      "매장구분":STORE_CATEGORY[pairRepair[STORE.CATEGORY]],
      "매장연락처":pairRepair[STORE.CONTACT],
      "등록일":pairRepair.receipt_date ? moment(pairRepair.receipt_date).format("YYYY-MM-DD") : "",
      "고객ID":pairRepair[CUSTOMER.ID],
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
      "본사접수일":pairRepair[RECEIPT.REGISTER_DATE]
      ? moment(pairRepair[RECEIPT.REGISTER_DATE]).format("YYYY-MM-DD")
      : "",
      "발송일 to S":pairRepair.complete_date ? moment(pairRepair.complete_date).format("YYYY-MM-DD")
      : "",
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
  /* position: absolute; */
  height: 95%;
  width: 100%;
  overflow: scroll;
  border-bottom: 2px solid;
`;



export default ReturnList;

        