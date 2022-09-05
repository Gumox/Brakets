import React, { useState,useEffect  } from "react";
import styled from "styled-components";
import COLOR from "../../constants/color";
import formatDate from "../../functions/formatDate";
import { getReceiptRepairInfo} from "../../functions/useInRepairReceiptModal";
import { debounce } from "lodash";

const RepairReturn = ({
    registDate,
    _receiver,
    _receiverId,
    infos,
    shopId,
    receipt,
    closeTooltip = () => {}
}) => {
    const receiver = _receiver;
    const receiverId = _receiverId;
    const info = infos;
    const shop = shopId;
    const receipt_id = receipt;
    const minDate = formatDate(registDate) || formatDate(new Date())
    const [repairDetailId, setRepairDetailId] = useState(null)
    const [selectedDate,setSelectedDate] = useState(null);
    const [message,setMessage] = useState("");
    const [selectedSendType,setSelectedSendType] = useState(1);
    const [shipmentPay,setShipmentPay] = useState(0); 
    
    const [windowWidth,setWindowWidth] = useState(0)
    const [windowHeight,setWindowHeight] = useState(0)
    const handleResize = debounce(()=>{
        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
    },1000)

    const onSave = async()=>{
      let res;
      let receiptStep

      if(_receiver == "매장"){
        receiptStep = 4
      }else if(_receiver == "본사"){
        receiptStep = 5
      }
      const today = formatDate(new Date)
      const body ={
        receipt_id : receipt_id,

        store_id : shop,
        fault_id: info.fault,
        result_id: info.result,

        analysis_id: info.analysis,
        delivery_type: info.delivery,
        register_date: today,
        
        receiver: receiverId,
        receiverChange: true,
        complete_date : selectedDate,
        message: message,
        shipment_type: selectedSendType,
        shipment_price: shipmentPay,
        repair_detail_id : repairDetailId,

        step : receiptStep
      }
      fetch(`${process.env.API_URL}/RepairShop/sendRepairReturn`, {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
      },
        body: JSON.stringify(body)
      })
      .then(response => 
          res=response.json(),
      )
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
            <textarea value={message} style={{height:(windowHeight*0.08),fontSize:18,padding:10,width:"100%",border:2,borderStyle:"solid",borderColor:COLOR.BRAUN,borderRadius:5,resize:"none"}}
                  onChange ={(e)=>{
                      setMessage(e.target.value)
                  }}
            ></textarea>
            <LaView>
              <ItemText>수선처 발송일</ItemText>
                <input type="date" min={minDate} style={{marginLeft:10,marginTop:20,marginBottom:10}} onChange={(e)=>{setSelectedDate(e.target.value)}}></input>
                <div style={{color :"#ff0000",marginTop:10,marginLeft:10}}>
                  <h6>⚠️발송일 입력없이 저장이 불가능합니다</h6>
                </div>
            </LaView>
            <LaView>
                <ItemText>발송방법</ItemText>
                <select onChange={(e)=>{ setSelectedSendType(e.target.value) }}  style={styles.selectStyle} >
                  <option value={1} key={'행낭'}>행낭</option>
                  <option value={3} key={'택배'}>택배</option>
                  <option value={4} key={'퀵배송'}>퀵배송</option>
                  <option value={5} key={'행낭 (행낭 바코드 X)'}>행낭 (행낭 바코드 X)</option>
                </select>
            </LaView>
            <LaView>
                <ItemText>발송비용</ItemText>
                <input type="number" min="0" style={{ marginLeft:20,marginTop:10,width:145,borderWidth:0,borderBottomWidth:2}}  
                  onChange={(e)=>{setShipmentPay(e.target.value)}}
                />
            </LaView>
            <LaView><ItemText>받는곳</ItemText><ItemText2>{receiver}</ItemText2></LaView>
            <LaView style={{justifyContent : "space-around" ,width:"100%"}}>
            <Cancel onClick={()=>{
              closeTooltip()
              }}>취소</Cancel>
            <CustomButton onClick={()=>{
              if(selectedDate !== null) {
                onSave()
              }
              else{
                alert("발송일을 입력해 주세요")
              }
            }}>저장</CustomButton>
            </LaView>
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