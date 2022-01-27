import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useTable, useBlockLayout, useResizeColumns } from 'react-table';
import { RECEIPT, CUSTOMER, STORE, PRODUCT } from "../../constants/field";



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
                        {headerGroups.map(headerGroup => (
                            <div {...headerGroup.getHeaderGroupProps()} className="tr">
                                {headerGroup.headers.map(column => (
                                    <div {...column.getHeaderProps()} className="th">
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
                                <div {...row.getRowProps()} className="tr">
                                    {row.cells.map(cell => {
                                        return (
                                            <div {...cell.getCellProps()} className="td">
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
                <code>{JSON.stringify(state, null, 2)}</code>
            </pre> */}
        </>
    )
}

const ResizableList = ({ searchList, getTargetData = () => { } }) => {


    const columns = React.useMemo(() => [
        {Header: '서비스카드 번호',  accessor: '서비스카드 번호',},
        {Header: '매장코드', accessor: '매장코드',},
        {Header: '매장명',   accessor: '매장명',},
        {Header: '매장구분', accessor: '매장구분',},
        {Header: '매장연락처', accessor: '매장연락처',},
        {Header: '매장접수일', accessor: '매장접수일',},
        {Header: '고객ID', accessor: '고객ID',},
        {Header: '접수구분', accessor: '접수구분',},
        {Header: '고객', accessor: '고객',},
        {Header: '고객연락처', accessor: '고객연락처',},
        {Header: '시즌', accessor: '시즌',},
        {Header: '스타일', accessor: '스타일',},
        {Header: '차수', accessor: '차수',},
        {Header: '컬러', accessor: '컬러',},
        {Header: '사이즈', accessor: '사이즈',},
        {Header: '판매가', accessor: '판매가',},
        {Header: '고객요구', accessor: '고객요구',},
        {Header: '매장접수내용', accessor: '매장접수내용',},
        {Header: '고객약속일', accessor: '고객약속일',},
        {Header: '본사접수일', accessor: '본사접수일',},
        {Header: '발송일toS', accessor: '발송일toS',},
        {Header: '과실구분', accessor: '과실구분',},
        {Header: '내용분석', accessor: '내용분석',},
        {Header: '판정결과', accessor: '판정결과',},
        {Header: '수선처1', accessor: '수선처1',},
        {Header: '총수선처1', accessor: '총수선처1',},
        {Header: '수선처접수일1', accessor: '수선처접수일1',},
        {Header: '재수선1', accessor: '재수선1',},
        {Header: '수선처2', accessor: '수선처2',},
        {Header: '총수선처2', accessor: '총수선처2',},
        {Header: '수선처접수일2', accessor: '수선처접수일2',},
        {Header: '재수선2', accessor: '재수선2',},
        {Header: '수선처3', accessor: '수선처3',},
        {Header: '총수선처3', accessor: '총수선처3',},
        {Header: '수선처접수일3', accessor: '수선처접수일3',},
        {Header: '재수선3', accessor: '재수선3',},
        ],[])



    console.log("log is")
    const data = searchList.map((receipt) =>(
        {
        "서비스카드 번호":receipt[RECEIPT.CODE],
        
        }
    ))
    console.log(data)


    return (
        <Wrapper>
            <Styles>
                <Table columns={columns} data={data} />
            </Styles>
        </Wrapper>

    )
};

export default ResizableList;

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 35%;
  width: 100%;
  overflow: scroll;
`;

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
        background: black;
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