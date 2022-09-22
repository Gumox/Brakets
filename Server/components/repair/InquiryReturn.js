import React, { useState,useEffect  } from "react";
import styled from "styled-components";
import COLOR from "../../constants/color";
import { debounce } from "lodash";
const InquiryReturn = ({item,sendLevel}) => {
  const el = item
  const [shipmentType,setShipmentType] = useState("")
  const [sender,setSender] = useState(0)
  const [windowWidth,setWindowWidth] = useState(0)
  const [windowHeight,setWindowHeight] = useState(0)
  const handleResize = debounce(()=>{
      setWindowWidth(window.innerWidth)
      setWindowHeight(window.innerHeight)
  },1000)

  const setPrice=(cost)=>{
    let after = new Number(cost)
    return after.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  useEffect(()=>{
    if(sendLevel == 1){
      setSender(el.headquarter_name)
    }else if(sendLevel == 2){
      setSender(el.store_name)
    }
    if(el.shipment_type == 1){
      setShipmentType("행낭")
    }else if(el.shipment_type == 2){
      setShipmentType("택배")
    }else if(el.shipment_type == 3){
      setShipmentType("퀵")
    }else if(el.shipment_type == 4){
      setShipmentType("행낭 (행낭 바코드 X)")
    }
  setWindowWidth(window.innerWidth)
  setWindowHeight(window.innerHeight)
  
  window.addEventListener('resize',handleResize);
  return ()=>{
      window.removeEventListener('resize',handleResize);
  }
  },[])
  return(
      <div>
          <ItemText>수선 내역</ItemText>
          <Line2/>
          <ItemText>수선처 설명</ItemText>
            <textarea disabled value={el.repair_message} style={{height:(windowHeight*0.11),backgroundColor:COLOR.WHITE,fontSize:18,padding:10,width:"100%",border:2,borderStyle:"solid",borderColor:COLOR.BRAUN,borderRadius:5,resize:"none"}}/>
          <LaView>
            <ItemText>수선처 발송일</ItemText>
            <ItemText2>{String(el.complete_date).slice(0,10)}</ItemText2>
          </LaView>
          <LaView>
            <ItemText>발송방법</ItemText>
            <ItemText2>{shipmentType}</ItemText2>
          </LaView>
          <LaView>
            <ItemText>발송비용</ItemText>
            <ItemText2>{el.shipment_price ? setPrice(el.shipment_price)+" 원": "없음"}</ItemText2>
          </LaView>
          <LaView>
            <ItemText>받는곳</ItemText>
            <ItemText2>{sender}</ItemText2>
          </LaView>
      </div>
  )
}
export default InquiryReturn
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
const CustomButton = styled.button`
  width:50px;
  height:30px;
  font-size:15px;
  color: #ffffff;
  display:flex;
  margin:10px;
  align-items: center;
  background-color: ${COLOR.BRAUN};
  border-radius : 7px;
  justify-content : center;
  
  &&:focus {     
    background-color:${COLOR.GRAY};    
`;
const ItemText = styled.div`
  font-size:15px;
  display: flex;  
  color:${COLOR.BLACK};
  font-weight: bold;
  align-items: center;
  min-width:120px;
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