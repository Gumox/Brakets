import React, { useState,useEffect  } from "react";
import styled from "styled-components";
import COLOR from "../../constants/color";
import { debounce } from "lodash";
import { getReceiptRepairInfo} from "../../functions/useInRepairReceiptModal";
const InquiryOthers = ({item}) => {
  
  const el =item;
  const [windowWidth,setWindowWidth] = useState(0)
  const [windowHeight,setWindowHeight] = useState(0)
  const handleResize = debounce(()=>{
      setWindowWidth(window.innerWidth)
      setWindowHeight(window.innerHeight)
  },1000)

  useEffect(()=>{
    const fetchData = async () => {

      const info =await getReceiptRepairInfo(receipt_id);
      sortInfo(info.body[0])
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
        <div>
            <ItemText>수선 내역</ItemText>
            <Line2/>
            <ItemText>수선처 설명</ItemText>
            <textarea disabled value={el.repair_message} style={{height:(windowHeight*0.11),backgroundColor:COLOR.WHITE,fontSize:18,padding:10,width:"100%",border:2,borderStyle:"solid",borderColor:COLOR.BRAUN,borderRadius:5,resize:"none"}}/>
        </div>
    )
}
export default InquiryOthers

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