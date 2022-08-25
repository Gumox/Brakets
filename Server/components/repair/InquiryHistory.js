import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import COLOR from "../../constants/color";
import { debounce } from "lodash";
import { getRepairType,getReceiptRepairInfo} from "../../functions/useInRepairReceiptModal";
import ItemCount from "./receiptionHistory/itemCount";
import ItemType from "./receiptionHistory/itemType";
import ItemCost from "./receiptionHistory/itemCost";
import ItemRedo from "./receiptionHistory/itemRedo";
import image from "next/image";

const InquiryHistory = ({item ,fontSizeTop,fontSizeBottom}) => {
    const el =item;
    const [paid,setPaid] = useState(el.paid)
    const [fee,setFee] = useState(el.fee)
    
    const [cashreceiptNum,setCashreceiptNum] = useState(0)
    
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

    let repair1
    let repair2
    let repair3

    if(el.repair1_name){
        repair1=(
            <div style={{height:windowWidth*0.034}}>
                <LaView style={{marginTop:10}}>
                    <RightItemBox>
                        <ItemText2><div style={{marginLeft:10 ,minWidth:55}}>수선내용{1}</div></ItemText2>
                        <ItemsView style={{marginTop:5}} >
                            {el.repair1_name}
                        </ItemsView>
                    </RightItemBox>
                    <RightItemBox>
                        <ItemText2>수량</ItemText2>
                        <ItemsView style={{marginTop:5}} >
                            {el.repair_detail_repair1_count}
                        </ItemsView>
                    </RightItemBox>
                    <RightItemBox>
                        <ItemText2>수선비</ItemText2>
                        <ItemsView style={{marginTop:5}}>
                            {setPrice(el.repair_detail_repair1_price)}
                        </ItemsView>
                    </RightItemBox>
                    <RightItemBox >
                            <ItemText2 style={{marginLeft:5,minWidth:37}}>
                                <ItemRedo index={0} redo1={el.repair_detail_repair1_redo} disable={true}/>
                                재수선</ItemText2>
                    </RightItemBox>
                </LaView>
                
            </div>
        )
    }
    if(el.repair2_name){
        repair2=(
            <div style={{height:windowWidth*0.034}}>
                <LaView style={{marginTop:10}}>
                    <RightItemBox>
                        <ItemText2><div style={{marginLeft:10 ,minWidth:55}}>수선내용{2}</div></ItemText2>
                        <ItemsView style={{marginTop:5}} >
                            {el.repair2_name}
                        </ItemsView>
                    </RightItemBox>
                    <RightItemBox>
                        <ItemText2>수량</ItemText2>
                        <ItemsView style={{marginTop:5}} >
                            {el.repair_detail_repair2_count}
                        </ItemsView>
                    </RightItemBox>
                    <RightItemBox>
                        <ItemText2>수선비</ItemText2>
                        <ItemsView style={{marginTop:5}}>
                            {setPrice(el.repair_detail_repair2_price)}
                        </ItemsView>
                    </RightItemBox>
                    <RightItemBox >
                            <ItemText2 style={{marginLeft:5,minWidth:37}}>
                                <ItemRedo index={1} redo2={el.repair_detail_repair2_redo} disable={true}/>
                                재수선</ItemText2>
                    </RightItemBox>
                </LaView>
                
            </div>
        )
    } 
    if(el.repair3_name){
        repair3=(
            <div style={{height:windowWidth*0.034}}>
                <LaView style={{marginTop:10}}>
                    <RightItemBox>
                        <ItemText2><div style={{marginLeft:10 ,minWidth:55}}>수선내용{3}</div></ItemText2>
                        <ItemsView style={{marginTop:5}} >
                            {el.repair3_name}
                        </ItemsView>
                    </RightItemBox>
                    <RightItemBox>
                        <ItemText2>수량</ItemText2>
                        <ItemsView style={{marginTop:5}} >
                            {el.repair_detail_repair3_count}
                        </ItemsView>
                    </RightItemBox>
                    <RightItemBox>
                        <ItemText2>수선비</ItemText2>
                        <ItemsView style={{marginTop:5}}>
                            {setPrice(el.repair_detail_repair3_price)}
                        </ItemsView>
                    </RightItemBox>
                    <RightItemBox >
                            <ItemText2 style={{marginLeft:5,minWidth:37}}>
                                <ItemRedo index={2} redo3={el.repair_detail_repair3_redo} disable={true}/>   
                                재수선</ItemText2>
                    </RightItemBox>
                </LaView>
                
            </div>
        )
    }

    useEffect(()=>{
        
        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
        
        window.addEventListener('resize',handleResize);
        return ()=>{
            window.removeEventListener('resize',handleResize);
        }
    },[])
    return(
        <div>
            <LaView><ItemText>수선 내역</ItemText></LaView>
            <Line2 style={{marginBottom:20}}/>
            {repair1}
            {repair2}
            {repair3}
            
            <ItemText>수선처 설명</ItemText>
              <textarea disabled value={el.repair_message} style={{height:(windowHeight*0.18),backgroundColor:COLOR.WHITE,fontSize:18,padding:10,width:"100%",border:2,borderStyle:"solid",borderColor:COLOR.BRAUN,borderRadius:5,resize:"none"}}/>
            <div style={{position: 'absolute',bottom:0,marginLeft:10,display:"flex",width:"46%",flexDirection:"column",alignItems:"center"}}>
                
            <NeView style={{marginBottom:50}}>
                <LaView>
                    <div style={{marginTop:20,marginBottom:10,display:"flex",alignItems:"center",justifyContent:"center"}}>
                    </div>
                    <div style={{fontSize:fontSizeTop,color:`${COLOR.RED}`,marginRight:20,fontWeight:"bold"}}>유상수선비</div>
                    <FeeText style={{width:windowWidth*0.08}}>{setPrice(fee)}</FeeText>
                </LaView>
                <LaView>
                    <div style={{fontSize:fontSizeTop,color:`${COLOR.BLACK}`,marginRight:20,fontWeight:"bold"}}>현금영수증 번호</div>
                    <CashreceiptText style={{borderTopWidth:0,borderBottomWidth:2,borderLeftWidth:0,borderRightWidth:0, width:windowWidth*0.1}} >{el.cashreceipt_num}</CashreceiptText>
                </LaView>
            </NeView>
          </div>
        </div>
    )
}
export default InquiryHistory

const CheckBox = styled.input `
    appearance: none;
    display: inline-block;
    width: 15px;
    height: 15px;
    background-clip: content-box;
    border: 1.5px solid #bbbbbb;
    border-radius: 5px;

    &:checked{
        background-color: #ff0000;
    }

`
const FeeText = styled.div `
    display: flex;  
    color :  ${COLOR.RED};
    border-bottom:2px solid ${COLOR.RED};
    margin-right : 10px;
    flex-direction: row-reverse;
    padding-right: 10px;
`
const CashreceiptText = styled.div `
    display: flex;  
    border-bottom:2px solid;
    margin-right : 10px;
    flex-direction: row-reverse;
    padding-right: 10px;
    min-height: 15px;
`
const RightItemBox =styled.div`
  flex:1;
`;
const LaView = styled.div`
  display: flex;  
  margin:2px;
  align-items:center;
`;
const NeView = styled.div`
  display: flex;  
  margin:2px;
  flex-direction: row;
  justify-content : center;
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
const ItemText2 = styled.div`
  font-size:12px;
  display: flex;  
  color:${COLOR.BLACK};
  font-weight: bold;
  align-items: center;
  flex:1;
  justify-content : center;
`;
const ItemsView = styled.div`
  display: flex;  
  font-weight: bold;
  color:${COLOR.BRAUN};
  flex:1;
  justify-content : center;
`;
const Line2 = styled.div`
  margin:10px;
  height:1.5px;
  margin-bottom:10px;
  margin-top:10px;
  background-color: #C4C4C4
`;
const AddTable =styled.button`
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

const MoneyTable =styled.button`
    font-size: 15px;
    border-radius: 5px;
    margin-left: 10px;
    padding:5px;
    border:2px;
    background-color: #FAE1BB;
    &: hover{
        background-color: ${COLOR.BRAUN};
        color: ${COLOR.WHITE};
    }

`;