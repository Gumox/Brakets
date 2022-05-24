import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../constants/color";
import axios from "axios";
import _ from "lodash";
import remakeCallNumber from "../../../../functions/remakeCallNumber";

const List = ({
    user=[],
    infos=[],
    setActionView=()=>{},
    repairShops
}) => {
    const cancel =()=>{
        setActionView(null)
    }
    
    return(
        <div>
            {
                repairShops.map((item,index)=>{
                    if(index+1 !== repairShops.length){
                        return(
                            <Wrapper key={index} style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,}}>
                                <ListItem item={item} cancel={cancel} infos={infos}  user={user}  setActionView={setActionView}/>
                            </Wrapper>
                        )
                    }else{
                        return(
                            <Wrapper key={index} style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,borderRadius:"0px 0px 10px 10px"}}>
                                <ListItem item={item} cancel={cancel} infos={infos}  user={user}  setActionView={setActionView}/>
                            </Wrapper>
                        )
                    }
                })
            }
        </div>
    );
};

const ListItem =({
    item,
    infos=[],
    user=[],
    setActionView=()=>{},
    cancel=()=>{}
})=>{
    
    let resortedItem =_.sortBy(_.sortBy(item,["pcategory_name"]),["brand_name"])
    return(
        <PrView>
                      
        <HeaderCell >
            {resortedItem[0].repair_shop_name}
        </HeaderCell>

        <HeaderCell>
            {resortedItem[0].repair_shop_code}
        </HeaderCell>

        <HeaderCell>
            <div style={{display:"flex",flexDirection:"column"}}>
                {
                    resortedItem.map((obj,index)=>(
                        <PrView key={index} style={{justifyContent:"center"}}>
                            <div style={{color: "rgb(100,200,100)"}}>
                                {obj.brand_name}
                            </div>
                            <div key={index} style={{marginLeft:10}}>
                                {obj.pcategory_name}
                            </div>
                        </PrView>
                    ))
                }
            </div>
            
        </HeaderCell>

        {/*<HeaderCell>
            <div style={{display:"flex",flexDirection:"column"}}>
                {
                    resortedItem.map((obj,index)=>(
                        <div key={index}>
                            {obj.pcategory_name}
                        </div>
                    ))
                }
            </div>
        </HeaderCell>*/}
        
        <HeaderCell>
            {resortedItem[0].repair_shop_contact}
        </HeaderCell>
        
        
        
        <HeaderCell style={{color: COLOR.RED,flex:1}}>
            정보 변경
        </HeaderCell>
    </PrView>
    )
}
const Wrapper  = styled.div`
    border-left:2px solid ${COLOR.LIGHT_GRAY};
    border-right:2px solid ${COLOR.LIGHT_GRAY};
`;

const HeaderCell = styled.div`
    display:flex;
    min-height:60px;
    min-width:20px;
    justify-content:center;
    align-items:center;
    font-size:16px;
    flex:1;
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
    font-size:16px;
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
    font-size:16px;
    padding:5px;
    border-radius: 10px;
    cursor: pointer;
    &:hover{
        background-color:${COLOR.LIGHT_GRAY};
    }

`;



export default List