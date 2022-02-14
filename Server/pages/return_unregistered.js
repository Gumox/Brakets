import React,{useState} from 'react';
import RepairHeader from '../components/RepairHeader'
import styled from 'styled-components';
import COLOR from '../constants/color';
import axios from 'axios';
import store from '../store/store';

export default function Return_unregistered() {
    
    const [selectedCompany,setSelectedCompany] = useState(null)
    const companyList = store.getState().company
    const handleSelect = (e) => {
        setSelectedCompany(e.target.value)
        console.log(selectedCompany)
    };
    return(
        <div style={{minWidth:1150, overflowY:"scroll"}}>
            <RepairHeader/>
            <div style={{paddingLeft: "10%",paddingRight: "10%"}}>
                <h3>미등록 반송</h3>
                <Line/>
                <Container>
                    <div style={{display:'flex',alignItems:"center",justifyContent:"center",width:"100%",fontSize:15,fontWeight:"bold",msOverflowStyle:"none"}}>회사 설정 :
                    <select onChange={(e)=>handleSelect(e)}  style={{marginLeft:10,marginRight: 10,minWidth:200,minHeight:30}} >
                        {companyList.map((item) => (
                            <option value={item.key} key={item.key}>
                            {item.name}
                        </option>
                        ))}
                    </select>
                    <button 
                        style={{marginLeft:10,width:40,height:22,fontSize:12,backgroundColor : "#4f4f4f", color: COLOR.WHITE}}
                        onClick={()=>{getOptions()}}>
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
                        <option value="soo">수선처1</option>
                        <option value="soos">수선처2</option>
                        <option value="soosu">수선처3</option>
                    </select>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    브랜드 : 
                    <select name="brand"  style={{marginLeft:10,marginRight: 10}} >
                        <option value="br">브랜드1</option>
                        <option value="bra">브랜드2</option>
                        <option value="bran">브랜드3</option>
                    </select>
                    
                    
                    <input type="date" style={{marginLeft:20,marginRight:20,height:22}}></input>
                    ~    
                    <input type="date"  style={{marginLeft:20,height:22}}></input>
                    <button 
                        style={{marginLeft:10,width:40,height:22,fontSize:12,backgroundColor : "#4f4f4f", color: COLOR.WHITE}}
                        onClick={()=>{getOptions()}}
                        >조회</button>  
                    </CenterView>
                </Container> 
                
                <br/>
                <Container><div style={{fontWeight:"bold"}}>미등록 반송 등록</div></Container>
                
                   
                    <CenterView>       
                        <div style={{fontWeight:"bold"}}>서비스 카드 번호 : </div>
                        <input style={{marginLeft:15,height:22}}></input> 
                        <button 
                            style={{marginLeft:10,width:40,height:22,fontSize:12,backgroundColor : "#4f4f4f", color: COLOR.WHITE}}
                            onClick={()=>{getOptions()}}
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
                
            <Line/>
            <ItemTable >
                <div style={{marginTop:12,overflowY:"scroll",maxHeight: 400,maxWidth:"100%"}}>
                <LaView><Container>
                    <ItemView>#</ItemView>
                    <ItemView>수선처</ItemView>
                    <ItemView>미등록 반송 등록일</ItemView>
                    <ItemView>서비스 번호</ItemView>
                    <ItemView>매장명</ItemView>
                    <ItemView>브랜드</ItemView>
                </Container></LaView>
                <Line2/>

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
