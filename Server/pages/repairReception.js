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

  const [option,setOption] = useState()//options.companys)
  const [staff,setStaff] = useState()//user)

  const [shop_id,set_shop_id] = useState()//options.info[0].store_id)
  
  //const account = staff.account
  const [selectedCompany,setSelectedCompany] = useState(null)
  const [listData,setListData] = useState()//options.list)
  
  const [info,setInfo] = useState(null)
  const [code,setCode] = useState(null)
  const [disable,setDisable] = useState()
  
  const [images,setImages] = useState()
  const [needImages,setNeedImages] = useState()//options.needImages)

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
  
  const [lists,setLists] =useState([]);

  const getOptions = async () => {
    const [data] = await Promise.all([
      axios
        .get(`${process.env.API_URL}/RepairShop/getReceiptList`,{
          params: { shop_id: shop_id,hq_id:selectedCompany, code:code},})
        .then(({ data }) => data)
        .catch(error=>{

        })
    ]);
    
    let itemLists = []
    data.body.forEach((el,index) => {
      
      let items=(
        <div key={index} style={{paddingTop:1}}>
          <RepairReceiptModal need={data.needImages} item={el} info ={info} images ={images} shop={shop_id}/>
        </div>
      )
      itemLists[index] = items;
    })

    setLists(itemLists)
    setListData(data.body)
    setNeedImages(data.needImages)
  }

 
  const fetch =async(loadStaff,info,shop_id)=>{
    const[list,images] =await Promise.all([
      axios.get(`${process.env.API_URL}/RepairShop/getReceiptList?shop_id=${shop_id}`)
      .then(({ data }) => data),
      axios.get(`${process.env.API_URL}/RepairShop/getReceiptList/getImageList?shop_id=${shop_id}`)
      .then(({ data }) => data)
    
    ])
    setInfo(info)
    setListData(list.body);
    setImages( images.body),
    setNeedImages( list.needImages);

    let itemList = []
    if(loadStaff.level==3 || loadStaff.level==4){

      list.body.forEach((el,index) => {
        if(images.body){
            let items=(
              <div key={index} style={{paddingTop:1}}>
                <RepairReceiptModal need={list.needImages} item={el} info ={info} images ={images.body} shop={shop_id}/>
              </div>
          )
          
          itemList[index] = items;
        }
      })
      setLists(itemList)

    }
  }

  useEffect(()=>{
    
    let loadOptions =JSON.parse(sessionStorage.getItem("OPTIONS"))
    let loadStaff =JSON.parse(sessionStorage.getItem("USER"))
    
    
    setStaff(loadStaff)
    setOption(loadOptions.companys)
    set_shop_id(loadOptions.info[0].store_id)

    setListData(loadOptions.list)
    setImages(loadOptions.images)
    setNeedImages(loadOptions.needImages)

    setDisable(checkDisable(loadStaff.level))




    fetch(loadStaff, loadOptions.info[0], loadOptions.info[0].store_id)

  },[])
  return(
    <Nav style={{overflowY:"scroll"}}>
      <RepairHeader path={"/repairReception"}/>
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
          <div style={{position:"sticky",top:0,zIndex:10,backgroundColor:COLOR.WHITE}}>
            <LaView><ItemView>서비스 번호</ItemView><ItemView>매장접수일</ItemView><ItemView>매장명</ItemView><ItemView>브랜드</ItemView><ItemView style={{border:0}}>매장 메시지</ItemView></LaView>
          </div>  
          
          {lists}
        </ItemTable>
        <br/>
        <br/>
      </div>
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
  width :100%;
  margin:2px;
  height:2px;
  margin-bottom:10px;
  margin-top:10px;
  background-color: ${COLOR.BRAUN};
`;
const ItemTable = styled.div`
  border: 2px solid  ${COLOR.BRAUN};
  min-width:100%;
  min-height:300px;

`;
const LaView = styled.div`
  display: flex;  
  align-items:center;
  padding-left:10px;

`;
const ItemView = styled.div`
  padding:10px;
  padding-top:15px;
  padding-bottom:15px;
  font-size :12px;
  min-height: 20px;
  width :100px;
  display: flex;  
  justify-content:center;
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