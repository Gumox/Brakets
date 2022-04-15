import React,{useEffect, useState,useCallback} from 'react';
import RepairHeader from '../components/RepairHeader'
import styled from 'styled-components';
import COLOR from '../constants/color';
import axios from 'axios';
import _, { set } from "lodash";
import formatDate from '../functions/formatDate';
import store from '../store/store';
import { getBrandList,getStoreList,getTargetInfo,insertData,getReturnList,getAllReturnList,deleteRegist, getHeadquarter} from '../functions/useInReturnUnregistered';
import unregisteredListControll from '../functions/unregisteredListControll';
import checkDisable from '../functions/checkDisable';
import { parseReturnunRegisteredData } from '../functions/parseExcelData';
import Image from 'next/image'

const XLSX = require('xlsx');

export default function ReturnUnregistered() {
    
    const [selectedCompany,setSelectedCompany] = useState(null)
    const [companyList,setCompanyList] = useState([])
    const [code,setCode] = useState()
    const [brandList,setBrandList] = useState([])
    const [repairShopList,setRepairShopList] = useState([])
    const [shopId,setShopId] = useState(store.getState().shop)

    const [returnList,setReturnList] = useState([])
    const [resultList,setResultList] = useState([])
    
    const [shopName,setShopName] = useState('')
    
    const [hq_id,setHqId] = useState(null)
    const [repair,setRepair] = useState(null)
    const [brand,setBrand] = useState(null)
    const [startDate,setStartDate] = useState(null)
    const [endDate,setEndDate] = useState(null)
    const [disable,setDisable] = useState(true)
    
    const searchTarget = (hq_id,repair,brand,startDate,endDate)=>{
        const result = unregisteredListControll(returnList,hq_id,repair,brand,startDate,endDate)
        setResultList(result)
    }
    const deleteInList=(item)=>{
        let result=[]
        returnList.map((el)=>{
            if(el.receipt_code!= item.receipt_code){
                result.push(el)
            }
        })
        if(item.level === 0){
            deleteRegist(item.return_id)
        }
        setResultList(result);
        setResultList(result);
        
    }
    const insertReturnList=async(list)=>{
        const result= await insertData(list)
        //console.log(result)
        if(result.msg){
            let data=[]
            returnList.map((el)=>{
                let obj =el;    
                obj.level = 0
                data.push(obj)
            })
            setReturnList(data)
            setReturnList(data) //for refresh
        }
    }
    const getExcel =(data)=>{
        const dataWS = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, dataWS, "sheet1");
        XLSX.writeFile(wb, "미등록 반송 목록.xlsx");
      }
    const handleKeyPress = useCallback(async(e,code,returnList) => {
          if (e.key !== "Enter"){return;}
          else{
            let input = await getTargetInfo(code,(localStorage.getItem('SHOP')*1),shopName);
            
            if(input.length){
                let toDay = formatDate(new Date())
            
                input[0].return_date = toDay
                
                returnList.push(input[0])
                setReturnList(_.uniqBy(returnList,"receipt_code"))
                setResultList(_.uniqBy(returnList,"receipt_code"))//for refresh
                return;
            }else{
                alert("잘못된 서비스카드 번호 입니다")
            }
          }
        },[shopName]
      );
    
    useEffect( ()=>{
        const fetchData = async () => {
            setShopName(localStorage.getItem('SHOP_NAME'))
             
            setShopId(localStorage.getItem('SHOP'))
            let list =await getBrandList();
            list.unshift({brand_id: "",brand_name: "전체"})

            let list2 =await getStoreList();
            list2.unshift({store_id: "",name: "전체"})
            let user = JSON.parse(localStorage.getItem('USER'))
            setDisable(checkDisable(user.level))
            let cpList = await getHeadquarter()
            let returnListData;
            if(checkDisable(user.level)){
                //console.log("****************************")
                returnListData = await getAllReturnList()
                //console.log(returnListData)
                //console.log("****************************")
            }else{
                returnListData = await getReturnList(localStorage.getItem('SHOP')*1,localStorage.getItem('SHOP_NAME'))
            }
            //console.log(cpList)
            //console.log("****************************")
            setReturnList(returnListData)
            setResultList(returnListData) //for refresh
            setBrandList(list);
            setCompanyList(cpList)
            setRepairShopList(list2)
        }
        fetchData();
    },[])
    return(
        
        <Nav style={{minWidth:1150}}>
            <RepairHeader/>
            <div style={{paddingLeft: "2%",paddingRight: "2%"}}>
                <TopView>
                <h2>미등록 반송</h2>
                    <Image alt='excel' src='/icons/excel.png' width={45} height={40} onClick={()=>{getExcel(parseReturnunRegisteredData(resultList))}}/>
            </TopView>
                <Line/>
                <Container>
                    <div style={{display:'flex',alignItems:"center",justifyContent:"center",width:"100%",fontSize:15,fontWeight:"bold",msOverflowStyle:"none"}}>회사 설정 :
                    <select onChange={(e)=>{setHqId(e.target.value)}}  style={{marginLeft:10,marginRight: 10,minWidth:200,minHeight:30}} >
                        {companyList.map((item) => (
                            <option value={item.value} key={item.value}>
                            {item.text}
                        </option>
                        ))}
                    </select>
                    <button 
                        style={{marginLeft:10,width:40,height:22,fontSize:12,backgroundColor : "#4f4f4f", color: COLOR.WHITE}}
                        onClick={()=>{searchTarget(hq_id,repair,brand,startDate,endDate)}}>
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
                    <select name="soosun"  style={{marginLeft:10,marginRight: 10,height:22}} onChange={(e)=>{setRepair(e.target.value)}}>
                        {   
                            repairShopList.map((item,index)=>(
                                <option key={index} value={item.store_id}>{item.name}</option>
                            ))
                        }
                    </select>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    브랜드 : 
                    <select name="brand"  style={{marginLeft:10,marginRight: 10,height:22}}  
                        onChange={(e)=>{
                            //console.log(e.target.value)
                            if(e.target.value){
                                setBrand(e.target.value)
                            }else{
                                setBrand(null)    
                            }
                        }}>
                        {   
                            brandList.map((item,index)=>(
                                <option key={index} value={item.brand_id}>{item.brand_name}</option>
                            ))
                        }
                    </select>
                    
                    
                    <input type="date" style={{marginLeft:20,marginRight:20,height:22}}  onChange={(e)=>{setStartDate(new Date(e.target.value))}} />
                    ~    
                    <input type="date"  style={{marginLeft:20,height:22}} onChange={(e)=>{setEndDate(new Date(e.target.value))}}/>
                    <button 
                        style={{marginLeft:10,width:40,height:22,fontSize:12,backgroundColor : "#4f4f4f", color: COLOR.WHITE}}
                        onClick={()=>{searchTarget(hq_id,repair,brand,startDate,endDate)}}
                        >조회</button>  
                    </CenterView>
                </Container> 
                
                <br/>
                <Container><div style={{fontWeight:"bold"}}>미등록 반송 등록</div></Container>
                
                   
                    <CenterView>       
                        <div style={{fontWeight:"bold"}} >서비스 카드 번호 : </div>
                        <input style={{marginLeft:15,height:22}} onChange={(e)=>{setCode(e.target.value)}} onKeyPress={(e)=>{handleKeyPress(e,code,returnList)}}></input> 
                        
                        
                    </CenterView>
                    <br/>
                    <CenterView>
                    <div style={{color :"#ff0000"}}>
                        ⚠️직접 입력 후 엔터를 누르거나 바코드 리더기를 이용해주세요
                    </div>
                    </CenterView>
                
                <br/>
                <br/>
            <div style={{display:"flex",flexDirection:"row-reverse",width:"100%"}}>
                <CustomButton onClick={()=>{
                    insertReturnList(returnList)
                    }}>
                    저장
                </CustomButton>
            </div>
            
            <Line/>
            <ItemTable >
                
                <div style={{paddingTop:12,position:"sticky",top:0,zIndex:10,backgroundColor:COLOR.WHITE}}>
                    <LaView><Container>
                        <ItemView>#</ItemView>
                        <ItemView>등록처</ItemView>
                        <ItemView>미등록 반송 등록일</ItemView>
                        <ItemView>서비스 번호</ItemView>
                        <ItemView>받는곳</ItemView>
                        <ItemView>고객이름</ItemView>
                        <ItemView>매장명</ItemView>
                        <ItemView>브랜드</ItemView>
                    </Container></LaView>
                </div>
                <Line2/>
                <Nav style={{marginTop:12,maxHeight: 400,maxWidth:"100%",minHeight:200}}>
                    {
                        resultList.map((item,index)=>(
                            <LaView key={index}>
                                <ItemView>{index+1}</ItemView>
                                <ItemView>{item.shop_name}</ItemView>
                                <ItemView>{item.return_date}</ItemView>
                                <ItemView>{item.receipt_code}</ItemView>
                                <ItemView>{item.receiver_name}</ItemView>
                                <ItemView>{item.customer_name}</ItemView>
                                <ItemView>{item.store_name}</ItemView>
                                <ItemView>{item.brand_name}</ItemView>
                                <ItemView><TrashImgStyle src='/icons/trash.png' onClick={()=>{deleteInList(item)}}/></ItemView>
                            </LaView>
                        ))
                    }
                </Nav>
   
            </ItemTable>
            </div>
            <br/>
            <br/>
        </Nav>
    )
}
const Nav = styled.nav`
  overflow-y: auto;
  height: 100%;
  &::-webkit-scrollbar {
    width: 8px;
    height: 10px;
    background: rgba(210, 210, 210, 0.3);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(96, 96, 96, 0.7);
    border-radius: 6px;
  }
`;
const TrashImgStyle  = styled.img`
    width:20px;
    height:18px;
    border-radius:5px;
    &: hover {
        background-color: ${COLOR.GRAY};
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

const TopView = styled.div`
    padding:10px;
    display: flex;  
    align-items:center;
    justify-content: space-between;      
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
const CustomButton = styled.button`
  width:45px;
  height:30px;
  font-size:12px;
  color: #ffffff;
  margin:10px;
  background-color: ${COLOR.BRAUN};
  border-radius : 7px;
  justify-content : center;
  &: hover {
    background-color: ${COLOR.GRAY};
  }
`;