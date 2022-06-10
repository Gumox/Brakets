import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../constants/color";
import axios from "axios";
import _ from "lodash";
import remakeCallNumber from "../../../functions/remakeCallNumber";
import StaffModify from "./Modify";

const StaffsList = ({
    user=[],
    staffs=[],
    setActionView=()=>{}
}) => {

    return(
        <div>
            {staffs.length >0 ?
                staffs.map((item,index)=>{
                    
                    if(index+1 !== staffs.length){
                        return(
                            <Wrapper key={index} style={{borderBottom:`1px solid ${COLOR.LIGHT_GRAY}`}}>
                                <ListItem item={item} staffs={staffs} setActionView={setActionView}/>    
                            </Wrapper>
                        )
                    }else{
                        return(
                            <Wrapper key={index} style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,borderRadius:"0px 0px 10px 10px"}}>
                                <ListItem item={item} staffs={staffs} setActionView={setActionView}/>    
                            </Wrapper>
                        )
                    }
                })
                :
                <Wrapper style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,borderRadius:"0px 0px 10px 10px" ,height:"60px"}}/>
            }
        </div>
    );
};


const ListItem =({
    item,
    staffs=[],
    infos=[],
    user=[],
    setActionView=()=>{},
})=>{
    const sortedItem =_.sortBy(item,"brand_name")

    const cancel = () => {
        setActionView(null)
    }
    return(
        <PrView>
                        
            <HeaderCell >
                { sortedItem[0].staff_code ==="A" &&
                    <div style={{marginRight:5}}>{sortedItem[0].staff_code}</div>
                }
                {sortedItem[0].staff_name}
                
            </HeaderCell>

            <HeaderCell style={{flexDirection:"column"}}>
                {
                    sortedItem.map((obj,index)=>(
                        <ItemCell key={index} style={{padding:2}}>
                            {obj.brand_name}
                        </ItemCell>
                    ))
                }
                
            </HeaderCell>

            <HeaderCell style={{wordBreak:"break-all", display:"flex",justifyContent:"center",alignItems:"center"}}>
                {sortedItem[0].staff_account}
            </HeaderCell>

            

            <HeaderCell >
                {remakeCallNumber(sortedItem[0].staff_phone)}
            </HeaderCell>
            <HeaderCell>
                {sortedItem[0].staff_email}
            </HeaderCell>
            
            <HeaderCell>
                {sortedItem[0].staff_state === 1 ?
                    <div style={{color:COLOR.CYAN_BLUE}}>
                        On
                    </div>
                    :
                    <div style={{color:COLOR.RED}}>
                        Off
                    </div>
                }
            </HeaderCell>
            {sortedItem[0].staff_code ==="A" 
                ?
                <HeaderCell style={{color: COLOR.RED}}>
                
                </HeaderCell>
                :
                <HeaderCell style={{color: COLOR.RED}}>
                    <ModifyView onClick={()=>{setActionView(
                        <StaffModify item={item} staffs={staffs} cancel={cancel}/>
                    )}}>
                        정보 수정
                    </ModifyView>
                </HeaderCell>
            }
            
            
        </PrView>
    )
}

const Wrapper  = styled.div`
    border-left:2px solid ${COLOR.LIGHT_GRAY};
    border-right:2px solid ${COLOR.LIGHT_GRAY};
`;

const ColView  = styled.div`
    display:flex;
    flex-direction: column;
`;
const TextView  = styled.textarea`
    flex:1;
    resize: none;
    font-weight:bold;
    font-size:12px;
    border:0;
    background-color:${COLOR.WHITE};

`;
const InColView  = styled.div`
    display:flex;
    font-size:12px;
    justify-content:center;
    align-items:center;
`;
const HeaderCell = styled.div`
    display: flex;
    min-height: 60px;
    min-width: 20px;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    flex: 1;
    padding: 5px;
    word-break: break-all;
`;
const ItemCell = styled.div`
    display: flex;
    height: 20px;
    min-width: 20px;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    flex: 1;
    padding: 5px;
    color: rgb(100,200,100);
    word-break: break-all;
`;
const PrView  = styled.div`
    display:flex;
    flex-direction:row;
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

export default StaffsList