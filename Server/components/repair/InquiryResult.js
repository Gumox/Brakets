import React,{useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../constants/color";
import InquiryModal from "./InquiryModal";
import store from "../../store/store";
const InquiryResult =(props)=>{
    let results =[];
    const item =props.data;
    const itemViewWidth = props.width;
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
            <LaView style={{paddingLeft:10}} onClick={()=>{setModalOpenCheckable(true)}} ><Container>
                <ItemView style={{width : itemViewWidth}}>{item.receipt_code}</ItemView>
                {
                    props.level !== 3 &&
                    <ItemView style={{width : itemViewWidth}}>{item.repair_store_name}</ItemView>

                }
                <ItemView style={{width : itemViewWidth}}>{item.receipt_date}</ItemView>
                <ItemView style={{width : itemViewWidth}}>{item.store_name}</ItemView>
                <ItemView style={{width : itemViewWidth}}>{item.brand_name}</ItemView>
                <ItemView style={{width : itemViewWidth}}>{item.season_name}</ItemView>
                <ItemView style={{width : itemViewWidth}}>{item.style_code}</ItemView>
                <ItemView style={{width : itemViewWidth}}>{item.color}</ItemView>
                <ItemView style={{width : itemViewWidth}}>{item.size}</ItemView>
                <ItemView style={{width : itemViewWidth}}>{item.fault}</ItemView>
                <ItemView style={{width : itemViewWidth}}>{item.analysis}</ItemView>
                <ItemView style={{width : itemViewWidth}}>{item.result}</ItemView>
                <ItemView style={{width : itemViewWidth}}>{item.register_date}</ItemView>
                <ItemView style={{width : itemViewWidth}}>{item.send_date}</ItemView>
                <ItemView style={{width : itemViewWidth}}>{item.repair1_name}</ItemView>
                <ItemView style={{width : itemViewWidth}}>{setPrice(item.repair_detail_repair1_price)}</ItemView>
                <ItemView style={{width : itemViewWidth}}>{item.repair2_name}</ItemView>
                <ItemView style={{width : itemViewWidth}}>{setPrice(item.repair_detail_repair2_price)}</ItemView>
                <ItemView style={{width : itemViewWidth}}>{item.repair3_name}</ItemView>
                <ItemView style={{width : itemViewWidth}}>{setPrice(item.repair_detail_repair_detail_id)}</ItemView>
                <ItemView style={{width : itemViewWidth}}>{item.store_message}</ItemView>
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
    border-bottom:2px solid #f2f2f2;;
    display: flex;  
    align-items:center;
    flex-direction: coloum ;
    &: hover {
        background-color: ${COLOR.MOCCA};
      }

`;