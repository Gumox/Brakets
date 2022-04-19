import React, { useMemo } from 'react';
import styled from 'styled-components';
import moment from "moment";
import COLOR from '../../constants/color';

import { useTable, useBlockLayout, useResizeColumns } from 'react-table';
import { RECEIPT, CUSTOMER, STORE, PRODUCT } from "../../constants/field";
import {
    STORE_CATEGORY,
    RECEIPT_CATEGORY_TYPE,
    RECEIPT_TYPE,
    TRANSPORT_TYPE,
    SHIPPING_TYPE,
  } from "../../constants/type";

function TableRow({children,backgroundColor}){
    
    return(
        <TableRowDiv style={{backgroundColor:backgroundColor}}>
            {children}
        </TableRowDiv>
    )

}

function Table({ columns, data, searchList, getTargetData ,targetData}) {

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
                <div style={{position:"sticky",top:0,zIndex:10}}>
                <CustomTr>
                    {headerGroups.map((headerGroup,i) => (
                        <div key={i}{...headerGroup.getHeaderGroupProps()} >
                            {headerGroup.headers.map((column,j) => (
                                <div key={j} {...column.getHeaderProps()} className="thr">
                                    {column.render('Header')}
                                </div>
                            ))}
                        </div>
                    ))}
                </CustomTr>
            </div>

                    <div {...getTableBodyProps()}>
                        {rows.map((row, i) => {
                            prepareRow(row)
                            let bgColor = COLOR.WHITE
                            if(targetData["receipt_code"] === row.original["서비스카드 #"]){
                                bgColor = COLOR.MENU_SELECTED_COLOR
                            }
                            return (
                                <TableRow key={i} backgroundColor={bgColor} >
                                    
                                    <div key={i} {...row.getRowProps(
                                        {
                                            // TODO
                                            onClick: () => {
                                                getTargetData(row.original["서비스카드 #"])
                                            }
                                            
                                        }
                                    )} className="tr">
                                        {row.cells.map((cell,j) => {
                                            return (
                                                <div key={j} {...cell.getCellProps(
                                                    // {
                                                    //     style: {color: 'red'}
                                                    // }
                                                )} className="td">
                                                    {cell.render('Cell')}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </TableRow>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

const ResizableList = ({ searchList, getTargetData = () => {}, targetData }) => {
    const numberWithCommas = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const columns = React.useMemo(() => [

        //ASIS
        {Header: () => (<div style={{textAlign:"center"}}>{'서비스카드 #'}</div>),  accessor: '서비스카드 #',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'매장코드'}</div>), accessor: '매장코드',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'매장명'}</div>),   accessor: '매장명',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'매장구분'}</div>), accessor: '매장구분',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'매장연락처'}</div>), accessor: '매장연락처',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'매장접수일'}</div>), accessor: '매장접수일',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'고객ID'}</div>), accessor: '고객ID',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{ '접수구분'}</div>), accessor: '접수구분',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'고객'}</div>), accessor: '고객',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'고객연락처'}</div>), accessor: '고객연락처',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'시즌'}</div>), accessor: '시즌',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'스타일'}</div>), accessor: '스타일',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'차수'}</div>), accessor: '차수',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'컬러'}</div>), accessor: '컬러',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'사이즈'}</div>), accessor: '사이즈',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'판매가'}</div>), accessor: '판매가',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'고객요구'}</div>), accessor: '고객요구',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'매장접수내용'}</div>), accessor: '매장접수내용',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'고객약속일'}</div>), accessor: '고객약속일',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'본사접수일'}</div>), accessor: '본사접수일',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'발송일toS'}</div>), accessor: '발송일toS',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'과실구분'}</div>), accessor: '과실구분',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'내용분석'}</div>), accessor: '내용분석',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'판정결과'}</div>), accessor: '판정결과',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},

        // TOBE
        //{Header: () => (<div style={{textAlign:"center"}}>{'결과분석(수선처1)'}</div>), accessor: '결과분석(수선처1)',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'수선미입고'}</div>), accessor: '수선미입고',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'유상수선비'}</div>), accessor: '유상수선비',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'유상수선 유/무'}</div>), accessor: '유상수선 유/무',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},

        //ASIS
        {Header: () => (<div style={{textAlign:"center"}}>{'수선처1'}</div>), accessor: '수선처1',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'총수선비1'}</div>), accessor: '총수선비1',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'수선처접수일1'}</div>), accessor: '수선처접수일1',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'재수선1'}</div>), accessor: '재수선1',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'수선처2'}</div>), accessor: '수선처2',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'총수선비2'}</div>), accessor: '총수선비2',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'수선처접수일2'}</div>), accessor: '수선처접수일2',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'재수선2'}</div>), accessor: '재수선2',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'수선처3'}</div>), accessor: '수선처3',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'총수선비3'}</div>), accessor: '총수선비3',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'수선처접수일3'}</div>), accessor: '수선처접수일3',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'재수선3'}</div>), accessor: '재수선3',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'생산업체'}</div>), accessor: '생산업체',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'발송일toM'}</div>), accessor: '발송일toM',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'본사설명'}</div>), accessor: '본사설명',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},

        // TOBE
        //{Header: () => (<div style={{textAlign:"center"}}>{'고객주소'}</div>), accessor: '고객주소',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'감가반품'}</div>), accessor: '감가반품',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'클레임가 구분'}</div>), accessor: '클레임가 구분',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'클레임가'}</div>), accessor: '클레임가',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'하자코드'}</div>), accessor: '하자코드',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'심의'}</div>), accessor: '심의',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        /*{Header: () => (<div style={{textAlign:"center"}}>{'등록자'}</div>), accessor: '등록자',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'등록일시'}</div>), accessor: '등록일시',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'접수자'}</div>), accessor: '접수자',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'접수일시'}</div>), accessor: '접수일시',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'처리자'}</div>), accessor: '처리자',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'처리일시'}</div>), accessor: '처리일시',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},*/
        {Header: () => (<div style={{textAlign:"center"}}>{'SMS'}</div>), accessor: 'SMS',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        
        // ASIS
        {Header: () => (<div style={{textAlign:"center"}}>{'현금연수증번호'}</div>), accessor: '현금연수증번호',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'수선처설명1'}</div>), accessor: '수선처설명1',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'운송형태1'}</div>), accessor: '운송형태1',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'발송방법1'}</div>), accessor: '발송방법1',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'발송비용1'}</div>), accessor: '발송비용1',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'수선처설명2'}</div>), accessor: '수선처설명2',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'운송형태2'}</div>), accessor: '운송형태2',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'발송방법2'}</div>), accessor: '발송방법2',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'발송비용2'}</div>), accessor: '발송비용2',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'수선처설명3'}</div>), accessor: '수선처설명3',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'운송형태3'}</div>), accessor: '운송형태3',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'발송방법3'}</div>), accessor: '발송방법3',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        {Header: () => (<div style={{textAlign:"center"}}>{'발송비용3'}</div>), accessor: '발송비용3',Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>},
        ],[])

    const data = searchList.map((receipt) =>(

        {
            '서비스카드 #':receipt[RECEIPT.CODE] ? receipt[RECEIPT.CODE] : "" ,
            '매장코드':receipt[STORE.CODE] ? receipt[STORE.CODE] : "",
            '매장명':receipt[STORE.STORE_NAME] ? receipt[STORE.STORE_NAME] : "",
            '매장구분':STORE_CATEGORY[receipt[STORE.CATEGORY]] ? STORE_CATEGORY[receipt[STORE.CATEGORY]] : "",
            '매장연락처':receipt[STORE.CONTACT] ? receipt[STORE.CONTACT] : "",
            '매장접수일':receipt[RECEIPT.RECEIPT_DATE] ? moment(receipt[RECEIPT.RECEIPT_DATE]).format("YYYY-MM-DD") : "",
            '고객ID':receipt[CUSTOMER.ID] ? receipt[CUSTOMER.ID] : "",
            '접수구분':RECEIPT_CATEGORY_TYPE[receipt[RECEIPT.CATEGORY]] ? RECEIPT_CATEGORY_TYPE[receipt[RECEIPT.CATEGORY]] : "",
            '고객':receipt[CUSTOMER.NAME] ? receipt[CUSTOMER.NAME] : "",
            '고객연락처':receipt[CUSTOMER.CONTACT] ? receipt[CUSTOMER.CONTACT] : "",
            '시즌':receipt[PRODUCT.SEASON] ? receipt[PRODUCT.SEASON] : "",
            '스타일':receipt[PRODUCT.STYLE] ? receipt[PRODUCT.STYLE] : "",
            '차수':receipt[PRODUCT.DEGREE] ? receipt[PRODUCT.DEGREE] : "",
            '컬러':receipt[PRODUCT.COLOR] ? receipt[PRODUCT.COLOR] : "",
            '사이즈':receipt[PRODUCT.SIZE] ? receipt[PRODUCT.SIZE] : "",
            '판매가':receipt[PRODUCT.TAG_PRICE] ? numberWithCommas(receipt[PRODUCT.TAG_PRICE]) : "",
            '고객요구':RECEIPT_TYPE[receipt[RECEIPT.TYPE]] ? RECEIPT_TYPE[receipt[RECEIPT.TYPE]] : "",
            '매장접수내용':receipt[RECEIPT.STORE_MESSAGE] ? receipt[RECEIPT.STORE_MESSAGE] : "",
            '고객약속일':receipt[RECEIPT.DUE_DATE] ? moment(receipt[RECEIPT.DUE_DATE]).format("YYYY-MM-DD") : "",
            '본사접수일':receipt[RECEIPT.REGISTER_DATE] ? moment(receipt[RECEIPT.REGISTER_DATE]).format("YYYY-MM-DD") : "",
            '발송일toS':receipt[RECEIPT.COMPLETE_DATE] ? moment(receipt[RECEIPT.COMPLETE_DATE]).format("YYYY-MM-DD") : "",
            '과실구분':receipt[RECEIPT.FAULT_NAME] ? receipt[RECEIPT.FAULT_NAME] : "",
            '내용분석':receipt[RECEIPT.ANALYSIS_NAME] ? receipt[RECEIPT.ANALYSIS_NAME] : "",
            '판정결과':receipt[RECEIPT.RESULT_NAME] ? receipt[RECEIPT.RESULT_NAME] : "",

            "유상수선비" : receipt.fee ? numberWithCommas(receipt.fee) : "",
            "유상수선 유/무" : (receipt.paid == 1) ? "유" : "무",

            '수선처1':receipt.repair1_store_name ? receipt.repair1_store_name : "",
            '총수선비1':receipt.repair1_total ? numberWithCommas(receipt.repair1_total) : "",
            '수선처접수일1': receipt.repair1_register_date ? moment(receipt.repair1_register_date).format("YYYY-MM-DD") : "",
            '재수선1':receipt.repair1_repair1_redo === 1 ? "Y" : "N",
            '수선처2':receipt.repair2_store_name ? receipt.repair2_store_name : "",
            '총수선비2':receipt.repair2_total ? numberWithCommas(receipt.repair2_total) : "",
            '수선처접수일2':receipt.repair2_register_date ? moment(receipt.repair2_register_date).format("YYYY-MM-DD") : "",
            '재수선2':receipt.repair2_repair1_redo === 1 ? "Y" : "N",
            '수선처3':receipt.repair3_store_name ? receipt.repair3_store_name : "",
            '총수선비3':receipt.repair3_total ? numberWithCommas(receipt.repair3_total) : "",
            '수선처접수일3': receipt.repair3_register_date ? moment(receipt.repair3_register_date).format("YYYY-MM-DD") : "",
            '재수선3':receipt.repair3_repair1_redo === 1 ? "Y" : "N",
            '생산업체':receipt[RECEIPT.MANUFACTURER_NAME] ? receipt[RECEIPT.MANUFACTURER_NAME] : "",
            '발송일toM':receipt[RECEIPT.MANUFACTURER_DETAIL.SEND_DATE] ? moment(receipt[RECEIPT.MANUFACTURER_DETAIL.SEND_DATE]).format("YYYY-MM-DD") : "",
            
            //'감가반품':receipt[RECEIPT.MESSAGE] ? receipt[RECEIPT.MESSAGE] : "",
            '클레임가 구분':receipt.claim_text ? receipt.claim_text : "",
            '클레임가':receipt[RECEIPT.CLAIM_PRICE] ? numberWithCommas(receipt[RECEIPT.CLAIM_PRICE]) : "",

            '본사설명':receipt[RECEIPT.MESSAGE] ? receipt[RECEIPT.MESSAGE] : "",
            '현금연수증번호':receipt[RECEIPT.CASHRECEIPT_NUM] ? receipt[RECEIPT.CASHRECEIPT_NUM] : "",
            '수선처설명1':receipt.repair1_message ? receipt.repair1_message : "",
            '운송형태1':TRANSPORT_TYPE[receipt.repair1_delivery_type] ? TRANSPORT_TYPE[receipt.repair1_delivery_type] : "",
            '발송방법1':SHIPPING_TYPE[receipt.repair1_shipment_type] ? SHIPPING_TYPE[receipt.repair1_shipment_type] : "",
            '발송비용1':receipt.repair1_shipment_price ? numberWithCommas(receipt.repair1_shipment_price) : "",
            '수선처설명2':receipt.repair2_message ? receipt.repair2_message : "",
            '운송형태2':TRANSPORT_TYPE[receipt.repair2_delivery_type] ? TRANSPORT_TYPE[receipt.repair2_delivery_type] : "",
            '발송방법2':SHIPPING_TYPE[receipt.repair2_shipment_type] ? SHIPPING_TYPE[receipt.repair2_shipment_type] : "",
            '발송비용2':receipt.repair2_shipment_price ? numberWithCommas(receipt.repair2_shipment_price) : "",
            '수선처설명3':receipt.repair3_message ? receipt.repair3_message : "",
            '운송형태3':TRANSPORT_TYPE[receipt.repair3_delivery_type] ? TRANSPORT_TYPE[receipt.repair3_delivery_type] : "",
            '발송방법3':SHIPPING_TYPE[receipt.repair3_shipment_type] ? SHIPPING_TYPE[receipt.repair3_shipment_type] : "",
            '발송비용3':receipt.repair3_shipment_price ? numberWithCommas(receipt.repair3_shipment_price) : "",            
        }
    ))
    
    return (
        <Wrapper>
            
            <Styles>
           
                <Table columns={columns} data={data} searchList={searchList} getTargetData={getTargetData} targetData={targetData}/>
            </Styles>
        </Wrapper>

    )
};

export default ResizableList;

const Wrapper = styled.nav`
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  height: 35%;
  width: 100%;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 8px;
    height: 10px;
    background: rgba(210, 210, 210, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(96, 96, 96, 0.7);
    border-radius: 6px;
}`;

const TableRowDiv = styled.div`
    cursor: pointer;
    border-left:1px solid;
    border-bottom:1px solid;
    z-index: 1;

    &:hover {
    color:${COLOR.BLUE}
    }
}`;
const CustomTr=styled.div`

padding-top: 5px;
display: inline-block;
background-color:${COLOR.WHITE};
opacity:1;
z-index:10;
  .thr{
      
    padding-top: 1rem;
    padding-bottom: 1rem;
    border: 1px solid black;
    border-right: 0;
    background-color:${COLOR.MENU_MAIN};
    :last-child {
        border-right: 1px solid black;
        
      }
  },
`

const Styles = styled.div`
  padding: 1rem;

  .table {
    display: inline-block;
    border-spacing: 0;

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
      }

      
    }
  }
`