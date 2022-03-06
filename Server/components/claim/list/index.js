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
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
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
  console.log(store.getState().selected_data)

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

  const columns = React.useMemo(() => [

    // 단순 조회 기능 -> Check Box 필요 없을 듯?
    // {Header: '선택', accessor: '선택'},

    {Header: '서비스카드 번호', accessor: '서비스카드 번호'},
    {Header: '매장코드', accessor: '매장코드'},
    {Header: '매장명', accessor: '매장명'},
    {Header: '매장구분', accessor: '매장구분'},
    {Header: '매장연락처', accessor: '매장연락처'},
    {Header: '등록일', accessor: '등록일'},
    {Header: '고객', accessor: '고객'},
    {Header: '고객연락처', accessor: '고객연락처'},
    {Header: '시즌', accessor: '시즌'},
    {Header: '스타일', accessor: '스타일'},
    {Header: '컬러', accessor: '컬러'},
    {Header: '사이즈', accessor: '사이즈'},
    {Header: '판매가', accessor: '판매가'},
    {Header: '매장처리여부', accessor: '매장처리여부'},
    {Header: '클레임가구분', accessor: '클레임가구분'},
    {Header: '클레임가', accessor: '클레임가'},  
    {Header: '업체처리여부', accessor: '업체처리여부'},
    {Header: '클레임업체', accessor: '클레임업체'},
    {Header: '업체코드', accessor: '업체코드'},
    {Header: '업체코드(유통)', accessor: '업체코드(유통)'},
    {Header: '고객ID', accessor: '고객ID'},
    {Header: '고객요구', accessor: '고객요구'},
    {Header: '매장접수내용', accessor: '매장접수내용'},
    {Header: '내용분석', accessor: '내용분석'},
    {Header: '판정결과', accessor: '판정결과'},

  ],[])

  const value = data.map((claim) => ({
    "서비스카드 번호":claim[RECEIPT.CODE],
    "매장코드":claim[STORE.CODE],
    "매장명":claim[STORE.NAME],
    "매장구분":STORE_CATEGORY[claim[STORE.CATEGORY]],
    "매장연락처":claim[STORE.CONTACT],
    "등록일":"?",
    "고객":claim[CUSTOMER.NAME],
    "고객연락처":claim[CUSTOMER.CONTACT],
    "시즌":claim[PRODUCT.SEASON],
    "스타일":claim[PRODUCT.STYLE],
    "컬러":claim[PRODUCT.COLOR],
    "사이즈":claim[PRODUCT.SIZE], 
    "판매가":claim[PRODUCT.PRICE],
    "매장처리여부":"",
    "클레임가구분":"",
    "클레임가":"",
    "업체처리여부":"",
    "클레임업체":"",
    "업체코드":"",
    "업체코드":"",
    "고객ID":claim[CUSTOMER.ID],
    "고객요구":RECEIPT_TYPE[claim[RECEIPT.TYPE]],
    "매장접수내용":claim[RECEIPT.STORE_MESSAGE],
    "내용분석":claim[RECEIPT.ANALYSIS_NAME],
    "판정결과":claim[RECEIPT.RESULT_NAME],
  }));


  return (    
    <Wrapper>
      <Styles>
        <Table columns={columns} data={value}/>
      </Styles>
    </Wrapper>
  );
};

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

const Wrapper = styled.div`
  height: 50%;
  width: 100%;
  overflow: scroll;
  border-bottom: 2px solid;
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
