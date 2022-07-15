import React,{useState,useEffect,useCallback,useRef} from 'react';
import RepairHeader from '../components/RepairHeader'
import styled from 'styled-components';
import COLOR from '../constants/color';
import axios from 'axios';
import moment from 'moment';
import store from '../store/store';
import { debounce } from 'lodash';
import sortInquiryData from '../functions/sortInquiryData';
import sortInquiryDataHeadquarter from '../functions/sortInquiryDataHeadquarter';
import dateOptionListcontroll from '../functions/dateOptionListcontroll';
import checkDisable from '../functions/checkDisable';
import InquiryResult from '../components/repair/InquiryResult';
import {getSelectList, getRepairType } from '../functions/useInRepairReceiptModal'; 
import {getData} from '../functions/useInInqiry';
import { getBrandList } from '../functions/useInSettlement';
import { getRepairShopList } from '../functions/useInReturnUnregistered';
import Image from 'next/image'
import { useScrollSync } from "react-use-scroll-sync"
import { parseInquiryData } from '../functions/parseExcelData';
import dataHeaderLevel3 from '../constants/repairInquiry/dataHeaderLevel3';
import dataHeader from '../constants/repairInquiry/dataHeader';

const XLSX = require('xlsx');

export default function Inquiry() {

    const ref1 = useRef(null)
    const ref2 = useRef(null)
    useScrollSync([ref1, ref2], {
        horizontal: true,
        vertical: true,
        proportional: true
      })

    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };
  
    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
   
    const [userInfo,setUserInfo] = useState({})
    const [shopId,setShopId] = useState(store.getState().shop);
    const [data,setData] = useState([]);
    const [selectedCompany,setSelectedCompany] = useState(null)
    const [brand,setBrand] = useState(null)
    const [code,setCode] = useState(null)

    const first = moment().format("YYYY-MM-01")
    const [repairShopList,setRepairShopList] = useState([])

    const [startDate,setStartDate] = useState(first)
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
    let dataViewWidth;

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
    
    const setTable =useCallback( async(params ,fI,jI,aI,level) =>{
        let datas = [];
        let types = await getRepairType(null,null,shopId)
        if(params.dateOption === "receipt_date"){

            datas = await getData(params,userInfo.level)
            let sort =[]
            if(level === 3){
                sort =await sortInquiryData(datas.body,params,fI,jI,aI,types)
            }else{
                sort =await sortInquiryDataHeadquarter(datas.body,params,fI,jI,aI,types)
            }
            setData(sort)
        }else{
            datas = await getData(params)
            let sort =[]
            if(level === 3){
                sort =await sortInquiryData(datas.body,params,fI,jI,aI,types)
            }else{
                sort =await sortInquiryDataHeadquarter(datas.body,params,fI,jI,aI,types)
            }
            let result  =dateOptionListcontroll(sort,params)
            setData(result)
        }
    },[setData]);

    const handleKeyPress = useCallback(
        (e,code) => {
          if (e.key !== "Enter") return;
          setTable({
            shop_id: sessionStorage.getItem('SHOP'),
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
                itemViewWidth = Math.round(sWidth/20)
            }else{
                itemViewWidth = 70
            }
            if(userInfo.level === 3){
                dataViewWidth = itemViewWidth*dataHeaderLevel3.length+10
            }else{
                dataViewWidth = itemViewWidth*dataHeader.length+10

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

            
            let list2 =await getRepairShopList();
            list2.unshift({store_id: "전체",name: "전체"})
            setRepairShopList(list2)

            setCompanyList(JSON.parse(sessionStorage.getItem('COMPANY')))
            let user = JSON.parse(sessionStorage.getItem('USER'))

            setUserInfo(user)
            setDisable(checkDisable(user.level))
            if(user.level === 3){

                setShopId(sessionStorage.getItem('SHOP'))
                
                setTable({
                    shop_id: sessionStorage.getItem('SHOP'),
                    brand : brand,
                    startDate : startDate,
                    endDate : endDate,
                    dateOption : dateOption 
                },aI,jI,fI,user.level);
            }else if(user.level === 0 ||user.level === 1){
                
                setTable({
                    hq_id : user.headquarter_id,
                    brand : brand,
                    startDate : startDate,
                    endDate : endDate,
                    dateOption : dateOption 
                },aI,jI,fI,user.level);
            }
            
        }
        fetchData();

        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
        if( window.innerWidth > 1472){
              
          let sWidth = window.innerWidth*0.96 - 10
          
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
        <Nav style={{height:"100%",minWidth:950}}>
            <RepairHeader path={"/inquiry"}/>
            <div style={{paddingLeft: "2%",paddingRight: "2%"}}>
            <TopView>
                <h2>조회</h2>

               
                <Image alt='excel' src='/icons/excel.png' width={45} height={40} onClick={()=>{getExcel(parseInquiryData(data))}}/>
               
            </TopView>
                
            <Line/>
            </div>

            <div style={{position:"sticky",top:0,backgroundColor:COLOR.WHITE}}>
                <Container style={{paddingLeft: "2%",paddingRight: "2%",paddingTop:"2%"}}>
                        <div>회사 설정 :</div>
                    <select style={{marginLeft:10,marginRight: 10}} 
                        onChange={(e)=>{
                            setSelectedCompany(e.target.value)
                        }}>
                        {companyList.map((item) => (
                            <option value={item.key} key={item.key}>
                            {item.name}
                        </option>
                        ))}
                    </select>
                    
                    
                
                    <div>서비스 카드 번호 : </div>
                    <input  style={{marginLeft:15}} onChange={(e)=>{setCode(e.target.value)
                    }} onKeyPress={(e)=>{handleKeyPress(e,code)}}></input>
                    <div style={{color :"#ff0000", marginLeft:15,height:20}}>⚠️직접 입력 후 엔터를 누르거나 바코드 리더기를 이용해주세요</div>
                </Container> 

                

                <div style={{paddingLeft: "2%",paddingRight: "2%", marginTop:15,marginBottom:20,height:20,fontSize:15,fontWeight:"bold"}}>조회 조건</div>


                <Container style={{paddingLeft: "2%",paddingRight: "2%"}}>

                    { userInfo.level !==3 &&
                    <div>
                        수선처 : 
                        <select name="soosun"  style={{marginLeft:10,marginRight: 10,height:22}} onChange={(e)=>{
                            if(e.target.value === "전체"){
                                setShopId(null)
                            }else{
                                setShopId(e.target.value)
                            }
                            }}>
                            {   
                                repairShopList.map((item,index)=>(
                                    <option key={index} value={item.store_id}>{item.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    }

                    <div style={{height:25,marginLeft:20,justifyContent:"center",alignItems:"center",display:"flex",fontSize:13,paddingBottom:2}}>브랜드 : </div> 
                    <select name="brand"  style={{marginLeft:10,marginRight: 30, height:25}} onChange={(e)=>{
                            setBrand(e.target.value)
                            
                        }}>
                        {   
                            brandList.map((item,index)=>(
                                <option key={index} value={item.brand_id}>{item.brand_name}</option>
                            ))
                        }
                    </select>
                    
                    <div style={{height:25,justifyContent:"center",alignItems:"center",display:"flex",fontSize:13,paddingBottom:2}}>날짜 기준 :</div> 
                    <select name="date_standard"  style={{marginLeft:10,marginRight: 10, height:25}} 
                        onChange={(e)=>{
                            setDateOption(e.target.value)
                            
                        }}>
                        <option value="complete_date">매장접수일</option>
                        <option value="register_date">수선처접수일</option>
                        <option value="send_date">수선처발송일</option>
                    </select>
                    
                    
                    <input type="date" style={{height:25, marginRight:10}} value={startDate || ''} onChange={(e)=>{
                        setStartDate(e.target.value)
                        
                        }}/>
                    <div style={{height:25,display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <div>
                            ~
                        </div>
                    </div>
                    <input type="date" style={{height:25,marginLeft:10}} value={endDate || ''} onChange={(e)=>{
                        setEndDate(e.target.value)
                    
                        }}/>

                    <button 
                        style={{width:40,height:25,fontSize:12,marginLeft:20,backgroundColor : "#4f4f4f", color: COLOR.WHITE}}
                        onClick={()=>{
                            setTable({
                                hq_id:selectedCompany,
                                shop_id: shopId,
                                brand : brand,
                                startDate : startDate,
                                endDate : endDate,
                                dateOption : dateOption 
                            },analysisInfo,resultInfo,faultInfo,userInfo.level);
                        }}
                    >확인</button>  
            
                </Container>
                <HeadScrollX  ref={ref1} style={{width:windowWidth-1}}>
                <Container style={{paddingLeft:10,backgroundColor:COLOR.WHITE,minWidth:dataViewWidth}}>
                    {
                        userInfo.level === 3 ?
                        dataHeaderLevel3.map((item,index)=>(
                            <ItemView key={index} style={{width : itemViewWidth}}>{item}</ItemView>
                        )):
                        dataHeader.map((item,index)=>(
                            <ItemView key={index} style={{width : itemViewWidth}}>{item}</ItemView>
                        ))
                    }
                    
                </Container>
                </HeadScrollX>
                
            </div>
            <ItemTable >
                
                            
                <ScrollX   ref={ref2} style={{minHeight:320, width: "100%"}}>
                
                    {
                        data.map((item,i)=>(
                            
                            <InquiryResult key={i} data = {item} width={itemViewWidth} level = {userInfo.level}/>

                        ))   
                    }
                </ScrollX>
              
              
            </ItemTable>
        </Nav>
    )
}

export const getServerSideProps = async (ctx) => {
    
    const {
      data: { isAuthorized, user },
    } = await axios.get(
      `${process.env.API_URL}/auth`,
      ctx.req
        ? {
            withCredentials: true,
            headers: {
              cookie: ctx.req.headers.cookie || {},
            },
          }
        : {}
    );
    if (!isAuthorized) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };
    }
    return {
        props: {
          
        }
      };
  };
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
    height: 1px;
    background: rgba(210, 210, 210, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(96, 96, 96, 0.7);
    border-radius: 6px;
  }
`;
const HeadScrollX = styled.div`
  overflow-x: scroll;
  height: 100%;
  &::-webkit-scrollbar {
    width: 8px;
    height: 3px;
    background: rgba(210, 210, 210, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background:  ${COLOR.BRAUN};
    border-radius: 6px;
  }
`;

const ScrollX = styled.div`
  overflow-x: auto;
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
  height: 55px;
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