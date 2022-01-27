import React,{useState} from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import RepairHeader from '../components/RepairHeader'
import styled from 'styled-components';
import COLOR from '../constants/color';
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import axios from 'axios';
import store from '../store/store';
export default function Inquiry() {
   
  
    const [selectedCompany,setSelectedCompany] = useState(null)
    const companyList = store.getState().company
    const handleSelect = (e) => {
        setSelectedCompany(e.target.value)
        console.log(selectedCompany)
    };
    return(
        <div>
            <RepairHeader/>
            <div style={{paddingLeft: "10%",paddingRight: "10%"}}>
            <h3>접수</h3><hr/>
                <Container>회사 설정 :
                <select onChange={(e)=>handleSelect(e)}  style={{marginLeft:10,marginRight: 10}} >
                    {companyList.map((item) => (
                        <option value={item.key} key={item.key}>
                        {item.name}
                    </option>
                    ))}
                </select>
                
                
            
            서비스 카드 번호 : 
                <input style={{marginLeft:15}}></input> <button 
                    style={{width:40,height:22,fontSize:12,backgroundColor : "#4f4f4f", color: COLOR.WHITE}}
                    onClick={()=>{getOptions()}}
                    >확인</button>  
                  </Container> 
                <div style={{color :"#ff0000"}}><h6>⚠️직접 입력 후 엔터를 누르거나 바코드 리더기를 이용해주세요</h6></div>
  
                조회 조건
                <br/>
                <Container>
                    수선처 : 
                    <select name="soosun"  style={{marginLeft:10,marginRight: 10}} >
                        <option value="soo">수선처1</option>
                        <option value="soos">수선처2</option>
                        <option value="soosu">수선처3</option>
                    </select>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    브랜드 : 
                    <select name="brand"  style={{marginLeft:10,marginRight: 10}} >
                        <option value="br">브랜드1</option>
                        <option value="bra">브랜드2</option>
                        <option value="bran">브랜드3</option>
                    </select>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    날짜 기준 : 
                    <select name="date_standard"  style={{marginLeft:10,marginRight: 10}} >
                        <option value="d">매장접수일</option>
                        <option value="da">수선처접수일</option>
                        <option value="dat">수선처발송일</option>
                    </select>
                    
                    <input type="date" ></input>
                    
                    <input type="date" ></input>
                </Container>
            <Line/>
            <ItemTable >
                <ContainerScroll >
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


                <LaView><Container><ItemView>서비스 번호</ItemView><ItemView>매장접수일</ItemView><ItemView>매장명</ItemView><ItemView>브랜드</ItemView></Container></LaView>
                <LaView><Container><ItemView>서비스 번호</ItemView><ItemView>매장접수일</ItemView><ItemView>매장명</ItemView><ItemView>브랜드</ItemView></Container></LaView>
                <LaView><Container><ItemView>서비스 번호</ItemView><ItemView>매장접수일</ItemView><ItemView>매장명</ItemView><ItemView>브랜드</ItemView></Container></LaView>
                <LaView><Container><ItemView>서비스 번호</ItemView><ItemView>매장접수일</ItemView><ItemView>매장명</ItemView><ItemView>브랜드</ItemView></Container></LaView>
                <LaView><Container><ItemView>서비스 번호</ItemView><ItemView>매장접수일</ItemView><ItemView>매장명</ItemView><ItemView>브랜드</ItemView></Container></LaView>
                <LaView><Container><ItemView>서비스 번호</ItemView><ItemView>매장접수일</ItemView><ItemView>매장명</ItemView><ItemView>브랜드</ItemView></Container></LaView>
                <LaView><Container><ItemView>서비스 번호</ItemView><ItemView>매장접수일</ItemView><ItemView>매장명</ItemView><ItemView>브랜드</ItemView></Container></LaView>

                </ContainerScroll>
              
              
            </ItemTable>
            </div>
        </div>
    )
}
const Line =styled.div`
  border:1px solid  ${COLOR.BRAUN};
  width :100%
  margin:2px;
  height:2px;
  margin-bottom:10px;
  margin-top:10px;
  background-color: ${COLOR.BRAUN}
`;
const ItemTable = styled.div`
  border: 2px solid  ${COLOR.BRAUN};
  min-width:100%;
  min-height:200px;

`;
const LaView = styled.div`
  padding:10px;
  display: flex;  
  align-items:center;

`;
const PrView = styled.div`
  padding:10px;
  display: flex;  
  align-items:center;

  &: hover {
    background-color: ${COLOR.BRAUN};
  }
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

const ContainerScroll = styled.div`
    margin-top:12px;
    overflow: scroll;
    maxHeight: 400px;
    maxWidth: 100%

    &::-webkit-scrollbar{
        display: none;
    }

`;

