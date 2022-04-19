import React,{useState,useEffect,useCallback,useRef} from 'react';
import RepairHeader from '../components/RepairHeader'
import styled from 'styled-components';
import COLOR from '../constants/color';
import axios from 'axios';
import store from '../store/store';
import { debounce } from 'lodash';
import sortInquiryData from '../functions/sortInquiryData';
import dateOptionListcontroll from '../functions/dateOptionListcontroll';
import checkDisable from '../functions/checkDisable';
import InquiryResult from '../components/repair/InquiryResult';
import {getSelectList, getRepairType } from '../functions/useInRepairReceiptModal'; 
import {getData} from '../functions/useInInqiry';
import { getBrandList } from '../functions/useInSettlement';
import Image from 'next/image'
import { parseInquiryData } from '../functions/parseExcelData';

const XLSX = require('xlsx');

export default function Inquiry() {
   
    const [userInfo,setUserInfo] = useState({})
    const [shopId,setShopId] = useState(store.getState().shop);
    const [data,setData] = useState([]);
    const [selectedCompany,setSelectedCompany] = useState(null)
    const [brand,setBrand] = useState(null)
    const [code,setCode] = useState(null)
    const [startDate,setStartDate] = useState(null)
    const [endDate,setEndDate] = useState(null)
    const [dateOption,setDateOption] = useState("receipt_date")
    const [brandList,setBrandList] = useState([])
    const [companyList,setCompanyList] = useState(store.getState().company);
    const [disable,setDisable] = useState(true)
    const [faultInfo,setFaultInfo] = useState([])
    const [resultInfo,setResultInfo] = useState([])
    const [analysisInfo,setAnalysisInfo] = useState([])
    const [tof,setTof] = useState(false)

    let itemViewWidth;

    const [windowWidth,setWindowWidth] = useState(0)
    const [windowHeight,setWindowHeight] = useState(0)
    const handleResize = debounce(()=>{
        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
    },1000)
    
    const getExcel =(data)=>{
        const dataWS = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, dataWS, "sheet1");
        XLSX.writeFile(wb, "조회 목록.xlsx");
      }
    
    const setTable =useCallback( async(params ,fI,jI,aI) =>{
        let datas = [];
        let types = await getRepairType(null,null,shopId)
        if(params.dateOption === "receipt_date"){
            datas = await getData(params,userInfo.level)
            let sort =await sortInquiryData(datas.body,params,fI,jI,aI,types)
            setData(sort)
        }else{
            datas = await getData(params)
            let sort =await sortInquiryData(datas.body,params,fI,jI,aI,types)
            let result  =dateOptionListcontroll(sort,params)
            setData(result)
        }
    },[setData]);

    const handleKeyPress = useCallback(
        (e,code) => {
          if (e.key !== "Enter") return;
          setTable({
            shop_id: localStorage.getItem('SHOP'),
            brand : brand,
            code : code,
            startDate : startDate,
            endDate : endDate,
            dateOption : dateOption 
        },analysisInfo,resultInfo,faultInfo);
        },[brand, dateOption, endDate, setTable,startDate]
    );

    const windoewSize =(tof)=>{
        if(tof){
            if( window.innerWidth > 1472){
                
                let sWidth = window.innerWidth*0.96 - 10
                console.log(sWidth/20)

                itemViewWidth = Math.round(sWidth/20)
            }else{
                itemViewWidth = 70
            }
        }
    }
    windoewSize(tof);
    useEffect(() => {
        const fetchData = async () => {
            let list =await getBrandList();
                
            const fI = await getSelectList('faultDivision',null)
            const jI = await getSelectList('judgmentResult',null)
            const aI = await getSelectList('analysisType',null)

            setFaultInfo(fI)   
            setResultInfo(jI)  
            setAnalysisInfo(aI)

            list.unshift({brand_id: "",brand_name: "전체"})
            setBrandList(list);
            setShopId(localStorage.getItem('SHOP'))
            setCompanyList(JSON.parse(localStorage.getItem('COMPANY')))
            let user = JSON.parse(localStorage.getItem('USER'))
            setUserInfo(user)
            setDisable(checkDisable(user.level))
            if(user.level === 3){
                setTable({
                    shop_id: localStorage.getItem('SHOP'),
                    brand : brand,
                    code : code,
                    startDate : startDate,
                    endDate : endDate,
                    dateOption : dateOption 
                },aI,jI,fI);
            }else if(user.level === 0 ||user.level === 1){
                /*setTable({
                    hq_id : user.headquarter_id,
                    brand : brand,
                    code : code,
                    startDate : startDate,
                    endDate : endDate,
                    dateOption : dateOption 
                },aI,jI,fI);*/
            }
            
        }
        fetchData();

        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
        console.log("/-/-/-/-/-/")
        console.log(window.innerWidth)
        console.log("/-/-/-/-/-/")
        if( window.innerWidth > 1472){
              
          let sWidth = window.innerWidth*0.96 - 10
          console.log(sWidth/20)
          
          itemViewWidth = Math.round(sWidth/20)
        }else{
          itemViewWidth = 70
        }
        setTof(true)

        
        window.addEventListener('resize',handleResize);
        return ()=>{
            window.removeEventListener('resize',handleResize);
        }
        
    },[]);
    
      ///96% -10px
    return(
        <Nav style={{height:"100%"}}>
            <RepairHeader/>
            <div style={{paddingLeft: "2%",paddingRight: "2%"}}>
            <TopView>
                <h2>조회</h2>

               
                <Image alt='excel' src='/icons/excel.png' width={45} height={40} onClick={()=>{getExcel(parseInquiryData(data))}}/>
               
            </TopView>
            <hr/>
                <Container>회사 설정 :
                <select disabled={disable} style={{marginLeft:10,marginRight: 10}} 
                    onChange={(e)=>{
                        setSelectedCompany(e.target.value)
                        setTable({
                            shop_id: shopId,
                            brand : brand,
                            code : code,
                            startDate : startDate,
                            endDate : endDate,
                            dateOption : dateOption 
                        },analysisInfo,resultInfo,faultInfo);
                    }}>
                    {companyList.map((item) => (
                        <option value={item.key} key={item.key}>
                        {item.name}
                    </option>
                    ))}
                </select>
                
                
            
            서비스 카드 번호 : 
                <input  disabled={disable} style={{marginLeft:15}} onChange={(e)=>{setCode(e.target.value)
                }} onKeyPress={(e)=>{handleKeyPress(e,code)}}></input>
                  </Container> 
                <div style={{color :"#ff0000"}}><h6>⚠️직접 입력 후 엔터를 누르거나 바코드 리더기를 이용해주세요</h6></div>
  
                조회 조건
                <br/>
                <br/>
                <Container>
                    <div style={{height:25,marginLeft:20,justifyContent:"center",alignItems:"center",display:"flex",fontSize:13,paddingBottom:2}}>브랜드 : </div> 
                    <select disabled={disable} name="brand"  style={{marginLeft:10,marginRight: 10, height:25}} onChange={(e)=>{
                            setBrand(e.target.value)
                            setTable({
                                shop_id: shopId,
                                brand : e.target.value,
                                code : code,
                                startDate : startDate,
                                endDate : endDate,
                                dateOption : dateOption 
                            },analysisInfo,resultInfo,faultInfo);
                        }}>
                        {   
                            brandList.map((item,index)=>(
                                <option key={index} value={item.brand_id}>{item.brand_name}</option>
                            ))
                        }
                    </select>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div style={{height:25,justifyContent:"center",alignItems:"center",display:"flex",fontSize:13,paddingBottom:2}}>날짜 기준 :</div> 
                    <select disabled={disable} name="date_standard"  style={{marginLeft:10,marginRight: 10, height:25}} 
                        onChange={(e)=>{
                            setDateOption(e.target.value)
                            setTable({
                                shop_id: shopId,
                                brand : brand,
                                code : code,
                                startDate : startDate,
                                endDate : endDate,
                                dateOption : e.target.value 
                            },analysisInfo,resultInfo,faultInfo);
                        }}>
                        <option value="complete_date">매장접수일</option>
                        <option value="register_date">수선처접수일</option>
                        <option value="send_date">수선처발송일</option>
                    </select>
                    
                    
                    <input disabled={disable} type="date" style={{height:25, marginRight:10}} onChange={(e)=>{
                        setStartDate(e.target.value)
                        setTable({
                            shop_id: shopId,
                            brand : brand,
                            code : code,
                            startDate : e.target.value,
                            endDate : endDate,
                            dateOption : dateOption 
                        },analysisInfo,resultInfo,faultInfo);
                        }}/>
                    <div style={{height:25,display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <div>
                            ~
                        </div>
                    </div>
                    <input disabled={disable} type="date" style={{height:25,marginLeft:10}} onChange={(e)=>{
                        setEndDate(e.target.value)
                        setTable({
                            shop_id: shopId,
                            brand : brand,
                            code : code,
                            startDate : startDate,
                            endDate : e.target.value,
                            dateOption : dateOption 
                        },analysisInfo,resultInfo,faultInfo);
                        }}/>
                </Container>
            <Line/>
            <ItemTable >
                
                            
                <Nav style={{maxHeight: 400,minHeight:200, width: "100%"}}>
                <div style={{position:"sticky",position:"-webkit-sticky",top:0,backgroundColor:COLOR.WHITE,width:itemViewWidth*20+10}}>
                <Container style={{paddingLeft:10,backgroundColor:COLOR.WHITE}}>
                    <ItemView style={{width : itemViewWidth}}>서비스 번호</ItemView>
                    <ItemView style={{width : itemViewWidth}}>매장접수일</ItemView>
                    <ItemView style={{width : itemViewWidth}}>매장명</ItemView>
                    <ItemView style={{width : itemViewWidth}}>브랜드</ItemView>
                    <ItemView style={{width : itemViewWidth}}>시즌</ItemView>
                    <ItemView style={{width : itemViewWidth}}>스타일</ItemView>
                    <ItemView style={{width : itemViewWidth}}>컬러</ItemView>
                    <ItemView style={{width : itemViewWidth}}>사이즈</ItemView>
                    <ItemView style={{width : itemViewWidth}}>과실구분</ItemView>
                    <ItemView style={{width : itemViewWidth}}>내용분석</ItemView>
                    <ItemView style={{width : itemViewWidth}}>판정결과</ItemView>
                    <ItemView style={{width : itemViewWidth}}><pre>{"수선처\n접수일"}</pre></ItemView>
                    <ItemView style={{width : itemViewWidth}}><pre>{"수선처\n발송일"}</pre></ItemView>
                    <ItemView style={{width : itemViewWidth}}>수선내용1</ItemView>
                    <ItemView style={{width : itemViewWidth}}>수선비용1</ItemView>
                    <ItemView style={{width : itemViewWidth}}>수선내용2</ItemView>
                    <ItemView style={{width : itemViewWidth}}>수선비용2</ItemView>
                    <ItemView style={{width : itemViewWidth}}>수선내용3</ItemView>
                    <ItemView style={{width : itemViewWidth}}>수선비용3</ItemView>
                    <ItemView style={{width : itemViewWidth}}><pre>{"  매장\n접수내용"}</pre></ItemView>
                </Container>
                <Line2 style={{width:itemViewWidth*20+10}}/>
                </div>
                    {
                        data.map((item,i)=>(
                            
                            <InquiryResult key={i} data = {item} width={itemViewWidth}/>

                        ))   
                    }
                </Nav>
              
              
            </ItemTable>
            <br/>
            <br/>
            </div>
        </Nav>
    )
}

const ItemStyle = { 
    
  fontSize :12,
  minHeight: 40,
  width : "150%",
  display: "flex",  
  flexDirection: "row" ,
  alignitems: "center",
  justifyContent:"center"
}
const Nav = styled.nav`
  overflow-y: auto;
  height: 100%;
  &::-webkit-scrollbar {
    width: 8px;
    height: 10px;
    background: rgba(210, 210, 210, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(96, 96, 96, 0.7);
    border-radius: 6px;
  }
`;
const Line =styled.div`
  border:1px solid  ${COLOR.BRAUN};
  width :100%
  margin:2px;
  height:2px;
  margin-bottom:10px;
  margin-top:10px;
  background-color: ${COLOR.BRAUN}
`;
const Line2 =styled.div`
  border:1px solid  ${COLOR.BRAUN};
  width :100%
  margin:2px;
  height:2px;
  margin-top:10px;
  background-color: ${COLOR.BRAUN}
`;
const ItemTable = styled.div`
  border: 2px solid  ${COLOR.BRAUN};
  min-width:100%;
  min-height:200px;
  overflow: hidden;

`;

const Container = styled.div`
    display:flex; 
    min-height: 20px;
    align-items: flex-start;
`;


const ContainerScroll = styled.nav`
    margin-top:12px;
    max-height: 400px;
    min-height:200px;
    width: 100%
    overflow-y: scroll;

`;
const TopView = styled.div`
    padding:10px;
    display: flex;  
    align-items:center;
    justify-content: space-between;      
`;

const ItemView = styled.div`
  font-size :12px;
  min-height: 55px;
  display: flex;  
  flex-direction: row ;
  align-items: center;
  justify-content:center;
  `;
const LaView = styled.div`
    padding-top:10px;
    padding-bottom:10px;
    display: flex;  
    align-items:center;
    flex-direction: coloum ;

`;