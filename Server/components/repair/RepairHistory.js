import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import COLOR from "../../constants/color";
import formatDate from "../../functions/formatDate";
import { debounce } from "lodash";
import { getRepairType,getReceiptRepairInfo} from "../../functions/useInRepairReceiptModal";
import ItemCount from "./receiptionHistory/itemCount";
import ItemType from "./receiptionHistory/itemType";
import ItemCost from "./receiptionHistory/itemCost";
import ItemRedo from "./receiptionHistory/itemRedo";
import image from "next/image";

const RepairHistory = (props) => {
    const info = props.infos;
    const hq_id = props.hqId;
    const brand =props.brand;
    const [repiarType,setRepiarType] = useState([])

    const shop = props.shop;
    const receipt_id = props.receipt;
    const [repairDetailId, setRepairDetailId] = useState(null)
    const [message, setMessage] = useState("")
    const [storeRecept,setStoreRecept] = useState([])

    const [repairType1,setRepairType1] = useState(null)
    const [repairType2,setRepairType2] = useState(null)
    const [repairType3,setRepairType3] = useState(null)

    const [typeCost1,setTypeCost1] = useState(0)
    const [typeCost2,setTypeCost2] = useState(0)
    const [typeCost3,setTypeCost3] = useState(0)
    
    const [repairCount1,setRepairCount1] = useState(0)
    const [repairCount2,setRepairCount2] = useState(0)
    const [repairCount3,setRepairCount3] = useState(0)

    const [repairCost1,setRepairCost1] = useState(0)
    const [repairCost2,setRepairCost2] = useState(0)
    const [repairCost3,setRepairCost3] = useState(0)
    
    const [repairRedo1,setRepairRedo1] = useState(false)
    const [repairRedo2,setRepairRedo2] = useState(false)
    const [repairRedo3,setRepairRedo3] = useState(false)

    const [paid,setPaid] = useState(false)
    const [fee,setFee] = useState(0)
    
    const [cashreceiptNum,setCashreceiptNum] = useState(0)
    
    const [windowWidth,setWindowWidth] = useState()
    const [windowHeight,setWindowHeight] = useState()
    const handleResize = debounce(()=>{
        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
    },1000)

    const inputRepair = () =>{
        let arr = [];
        storeRecept.map((el)=>{arr.push(el)})
        let index = storeRecept.length
        let newLine = {data: index};
        if(index<3){
            arr.push(newLine)
            setStoreRecept(arr)
        }
    }
    const deleteRepair = (value) =>{
        let arr =[]
        storeRecept.map((obj,index)=>{
            if(value !== index){
                arr.push(obj)
            }
        })
        if(value+1 == 1){
            setRepairType1(repairType2);
            setRepairCount1(repairCount2);
            setRepairCost1(repairCost2);
            setRepairRedo1(repairRedo2);

            setRepairType2(repairType3);
            setRepairCount2(repairCount3);
            setRepairCost2(repairCost3);
            setRepairRedo2(repairRedo3);
            
            setRepairType3(0);
            setRepairCount3(0);
            setRepairCost3(0);
            setRepairRedo3(false);
        }else if(value+1 == 2){

            setRepairType2(repairType3);
            setRepairCount2(repairCount3);
            setRepairCost2(repairCost3);
            setRepairRedo2(repairRedo3);
            
            setRepairType3(0);
            setRepairCount3(0);
            setRepairCost3(0);
            setRepairRedo3(false);
        }else if(value+1 == 3){

            setRepairType3(0);
            setRepairCount3(0);
            setRepairCost3(0);
            setRepairRedo3(false);
        }
        setStoreRecept(arr)
    }
    const inputInfoRepair = (info,num) =>{
        let arr = [];
        for(let index =1;index<4;index++){
            let type = "repair"+num+"_repair"+index+"_type_id";
            if(info[type]){
                let newLine = {data: index};
                arr.push(newLine)
            }
            
        }
        setStoreRecept(arr)
    }
    const inputTypeCost = (info,typeInfo,num) =>{
        let arr = [];
        for(let index =1;index<4;index++){
            let type = "repair"+num+"_repair"+index+"_type_id";
            typeInfo.map((el)=>{
                if(el.value == info[type] && index === 1){
                    console.log("????",el.repair_price)
                    setTypeCost1(el.repair_price)
                }
                
                if(el.value == info[type] && index === 2){
                    console.log("????",el.repair_price)
                    setTypeCost2(el.repair_price)
                }
                
                if(el.value == info[type] && index === 3){
                    console.log("????",el.repair_price)
                    setTypeCost3(el.repair_price)
                }
            })
            
        }
        setStoreRecept(arr)
    }
    const sortInfo=(info,typeInfo)=>{
        if(shop == info.repair1_store_id){
            setMessage(info.repair1_message);
            inputTypeCost(info,typeInfo,1);
            setRepairType1(info.repair1_repair1_type_id);
            setRepairType2(info.repair1_repair2_type_id);
            setRepairType3(info.repair1_repair3_type_id);
            setRepairCount1(info.repair1_repair1_count);
            setRepairCount2(info.repair1_repair2_count);
            setRepairCount3(info.repair1_repair3_count);
            setRepairCost1(info.repair1_repair1_price);
            setRepairCost2(info.repair1_repair2_price);
            setRepairCost3(info.repair1_repair3_price);
            setRepairRedo1(Boolean(info.repair1_repair1_redo));
            setRepairRedo2(Boolean(info.repair1_repair2_redo));
            setRepairRedo3(Boolean(info.repair1_repair3_redo));
            setFee(info.repair1_fee);
            setCashreceiptNum(info.repair1_cashreceipt_num)
            setPaid(Boolean(info.repair1_paid));
            inputInfoRepair(info,1);
            setRepairDetailId(info.repair1_detail_id)

        }else if(shop == info.repair2_store_id){
            setMessage(info.repair2_message);
            inputTypeCost(info,typeInfo,2);
            setRepairType1(info.repair2_repair1_type_id);
            setRepairType2(info.repair2_repair2_type_id);
            setRepairType3(info.repair2_repair3_type_id);
            setRepairCount1(info.repair2_repair1_count);
            setRepairCount2(info.repair2_repair2_count);
            setRepairCount3(info.repair2_repair3_count);
            setRepairCost1(info.repair2_repair1_price);
            setRepairCost2(info.repair2_repair2_price);
            setRepairCost3(info.repair2_repair3_price);
            setRepairRedo1(Boolean(info.repair2_repair1_redo));
            setRepairRedo2(Boolean(info.repair2_repair2_redo));
            setRepairRedo3(Boolean(info.repair2_repair3_redo));
            setFee(info.repair2_fee);
            setCashreceiptNum(info.repair2_cashreceipt_num)
            setPaid(Boolean(info.repair2_paid));
            inputInfoRepair(info,2);
            setRepairDetailId(info.repair2_detail_id)
        }else if(shop == info.repair3_store_id){
            setMessage(info.repair3_message);
            inputTypeCost(info,typeInfo,3);
            setRepairType1(info.repair3_repair1_type_id);
            setRepairType2(info.repair3_repair2_type_id);
            setRepairType3(info.repair3_repair3_type_id);
            setRepairCount1(info.repair3_repair1_count);
            setRepairCount2(info.repair3_repair2_count);
            setRepairCount3(info.repair3_repair3_count);
            setRepairCost1(info.repair3_repair1_price);
            setRepairCost2(info.repair3_repair2_price);
            setRepairCost3(info.repair3_repair3_price);
            setRepairRedo1(Boolean(info.repair3_repair1_redo));
            setRepairRedo2(Boolean(info.repair3_repair2_redo));
            setRepairRedo3(Boolean(info.repair3_repair3_redo));
            setFee(info.repair3_fee);
            setCashreceiptNum(info.repair3_cashreceipt_num)
            setPaid(Boolean(info.repair3_paid));
            inputInfoRepair(info,3);
            setRepairDetailId(info.repair3_detail_id)

        }
    }
    const checkBoxTag = (tof) => {
        let result ;
        if(tof){
            result = (<CheckBox checked type="checkbox" onClick={()=>{setPaid(!paid)}}/>)
        }else{
            result = (<CheckBox type="checkbox" onClick={()=>{setPaid(!paid)}}/>)
        }
        return(result)
    }
    const onSave = async() =>{
        let res;
        const today = formatDate(new Date())
        const body = {
            receipt_id:receipt_id,
            store_id: shop,
            register_date: today,
            fault_id: info.fault,
            result_id: info.result,
            analysis_id: info.analysis,
            delivery_type: info.delivery,
            message: message,

            repair1_type_id: repairType1,
            repair1_count: repairCount1,
            repair1_price: repairCost1,
            repair1_redo: repairRedo1,
            repair2_type_id: repairType2,
            repair2_count: repairCount2,
            repair2_price: repairCost2,
            repair2_redo: repairRedo2,
            repair3_type_id: repairType3,
            repair3_count: repairCount3,
            repair3_price: repairCost3,
            repair3_redo: repairRedo3,
            paid: paid,
            fee:fee,
            cashreceipt_num: cashreceiptNum,
            repair_detail_id:repairDetailId
        }

          fetch(`${process.env.API_URL}/RepairShop/setRepair`, {
          method: "POST",
          headers: {
            'Content-type': 'application/json'
        },
          body: JSON.stringify(body)
        })
        .then(response => res =response.json())
            window.location.reload();
    }
    useEffect(()=>{
        console.log(shop)
        const fetchData = async () => {
            const typeInfo = await getRepairType(null,brand,shop);

            const info =await getReceiptRepairInfo(receipt_id);
            
            typeInfo.unshift({text:"선택",level:1})
            setRepiarType(typeInfo)
            sortInfo(info.body[0],typeInfo)
            console.log(info.body[0])
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
            <LaView><ItemText>수선 내역</ItemText><MoneyTable>고객 유상 단가표</MoneyTable><AddTable onClick={()=>{inputRepair()}}>+ 수선 내용 추가</AddTable> </LaView>
            <Line2 style={{marginBottom:20}}/>
            {
                storeRecept.map((el,index)=>{
                    const key = index;
                    return(
                        <div key={key} style={{height:windowWidth*0.034}}>
                            <LaView style={{marginTop:10}}>
                                <RightItemBox>
                                    <ItemText2><div style={{marginLeft:10 ,minWidth:55}}>수선내용{index+1}</div></ItemText2>
                                    <ItemsView style={{marginTop:5}} >
                                    <ItemType type1={repairType1} type2={repairType2} type3={repairType3} index={key} repiarType={repiarType}
                                        onChange={(e,cost)=>{
                                            
                                            if(key+1 === 1){
                                                setRepairType1(e.target.value)
                                                setTypeCost1(cost)
                                            }else if(key+1 === 2){
                                                setRepairType2(e.target.value)
                                                setTypeCost2(cost)
                                            }else if(key+1 === 3){
                                                setRepairType3(e.target.value)
                                                setTypeCost3(cost)
                                            }
                                        }}/>
                                    </ItemsView>
                                </RightItemBox>
                                <RightItemBox>
                                    <ItemText2>수량</ItemText2>
                                    <ItemsView style={{marginTop:5}} >
                                        <ItemCount count1={repairCount1} count2={repairCount2} count3={repairCount3} index={key}
                                            onChange={(e)=>{
                                                if(key+1 === 1){
                                                    setRepairCount1(e.target.value)
                                                    console.log(typeCost1)
                                                    setRepairCost1((e.target.value)*typeCost1)
                                                }else if(key+1 === 2){
                                                    setRepairCount2(e.target.value)
                                                    setRepairCost2((e.target.value)*typeCost2)
                                                }else if(key+1 === 3){
                                                    setRepairCount3(e.target.value)
                                                    setRepairCost3((e.target.value)*typeCost3)
                                                }
                                            }}
                                        />
                                    </ItemsView>
                                </RightItemBox>
                                <RightItemBox>
                                    <ItemText2><div style={{marginLeft:20}}>수선비</div></ItemText2>
                                    <ItemsView style={{marginTop:5}}>
                                    <ItemCost cost1={repairCost1} cost2={repairCost2} cost3={repairCost3} index={key}
                                        onChange={(e)=>{
                                            if(key+1 === 1){
                                                setRepairCost1(e.target.value)
                                            }else if(key+1 === 2){
                                                setRepairCost2(e.target.value)
                                            }else if(key+1 === 3){
                                                setRepairCost3(e.target.value)
                                            }
                                        }}
                                    />
                                    </ItemsView>
                                </RightItemBox>
                                <RightItemBox >
                                    <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                                        <ItemRedo redo1={repairRedo1} redo2={repairRedo2} redo3={repairRedo3} index={key} onChange={()=>{
                                            console.log(repairType1)
                                            if(key+1 === 1){
                                                setRepairRedo1(!repairType1)
                                            }else if(key+1 === 2){
                                                setRepairRedo2(!repairType2)
                                            }else if(key+1 === 3){
                                                setRepairRedo3(!repairType3)
                                            }
                                        }}/>
                                    </div>
                                </RightItemBox>
                                <RightItemBox >
                                    <ItemText2>재수선</ItemText2>
                                </RightItemBox>
                                <RightItemBox >
                                    <img  src="/icons/trash.png" width={25} height={20} 
                                        onClick={()=>{deleteRepair(key)}}
                                    />
                                </RightItemBox>
                                
                                
                            </LaView>
                            
                        </div>
                    )
                })
            }
            <ItemText>수선처 설명</ItemText>
              <textarea value={message} style={{height:(windowHeight*0.11),fontSize:18,padding:10,width:"100%",border:2,borderStyle:"solid",borderColor:COLOR.BRAUN,borderRadius:5,resize:"none"}}
                onChange ={(e)=>{
                    setMessage(e.target.value)
                }}
              ></textarea>
            <div style={{position: 'absolute',bottom:0,marginLeft:10,display:"flex",width:"46%",flexDirection:"column",alignItems:"center"}}>
                
            <LaView >
                <div style={{marginTop:20,marginBottom:10,display:"flex",alignItems:"center",justifyContent:"center"}}>
                    {
                        checkBoxTag(paid)
                    }
                </div>
                <div style={{fontSize:15,color:`${COLOR.RED}`,marginLeft:20,marginRight:20,marginTop:10,fontWeight:"bold"}}>유상수선비</div>
                <input style={{borderTopWidth:0,borderBottomWidth:2,borderLeftWidth:0,borderRightWidth:0, borderBottomColor:`${COLOR.RED}`}} value = {fee}
                        onChange={(e)=>{setFee(e.target.value)}}
                />
                <div style={{fontSize:15,color:`${COLOR.BLACK}`,marginLeft:20,marginRight:20,marginTop:10,fontWeight:"bold"}}>현금영수증 번호</div>
                <input style={{borderTopWidth:0,borderBottomWidth:2,borderLeftWidth:0,borderRightWidth:0}} value = {cashreceiptNum}
                        onChange={(e)=>{
                            setCashreceiptNum((e.target.value).toString())
                            console.log((e.target.value).toString())
                        }}
                />
            </LaView>
            <LaView style={{justifyContent : "space-around" ,width:"100%"}}>
            <AddTable onClick={()=>props.close}>취소</AddTable>
            <CustomButton onClick={()=>{
                if(info.fault == 0){alert("과실 구분 선택 필요")}
                if(info.analysis == 0){alert("내용 분석 선택 필요")}

                else {onSave()}
            }}>저장</CustomButton>
            </LaView>
          </div>
        </div>
    )
}
export default RepairHistory

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
const RightItemBox =styled.div`
  flex:1;
`;
const LaView = styled.div`
  display: flex;  
  margin:2px;
  align-items:center;
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
  margin-left:20px;
`;
const ItemsView = styled.div`
  display: flex;  
  font-weight: bold;
  flex:1;
  margin-left:20px;
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
const ItemTable = styled.div`
  border: 2px solid  ${COLOR.BRAUN};
  margin-right:10px;
  margin-left:10px;
  border-radius:5px;
  height : 65px

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