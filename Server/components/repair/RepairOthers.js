import React, { useState } from "react";
import styled from "styled-components";
import COLOR from "../../constants/color";
const RepairOthers = (props) => {
    return(
        <div>
            <ItemText>수선 내역</ItemText>
            <Line2/>
            <ItemText>수선처 설명</ItemText>
            <ItemTable>
              <input style={{margin:5,minHeight:60,width:"98%",border:0}}></input>
            </ItemTable>
        </div>
    )
}
export default RepairOthers

const ItemText = styled.div`
  font-size:15px;
  display: flex;  
  color:${COLOR.BLACK};
  font-weight: bold;
  align-items: center;
  flex:1;
  margin-left:20px;
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