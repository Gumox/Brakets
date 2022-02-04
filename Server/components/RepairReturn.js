import React, { useState } from "react";
import styled from "styled-components";
import COLOR from "../constants/color";
const RepairReturn = (props) => {
    const reciver = props.reciver;
    return(
        <div>
            <ItemText>수선 내역</ItemText>
            <Line2/>
            <ItemText>수선처 설명</ItemText>
            <ItemTable>
              <input style={{margin:5,minHeight:60,width:"98%",border:0}}></input>
            </ItemTable>
            <LaView><ItemText>수선처 발송일</ItemText>
                    <input type="date" style={{marginLeft:10,marginTop:20,marginBottom:10}}></input><div style={{color :"#ff0000",marginTop:10,marginLeft:10}}><h6>⚠️발송일 입력없이 저장이 불가능합니다</h6></div></LaView>
            <LaView>
                <ItemText>발송방법</ItemText>
                <select onChange={(e)=>{}}  style={styles.selectStyle} >
                  <option value={1} key={'행낭'}>행낭</option>
                  <option value={3} key={'택배'}>택배</option>
                  <option value={4} key={'퀵배송'}>퀵배송</option>
                  <option value={5} key={'행낭 (행낭 바코드 X)'}>행낭 (행낭 바코드 X)</option>
                </select>
            </LaView>
            <LaView>
                <ItemText>발송비용</ItemText>
                <input type="number" min="0" style={{ marginLeft:20,marginTop:10,width:145,borderWidth:0,borderBottomWidth:2}} />
            </LaView>
            <LaView><ItemText>받는곳</ItemText><ItemText2>{reciver}</ItemText2></LaView>
            <div style={{marginTop:50,display:"flex",justifyContent:"space-around",alignItems:"center"}}>
            <CustomButton onClick={()=>{}}>취소</CustomButton>
            <CustomButton onClick={()=>{}}>저장</CustomButton>
            </div>
        </div>
    )
}
export default RepairReturn
const styles = {
    selectStyle:{
      marginLeft:10,
      marginRight:10,
      borderTop:0,
      borderLeft:0,
      borderRight:0,
      paddingBottom:5,
      borderBottomWidth:2,
      borderColor:COLOR.BRAUN,
      marginTop:20,
      marginBottom:10,
      marginLeft:20,
    }
  };
const LaView = styled.div`
  display: flex;  
  margin:5px;
  align-items:center;
  flex-direction: row;
`;
const CustomButton = styled.div`
  width:45px;
  height:30px;
  font-size:15px;
  color: #ffffff;
  display:flex;
  align-items: center;
  background-color: ${COLOR.BRAUN};
  border-radius : 7px;
  justify-content : center;
  &: hover {
    background-color: ${COLOR.GRAY};
  }
`;
const ItemText = styled.div`
  font-size:15px;
  display: flex;  
  color:${COLOR.BLACK};
  font-weight: bold;
  align-items: center;
  margin-left:20px;
  margin-top:20px;
  margin-bottom:10px;
`;
const ItemText2 = styled.div`
  font-size:15px;
  display: flex;  
  color:${COLOR.BRAUN};
  font-weight: bold;
  align-items: center;
  margin-left:35px;
  margin-top:20px;
  margin-bottom:10px;
`;
const Line2 = styled.div`
  margin:10px;
  height:1.5px;
  margin-bottom:10px;
  margin-top:10px;
  background-color: #C4C4C4
`;
const ItemTable = styled.div`
  border: 2px solid  ${COLOR.BRAUN};
  margin-right:10px;
  margin-left:10px;
  min-height : 60px

`;