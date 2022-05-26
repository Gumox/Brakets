import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../constants/color";
import axios from "axios";
import _ from "lodash";
import remakeCallNumber from "../../../../functions/remakeCallNumber";
//import StoreModify from "./Modify";

const List = ({
    user=[],
    infos=[],
    store=[],
    brands=[],
    setActionView=()=>{}
}) => {
    const cancel =()=>{
        setActionView(null)
    }
    
    return(
        <div>
            {store.length?
                store.map((item,index)=>{
                    if(index+1 !== store.length){
                        return(
                            <Wrapper key={index}  style={{borderBottom:`1px solid ${COLOR.LIGHT_GRAY}`}}>
                                <ListItem item={item} cancel={cancel} infos={infos} brands={brands} user={user} store={store} setActionView={setActionView}/>
                            </Wrapper>
                        )
                    }else{
                        return(
                            <Wrapper key={index} style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,borderRadius:"0px 0px 10px 10px"}}>
                                <ListItem item={item} cancel={cancel} infos={infos} brands={brands} user={user} store={store} setActionView={setActionView}/>
                            </Wrapper>
                        )
                    }
                })
                :
                <Wrapper style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,borderRadius:"0px 0px 10px 10px",height:"60px"}} />

            }
        </div>
    );
};

const ListItem =({
    item,
    infos=[],
    brands=[],
    user=[],
    store=[],
    setActionView=()=>{},
    cancel=()=>{}
})=>{
    return(
        <PrView>
                      
            <HeaderCell >
                {item.store_name}
            </HeaderCell>

            <HeaderCell>
                {item.staff_name}
            </HeaderCell>

            <HeaderCell >
                {item.staff_code === "A" 
                    ?<div style={{color :"#64C864"}}>매니저</div>
                    :<div>점원</div>
                }
            </HeaderCell>

            <HeaderCell>
                {item.staff_account}  
            </HeaderCell>
            
            <HeaderCell>
                {remakeCallNumber(item.staff_phone)}
            </HeaderCell>
            
            <HeaderCell>
                {item.staff_state 
                    ?<div style={{color :COLOR.CYAN_BLUE}}>On</div>
                    :<div style={{color :COLOR.RED}}>Off</div>
                }
            </HeaderCell>
            
            <HeaderCell style={{color: COLOR.RED,flex:1}}>
                {item.staff_code === "A" 
                    ?<div></div>
                    :<ModifyView>정보 수정</ModifyView>
                }
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
    padding-left:15px;
    padding-right:15px;
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