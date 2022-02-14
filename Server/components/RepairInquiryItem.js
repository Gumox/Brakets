import React from "react";
import { useRouter } from "next/dist/client/router";
import styled from "styled-components";

import COLOR from "../constants/color";

const RepairInquiryItem = ({props}) => {
  
  return (
    <LaView><Container>
        <ItemView>서비스 번호</ItemView>
        <ItemView>매장접수일</ItemView>
        <ItemView>매장명</ItemView>
        <ItemView>브랜드</ItemView>
        <ItemView>시즌</ItemView>
        <ItemView>스타일</ItemView>
        <ItemView>컬러</ItemView>
        <ItemView>사이즈</ItemView>
        <ItemView>과실구분</ItemView>
        <ItemView>내용분석</ItemView>
        <ItemView>판정결과</ItemView>
        <ItemView>수선처</ItemView>
        <ItemView>수선처 접수일</ItemView>
        <ItemView>수선처발송일</ItemView>
        <ItemView>수선내용 1</ItemView>
        <ItemView>수선내용 2</ItemView>
        <ItemView>수선내용 3</ItemView>
        <ItemView>매장접수 내용</ItemView>
    </Container></LaView>
  )
};
const LaView = styled.div`
  padding:10px;
  display: flex;  
  align-items:center;

`;
const ItemView = styled.div`
  font-size :12px;
  min-height: 20px;
  width :100px;
  display: flex;  
  justify-content:center
  `;
const Container = styled.div`
    display:flex; 
    min-height: 20px;
    align-items: flex-start;
`;


export default RepairInquiryItem;
