import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import COLOR from "../constants/color";
import formatDate from "../functions/formatDate";
import image from "next/image";
const RepairHistory = (props) => {
    const info = props.infos;
    const selectTypeList = props.selectList;
    const shop = props.shop;
    const receipt_id = props.receipt;
    const [message, setMessage] = useState("")
    const [storeRecept,setStoreRecept] = useState([{data: 0}])
    const [repairType1,setRepairType1] = useState(null)
    const [repairType2,setRepairType2] = useState(null)
    const [repairType3,setRepairType3] = useState(null)
    
    const [repairCount1,setRepairCount1] = useState(0)
    const [repairCount2,setRepairCount2] = useState(0)
    const [repairCount3,setRepairCount3] = useState(0)

    const [repairCost1,setRepairCost1] = useState(0)
    const [repairCost2,setRepairCost2] = useState(0)
    const [repairCost3,setRepairCost3] = useState(0)
    
    const [repairRedo1,setRepairRedo1] = useState(false)
    const [repairRedo2,setRepairRedo2] = useState(false)
    const [repairRedo3,setRepairRedo3] = useState(false)

    const [boxSize,setBoxSize] = useState(290);

    const inputRepair = () =>{
        let arr = [];
        storeRecept.map((el)=>{arr.push(el)})
        let index = storeRecept.length
        let newLine = {data: index};
        if(index<3){
            arr.push(newLine)
            setBoxSize( boxSize - 55);
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
        setBoxSize( boxSize + 55);
        setStoreRecept(arr)
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
            repair3_redo: repairRedo3 
        }

          fetch(`${process.env.API_URL}/RepairShop/setRepairinfo`, {
          method: "POST",
          headers: {
            'Content-type': 'application/json'
        },
          body: JSON.stringify(body)
        })
        .then(response => res =response.json())
    }
    return(
        <div>
            <LaView><ItemText>수선 내역</ItemText><MoneyTable>고객 유상 단가표</MoneyTable><AddTable onClick={()=>{inputRepair()}}>+ 수선 내용 추가</AddTable> </LaView>
            <Line2/>
            <ItemText>매장 접수 내용</ItemText>
            {
                storeRecept.map((el,index)=>{
                    const key = index;
                    return(
                        <div key={key}>
                            <LaView>
                                <ItemText2><div style={{marginLeft:10}}>수선내용{index+1}</div></ItemText2>
                                <ItemText2>수량</ItemText2>
                                <ItemText2><div style={{marginLeft:20}}>수선비</div></ItemText2>
                                <div style={{marginTop:20,marginBottom:10,display:"flex",alignItems:"center",justifyContent:"center"}}>
                                    <input  type="checkbox" name="xxx" value="yyy" onClick={()=>{
                                        if(key+1 === 1){
                                            setRepairRedo1(!repairType1)
                                        }else if(key+1 === 2){
                                            setRepairRedo2(!repairType2)
                                        }else if(key+1 === 3){
                                            setRepairRedo3(!repairType3)
                                        }
                                    }}/>
                                </div>
                                <ItemText2>재수선</ItemText2>
                                <image  src="/icons/trash.png" width={25} height={25} 
                                    onClick={()=>{deleteRepair(key)}}
                                />
                            </LaView>
                            <LaView>
                                <ItemsView >
                                <select style={{borderWidth:0,borderBottomWidth:2 ,marginLeft:15}}
                                    onChange={(e)=>{
                                        if(key+1 === 1){
                                            setRepairType1(e.target.value)
                                        }else if(key+1 === 2){
                                            setRepairType2(e.target.value)
                                        }else if(key+1 === 3){
                                            setRepairType3(e.target.value)
                                        }
                                    }}>
                                    {
                                        selectTypeList
                                    }
                                </select>
                                </ItemsView>
                                <ItemsView >
                                    <input type="number" min="0" style={{width:30,borderWidth:0,borderBottomWidth:2}} 
                                        onChange={(e)=>{
                                            if(key+1 === 1){
                                                setRepairCount1(e.target.value)
                                            }else if(key+1 === 2){
                                                setRepairCount2(e.target.value)
                                            }else if(key+1 === 3){
                                                setRepairCount3(e.target.value)
                                            }
                                        }}
                                    />
                                </ItemsView>
                                <ItemsView>
                                    <input type="number" min="0" style={{width:100,borderWidth:0,borderBottomWidth:2}}
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
                                <div style={{width:20}}/>
                                <ItemsView>

                                </ItemsView>
                                <div style={{width:20}}/>
                            </LaView>
                        </div>
                    )
                })
            }
            <ItemText>수선처 설명</ItemText>
            <ItemTable>
              <input style={{margin:5,minHeight:60,width:"98%",border:0}}
                onChange ={(e)=>{
                    setMessage(e.target.value)
                }}
              ></input>
            </ItemTable>
            <div style={{height:boxSize, display:"flex",flexDirection:"column-reverse",alignItems:"center"}}>
                
            <CustomButton onClick={()=>{onSave()}}>저장</CustomButton>
            <LaView >
                <div style={{marginTop:20,marginBottom:10,display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <CheckBox type="checkbox"/>
                </div>
                <div style={{fontSize:15,color:`${COLOR.RED}`,marginLeft:20,marginRight:20,marginTop:10,fontWeight:"bold"}}>유상수선비</div>
                <input style={{borderTopWidth:0,borderBottomWidth:2,borderLeftWidth:0,borderRightWidth:0, borderBottomColor:`${COLOR.RED}`}}></input>
                <div style={{fontSize:15,color:`${COLOR.BLACK}`,marginLeft:20,marginRight:20,marginTop:10,fontWeight:"bold"}}>현금영수증 번호</div>
                <input style={{borderTopWidth:0,borderBottomWidth:2,borderLeftWidth:0,borderRightWidth:0}}/>
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
const LaView = styled.div`
  display: flex;  
  margin:5px;
  align-items:center;
`;
const CustomButton = styled.div`
  width:45px;
  height:30px;
  font-size:15px;
  color: #ffffff;
  display:flex;
  margin:10px;
  align-items: center;
  background-color: ${COLOR.BRAUN};
  border-radius : 7px;
  justify-content : center;
  &: hover {
    background-color: ${COLOR.GRAY};
  }
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
  margin-top:20px;
  margin-bottom:10px;
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
const AddTable =styled.div`
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
  min-height : 60px

`;

const MoneyTable =styled.div`
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