import React,{useEffect, useState,useCallback} from 'react';
import RepairHeader from '../components/RepairHeader'
import styled from 'styled-components';
import COLOR from '../constants/color';
import axios from 'axios';
import formatDate from '../functions/formatDate';
import store from '../store/store';

export default function Return_unregistered() {
    
    const [selectedCompany,setSelectedCompany] = useState(null)
    const [companyList,setCompanyList] = useState(store.getState().company)
    const [code,setCode] = useState()
    const [brand,setBrand] = useState(null)
    const [brandList,setBrandList] = useState([])
    const [repairShopList,setRepairShopList] = useState([])
    const shop_id = store.getState().shop
    const [returnList,setReturnList] = useState([])
    
    const getInfo = async(shop_id)=>{

    }
    const getBrandList = async()=>{
        const[datas] =await Promise.all([
            axios.get(`${process.env.API_URL}/brand/AllBrandList`)
            .then(({ data }) => data.data),
          ])
          return datas;
    }
    const getRepairShopList = async()=>{
        const[datas] =await Promise.all([
            axios.get(`${process.env.API_URL}/store/getAllRepairShop`)
            .then(({ data }) => data.data),
          ])
          return datas;
    }
    const getTargetInfo = async(code)=>{
        const[datas] =await Promise.all([
            axios.get(`${process.env.API_URL}/RepairShop/unregistered/getTargetInfo?code=${code}`)
            .then(({ data }) => data.data),
          ])
          return datas;
    }
    const handleKeyPress = useCallback(async(e,code) => {
          if (e.key !== "Enter"){return;}
          else{
            let input = await getTargetInfo(code);
            
            if(input.length){
                input[0].return_date = new Date();

                returnList.map((item)=>{
                    if(item.receipt_code !== input[0].receipt_code){
                        returnList.push(input[0])
                    }
                })
                if(returnList[0]===undefined){returnList.push(input[0])}
                console.log(returnList[0])
            }else{
                alert("잘못된 서비스카드 번호 입니다")
            }
          }
        },[]
      );
    useEffect( async()=>{
        setCompanyList(JSON.parse(localStorage.getItem('COMPANY')))
        let list =await getBrandList();
        list.unshift({brand_id: "",brand_name: "전체"})

        let list2 =await getRepairShopList();
        list2.unshift({store_id: "",name: "전체"})
        
        setBrandList(list);
        setRepairShopList(list2)
    },[])
    return(
        <div style={{minWidth:1150, overflowY:"scroll"}}>
            <RepairHeader/>
            <div style={{paddingLeft: "10%",paddingRight: "10%"}}>
                <h2>미등록 반송</h2>
                <Line/>
                <Container>
                    <div style={{display:'flex',alignItems:"center",justifyContent:"center",width:"100%",fontSize:15,fontWeight:"bold",msOverflowStyle:"none"}}>회사 설정 :
                    <select onChange={(e)=>{}}  style={{marginLeft:10,marginRight: 10,minWidth:200,minHeight:30}} >
                        {companyList.map((item) => (
                            <option value={item.key} key={item.key}>
                            {item.name}
                        </option>
                        ))}
                    </select>
                    <button 
                        style={{marginLeft:10,width:40,height:22,fontSize:12,backgroundColor : "#4f4f4f", color: COLOR.WHITE}}
                        onClick={()=>{}}>
                            확인
                    </button>  
                    </div>
                </Container>
                <br/>
                <hr style={{backgroundColor: `${COLOR.GRAY}`}}/>
                <br/>
                
                
            
                <Container><div style={{fontWeight:"bold"}}>미등록 반송 조회 </div></Container>
                <br/>
                <Container>
                    <CenterView>
                    수선처 : 
                    <select name="soosun"  style={{marginLeft:10,marginRight: 10}} >
                        {   
                            repairShopList.map((item,index)=>(
                                <option key={index} value={item.store_id}>{item.name}</option>
                            ))
                        }
                    </select>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    브랜드 : 
                    <select name="brand"  style={{marginLeft:10,marginRight: 10}} >
                        {   
                            brandList.map((item,index)=>(
                                <option key={index} value={item.brand_id}>{item.brand_name}</option>
                            ))
                        }
                    </select>
                    
                    
                    <input type="date" style={{marginLeft:20,marginRight:20,height:22}}></input>
                    ~    
                    <input type="date"  style={{marginLeft:20,height:22}}></input>
                    <button 
                        style={{marginLeft:10,width:40,height:22,fontSize:12,backgroundColor : "#4f4f4f", color: COLOR.WHITE}}
                        onClick={()=>{}}
                        >조회</button>  
                    </CenterView>
                </Container> 
                
                <br/>
                <Container><div style={{fontWeight:"bold"}}>미등록 반송 등록</div></Container>
                
                   
                    <CenterView>       
                        <div style={{fontWeight:"bold"}} >서비스 카드 번호 : </div>
                        <input style={{marginLeft:15,height:22}} onChange={(e)=>{setCode(e.target.value)}} onKeyPress={(e)=>{handleKeyPress(e,code)}}></input> 
                        <button 
                            style={{marginLeft:10,width:40,height:22,fontSize:12,backgroundColor : "#4f4f4f", color: COLOR.WHITE}}
                            onClick={()=>{}}
                        >추가</button> 
                        
                    </CenterView>
                    <br/>
                    <CenterView>
                    <div style={{color :"#ff0000"}}>
                        ⚠️직접 입력 후 엔터를 누르거나 바코드 리더기를 이용해주세요
                    </div>
                    </CenterView>
                
                <br/>
                <br/>
            <div style={{display:"flex",flexDirection:"row-reverse",width:"100%"}}><CustomButton>저장</CustomButton></div>
            
            <Line/>
            <ItemTable >
                
                <LaView><Container>
                    <ItemView>#</ItemView>
                    <ItemView>수선처</ItemView>
                    <ItemView>미등록 반송 등록일</ItemView>
                    <ItemView>서비스 번호</ItemView>
                    <ItemView>매장명</ItemView>
                    <ItemView>브랜드</ItemView>
                </Container></LaView>
                <Line2/>
                <div style={{marginTop:12,overflowY:"scroll",maxHeight: 400,maxWidth:"100%",minHeight:200}}>
                    {
                        returnList.map((item,index)=>(
                            <LaView key={index}>
                                <ItemView>{index+1}</ItemView>
                                <ItemView>{item.receiver_name}</ItemView>
                                <ItemView>{formatDate(item.return_date)}</ItemView>
                                <ItemView>{item.receipt_code}</ItemView>
                                <ItemView>{item.store_name}</ItemView>
                                <ItemView>{item.brand_name}</ItemView>
                            </LaView>
                        ))
                    }
                </div>
              
              
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
const Line2 =styled.div`
  margin:10px;
  height:2px;
  margin-bottom:10px;
  margin-top:10px;
  background-color: ${COLOR.GRAY}
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
const CenterView = styled.div`
    font-weight: bold ;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    
`;
const ItemView = styled.div`
  font-size :12px;
  min-height: 20px;
  width :120px;
  display: flex;  
  justify-content:center
  `;
const Container = styled.div`
    display:flex; 
    min-height: 20px;
    align-items: flex-start;
`;
const CustomButton = styled.div`
  width:45px;
  height:30px;
  font-size:15px;
  color: #ffffff;
  display:flex;
  margin:10px;
  align-items: center;
  background-color: ${COLOR.BRAUN};
  border-radius : 7px;
  justify-content : center;
  &: hover {
    background-color: ${COLOR.GRAY};
  }
`;