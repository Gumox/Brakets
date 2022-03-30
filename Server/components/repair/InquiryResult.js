import React,{useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../constants/color";
import InquiryModal from "./InquiryModal";
import store from "../../store/store";
const InquiryResult =(props)=>{
    let results =[];
    const item =props.data;
    const [modalOpenCheckable,setModalOpenCheckable] = useState(false)
    const closeProductImage = useCallback(
        () => setModalOpenCheckable(false),
        []
      );
    const setPrice=(cost)=>{
        
        if(cost !== undefined ){
        let after = new Number(cost)
        return after.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    }
    return(
        <div>
            <LaView onClick={()=>{setModalOpenCheckable(true)}}><Container>
                <ItemView>{item.receipt_code}</ItemView>
                <ItemView>{item.receipt_date}</ItemView>
                <ItemView>{item.store_name}</ItemView>
                <ItemView>{item.brand_name}</ItemView>
                <ItemView>{item.season_name}</ItemView>
                <ItemView>{item.style_code}</ItemView>
                <ItemView>{item.color}</ItemView>
                <ItemView>{item.size}</ItemView>
                <ItemView>{item.fault}</ItemView>
                <ItemView>{item.analysis}</ItemView>
                <ItemView>{item.result}</ItemView>
                <ItemView>{item.register_date}</ItemView>
                <ItemView>{item.send_date}</ItemView>
                <ItemView>{item.repair1_name}</ItemView>
                <ItemView>{setPrice(item.repair_detail_repair1_price)}</ItemView>
                <ItemView>{item.repair2_name}</ItemView>
                <ItemView>{setPrice(item.repair_detail_repair2_price)}</ItemView>
                <ItemView>{item.repair3_name}</ItemView>
                <ItemView>{setPrice(item.repair_detail_repair_detail_id)}</ItemView>
                <ItemView>{item.store_message}</ItemView>
            </Container></LaView>
            {
                modalOpenCheckable&&(
                    <InquiryModal item={item} {...{closeProductImage}}/>
                )
            }
        </div>
    )
}
export default InquiryResult
const ItemStyle ={
    height:40,
    fontSize:12,
    width:105
}
const Container = styled.div`
    display:flex; 
    min-height: 20px;
    align-items: flex-start;
`;

const ItemView = styled.div`
  font-size :12px;
  min-height: 40px;
  width :70px;
  display: flex;  
  flex-direction: row ;
  align-items: center;
  justify-content:center;
  `;
const LaView = styled.div`
    padding-top:10px;
    padding-bottom:10px;
    display: flex;  
    align-items:center;
    flex-direction: coloum ;
    &: hover {
        background-color: ${COLOR.MOCCA};
      }

`;