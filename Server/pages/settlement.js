import React, { useEffect, useState } from "react";
import RepairHeader from '../components/RepairHeader'
import store from '../store/store'
import COLOR from '../constants/color'
import styled from 'styled-components'
export default function Settlement()  {
    const [companyList,setCompanyList] = useState(store.getState().company)
    const [shopName,setShopName] = useState('')
    
    useEffect(()=>{
        setCompanyList(JSON.parse(localStorage.getItem('COMPANY')))
        setShopName(localStorage.getItem('SHOP_NAME'))
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
                            <div>{shopName}</div>
                            <h3 style={{marginLeft:10,minWidth:50, minHeight:22}}>기준</h3>
                            <select style={{marginLeft:10,marginRight: 10, minWidth:100, minHeight:22}} >
                                
                            </select>
                        
                            <input type="date" style={{marginLeft:30}}/>
                            <h5 style={{marginLeft:20,marginRight:20, display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center"}}>-</h5>
                            <input type="date"/>
                            <CustomButtonBlack style={{marginLeft:20}}>조회</CustomButtonBlack>
                        </LaView>
                    </div>
                    <ItemTable>

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
const LaView = styled.div`
    padding:10px;
    display: flex;  
    align-items:center;
    flex-direction: coloum ;

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
const CustomButtonBlack = styled.div`
  width:45px;
  height:22px;
  font-size:15px;
  color: #ffffff;
  display:flex;
  margin:10px;
  align-items: center;
  background-color: #4F4F4F;
  border-radius : 5px;
  justify-content : center;
  &: hover {
    background-color: ${COLOR.GRAY};
  }
`;