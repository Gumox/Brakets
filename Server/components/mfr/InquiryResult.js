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
    const setDate=(date)=>{
        if(date){
            return String(date).slice(0,10)
        }else{

        }
    }
    return(
        <div>
            <LaView onClick={()=>{setModalOpenCheckable(true)}} ><Container>
                <ItemView>{item.receipt_code}</ItemView>
                <ItemView>{setDate(item.receipt_date)}</ItemView>
                <ItemView>{item.store_name}</ItemView>
                <ItemView>{item.brand_name}</ItemView>
                <ItemView>{item.season_name}</ItemView>
                <ItemView>{item.style_code}</ItemView>
                <ItemView>{item.color}</ItemView>
                <ItemView>{item.size}</ItemView>
                <ItemView>{setDate(item.mfr_register_date)}</ItemView>
                <ItemView>{setDate(item.mfr_complete_date)}</ItemView>
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
  width :80px;
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
        background-color: ${COLOR.GRAY_GRESS};
      }

`;