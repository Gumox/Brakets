import React, { useMemo } from 'react';
import styled from 'styled-components';
import moment from "moment";

import { useTable, useBlockLayout, useResizeColumns } from 'react-table';
import { RECEIPT, CUSTOMER, STORE, PRODUCT } from "../../constants/field";
import {
    STORE_CATEGORY,
    RECEIPT_CATEGORY_TYPE,
    RECEIPT_TYPE,
    TRANSPORT_TYPE,
    SHIPPING_TYPE,
  } from "../../constants/type";


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
                                    {onClick: () => (getTargetData(row.original["서비스카드 번호"]))}
                                )} className="tr">
                                    {row.cells.map((cell,j) => {
                                        return (
                                            <div key={j} {...cell.getCellProps()} className="td">
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

const ResizableList = ({ searchList, getTargetData = () => {} }) => {

    console.log(`search list is ${searchList}`)

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
        {Header: '발송일toM', accessor: '발송일toM',},
        {Header: '본사설명', accessor: '본사설명',},
        {Header: '현금연수증번호', accessor: '현금연수증번호',},
        {Header: '수선처설명1', accessor: '수선처설명1',},
        {Header: '운송형태1', accessor: '운송형태1',},
        {Header: '발송방법1', accessor: '발송방법1',},
        {Header: '발송비용1', accessor: '발송비용1',},
        {Header: '수선처설명2', accessor: '수선처설명2',},
        {Header: '운송형태2', accessor: '운송형태2',},
        {Header: '발송방법2', accessor: '발송방법2',},
        {Header: '발송비용2', accessor: '발송비용2',},
        {Header: '수선처설명3', accessor: '수선처설명3',},
        {Header: '운송형태3', accessor: '운송형태3',},
        {Header: '발송방법3', accessor: '발송방법3',},
        {Header: '발송비용3', accessor: '발송비용3',},
        ],[])

    const data = searchList.map((receipt) =>(

        {
        '서비스카드 번호':receipt[RECEIPT.CODE],
        '매장코드':receipt[STORE.CODE],
        '매장명':receipt[STORE.NAME],
        '매장구분':STORE_CATEGORY[receipt[STORE.CATEGORY]],
        '매장연락처':receipt[STORE.CONTACT],
        '매장접수일':receipt[RECEIPT.RECEIPT_DATE] ? moment(receipt[RECEIPT.RECEIPT_DATE]).format("YYYY-MM-DD") : "",
        '고객ID':receipt[CUSTOMER.ID],
        '접수구분':RECEIPT_CATEGORY_TYPE[receipt[RECEIPT.CATEGORY]],
        '고객':receipt[CUSTOMER.NAME],
        '고객연락처':receipt[CUSTOMER.CONTACT],
        '시즌':receipt[PRODUCT.SEASON],
        '스타일':receipt[PRODUCT.STYLE],
        '차수':receipt[PRODUCT.DEGREE],
        '컬러':receipt[PRODUCT.COLOR],
        '사이즈':receipt[PRODUCT.SIZE],
        '판매가':receipt[PRODUCT.PRICE],
        '고객요구':RECEIPT_TYPE[receipt[RECEIPT.TYPE]],
        '매장접수내용':receipt[RECEIPT.STORE_MESSAGE],
        '고객약속일':receipt[RECEIPT.DUE_DATE]
        ? moment(receipt[RECEIPT.DUE_DATE]).format("YYYY-MM-DD")
        : "",
        '본사접수일':receipt[RECEIPT.REGISTER_DATE]
        ? moment(receipt[RECEIPT.REGISTER_DATE]).format("YYYY-MM-DD")
        : "",
        '발송일toS':receipt[RECEIPT.COMPLETE_DATE]
        ? moment(receipt[RECEIPT.COMPLETE_DATE]).format("YYYY-MM-DD")
        : "",
        '과실구분':receipt[RECEIPT.FAULT_NAME],
        '내용분석':receipt[RECEIPT.ANALYSIS_NAME],
        '판정결과':receipt[RECEIPT.RESULT_NAME],     
        '수선처1':receipt.repair1_store_name,
        '총수선비1':receipt.repair1_total,    
        '수선처접수일1': 
        (
            receipt.repair1_register_date
        ) ? (
            moment(receipt.repair1_register_date).format("YYYY-MM-DD")
        ) : (
            ""
        ),       
        '재수선1':receipt.repair1_repair1_redo === 1 ? "Y" : "N",

        '수선처2':receipt.repair2_store_name,    
        '총수선비2':receipt.repair2_total,                
        '수선처접수일2':
        (
            receipt.repair2_register_date
        ) ? (
            moment(receipt.repair2_register_date).format("YYYY-MM-DD")
        ) : (
            ""
        ),          
        '재수선2':receipt.repair2_repair1_redo === 1 ? "Y" : "N",

        '수선처3':receipt.repair3_store_name,        
        '총수선비3':receipt.repair3_total,              
        '수선처접수일3':
        (
            receipt.repair3_register_date
        ) ? (
            moment(receipt.repair3_register_date).format("YYYY-MM-DD")
        ) : (
            ""
        ),                    
        '재수선3':receipt.repair3_repair1_redo === 1 ? "Y" : "N",

        '생산업체':receipt[RECEIPT.MANUFACTURER_NAME],
        '발송일toM':receipt[RECEIPT.MANUFACTURER_DETAIL.SEND_DATE]
        ? moment(
            receipt[RECEIPT.MANUFACTURER_DETAIL.SEND_DATE]
          ).format("YYYY-MM-DD")
        : "",
        '본사설명':receipt[RECEIPT.MESSAGE],
        '현금연수증번호':receipt[RECEIPT.CASHRECEIPT_NUM],

        '수선처설명1':receipt.repair1_message,
        '운송형태1':TRANSPORT_TYPE[receipt.repair1_delivery_type],
        '발송방법1':SHIPPING_TYPE[receipt.repair1_shipment_type],
        '발송비용1':receipt.repair1_shipment_price,

        '수선처설명2':receipt.repair2_message,
        '운송형태2':TRANSPORT_TYPE[receipt.repair2_delivery_type],
        '발송방법2':SHIPPING_TYPE[receipt.repair2_shipment_type],
        '발송비용2':receipt.repair2_shipment_price,
        
        '수선처설명3':receipt.repair3_message,
        '운송형태3':TRANSPORT_TYPE[receipt.repair3_delivery_type],
        '발송방법3':SHIPPING_TYPE[receipt.repair3_shipment_type],
        '발송비용3':receipt.repair3_shipment_price,
        }
    ))

    return (
        <Wrapper>
            <Styles>
                <Table columns={columns} data={data} searchList={searchList} getTargetData={getTargetData}/>
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