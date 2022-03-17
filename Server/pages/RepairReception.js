import React,{useState, useCallback, useEffect} from "react";
import RepairHeader from "../components/RepairHeader"
import styled from "styled-components";
import COLOR from "../constants/color";
import axios from "axios";
import _ from "lodash";
import RepairReceiptModal from "../components/repair/RepairReceiptModal";
import store from "../store/store";
import checkDisable from "../functions/checkDisable";
import Image from 'next/image'
import {parseRepairReceptionData} from "../functions/parseExcelData";

const XLSX = require('xlsx');

function RepairReception({options,user}) {
  const option =options.companys
  const shop_id =options.info[0].store_id
  const email = user.email
  const [selectedCompany,setSelectedCompany] = useState(null)
  const [listData,setListData] = useState(options.list)
  const [code,setCode] = useState(null)
  const [disable,setDisable] = useState(checkDisable(user.level))
  const [needImages,setNeedImages] = useState(options.needImages)

  let selectList = [{name:"전체",key:null}];
  if(option != null){option.map((item)=>(selectList.push({name:item.headquarter_name,key:item.hq_id})))}
  
  const  selectItems = _.uniqBy(selectList,"key")
  store.dispatch({type:"COMPANY",company:selectItems})
  store.dispatch({type:"SHOP",shop:shop_id})

  const handleSelect = (e) => {
    if(e.target.value === "전체"){
      setSelectedCompany()
    }else{
      setSelectedCompany(e.target.value)
    }
  };
  const getExcel =(data)=>{
    const dataWS = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, dataWS, "sheet1");
    XLSX.writeFile(wb, "접수목록.xlsx");
  }
  const getOptions = async () => {
    const [data] = await Promise.all([
      axios
        .get(`${process.env.API_URL}/RepairShop/getReceiptList`,{
          params: { shop_id: shop_id,hq_id:selectedCompany, code:code},})
        .then(({ data }) => data)
        .catch(error=>{

        })
    ]);
    setListData(data.body)
    setNeedImages(data.needImages)
  }
  let lists =[];
  if(user.level==3 || user.level==4){
    listData.forEach((el,index) => {
      if(options.images != undefined){
          let items=(
            <div key={index} style={{paddingTop:1}}>
              <RepairReceiptModal need={needImages} item={el} info ={options.info[0]} images ={options.images} shop={shop_id}/>
            </div>
        )
        
      lists[index] = items;
      }
    })
  }
  useEffect(()=>{
    localStorage.setItem('COMPANY',JSON.stringify(selectItems));
    localStorage.setItem('SHOP',shop_id)
    localStorage.setItem('SHOP_NAME',options.info[0].name)
    localStorage.setItem('USER',JSON.stringify(user))

  },[])
  return(
    <div style={{height:"100%",overflowY: "scroll"}}>
      <RepairHeader/>
      <div style={{paddingLeft: "2%",paddingRight: "2%"}}>
        <TopView>
              <h2>접수</h2>

              
              <Image alt="excel" src='/icons/excel.png' width={45} height={40} onClick={()=>{getExcel(parseRepairReceptionData(listData))}}/>
              
        </TopView>
          <hr/>
            <Container>회사 설정 :
            <select disabled={disable} onChange={(e)=>handleSelect(e)}  style={{marginLeft:10,marginRight: 10}} >
            {selectItems.map((item) => (
                <option value={item.key} key={item.key}>
                {item.name}
                </option>
            ))}
            </select>
            
            
        
        서비스 카드 번호 : 
            <input disabled={disable} style={{marginLeft:15}} onChange={(e)=>{setCode(e.target.value)}}></input> <button 
                style={{width:40,height:22,fontSize:12,backgroundColor : "#4f4f4f", color: COLOR.WHITE}}
                onClick={()=>{getOptions()}}
                >확인</button>  
              </Container> 
            <div style={{color :"#ff0000"}}><h6>⚠️직접 입력 후 엔터를 누르거나 바코드 리더기를 이용해주세요</h6></div>

        
        오늘의 접수 예정
        <Line/>
        <ItemTable >
          <div style={{marginTop:12}}></div>
          <LaView><Container><ItemView>서비스 번호</ItemView><ItemView>매장접수일</ItemView><ItemView>매장명</ItemView><ItemView>브랜드</ItemView></Container></LaView>
          <hr/>
          
          {lists}
        </ItemTable>
        <br/>
        <br/>
      </div>
    </div>
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
  )
  .catch(error=>{

  });
  const {email :email} =user
  
    const [companys] = await Promise.all([
      axios.get(`${process.env.API_URL}/auth/repair?email=${email}`)
      .then(({ data }) => data)
      .catch(error=>{

      })
    ]);
  if(user.level>2&&user.level<5){
    const[list,images] =await Promise.all([
      axios.get(`${process.env.API_URL}/RepairShop/getReceiptList?shop_id=${companys.body[0].store_id}`)
      .then(({ data }) => data),
      axios.get(`${process.env.API_URL}/RepairShop/getReceiptList/getImageList?shop_id=${companys.body[0].store_id}`)
      .then(({ data }) => data)
    
    ])
    return {
      props: {
        user,
        options:{
          companys : companys.data,
          info : companys.body,
          list : list.body,
          images: images.body,
          needImages : list.needImages
        }
      }
    };
  }
  else if(user.level<2){
    return {
      props: {
        user,
        options:{
          companys : companys.data,
          info : companys.body,
          list : [],
          images: []
        }
      }
    };
  }
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

`;
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
const TopView = styled.div`
    padding:10px;
    display: flex;  
    align-items:center;
    justify-content: space-between;      
`;

export default  RepairReception;