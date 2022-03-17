import { debounce } from "lodash";
import React,{useState,useEffect,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../constants/color";
import store from "../../store/store";
import { sortSettlementData } from "../../functions/useInSettlement";
const SettlementResult =({
    data,
    type,
    index,
    excelList,
    checkList,
    setExcelList=()=>{},
    excelListSet =()=>{},
    setCheckList =()=>{},
    })=>{
    const item =data
    const types = type
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
    const rearrangementList =(excel,item,type,hqStaff,repairStaff,adjustment,adjustmentReason,remarks) =>{
        let obj={}
        //console.log(item)
        obj["브랜드"] = item.brand_code;
        obj["서비스 번호"] = item.receipt_code;
        obj["매장정보"] = item.name+"\n"+item.store_contact;
        obj["고객정보"] = item.customer_name+"\n"+item.customer_phone;
        
        obj["수선내용(수량)"] = sortSettlementData(item,type,false);
        if(item.repair_detail_state == 0){
          obj["상태"] = "수선처확인필요";
        }else if(item.repair_detail_state == 1){
          obj["상태"] = "본사확인필요";
        }else if(item.repair_detail_state == 2){
          obj["상태"] = "확정";
        }
        obj["본사 당담자"] = hqStaff;
        let before = (item.repair1_price+item.repair2_price+item.repair3_price+item.shipment_price);
        let after = new Number(before)+new Number(adjustment);
        obj["수선비"] = before;
        obj["수정수선비"] = adjustment;
        obj["최종수선비"] = after.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        obj["수정사유"] = adjustmentReason;
        obj["수선처 당담wk"] = repairStaff;
        obj["비고"] = remarks;
        
       // console.log("111111111111111111111111111111111")
        //console.log(excel)
        let list = excel
        list[index] =obj
        //console.log(list)
       //console.log("111111111111111111111111111111111")
        setExcelList(list)
        return(list)
      
    }
    const pushCheckedList =(list,repair_detail_id,state,adjustment,adjustment_reason,remarks,check)=>{
        let checkedList =list
        let obj={}
        if(check){
            obj["repair_detail_id"]=repair_detail_id
            obj["state"]=state
            obj["adjustment"]=adjustment
            obj["adjustment_reason"]=adjustment_reason
            obj["remarks"] = remarks
            
            checkedList[index] = obj
            console.log(checkedList)
            setCheckList(checkedList)
        }
    }
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
            pushCheckedList(checkList,item.repair_detail_id,item.repair_detail_state,adjustment,adjustmentReason,remarks,check)
            setCheck(true)
        }else{
            let checkedList =checkList
            let obj={}
            
            checkedList[index] = obj
            setCheckList(checkedList)
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
        
        
        const obj = rearrangementList(excelList,item,types,repairStaff,repairStaff,adjustment,adjustmentReason,remarks)
          
        //excelListSet(obj,index)

        return ()=>{
            window.removeEventListener('resize',handleResize);
        }
        
    },[1])
    return(
        
           <LaView><Container>
            <CheckBoxView><input disabled ={disable} type= "checkbox" onClick={()=>{onCheck(!check)}}/></CheckBoxView>
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
            <ItemV style={{width:(windowWidth||0)*0.0692,minWidth:83}}>{sortSettlementData(item,types,true)}</ItemV>
            <ItemView style={{width:(windowWidth||0)*0.0692,minWidth:83}}>{setPaymentState(item.repair_detail_state)}</ItemView>
            <ItemView style={{width:(windowWidth||0)*0.0692,minWidth:83}}>{hqStaff}</ItemView>
            <ItemView style={{width:(windowWidth||0)*0.0692,minWidth:83}}>{setPrice(0)}</ItemView>
            <ItemView style={{width:(windowWidth||0)*0.0692,minWidth:83}}>
                <input disabled ={disable} type="number" style={{width:80}} value={adjustment||''} onChange={(e)=>{
                    setAdjustment(e.target.value)
                    pushCheckedList(checkList,item.repair_detail_id,item.repair_detail_state,e.target.value,adjustmentReason,remarks,check)
                    //console.log("0000000000000000000000000000")
                    //console.log(excelList)
                    //console.log("0000000000000000000000000000")
                    const obj = rearrangementList(excelList,item,types,repairStaff,repairStaff,e.target.value,adjustmentReason,remarks)
                    //excelListSet(obj,index)
                }}/>
            </ItemView>
            <ItemView style={{width:(windowWidth||0)*0.0692,minWidth:83}}>{setPrice(adjustment)}</ItemView>
            <ItemView style={{width:(windowWidth||0)*0.0692,minWidth:83}}>
                <textarea disabled ={disable} style={{width:80,height:35,fontSize:15,resize: "none",overflow:"hidden"}} value={adjustmentReason||''} onChange={(e)=>{
                    setAdjustmentReason(e.target.value)
                    pushCheckedList(checkList,item.repair_detail_id,item.repair_detail_state,adjustment,e.target.value,remarks,check)
                    increaseHeight(e)
                    const obj = rearrangementList(excelList,item,types,repairStaff,repairStaff,adjustment,e.target.value,remarks)
                    //excelListSet(obj,index)
                }}/>
            </ItemView>
            <ItemView style={{width:(windowWidth||0)*0.0692,minWidth:83}}>{repairStaff}</ItemView>
            <ItemView style={{width:(windowWidth||0)*0.0692,minWidth:83}}>
                <textarea disabled ={disable} style={{width:80,height:35,fontSize:15,resize: "none",overflow:"hidden"}} value={remarks||''} 
                onChange={(e)=>{
                    setRemarks(e.target.value)
                    pushCheckedList(checkList,item.repair_detail_id,item.repair_detail_state,adjustment,adjustmentReason,e.target.value,check)
                    increaseHeight(e)
                    const obj = rearrangementList(excelList,item,types,repairStaff,repairStaff,adjustment,adjustmentReason,e.target.value)
                    //excelListSet(obj,index)
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