import React,{useState,useEffect,useCallback,useRef} from 'react';
import RepairHeader from '../components/RepairHeader'
import styled from 'styled-components';
import COLOR from '../constants/color';
import axios from 'axios';
import store from '../store/store';
import InquiryTable from '../components/InquiryTable';
import sortInquiryData from '../functions/sortInquiryData';
import { CSVLink } from "react-csv";
import headers from '../constants/inquiryTableHeader';
export default function Inquiry() {
   
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
    
    
    const getData = async(params)=>{
        console.log(params)
        const[datas] =await Promise.all([
            axios.get(`${process.env.API_URL}/RepairShop/getInquiryInfo`, {
                params: params,
              })
            .then(({ data }) => data),
          ])
          return datas;
    }
    const getBrandList = async()=>{
        const[datas] =await Promise.all([
            axios.get(`${process.env.API_URL}/brand/AllBrandList`)
            .then(({ data }) => data.data),
          ])
          return datas;
    }
    const setTable = async(params) =>{
        let datas = [];
        datas = await getData(params)
        let sort =await sortInquiryData(datas.body, shopId)
        setData(sort)
    }
    const handleKeyPress = useCallback(
        (e,code) => {
            console.log("do")
          if (e.key !== "Enter") return;
          setTable({
            shop_id: localStorage.getItem('SHOP'),
            brand : brand,
            code : code,
            startDate : startDate,
            endDate : endDate,
            dateOption : dateOption 
        });
        },[]
      );
    useEffect(async () => {
        let list =await getBrandList();
        list.unshift({brand_id: "",brand_name: "전체"})
        setBrandList(list);
        setShopId(localStorage.getItem('SHOP'))
        setCompanyList(JSON.parse(localStorage.getItem('COMPANY')))
        setTable({
            shop_id: localStorage.getItem('SHOP'),
            brand : brand,
            code : code,
            startDate : startDate,
            endDate : endDate,
            dateOption : dateOption 
        });
        return () => setLoading(false);
      },[]);
    return(
        <div style={{height:"100%",overflowY: "scroll"}}>
            <RepairHeader/>
            <div style={{paddingLeft: "10%",paddingRight: "10%"}}>
            <TopView>
                <h2>조회</h2>

                <CSVLink data={data} headers={headers} filename='조회목록'>
                <img src='/icons/excel.png' width={45} height={40}/>
                </CSVLink>
            </TopView>
            <hr/>
                <Container>회사 설정 :
                <select style={{marginLeft:10,marginRight: 10}} 
                    onChange={(e)=>{
                        setSelectedCompany(e.target.value)
                        setTable({
                            shop_id: shopId,
                            brand : brand,
                            code : code,
                            startDate : startDate,
                            endDate : endDate,
                            dateOption : dateOption 
                        });
                    }}>
                    {companyList.map((item) => (
                        <option value={item.key} key={item.key}>
                        {item.name}
                    </option>
                    ))}
                </select>
                
                
            
            서비스 카드 번호 : 
                <input style={{marginLeft:15}} onChange={(e)=>{setCode(e.target.value)
                console.log(code)}} onKeyPress={(e)=>{handleKeyPress(e,code)}}></input>
                  </Container> 
                <div style={{color :"#ff0000"}}><h6>⚠️직접 입력 후 엔터를 누르거나 바코드 리더기를 이용해주세요</h6></div>
  
                조회 조건
                <br/>
                <br/>
                <Container>
                    <div style={{height:25,marginLeft:20,justifyContent:"center",alignItems:"center",display:"flex",fontSize:13,paddingBottom:2}}>브랜드 : </div> 
                    <select name="brand"  style={{marginLeft:10,marginRight: 10, height:25}} onChange={(e)=>{
                            setBrand(e.target.value)
                            setTable({
                                shop_id: shopId,
                                brand : e.target.value,
                                code : code,
                                startDate : startDate,
                                endDate : endDate,
                                dateOption : dateOption 
                            });
                        }}>
                        {   
                            brandList.map((item,index)=>(
                                <option key={index} value={item.brand_id}>{item.brand_name}</option>
                            ))
                        }
                    </select>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div style={{height:25,justifyContent:"center",alignItems:"center",display:"flex",fontSize:13,paddingBottom:2}}>날짜 기준 :</div> 
                    <select name="date_standard"  style={{marginLeft:10,marginRight: 10, height:25}}  onChange={(e)=>{setDateOption(e.target.value)}}>
                        <option value="complete_date">매장접수일</option>
                        <option value="da">수선처접수일</option>
                        <option value="dat">수선처발송일</option>
                    </select>
                    
                    <input type="date" onChange={(e)=>{
                        setStartDate(e.target.value)
                        setTable({
                            shop_id: shopId,
                            brand : brand,
                            code : code,
                            startDate : e.target.value,
                            endDate : endDate,
                            dateOption : dateOption 
                        });
                        }}/>
                    
                    <input type="date" onChange={(e)=>{
                        setEndDate(e.target.value)
                        setTable({
                            shop_id: shopId,
                            brand : brand,
                            code : code,
                            startDate : startDate,
                            endDate : e.target.value,
                            dateOption : dateOption 
                        });
                        }}/>
                </Container>
            <Line/>
            <ItemTable >
                <ContainerScroll >
                    <InquiryTable data = {data}></InquiryTable>
                </ContainerScroll>
              
              
            </ItemTable>
            </div>
        </div>
    )
}

export const getServerSideProps = async (ctx) => {
    console.log(ctx.req.headers.cookie)
    const {
      data: { isAuthorized,user },
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
    console.log("******************************************")
    console.log(isAuthorized)
    console.log("******************************************")
    return { props: {} };
  };

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

const Container = styled.div`
    display:flex; 
    min-height: 20px;
    align-items: flex-start;
`;

const ContainerScroll = styled.div`
    margin-top:12px;
    overflow: scroll;
    max-height: 400px;
    min-height:200px;
    max-width: 100%

    &::-webkit-scrollbar{
        display: none;
    }

`;
const TopView = styled.div`
    padding:10px;
    display: flex;  
    align-items:center;
    justify-content: space-between;      
`;
