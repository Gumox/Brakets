import React,{useState, useCallback, useEffect} from "react";
import RepairHeader from "../components/RepairHeader"
import styled from "styled-components";
import COLOR from "../constants/color";
import axios from "axios";
import _ from "lodash";
import RepairReceiptModal from "../components/RepairReceiptModal";
import store from "../store/store";
import headers from "../constants/repairReceptionTableHeader";
import checkDisable from "../functions/checkDisable";
import { CSVLink } from "react-csv";
import Image from 'next/image'

function RepairReception({options,user}) {
  const option =options.companys
  console.log(options.info[0])
  const shop_id =options.info[0].store_id
  const email = user.email
  const [selectedCompany,setSelectedCompany] = useState(null)
  const [listData,setListData] = useState(options.list)
  const [code,setCode] = useState(null)
  const [disable,setDisable] = useState(checkDisable(user.level))
  
 
  let selectList = [{name:"전체",key:null}];
  option.map((item)=>(selectList.push({name:item.headquarter_name,key:item.hq_id})))
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
  const getOptions = async () => {
    const [data] = await Promise.all([
      axios
        .get(`${process.env.API_URL}/RepairShop/getReceiptList`,{
          params: { shop_id: shop_id,hq_id:selectedCompany, code:code},})
        .then(({ data }) => data),
    ]);
    setListData(data.body)
  }
  let lists =[];
  listData.forEach((el,index) => {
      let items=(
        <div key={index}>
          <RepairReceiptModal item={el} info ={options.info[0]} images ={options.images}></RepairReceiptModal>
        </div>
    )
    lists[index] = items;
  })
  useEffect(()=>{
    console.log(selectItems)
    localStorage.setItem('COMPANY',JSON.stringify(selectItems));
    localStorage.setItem('SHOP',shop_id)
    localStorage.setItem('SHOP_NAME',options.info[0].name)
    console.log(user)
    localStorage.setItem('USER',JSON.stringify(user))
  },[options.info, selectItems,shop_id,user])
  return(
      <div style={{height:"100%",overflowY: "scroll"}}>
          <RepairHeader/>
          <div style={{paddingLeft: "10%",paddingRight: "10%"}}>
          <TopView>
                <h2>접수</h2>

                <CSVLink data={listData} headers={headers} filename='접수목록.csv'>
                <Image alt="excel" src='/icons/excel.png' width={45} height={40} />
                </CSVLink>
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
          </div>
      </div>
  )
}


export const getServerSideProps = async (ctx) => {
  console.log(ctx.req.headers.cookie)
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
  console.log(user)
  const {email :email} =user
  const [companys] = await Promise.all([
    axios.get(`${process.env.API_URL}/auth/repair?email=${email}`)
    .then(({ data }) => data),
  ]);
  const[list,images] =await Promise.all([
    axios.get(`${process.env.API_URL}/RepairShop/getReceiptList?shop_id=${companys.body[0].store_id}`)
    .then(({ data }) => data),
    axios.get(`${process.env.API_URL}/RepairShop/getReceiptList/getImageList?shop_id=${companys.body[0].store_id}`)
    .then(({ data }) => data),
  ])
  return {
    props: {
      user,
      options:{
        companys : companys.data,
        info : companys.body,
        list : list.body,
        images: images.body
      }
    }
  };
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