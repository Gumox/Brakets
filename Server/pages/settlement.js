import React, { useEffect, useState } from "react";
import RepairHeader from '../components/RepairHeader'
import store from '../store/store'
import COLOR from '../constants/color'
import styled from 'styled-components'
import checkDisable from '../functions/checkDisable';
import SettlementResult from "../components/SettlementResult";
import { getSettlementData ,setStateAtOne,setStateAtTwo} from "../functions/useInSettlement";

export default function Settlement()  {
    const [companyList,setCompanyList] = useState(store.getState().company)
    const [shopName,setShopName] = useState('')
    const [userInfo,setUserInfo] = useState()
    const [disable,setDisable] = useState(true)
    const [settlementList,setSettlementList] = useState([])
    
    let [selectShopOption,setSelectShopOption] = useState()

    const onClickOpionOne=(list)=>{
        setStateAtOne(list)
        location.reload();
    }
    const onClickOpionTwo=(list)=>{
        setStateAtTwo(list)
        location.reload()
    }
    useEffect(async()=>{
        setCompanyList(JSON.parse(localStorage.getItem('COMPANY')))
        setShopName(localStorage.getItem('SHOP_NAME'))
        let user = JSON.parse(localStorage.getItem('USER'))
        setUserInfo(user)
        setDisable(checkDisable(user.level))
        let selectShop
        let list = await getSettlementData({repairShop: localStorage.getItem('SHOP')})
        let list2 = await getSettlementData({repairShop:null})
        if(!checkDisable(user.level)){
            
            setSettlementList(list.data)
            selectShop=(
                <div>{localStorage.getItem('SHOP_NAME')}</div>
            )
        }else{
            
            setSettlementList(list2.data)
            selectShop=(
                <select style={{marginLeft:10,marginRight: 10, minWidth:100, minHeight:22}} >
                                    
                </select>
            )
        }
        setSelectShopOption(selectShop)
        return () => setLoading(false);
    },[])   
    return(
        <div style={{height:"100%",overflowY: "scroll"}}>
        <RepairHeader/>
        <div style={{paddingLeft: "10%",paddingRight: "10%"}}>
        <h2 style={{fontWeight:"bold"}}>수선비 정산</h2><Line/>
            <br/>
            <br/>
            <Container>회사 설정 :
            <select style={{marginLeft:10,marginRight: 10}} 
                onChange={(e)=>{
                    setSelectedCompany(e.target.value)
                    setTable({
                        shop_id: shop_id,
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
                            <select style={{marginLeft:10,marginRight: 10, minWidth:100, minHeight:22}} >
                                <option value="">수선업체 접수일</option>
                                <option value="">수선업체 발송일</option>
                            </select>
                        
                            <input type="date" style={{marginLeft:30}}/>
                            <h5 style={{marginLeft:20,marginRight:20, display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>-</h5>
                            <input type="date"/>
                            <CustomButtonBlack style={{marginLeft:20}}>조회</CustomButtonBlack>
                        </LaView>
                    </div>
                    <div style={{width : "100%",display:"flex",flexDirection:"row-reverse"}}>
                        <ButtonCheck disabled = {!disable} onClick={()=>{onClickOpionTwo(store.getState().selected)}}>본사확인</ButtonCheck>
                        <ButtonRepairCheck disabled = {disable} onClick={()=>{onClickOpionOne(store.getState().selected)}}>수선처확인</ButtonRepairCheck>
                    </div>
                    <ItemTable>
                        
                    <div style={{marginTop:12,overflow:"auto",maxHeight: 400,maxWidth:"100%",minHeight:200}}>
                            <LaView ><Container>
                                <ItemView>#</ItemView>
                                <ItemView>브랜드</ItemView>
                                <ItemView>서비스 번호</ItemView>
                                
                                <ItemView>매장정보</ItemView>
                                <ItemView>고객정보</ItemView>
                                <ItemView>수선내용(수량)</ItemView>
                                <ItemView>상태</ItemView>
                                <ItemView>본사 당담자</ItemView>
                                <ItemView>수선비</ItemView>
                                <ItemView>수정 수선비</ItemView>
                                <ItemView>최종수선비</ItemView>
                                <ItemView>수정사유</ItemView>
                                <ItemView>수선처 당담자</ItemView>
                                <ItemView>비고</ItemView>
                            </Container></LaView>
                        {   
                            settlementList.map((item,index)=>(
                                <SettlementResult key = {index} data ={item}></SettlementResult>
                            ))
                            
                        }
                    </div>
    
                    </ItemTable>
            </div>
            
            
        
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
const ItemTable = styled.div`
  border: 2px solid  ${COLOR.BRAUN};
  min-width:100%;
  min-height:200px;

`;
const Line2 =styled.div`
  margin:10px;
  height:2px;
  margin-bottom:10px;
  margin-top:10px;
  background-color: ${COLOR.GRAY}
`;
const Container = styled.div`
    display:flex; 
    min-height: 20px;
    align-items: flex-start;
`;

const ItemView = styled.div`
  font-size :12px;
  min-height: 20px;
  width :120px;
  display: flex;  
  justify-content:center;
  padding-bottom : 20px;
  border-bottom:2px solid ${COLOR.GRAY};
  `;
const LaView = styled.div`
    padding:10px;
    display: flex;  
    align-items:center;
    flex-direction: coloum ;

`;
const ButtonRepairCheck = styled.button`
  width:100px;
  height:30px;
  font-size:15px;
  color: #000000;
  margin:10px;
  background-color: ${COLOR.MADARIN};
  boerder:0px;
  border-radius : 7px;
  justify-content : center;
  
`;
const ButtonCheck = styled.button`
  width:90px;
  height:30px;
  font-size:15px;
  color: #000000;
  margin:10px;
  background-color: ${COLOR.MENU_MAIN};
  border-radius : 7px;
  justify-content : center;
  
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