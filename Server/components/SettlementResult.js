import React,{useState} from "react";
import styled from "styled-components";
import COLOR from "../constants/color";
import store from "../store/store";
const SettlementResult =(props)=>{
    let results =[];
    const item =props.data
    const [plusMinus,setPlusMinus] = useState(0)
    const [check,setCheck] = useState()
    const setPrice=(plusMinus)=>{
        let before = (item.repair1_price+item.repair2_price+item.repair3_price+item.shipment_price)
        let after = new Number(before)+new Number(plusMinus)
        return after.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const setPaymentState=(pms)=>{
        let returnState
        if(pms == 0){
            returnState =(
                <StateBox style={{backgroundColor : COLOR.MADARIN}}>
                    수선처확인필요
                </StateBox>
            )
        }else if(pms == 1){
            returnState =(
                <StateBox style={{backgroundColor : COLOR.MENU_MAIN}}>
                    본사확인필요
                </StateBox>
            )
        }else if(pms == 2){
            returnState =(
                <StateBox style={{backgroundColor : COLOR.GREEN}}>
                    확정
                </StateBox>
            )
        }
        return returnState;

    }
    const onCheck =(check)=>{
        if(check){
            store.dispatch({type:"SET_SELECTED",selected:{repair_detail_id: item.repair_detail_id, state:item.repair_detail_state}})
            setCheck(true)
        }else{
            let selected = store.getState().selected;
            let list=[];
            selected.map((obj,index)=>{
                if(obj.repair_detail_id !== item.repair_detail_id){
                    list.push(obj)
                }  
            })
            store.dispatch({type:"RESET_SELECTED",selected: list})
            setCheck(false)
        }
        console.log(store.getState().selected)
        return
    }
    return(
        <div>
           <LaView><Container>
            <ItemView><input type= "checkbox" onClick={()=>{onCheck(!check)}}/></ItemView>
            <ItemView>{item.brand_code}</ItemView>
            <ItemView>{item.receipt_code}</ItemView>
            <div style={ItemStyle}> 
                <ItemInsideView>{item.name}</ItemInsideView>
                <ItemInsideView>{item.store_contact}</ItemInsideView>
            </div>
            <div style={ItemStyle}> 
                <ItemInsideView>{item.customer_name}</ItemInsideView>
                <ItemInsideView>{item.customer_phone}</ItemInsideView>
            </div>
            <ItemView>{}</ItemView>
            <ItemView>{setPaymentState(item.repair_detail_state)}</ItemView>
            <ItemView>{}</ItemView>
            <ItemView>{setPrice(0)}</ItemView>
            <ItemView><input type="number" style={{width:80}} value={plusMinus} onChange={(e)=>{setPlusMinus(e.target.value)}}/></ItemView>
            <ItemView>{setPrice(plusMinus)}</ItemView>
            <ItemView><input style={{width:80}}/></ItemView>
            <ItemView>{}</ItemView>
            <ItemView><input style={{width:80}}/></ItemView>
        </Container></LaView>
        </div>
    )
}
export default SettlementResult
const ItemStyle ={
    height:40,
    fontSize:12,
    width:120
}
const Container = styled.div`
    display:flex; 
    min-height: 20px;
    align-items: flex-start;
`;
const StateBox = styled.div`
    background-color : #ece6cc;
    border-radius:7px;
    font-size:10;
    font-weight:bold;
    width:100px;
    padding:5px;
    display:flex;
    align-items: center;
    justify-content:center;

`
const ItemView = styled.div`
  font-size :12px;
  min-height: 40px;
  width :120px;
  display: flex;  
  flex-direction: row ;
  align-items: center;
  justify-content:center;
  `;
const ItemInsideView = styled.div`
  font-size :12px;
  min-height: 20px;
  width :120px;
  display: flex;  
  justify-content:center;
`;
const LaView = styled.div`
    padding:10px;
    display: flex;  
    align-items:center;
    flex-direction: coloum ;

`;