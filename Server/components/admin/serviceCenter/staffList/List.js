import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../constants/color";
import axios from "axios";
import _ from "lodash";
import remakeCallNumber from "../../../../functions/remakeCallNumber"
import StaffModify from "./Modify";
import StaffChange from "./Change";


const StaffsList = ({
    user=[],
    staffs=[],
    setActionView=()=>{}
}) => {
    console.log(user)
    return(
        <div>
            {
                staffs.map((item,index)=>{
                    let state
                    if(item.staff_state){
                        state = (
                        <div style={{color:COLOR.CYAN_BLUE ,fontWeight:"bold"}}>
                            On
                        </div>)
                    }else{
                        state = (
                        <div style={{color:COLOR.RED ,fontWeight:"bold"}}>
                            Off
                        </div>)
                    }
                    if(index+1 !== staffs.length){
                        return(
                            <PrView key={index}>
                            
                                <HeaderCell //style={{borderLeft:"2px solid"}}
                                >
                                    {item.headquarter_name}
                                </HeaderCell>
        
                                <HeaderCell>
                                    {item.staff_code}
                                </HeaderCell>
        
                                <HeaderCell>
                                    <TextView disabled value={item.staff_account || ""}/>
                                </HeaderCell>
        
                                <HeaderCell>
                                    {item.staff_name}
                                </HeaderCell>
        
                                <HeaderCell>
                                    {remakeCallNumber(item.staff_phone)}
                                </HeaderCell>
                                <HeaderCell>
                                    <TextView disabled value={item.staff_email || ""}/>
                                </HeaderCell>
                                
                                <HeaderCell>
                                    {state}
                                </HeaderCell>
                                
                                <HeaderCell style={{color: COLOR.CYAN_BLUE}} 
                                    onClick={()=>{ 
                                        setActionView(
                                            <StaffModify staff={item} staffs={staffs} setActionView={setActionView}/>
                                        )

                                    }}>
                                    <ModifyView>
                                        수정
                                    </ModifyView>
                                </HeaderCell>
                                
                                <HeaderCell style={{color: COLOR.RED}}
                                    onClick={()=>{ 
                                        setActionView(
                                            <StaffChange staff={item} user={user} setActionView={setActionView}/>
                                        )

                                    }}>
                                    <ModifyView style={{color: COLOR.RED}}>
                                        변경
                                    </ModifyView>
                                </HeaderCell>
                            </PrView>
                        )
                    }else{
                        return(
                            <PrView key={index} style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,borderRadius:"0px 0px 10px 10px"}}>
                            
                            <HeaderCell //style={{borderLeft:"2px solid"}}
                                >
                                    {item.headquarter_name}
                                </HeaderCell>
        
                                <HeaderCell>
                                    {item.staff_code}
                                </HeaderCell>
        
                                <HeaderCell>
                                    <TextView disabled value={item.staff_account || ""}/>
                                </HeaderCell>
        
                                <HeaderCell>
                                    {item.staff_name}
                                </HeaderCell>
        
                                <HeaderCell>
                                    {remakeCallNumber(item.staff_phone)}
                                </HeaderCell>
                                <HeaderCell>
                                    <TextView disabled value={item.staff_email || ""}/>
                                </HeaderCell>
                                
                                <HeaderCell>
                                    {state}
                                </HeaderCell>
                                
                                <HeaderCell style={{color: COLOR.CYAN_BLUE}} 
                                    onClick={()=>{ 
                                        setActionView(
                                            <StaffModify staff={item} setActionView={setActionView}/>
                                        )

                                    }}>
                                    <ModifyView>
                                        수정
                                    </ModifyView>
                                </HeaderCell>
                                
                                <HeaderCell style={{color: COLOR.RED}}
                                    onClick={()=>{ 
                                        setActionView(
                                            <StaffChange staff={item} user={user} setActionView={setActionView}/>
                                        )

                                    }}>
                                    <ModifyView style={{color: COLOR.RED}}>
                                        변경
                                    </ModifyView>
                                </HeaderCell>
                            </PrView>
                        )
                    }
                })
            }
        </div>
    );
};


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
    display:flex;
    height:60px;
    min-width:20px;
    justify-content:center;
    align-items:center;
    font-size:16px;
    flex:1;
    padding:5px;
    /*border:2px solid ${COLOR.BLACK};
    border-left : 0px solid ${COLOR.BLACK};*/
`;

const PrView  = styled.div`
    display:flex;
    flex-direction:row;
    border-left:2px solid ${COLOR.LIGHT_GRAY};
    border-right:2px solid ${COLOR.LIGHT_GRAY};
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

export default StaffsList