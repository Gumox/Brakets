import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../../constants/color";
import Router, { useRouter } from "next/router";
import axios from "axios";
import _ from "lodash";

const RepairTypeEachRegistControl = ({
    user,
    brands=[],
    repairShops=[]
}) =>{

    const router = useRouter();
    
    const sortedBrands =sortArray(brands)
    const [brand,setBrand] =useState("NaN")
    
    const [sortedRepairShop,setSortedRepairShop] = useState([])
    const [repairShop,setRepairShop] =useState(null)
    const [repairName,setRepairName] =useState(null)
    const [repairPrice,setRepairPrice] =useState(null)

    const setBrandEvent =(value)=>{
        setBrand(value)
        let repairLists = _.filter(repairShops, function(o){
            return o.brand_id == value
        })
        setSortedRepairShop(sortArray2(repairLists))
    }

    const repairPriceHandler =(value)=>{
        let price = String(value).replace(/[^0-9]/g, '')
        if(price.length >3){
            price = price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        setRepairPrice(price)
    }

    const priceHandlePress = useCallback(
        (e) => {
          if (e.key == "Enter") {
            setRepairPrice(String(repairPrice).replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" 원")
          }
        },
        
        [repairPrice]
    );
    const focusEvent =()=>{
        
        setRepairPrice( String(repairPrice).replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ","))
    }
    const blurEvent =()=>{
        if(String(repairPrice).length>0){
            setRepairPrice(String(repairPrice).replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" 원")
        }
    }

    const regist = async() =>{
        let repairText = String(repairName).replace(/ /g,"")
        if(String(repairPrice).length > 0 && repairText.length > 0){
            let data ={
                repairName : repairName,
                repairPrice : String(repairPrice).replace(/[^0-9]/g, ''),
                headquarterId : user.headquarter_id,
                brandId :brand,
                storeId :repairShop
            }
            
            const [result] = await Promise.all([
                axios
                .post(`${process.env.API_URL}/type/repairTypeRegist`,data)
                .then(({ data }) => data.body), 
                ])
            alert("새로운 수선내용 및 수선단가가 등록되었습니다.")
            router.push("/admin/platformControl/controlRepairTypeList")
        }else if(String(repairPrice).length > 0){
            alert("수선 단가를 입력해주세요")
        }else if(repairText.length > 0){
            alert("수선 내용을 입력해주세요")
        }
    }
  
    return (
        <Wrapper>
            <div style={{marginTop: 20,marginBottom:30,marginLeft:10,fontSize:20,fontWeight:"bold"}}>{"수선 내용 & 수선비(수선 단가) 개별 등록"} </div>
            <InsideWrapper>
           
                
                
                <InsideTable>

                    <PrView >
                        <NameBox style={{borderRadius: "10px 0 0 0"}}>
                            브랜드 설정
                        </NameBox>

                        <LongInputBox style={{borderBottom:0,borderRadius: "0 10px 0 0"}}>
                            
                            <SelectOption value={brand}  style={{flex:1,borderRadius: "0 10px 0 0"}} onChange={(e)=>{setBrandEvent(e.target.value)}}>
                                <option value={"NaN"}>{"선택"}</option>
                                {
                                    sortedBrands.map((item,index)=>(
                                        <option key={index} value={item.brand_id}>{item.brand_name}</option>
                                    ))
                                }
                            </SelectOption>
                        </LongInputBox>
                    </PrView>
                    <PrView>
                        <NameBox style={{borderTop:`2px solid rgb(244,244,244)`}}>
                            수선처 설정
                        </NameBox>

                        <LongInputBox style={{borderBottom:0}}>
                            <SelectOption value={repairShop}  style={{flex:1}} onChange={(e)=>{setRepairShop(e.target.value)}}>
                                {
                                    sortedRepairShop.map((item,index)=>(
                                        <option key={index} value={item.repair_shop_id}>{item.repair_shop_name}</option>
                                    ))
                                }
                            </SelectOption>
                        </LongInputBox>
                    </PrView>
                    <PrView>
                        <NameBox style={{borderTop:`2px solid rgb(244,244,244)`}}>
                            수선 내용
                        </NameBox>

                        <LongInputBox style={{borderBottom:0}}>
                            <InsertInput value={repairName || ""} placeholder={"ex) 원단 마모"} onChange={(e)=>{setRepairName(e.target.value)}}/>
                        </LongInputBox>
                    </PrView>
                    <PrView>
                        <NameBox style={{borderRadius: "0 0 0 10px",borderTop:`2px solid rgb(244,244,244)`}}>
                            수선비 (수선단가)
                        </NameBox>

                        <LongInputBox style={{borderRadius: "0 0 10px 0"}}>
                            <InsertInput value={repairPrice || ""} style={{borderRadius: "0 0 10px 0"}} placeholder={"ex) 1,000 원"} onChange={(e)=>{repairPriceHandler(e.target.value)}}
                                 onBlur={()=>{blurEvent()}} onFocus={()=>{focusEvent()}} onKeyPress={(e)=>{priceHandlePress(e)}} />
                        </LongInputBox>
                    </PrView>
                </InsideTable>
                
                
                
                
                
                    <CenterView>
                        <RegistButton onClick={()=>{
                            if(sortedBrands.length>0 && sortedRepairShop.length>0){
                                regist()
                            }else if(sortedBrands.length <1){
                                alert('등록된 브랜드가 없습니다 먼저 브랜드를 등록해 주세요')
                            }else if(sortedRepairShop.length < 1){
                                alert('등록된 수선처가 없습니다 먼저 수선처를 등록해 주세요')
                            }
                        }}>
                            등록
                        </RegistButton>
                    </CenterView>
                
            </InsideWrapper>
        </Wrapper>
    );
};

const sortArray =(array)=>{
    let sort1=_.sortBy(array,"brand_name")
    
    return(sort1)
}
const sortArray2 =(array)=>{
    let sort1=_.sortBy(array,"repair_shop_name")
    let uniq =_.uniqBy(sort1,"repair_shop_name")
    
    return(uniq)
}
const SelectOption = styled.select`
    border :0;
    font-size:15px;
    padding-left:20px;
    &:focus { 
        outline: none !important;
    }
`;

const Wrapper = styled.div`
    padding:2%;
    background-color:${COLOR.WHITE};
    justify-content:center;
    display:flex;
    flex-direction: column;
    min-width:750px;
`;

const RegistButton =styled.button`
    background-color : ${COLOR.INDIGO};
    width:80px;
    height : 50px;
    color:${COLOR.WHITE};
    margin:20px;
    font-size:16px;
    border-radius:10px;

`;
const InsideWrapper  = styled.div`
    display:flex;
    width:750px;
    justify-content:center;
    flex-direction: column;
`;
const InsideTable  = styled.div`
    display:flex;
    width:750px;
    justify-content:center;
    flex-direction: column;
`;
const PrView  = styled.div`
    min-width:650px;
    max-width:750px;
    display:flex;
    flex-direction:row;
`;
const CenterView  = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-around;
`;
const InsertInput = styled.input`
    padding-left : 20px;
    border:0;
    font-size:15px;
    flex : 1;
        &:focus { 
            outline: none !important;
            //border-bottom-color: #719ECE;
        }
`;
const NameBox  = styled.div`
    height : 60px;
    width:240px;
    background-color:${COLOR.LIGHT_GRAY};
    font-size: 15px;
    display:flex;
    justify-content:center;
    align-items:center;
`;
const LongInputBox  = styled.div`
    height : 60px;
    flex:3;
    border: 2px solid ${COLOR.LIGHT_GRAY};
    border-left :0;
    display:flex;
    justyfiy-content:center;
    ailgn-items:center;
    font-size:18px;

`;





export default RepairTypeEachRegistControl