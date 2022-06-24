import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../constants/color";
import axios from "axios";
import _ from "lodash";
import remakeCallNumber from "../../../../functions/remakeCallNumber";
import StaffModify from "./StaffModify";
import StaffChange from "./StaffChange";

const List = ({
    setActionView=()=>{},
    repairShopsStaffs=[]
}) => {
    const cancel =()=>{
        setActionView(null)
    }
    return(
        <div>
            {repairShopsStaffs.length>0
                ?
                repairShopsStaffs.map((item,index)=>{
                    if(index+1 !== repairShopsStaffs.length){
                        return(
                            <Wrapper key={index} style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,}}>
                                <ListItem item={item} cancel={cancel}  setActionView={setActionView}/>
                            </Wrapper>
                        )
                    }else{
                        return(
                            <Wrapper key={index} style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,borderRadius:"0px 0px 10px 10px"}}>
                                <ListItem item={item} cancel={cancel}  setActionView={setActionView}/>
                            </Wrapper>
                        )
                    }
                })
                :
                <Wrapper style={{height:"60px",borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,borderRadius:"0px 0px 10px 10px"}}/>
            }
        </div>
    );
};

const ListItem =({
    item,
    setActionView=()=>{},
    cancel=()=>{}
})=>{
    
    let resortedItem =_.sortBy(_.sortBy(item,["pcategory_name"]),["brand_name"])
    return(
        <PrView>
                      
            <HeaderCell style={{flex:1 ,borderRadius: "10px 0px 0px 0px"}}>
                {
                    item.repair_shop_name
                }
            </HeaderCell>

            <HeaderCell>
                <View>  
                    <div style={{fontSize:"13px"}}>
                        {item.staff_code}
                    </div>
                </View>
            </HeaderCell>

            <HeaderCell >
                {item.staff_name}
            </HeaderCell>

            <HeaderCell>
                <View>  
                    <div style={{fontSize:"13px"}}>
                        {item.account}
                    </div>
                </View>
            </HeaderCell>

            <HeaderCell>
                {remakeCallNumber(item.staff_phone)}
            </HeaderCell>
            
            <HeaderCell>
                {item.staff_state > 0 ?
                    <HeaderCell style={{color:COLOR.CYAN_BLUE}}>
                        ON
                    </HeaderCell>
                    :
                    <HeaderCell style={{color:COLOR.RED}}>
                        OFF
                    </HeaderCell>

                }
            </HeaderCell>

            <HeaderCell>
                <ModifyView onClick={()=>{
                    setActionView(
                        <StaffModify item={item} cancel={cancel}/>
                    )
                }}>
                     수정
                </ModifyView>
            </HeaderCell>
            
            
            <HeaderCell style={{color: COLOR.RED,flex:1}}
                onClick={()=>{
                    setActionView(
                        <StaffChange item={item} cancel={cancel}/>
                    )
                }}
            >
                <ChangeView>
                    변경
                </ChangeView>
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
    font-size:13px;
    flex:1;
    padding:5px;
`;
const ColView  = styled.div`
    display:flex;
    flex-direction: column;
`;
const InColView  = styled.div`
    display:flex;
    font-size:14px;
    justify-content:center;
    align-items:center;
`

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
const View = styled.div`

        display : flex;
    flex-direction : column;
    white-space: pre-wrap;
    word-break: break-all;
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



export default List