import React, { useState,useEffect  } from "react";
import styled from "styled-components";
import COLOR from "../../constants/color";
import { debounce } from "lodash";
import { getReceiptRepairInfo} from "../../functions/useInRepairReceiptModal";
import formatDate from "../../functions/formatDate";
const RepairOthers = ({
  shopId,
  receiver,
  receipt,
  closeTooltip=()=>{}
  }) => {
  
  const shop = shopId;
  const receipt_id = receipt;
  const [message,setMessage] = useState("");
  const [repairDetailId, setRepairDetailId] = useState(null)
  const [windowWidth,setWindowWidth] = useState(0)
  const [windowHeight,setWindowHeight] = useState(0)
  const handleResize = debounce(()=>{
      setWindowWidth(window.innerWidth)
      setWindowHeight(window.innerHeight)
  },1000)
  const onSave = async()=>{
    
    let res;
    const today = formatDate(new Date())
    const body ={
      receipt_id : receipt_id,

      store_id : shop,
      fault_id: null,
      result_id: null,
      receiver: receiver,
      analysis_id: null,
      delivery_type: null,
      register_date: today,

      complete_date : null,
      message: message,
      shipment_type: null,
      shipment_price: 0,
      repair_detail_id : repairDetailId
    }
    fetch(`${process.env.API_URL}/RepairShop/sendRepairReturn`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
    },
      body: JSON.stringify(body)
    })
    .then(response => res=response.json())
    window.location.reload();
  }
  const sortInfo=(info)=>{
    if(shop == info.repair1_store_id){
        setMessage(info.repair1_message);
        setRepairDetailId(info.repair1_detail_id)
    }else if(shop == info.repair2_store_id){
        setMessage(info.repair2_message);
        setRepairDetailId(info.repair2_detail_id)
    }else if(shop == info.repair3_store_id){
        setMessage(info.repair3_message);
        setRepairDetailId(info.repair3_detail_id)
    }
  }
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
            <textarea value={message} style={{height:(windowHeight*0.28),fontSize:18,padding:10,width:"100%",border:2,borderStyle:"solid",borderColor:COLOR.BRAUN,borderRadius:5,resize:"none"}}
                onChange ={(e)=>{
                    setMessage(e.target.value)
                }}
            ></textarea>
            <LaView style={{justifyContent : "space-around" ,width:"100%"}}>
            <Cancel onClick={()=>{
              closeTooltip()
              }}>취소</Cancel>
              <CustomButton onClick={()=>{
                onSave()
              }}>저장</CustomButton>
            </LaView>
            
        </div>
    )
}
export default RepairOthers
const Cancel =styled.button`
    min-width:50px;
    min-height:30px;
    font-size: 15px;
    border-radius: 5px;
    margin-left: 10px;
    padding:5px;
    border:2px;
    color: #ffffff;
    background-color: #4F4F4F;
    &: hover{
        background-color: ${COLOR.BRAUN};
        color: ${COLOR.WHITE};
    }

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
const LaView = styled.div`
  display: flex;  
  margin:5px;
  align-items:center;
  flex-direction: row;
`;