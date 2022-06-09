import React,{useState,useEffect} from "react";
import axios from "axios";
import _ from "lodash";
import styled from "styled-components";
import COLOR from "../../../constants/color";
import AdministratorModifiy from "../Modify/AdministratorModifiy";
import AdministratorChange from "../Modify/AdministratorChange"
import remakeCallNumber from "../../../functions/remakeCallNumber";
import moment from "moment";

const Administrator = ({
    staffs,
    setModifyAcion=()=>{}
}) =>{
    console.log(staffs)
    return(
        <Wrapper>
            {staffs.map((item,index)=>{
                const _phone =String(item.staff_phone).replace(/-/g,"")
                
                return(
                <PrView key={index}>
                    
                    <HeaderCell style={{borderLeft:"2px solid",flexDirection:"column"}}>
                        <div>{item.headquarter_name}</div>
                        <div>{`(${item.headquarter_name_kr})`}</div>
                    </HeaderCell>

                    <HeaderCell>
                        <InputLineArea disabled value={item.headquarter_code}/>
                    </HeaderCell>

                    <HeaderCell>
                        <InputLineArea disabled value={item.staff_code}/>
                    </HeaderCell>
                    
                    <HeaderCell>
                        <InputLineArea disabled value={item.staff_name}/>
                    </HeaderCell>

                    <HeaderCell style={{fontSize:16}}>
                        <InputLineArea disabled value={remakeCallNumber(_phone)}/>
                    </HeaderCell>
                    <HeaderCell style={{fontSize:16}}>
                        <InputLineArea disabled wrap="on" value={item.staff_email}/>
                    </HeaderCell>
                    
                    <HeaderCell>
                        {
                            item.staff_state >0 ?
                            <div style={{color:COLOR.CYAN_BLUE}}>{"ON"}</div>
                            :<div style={{color:COLOR.RED}}>{"OFF"}</div>
                        }
                    </HeaderCell>
                    
                    <HeaderCell >
                        <ModifyButton
                            onClick={()=>{setModifyAcion(
                                <AdministratorModifiy staffs={staffs} info={item} setModifyAcion={setModifyAcion}/>
                            )}}
                        >수정</ModifyButton>
                    </HeaderCell>
                    
                    <HeaderCell >
                        <ChangeButton 
                             onClick={()=>{setModifyAcion(
                                <AdministratorChange info={item} setModifyAcion={setModifyAcion}/>
                            )}}
                        >변경</ChangeButton>
                    </HeaderCell>
                </PrView>
                )
            })}
        </Wrapper>
    )
}

const HeaderCell = styled.div`
    display:flex;
    min-width:20px;
    justify-content:center;
    align-items:center;
    font-size:20px;
    flex:1;
    padding:5px;
    border-bottom:2px solid ${COLOR.BLACK};
    border-right : 2px solid ${COLOR.BLACK};
`;
const ModifyButton =styled.button`
    background-color : ${COLOR.INDIGO};
    width:60px;
    height : 40px;
    color:${COLOR.WHITE};
    font-size:16px;
    border-radius:10px;

`
const ChangeButton =styled.button`
    background-color : ${COLOR.RED};
    width: 60px;
    height : 40px;
    color:${COLOR.WHITE};
    font-size:16px;
    border-radius:10px;

`
const Wrapper  = styled.div`
    overflow:auto;
    &::-webkit-scrollbar {
        width: 8px;
        height: 10px;
        background: rgba(210, 210, 210, 0.4);
      }
      &::-webkit-scrollbar-thumb {
        background: rgba(96, 96, 96, 0.7);
        border-radius: 6px;
      }
`;
const PrView  = styled.div`
    display:flex;
    flex-direction:row;
`;

const InputLineArea  = styled.textarea`
    border 1px solid #ffffff;
    background-color:${COLOR.WHITE};
    font-size:18px;
    resize: none;
    font-weight:bold;
    text-align: center;
`;



export default Administrator