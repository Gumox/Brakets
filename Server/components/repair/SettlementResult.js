import { debounce } from "lodash";
import React,{useState,useEffect,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../constants/color";
import store from "../../store/store";
import { sortSettlementData } from "../../functions/useInSettlement";
const SettlementResult =(props)=>{
    const item =props.data
    const types = props.type
    const [adjustment,setAdjustment] = useState(item.adjustment)
    const [check,setCheck] = useState()
    const [disable,setDisable] = useState(false)
    const [adjustmentReason,setAdjustmentReason] = useState(item.adjustment_reason)
    const [remarks,setRemarks] = useState(item.remarks)
    const repairStaff = "";
    const hqStaff = "";
    const [windowWidth,setWindowWidth] = useState()
    const [windowHeight,setWindowHeight] = useState()
    const handleResize = debounce(()=>{
        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
    },1000)

    const increaseHeight =useCallback((e) =>{
        console.log(e.target.style.height)
        console.log(e.target.scrollHeight)
        e.target.style.height = 'inherit';
        e.target.style.height = e.target.scrollHeight + 'px';
        if(e.target.scrollHeight){
            
        }
    },[])

    const setPrice=(adjustment)=>{
        let before = (item.repair1_price+item.repair2_price+item.repair3_price+item.shipment_price)
        let after = new Number(before)+new Number(adjustment)
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
        //console.log(store.getState().selected)
        if(check){
            store.dispatch({type:"SET_SELECTED",
                            selected:{
                                repair_detail_id: item.repair_detail_id, 
                                state:item.repair_detail_state,
                                adjustment:adjustment,
                                adjustment_reason:adjustmentReason,
                                remarks:remarks}})
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
        //console.log(store.getState().selected)
        return
    }
    useEffect(()=>{
        if(item.repair_detail_state ==2){
            let today =new Date();
            if(item.confirm_date != null){
                let confirmDate = new Date(item.confirm_date)
                if(today.getMonth()>confirmDate.getMonth()){
                    setDisable(true)
                }
            }
            
        } 
        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
        window.addEventListener('resize',handleResize);
        sortSettlementData(item,types)
        return ()=>{
            window.removeEventListener('resize',handleResize);
        }
    })
    return(
        
           <LaView><Container>
            <CheckBoxView><input type= "checkbox" onClick={()=>{onCheck(!check)}}/></CheckBoxView>
            <ItemView style={{width:(windowWidth||0)*0.0692,minWidth:83}}>{item.brand_code}</ItemView>
            <ItemView style={{width:(windowWidth||0)*0.0692,minWidth:83}}>{item.receipt_code}</ItemView>
            <div style={{width:(windowWidth||0)*0.0692,minWidth:83}}> 
                <ItemInsideView>{item.name}</ItemInsideView>
                <ItemInsideView>{item.store_contact}</ItemInsideView>
            </div>
            <div style={{width:(windowWidth||0)*0.0692,minWidth:83}}> 
                <ItemInsideView>{item.customer_name}</ItemInsideView>
                <ItemInsideView>{item.customer_phone}</ItemInsideView>
            </div>
            <ItemV style={{width:(windowWidth||0)*0.0692,minWidth:83}}>{sortSettlementData(item,types)}</ItemV>
            <ItemView style={{width:(windowWidth||0)*0.0692,minWidth:83}}>{setPaymentState(item.repair_detail_state)}</ItemView>
            <ItemView style={{width:(windowWidth||0)*0.0692,minWidth:83}}>{hqStaff}</ItemView>
            <ItemView style={{width:(windowWidth||0)*0.0692,minWidth:83}}>{setPrice(0)}</ItemView>
            <ItemView style={{width:(windowWidth||0)*0.0692,minWidth:83}}>
                <input disabled ={disable} type="number" style={{width:80}} value={adjustment||''} onChange={(e)=>{setAdjustment(e.target.value)}}/>
            </ItemView>
            <ItemView style={{width:(windowWidth||0)*0.0692,minWidth:83}}>{setPrice(adjustment)}</ItemView>
            <ItemView style={{width:(windowWidth||0)*0.0692,minWidth:83}}>
                <textarea disabled ={disable} style={{width:80,height:35,fontSize:15,resize: "none",overflow:"hidden"}} value={adjustmentReason||''} onChange={(e)=>{
                    setAdjustmentReason(e.target.value)
                    increaseHeight(e)
                }}/>
            </ItemView>
            <ItemView style={{width:(windowWidth||0)*0.0692,minWidth:83}}>{repairStaff}</ItemView>
            <ItemView style={{width:(windowWidth||0)*0.0692,minWidth:83}}>
                <textarea disabled ={disable} style={{width:80,height:35,fontSize:15,resize: "none",overflow:"hidden"}} value={remarks||''} 
                onChange={(e)=>{
                    setRemarks(e.target.value)
                    increaseHeight(e)
                }}/>
            </ItemView>
        </Container></LaView>
        
    )
}
export default SettlementResult
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
const StateBox = styled.div`
    background-color : #ece6cc;
    border-radius:7px;
    width:100px;
    padding:5px;
    display:flex;
    align-items: center;
    justify-content:center;

`
const ItemView = styled.div`
  font-size :12px;
  min-height: 40px;
  width :105px;
  display: flex;  
  flex-direction: row ;
  align-items: center;
  justify-content:center;
  `;
  const ItemV = styled.div`
  font-size :12px;
  min-height: 40px;
  width :105px;
  border:2px solid
  align-items: center;
  justify-content:center;
  `;
const ItemInsideView = styled.div`
  font-size :12px;
  min-height: 20px;
  width :105px;
  display: flex;  
  justify-content:center;
`;
const LaView = styled.div`
    padding-top:10px;
    padding-bottom:10px;
    display: flex;  
    align-items:center;
    flex-direction: coloum ;

`;
const CheckBoxView = styled.div`
    font-size :12px;
    min-height: 40px;
    width :50px;
    display: flex;  
    flex-direction: row ;
    align-items: center;
    justify-content:center;
`;