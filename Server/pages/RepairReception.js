import React,{useState, useCallback, useEffect} from "react";
import RepairHeader from "../components/RepairHeader"
import styled from "styled-components";
import COLOR from "../constants/color";
import ip from "../constants/ip";
import axios from "axios";
import _ from "lodash";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import RepairReceiptModal from "../components/RepairReceiptModal";
import formatDate from "../functions/formatDate";
import store from "../store/store";


function RepairReception({options,user}) {
  const option =options.companys
  const shop_id =options.info[0].store_id
  const email = user.email
  const [selectedCompany,setSelectedCompany] = useState(null)
  const [listData,setListData] = useState(options.list)
  const [code,setCode] = useState(null)


  let selectList = [{name:"전체",key:null}];
  option.map((item)=>(selectList.push({name:item.headquarter_name,key:item.hq_id})))
  const  selectItems = _.uniqBy(selectList,"key")
  store.dispatch({type:"COMPANY",company:selectItems})

  const handleSelect = (e) => {
      setSelectedCompany(e.target.value)
      console.log(e.target.value)
  };
  const getOptions = async () => {
    const [data] = await Promise.all([
      axios
        .get(ip+`/api/RepairShop/getReceiptList`,{
          params: { shop_id: shop_id,hq_id:selectedCompany, code:code},})
        .then(({ data }) => data),
    ]);
    console.log(data.body)
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
  return(
      <div>
          <RepairHeader/>
          <div style={{paddingLeft: "10%",paddingRight: "10%"}}>
          <h3>접수</h3><hr/>
              <Container>회사 설정 :
              <select onChange={(e)=>handleSelect(e)}  style={{marginLeft:10,marginRight: 10}} >
              {selectItems.map((item) => (
                  <option value={item.key} key={item.key}>
                  {item.name}
                  </option>
              ))}
              </select>
              
              
          
          서비스 카드 번호 : 
              <input style={{marginLeft:15}} onChange={(e)=>{setCode(e.target.value)}}></input> <button 
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
  const {email :email} =user
  //console.log("email???? ??? ??? "+email)
  const [companys] = await Promise.all([
    axios.get(ip+`/api/auth/repair?email=${email}`)
    .then(({ data }) => data),
  ]);
  const[list,images] =await Promise.all([
    axios.get(ip+`/api/RepairShop/getReceiptList?shop_id=${companys.body[0].store_id}`)
    .then(({ data }) => data),
    axios.get(ip+`/api/RepairShop/getReceiptList/getImageList?shop_id=${companys.body[0].store_id}`)
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
export default  RepairReception;