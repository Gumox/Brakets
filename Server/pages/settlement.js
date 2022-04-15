import React, { useEffect, useState ,useCallback} from "react";
import RepairHeader from '../components/RepairHeader'
import store from '../store/store'
import COLOR from '../constants/color'
import styled from 'styled-components'
import checkDisable from '../functions/checkDisable';
import SettlementResult from "../components/repair/SettlementResult";
import { debounce, set } from "lodash";
import { getSettlementData,getBrandList,setStateAtOne,setStateAtTwo,updateContentEdit} from "../functions/useInSettlement";
import { getRepairType } from "../functions/useInRepairReceiptModal";
import Image from 'next/image';
import _ from "lodash";

const XLSX = require('xlsx');

export default function Settlement()  {
    const [companyList,setCompanyList] = useState(store.getState().company)
    const [shop,setShop] = useState(0)
    const [shopName,setShopName] = useState('')
    const [user,setUser] = useState()

    const [userInfo,setUserInfo] = useState();
    
    const [hqId,setHqId] = useState()
    const [selectOption,setSelectOption] = useState(null)
    const [startDate,setStartDate] = useState(null)
    const [endDate,setEndDate] = useState(null)
    const [brand,setBrand] = useState(null)



    const [disable,setDisable] = useState(true)
    const [settlementList,setSettlementList] = useState([])
    const [types,setTypes] =useState([])
    const [windowWidth,setWindowWidth] = useState(0)
    const [windowHeight,setWindowHeight] = useState(0)
    const handleResize = debounce(()=>{
        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
    },1000)
    const [excelList,setExcelList]= useState([])
    let chlidlist=[];

    const [selectShopOption,setSelectShopOption] = useState()

    const [checkList,setCheckList] = useState([]);

    const onClickOptionOne=(list)=>{
        setStateAtOne(list)
        location.reload();
    }
    const onClickOptionTwo=(list)=>{
        setStateAtTwo(list)
        location.reload()
    }
    const onClickOptionEdit=(list)=>{
        updateContentEdit(list)
        location.reload()
    }
    const setTable = async(parmas)=>{
        let list = await getSettlementData(parmas)
        //console.log(list)

        setSettlementList(list.data)
    }
    const excelListSet =useCallback((obj,index)=>{
        
        
        chlidlist[index]=obj
        setExcelList(chlidlist)
        //setExcelList([...excelList,obj])
    },[excelList])
    const sortCheckedList=(list)=>{
        let newList =[];
        list.map((item)=>{
            if(item.repair_detail_id){
                newList.push(item)
            }
        })
        //console.log(newList)
        return newList
    }
    const getExcel =(data)=>{
        const dataWS = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, dataWS, "sheet1");
        XLSX.writeFile(wb, "수선비 정산 목록.xlsx");
    }
    useEffect(()=>{
        setUserInfo(JSON.parse(localStorage.getItem('USER_INFO')))
        const fetchData = async () => {
        
            setCompanyList(JSON.parse(localStorage.getItem('COMPANY')))
            setShopName(localStorage.getItem('SHOP_NAME'))
            setShop(localStorage.getItem('SHOP'))
            let user = JSON.parse(localStorage.getItem('USER'))
            setUser(user)
            setDisable(checkDisable(user.level))
            let selectShop
            let typeList = await getRepairType(null,null,localStorage.getItem('SHOP'))
            if(!checkDisable(user.level)){
                let list = await getSettlementData({repairShop: localStorage.getItem('SHOP')})
                //console.log(_.sortBy(list.data,'receipt_code'))
                setSettlementList(_.sortBy(list.data,'receipt_code'))
                selectShop=(
                    <div>{localStorage.getItem('SHOP_NAME')}</div>
                )
            }else{
                let list = await getSettlementData({repairShop:null})
                
                let brandList =await getBrandList();
                brandList.unshift({brand_id: "",brand_name: "전체"})
                

                setSettlementList(_.sortBy(list.data,'receipt_code'))
                selectShop=(
                    <select style={{marginLeft:10,marginRight: 10, minWidth:100, minHeight:22}} onChange={(e)=>{
                        setBrand(e.target.value)
                    }}>
                        {
                            brandList.map((item,index)=>(
                                <option key={index} value={item.brand_id}>{item.brand_name}</option>
                            ))
                        }        
                    </select>
                )
            }
            setTypes(typeList)
            setSelectShopOption(selectShop)
        }
        fetchData();
        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
        window.addEventListener('resize',handleResize);
        return ()=>{
            window.removeEventListener('resize',handleResize);
        }
    },[]) 
    return(
        <Nav >
        <RepairHeader/>
        <div style={{paddingLeft: "2%",paddingRight: "2%"}}>
        <TopView>
              <h2>수선비 정산</h2>

              
              <Image alt="excel" src='/icons/excel.png' width={45} height={40} onClick={()=>{getExcel(excelList)}} />
              
        </TopView>
        <Line/>
            <br/>
            <br/>
            <Container>회사 설정 :
            <select style={{marginLeft:10,marginRight: 10}} 
                onChange={(e)=>{
                    //console.log(e.target.value)
                    setHqId(e.target.value)
                }}>
                {companyList.map((item) => (
                    <option value={item.key} key={item.key}>
                    {item.name}
                </option>
                ))}
            </select>
            </Container>
            <br/>
            <br/>
            <hr/>
            <div>
                    <h3>수선비 정산</h3>
                    <div style={{display:"flex",justifyContent:"space-around"}}>
                        <LaView>
                            <h3 style={{minWidth:50, minHeight:22}}>수선처</h3>
                            {selectShopOption}
                            <h3 style={{marginLeft:10,minWidth:50, minHeight:22}}>기준</h3>
                            <select style={{marginLeft:10,marginRight: 10, minWidth:100, minHeight:22}} 
                                onChange={(e)=>{
                                    //console.log(e.target.value)
                                    setSelectOption(e.target.value)
                                }}
                            >
                                <option value="">선택</option>
                                <option value="register_date">수선업체 접수일</option>
                                <option value="complete_date">수선업체 발송일</option>
                            </select>
                        
                            <input type="date" style={{marginLeft:30}} onChange={((e)=>{
                                setStartDate(e.target.value);
                            })}/>
                            <h5 style={{marginLeft:20,marginRight:20, display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>-</h5>
                            <input type="date" onChange={((e)=>{
                                setEndDate(e.target.value);
                            })}/>
                            <CustomButtonBlack style={{marginLeft:20}}
                                onClick={()=>{
                                    setTable({
                                        hq_id : hqId,
                                        brand: brand,
                                        repairShop : shop,
                                        selectOption : selectOption,
                                        startDate : startDate,
                                        endDate : endDate
                                    })
                                }}
                            >조회</CustomButtonBlack>
                        </LaView>
                    </div>
                    <div style={{width : "100%",display:"flex",flexDirection:"row-reverse"}}>
                        <ButtonCheck disabled = {!disable} onClick={()=>{onClickOptionTwo( sortCheckedList(checkList))}}>본사확인</ButtonCheck>
                        <ButtonRepairCheck onClick={()=>{
                            onClickOptionOne( sortCheckedList(checkList))
                            //console.log(sortCheckedList(checkList))
                           
                            }}>수선처확인</ButtonRepairCheck>
                        <ButtonCheckC  disabled = {!disable} onClick={()=>{onClickOptionEdit(sortCheckedList(checkList))}}>내용 수정</ButtonCheckC>
                    </div>
                    <ItemTable>
                    <Nav style={{overflow:"auto",maxHeight: 400,maxWidth:"100%",minHeight:(windowHeight)*0.5}}>
                        
                            <div style={{paddingTop:12,position:"sticky",top:0,zIndex:10,backgroundColor:COLOR.WHITE}}>
                    <Line2 style={{ minWidth:1200}}>
                            <LaView ><Container>
                                <CheckBoxView>#</CheckBoxView>
                                <ItemView style={{width:(windowWidth)*0.0692, minWidth:82}}>브랜드</ItemView>
                                <ItemView style={{width:(windowWidth)*0.0692, minWidth:82}}>서비스 번호</ItemView>
                                
                                <ItemView style={{width:(windowWidth)*0.0692, minWidth:82}}>수선처</ItemView>
                                <ItemView style={{width:(windowWidth)*0.0692, minWidth:82}}>고객정보</ItemView>
                                <ItemView style={{width:(windowWidth)*0.0692, minWidth:120}}>수선내용(수량)</ItemView>
                                <ItemView style={{width:(windowWidth)*0.0692, minWidth:82}}>상태</ItemView>
                                <ItemView style={{width:(windowWidth)*0.0692, minWidth:82}}>본사 당담자</ItemView>
                                <ItemView style={{width:(windowWidth)*0.0692, minWidth:82}}>수선비</ItemView>
                                <ItemView style={{width:(windowWidth)*0.0692, minWidth:82}}>수정 수선비</ItemView>
                                <ItemView style={{width:(windowWidth)*0.0692, minWidth:82}}>최종수선비</ItemView>
                                <ItemView style={{width:(windowWidth)*0.0692, minWidth:82}}>수정사유</ItemView>
                                <ItemView style={{width:(windowWidth)*0.0692, minWidth:82}}>수선처 당담자</ItemView>
                                <ItemView style={{width:(windowWidth)*0.0692, minWidth:82}}>비고</ItemView>
                            </Container></LaView>
                            
                        </Line2>
                        </div>
                   
                        
                        {   
                            settlementList.map((item,index)=>(
                                <SettlementResult key = {index} data ={item} type ={types} index={index} staffCode ={userInfo.staff_code} excelList={excelList} checkList={checkList} {...{excelListSet,setExcelList,setCheckList}}></SettlementResult>
                            ))
                            
                        }
                    </Nav>
    
                    </ItemTable>
            </div>
            <br/>
            <br/>
        </div>
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
const TopView = styled.div`
    padding:10px;
    display: flex;  
    align-items:center;
    justify-content: space-between;      
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
const ItemTable = styled.div`
  border: 2px solid  ${COLOR.BRAUN};
  min-width:100%;
  min-height:200px;

`;
const Line2 =styled.div`
  border-bottom:2px solid  ${COLOR.GRAY};
`;
const Container = styled.div`
    display:flex; 
    min-height: 20px;
    align-items: flex-start;
`;
const CheckBoxView = styled.div`
  font-size :12px;
  min-height: 20px;
  width :50px;
  display: flex;  
  justify-content:center;
  padding-bottom : 20px;
  `;
const ItemView = styled.div`
  font-size :12px;
  min-height: 20px;
  display: flex;  
  justify-content:center;
  padding-bottom : 20px;
  background-color:${COLOR.WHITE}
  `;
const LaView = styled.div`
    display: flex;  
    align-items:center;
    flex-direction: coloum ;
`;
const ButtonRepairCheck = styled.button`
  width:100px;
  height:30px;
  font-size:12px;
  color: #000000;
  margin:10px;
  background-color: ${COLOR.MADARIN};
  boerder:0px;
  border-radius : 7px;
  justify-content : center;
  &&:focus {     
    background-color:${COLOR.DARK_ORANGE};    
}
  
`;
const ButtonCheck = styled.button`
  width:90px;
  height:30px;
  font-size:12px;
  color: #000000;
  margin:10px;
  background-color: ${COLOR.MENU_MAIN};
  border-radius : 7px;
  justify-content : center;
  &&:focus {     
    background-color:${COLOR.INDIGO};    
  
`;
const ButtonCheckC = styled.button`
  width:90px;
  height:30px;
  font-size:12px;
  color: #000000;
  margin:10px;
  background-color: ${COLOR.GREEN};
  border-radius : 7px;
  justify-content : center;
  &&:focus {     
    background-color:${COLOR.INDIGO};    
  
`;
const CustomButtonBlack = styled.button`
  width:55px;
  height:23px;
  font-size:12px;
  color: #ffffff;
  margin:10px;
  background-color: #4F4F4F;
  border-radius : 5px;
  justify-content : center;
  &: hover {
    background-color: ${COLOR.GRAY};
  }
`;