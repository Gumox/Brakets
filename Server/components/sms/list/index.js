import React from 'react'
import styled from 'styled-components'
import {
  useTable,useBlockLayout,
  useResizeColumns,
  useFlexLayout,
  useRowSelect,
} from 'react-table'
import store from '../../../store/store';
import COLOR from '../../../constants/color';

const Wrapper = styled.div`
  height: calc(95% - 15px);
  width: 50%;
  max-width:680px;
  border-bottom: 2px solid;
  border-right: 1px solid;

  overflow-y: scroll;
      min-height: 598px;
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
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
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


const StickyStyles = styled.div`
  background-color:${COLOR.WHITE};
  border-top:1px solid;
  
`
const headerProps = (props, { column }) => getStyles(props, column.align)

const cellProps = (props, { cell }) => getStyles(props, cell.column.align)

const getStyles = (props, align = 'left') => [
  props,
  {
    style: {
      justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
      alignItems: 'flex-start',
      display: 'flex',
    },
  },
]

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
IndeterminateCheckbox.displayName = "IndeterminateCheckbox";
function Table({ columns, data }) {
  const defaultColumn = React.useMemo(
    () => ({
      // When using the useFlexLayout:
      minWidth: 50, // minWidth is only used as a limit for resizing
      width: 150, // width is used for both the flex-basis and flex-grow
      maxWidth: 200, // maxWidth is only used as a limit for resizing
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
      hooks.allColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          disableResizing: true,
          minWidth: 20,
          width: 30,
          // maxWidth: 35,
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
      hooks.useInstanceBeforeDimensions.push(({ headerGroups }) => {
        // fix the parent group of the selection button to not be resizable
        const selectionGroupHeader = headerGroups[0].headers[0]
        selectionGroupHeader.canResize = false
      })
    }
  )

  const phoneNum = selectedFlatRows.map(value => value.values["전화번호"]);
  store.dispatch({type:"PHONE_NUM", phone_num: phoneNum});

  return (
    <>
      <div {...getTableProps()} className="table">
        
        <div style={{top:0,position:"sticky",zIndex:10}}>
          {headerGroups.map((headerGroup, i) => (
            <StickyStyles key={i}{...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, j) => (
                <div key={j} {...column.getHeaderProps()} className="th">
                  {column.render('Header')}
                  {/* Use column.getResizerProps to hook up the events correctly */}
                  
                </div>
              ))}
            </StickyStyles>
          ))}
        </div>
                  
          
        {rows.map((row,i) => {
            prepareRow(row)
            return (
              <div  key={i}{...row.getRowProps(
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
                        style: {
                          color: row.isSelected ? 'red' : '',
                          background: '#ebe8e8' 
                        }
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
    </>
  )
}

function ReturnList({ data }) {
  const columns = React.useMemo(() => [
    { Header: () => (<div style={{textAlign:"center"}}>{'No'}</div>), accessor: 'No', width: 50,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    { Header: () => (<div style={{textAlign:"center"}}>{ '이름'}</div>), accessor: '이름', width: 100 ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    { Header: () => (<div style={{textAlign:"center"}}>{ '전화번호'}</div>), accessor: '전화번호' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    { Header: () => (<div style={{textAlign:"center"}}>{ '매장코드'}</div>), accessor: '매장코드' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
    { Header: () => (<div style={{textAlign:"center"}}>{ '매장명'}</div>), accessor: '매장명' ,Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
  ], [])

  // const rows = data.map((productReturn, i) => ({
  //   "No": i + 1,
  //   "이름": productReturn[CUSTOMER.NAME],
  //   "전화번호": productReturn[CUSTOMER.CONTACT],
  //   "매장코드": productReturn[STORE.CODE],
  //   "매장명": productReturn[STORE.NAME],

  //   "No": i + 1,
  //   "이름": productReturn[CUSTOMER.NAME],
  //   "전화번호": productReturn[CUSTOMER.CONTACT],
  //   "매장코드": productReturn[STORE.CODE],
  //   "매장명": productReturn[STORE.NAME],
  // }))
  const sendSms =store.getState().send_sms_data;
  const rows = sendSms.map((v, i) => (
    {
    "No": i + 1,
    "이름": v.customer_name,
    "전화번호": v.customer_phone,
    "매장코드": v.store_code,
    "매장명": v.store_name,
  }));

  return (
    <Wrapper>
      <Styles>
        <Table columns={columns} data={rows} />
      </Styles>
    </Wrapper>

  )
}

export default ReturnList
