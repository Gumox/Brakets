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
IndeterminateCheckbox.displayName = "return/list";

function Table({ columns, data, handleDataClick }) {

  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 100,
      width: 175,
      // maxWidth: 150,
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
  const seriveCode = selectedFlatRows.map(value => value.values["서비스카드 번호"]);

  return (

    <>
      <div>
        <div {...getTableProps()} className="table">
          <div>
            {headerGroups.map((headerGroup, i) => (
              <div key={i}{...headerGroup.getHeaderGroupProps()} className="tr">
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
                      // handleDataClick(row.original["서비스카드 번호"])
                      rows[row.id].toggleRowSelected()
                    )
                  }
                )} className="tr">
                  {console.log('row is')}
                  {console.log(row)}
                  {row.cells.map((cell, j) => {
                    return (
                      <div key={j} {...cell.getCellProps(
                        {
                          style: { 
                            color: row.original["전표 발행 여부"] == "전표미발행" ? 'red' : '#ffa203',
                            background: '#ebe8e8' 
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
    </>
  )
}

const ReturnList = ({ data, user, handleDataClick = () => { } }) => {

  console.log("asdad");
  console.log(user);

  const columns = React.useMemo(() => [
    {Header: 'No',   accessor: 'No'},

    { Header: 'MSGKEY', accessor: 'mid' },
    { Header: '전송시각', accessor: 'send_date' },
    { Header: '제목', accessor: '제목' },
    { Header: '수신자', accessor: '수신자' },
    { Header: '수신번호', accessor: '수신번호' },
    { Header: '내용', accessor: 'msg' },
    { Header: '발신번호', accessor: '발신번호' },
    { Header: '발신자', accessor: 'staff_code' },
    { Header: 'TCS코드', accessor: 'TCS코드' },
    { Header: 'TCS내용', accessor: 'sms_result_message' },

  ], [])


  // console.log(rows)

  return (
    <Wrapper>
      <Styles>
        <Table columns={columns} data={[]} handleDataClick={handleDataClick} />
        <div>3</div>
      </Styles>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 50%;
  width: 100%;
  overflow: scroll;
  border-bottom: 2px solid;
  border-right: 1px solid;
`;

const Styles = styled.div`
  /* padding: 1rem; */
  height: 100%;
  width: 100%;
  border: 1px black;

  .table {
    /* width: 100%; */
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
      border-bottom: 1px solid black;/
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
