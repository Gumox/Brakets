import React,{useMemo} from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
const Styles = styled.div`
  padding: 1rem;
  
  table {
    border-spacing: 0;
    border: 0px solid black;

    tr {
      :first-child {
        td {
          border-top: 1px solid black;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 0px solid #000000;
      border-right: 0px solid #000000;
      min-width:100px;
      :last-child {
        border-right: 0;
      }
    }
  }
`

function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({
      columns,
      data,
    })
  
    // Render the UI for your table
    return (
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
function InquiryTable( props ) {
    console.log(props)
    const columnData = [
        {
            accessor: 'receipt_code',
            Header: '서비스번호',
            Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
        },
        {
            accessor: 'receipt_date',
            Header: '매장접수일',
            Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
        },
        {
            accessor: 'store_name',
            Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>,
            Header: '매장명',
        },
        {
            accessor: 'brand_name',
            Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>,
            Header: '브랜드',
        },
        {
            accessor: 'season_name',
            Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>,
            Header: '시즌',
        },
        {
            accessor: 'style_code',
            Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>,
            Header: '스타일',
        },
        {
            accessor: 'color',
            Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>,
            Header: '컬러',
        },
        {
            accessor: 'size',
            Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>,
            Header: '사이즈',
        },
        {
            accessor: 'fault',
            Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>,
            Header: '과실구분',
        },
        {
            accessor: 'analysis',
            Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>,
            Header: '내용분석',
        },
        {
            accessor: 'result',
            Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>,
            Header: '판정결과',
        },
        /*{
            accessor: 'edited_at',
            Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>,
            Header: '수선처',
        },
        {
            accessor: 'edited_at',
            Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>,
            Header: '수선처 접수일',
        },
        {
            accessor: 'edited_at',
            Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>,
            Header: '수선처발송일',
        },*/
        {
            accessor: 'repair1_name',
            Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>,
            Header: '수선내용1',
        },
        {
            accessor: 'repair_detail_repair1_price',
            Cell: row => <div style={{ textAlign: "right",marginRight:15 }}>{row.value}</div>,
            Header: '수선비용1',
        },
        {
            accessor: 'repair2_name',
            Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>,
            Header: '수선내용2',
        },
        {
            accessor: 'repair_detail_repair2_price',
            Cell: row => <div style={{ textAlign: "right",marginRight:15 }}>{row.value}</div>,
            Header: '수선비용2',
        },
        {
            accessor: 'repair3_name',
            Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>,
            Header: '수선내용3',
        },
        {
            accessor: 'repair_detail_repair_detail_id',
            Cell: row => <div style={{ textAlign: "right",marginRight:15 }}>{row.value}</div>,
            Header: '수선비용3',
        },
        {
            accessor: 'store_message',
            Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>,
            Header: '매장접수 내용',
        },
  ]
  
    const columns = useMemo(() => columnData, []);
    const data = props.data;
    
    
      return (
        <Styles>
          <Table columns={columns} data={data} />
        </Styles>
      )
}

export default InquiryTable