import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../../constants/color";
import axios from "axios";
import _ from "lodash";


const List = ({
    user=[],
    list=[],
}) => {

    
    return(
        <div>
            {list.length ?
                list.map((item,index)=>{
                    if(index+1 !== list.length){
                        return(
                            <Wrapper key={index} style={{borderBottom:`1px solid ${COLOR.LIGHT_GRAY}`}}>
                                <ListItem item={item}/>
                            </Wrapper>
                        )
                    }else{
                        return(
                            <Wrapper key={index} style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,borderRadius:"0px 0px 10px 10px"}}>
                                <ListItem item={item}/>
                            </Wrapper>
                        )
                    }
                })
                :
                <Wrapper style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,borderRadius:"0px 0px 10px 10px",height:"60px"}}/>
                            
            }
        </div>
    );
};

const ListItem =({item})=>{
    
    const [modifyON,setModifyON] =useState(false)
    
    const [brandName,setBrandName] =useState(null)
    
    const [repairName,setRepairName] =useState(null)

    const [repairPrice,setRepairPrice] =useState(null)

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

   
    const modify= async() =>{
        let data ={
            repairName : repairName || item.text,
            repairPrice : String(repairPrice).replace(/[^0-9]/g, '') || item.repair_price,
            repairId : item.value
        }
        const [result] = await Promise.all([
            axios
            .post(`${process.env.API_URL}/type/modifyRepairType`,data)
            .then(({ data }) => data.data), 
        ])
        alert("수정 되었습니다.")
            window.location.reload()
       
    }


    return(
        <PrView>
                      
            <HeaderCell>
                {item.brand_name}
            </HeaderCell>

            <HeaderCell>
                {item.store_name}
            </HeaderCell>

            <HeaderCell style={{flex:3}}>
                {modifyON
                    ?
                    <InsertInput value={repairName || ""} placeholder={item.text} style={{textAlign:"center"}} onChange={(e)=>{setRepairName(e.target.value)}}/>
                    
                    :<HeaderCell style={{flex:1}}>
                        {item.text}
                    </HeaderCell>
                    
                }
            </HeaderCell>

            <HeaderCell style={{color:"rgb(100,200,100)"}}>
                {modifyON
                    ?
                    <InsertInput value={repairPrice || ""} placeholder={numberDot(item.repair_price,"원")} style={{textAlign:"center"}} onChange={(e)=>{repairPriceHandler(e.target.value)}}
                        onBlur={()=>{blurEvent()}} onFocus={()=>{focusEvent()}} onKeyPress={(e)=>{priceHandlePress(e)}} />
                    
                    :<HeaderCell style={{flex:1}}>
                        {numberDot(item.repair_price,"원")}
                    </HeaderCell>
                    
                }
                
            </HeaderCell>

            <HeaderCell>
                {modifyON
                    ?
                    <PrView style={{flex:1,justifyContent:"space-evenly"}}>
                        <ModifyView onClick={()=>{modify()}}>수정</ModifyView>
                        <ChangeView onClick={()=>{setModifyON(false)}}>취소</ChangeView>
                    </PrView>
                     
                    :<ChangeView onClick={()=>{setModifyON(true)}}>수정</ChangeView>
                }
            </HeaderCell>

            
        </PrView>
    )
}

const numberDot=(value,moneySymbol)=>{
    return(String(value).replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" "+moneySymbol)
}
const Wrapper  = styled.div`
    border-left:2px solid ${COLOR.LIGHT_GRAY};
    border-right:2px solid ${COLOR.LIGHT_GRAY};
`;
const InsertInput = styled.input`
    border:0;
    height:50px;
    border-bottom:1px solid;
    font-size:15px;
    &:focus { 
        outline: none !important;
        //border-bottom-color: #719ECE;
      }
`;
const HeaderCell = styled.div`
    display:flex;
    height:60px;
    min-width:20px;
    justify-content:center;
    align-items:center;
    font-size:13px;
    flex:2;
    padding:5px;
`;

const PrView  = styled.div`
    display:flex;
    flex-direction:row;
`;
const TextInsider = styled.textarea`
    flex:1;
    background-color:${COLOR.WHITE};
    resize:none;
    
    text-align: center;
    font-weight:bold;
    border:0;
`;
const ModifyView = styled.div`
    color:${COLOR.CYAN_BLUE};
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:13px;
    padding:5px;
    border-radius: 10px;
    cursor: pointer;
    &:hover{
        background-color:${COLOR.LIGHT_GRAY};
    }

`;

const ChangeView = styled.div`
    color:${COLOR.RED};
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:13px;
    padding:5px;
    border-radius: 10px;
    cursor: pointer;
    &:hover{
        background-color:${COLOR.LIGHT_GRAY};
    }

`;

const CheckBox = styled.input `
    appearance: none;
    display: inline-block;
    width: 20px;
    height: 20px;
    background-clip: content-box;
    border: 1.5px solid #bbbbbb;
    border-radius: 10px;
    padding:3px;

    &:checked{

        background-color: ${COLOR.INDIGO};
        border-radius: 10px;
    }

`
const CheckBoxRed = styled.input `
    appearance: none;
    display: inline-block;
    width: 20px;
    height: 20px;
    background-clip: content-box;
    border: 1.5px solid #bbbbbb;
    border-radius: 10px;
    padding:3px;

    &:checked{

        background-color: ${COLOR.RED};
        border-radius: 10px;
    }

`


export default List