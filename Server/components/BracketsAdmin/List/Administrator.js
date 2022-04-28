import React,{useState,useEffect} from "react";
import axios from "axios";
import _ from "lodash";
import styled from "styled-components";
import COLOR from "../../../constants/color";
import AdministratorModifiy from "../Modify/AdministratorModifiy";
import moment from "moment";

const Administrator = ({
    staffs,
    setModifyAcion=()=>{}
}) =>{
    
    return(
        <Wrapper>
            {staffs.map((item,index)=>{
                
                return(
                <PrView key={index}>
                    
                    <HeaderCell style={{flexDirection:"column"}}>
                        <div>{item.headquarter_name}</div>
                        <div>{`(${item.headquarter_name_kr})`}</div>
                    </HeaderCell>

                    <HeaderCell>
                       {item.headquarter_code}
                    </HeaderCell>

                    <HeaderCell>
                        {item.staff_code}
                    </HeaderCell>
                    
                    <HeaderCell>
                        {item.staff_name}
                    </HeaderCell>

                    <HeaderCell style={{fontSize:16}}>
                        {item.staff_phone}
                    </HeaderCell>
                    
                    <HeaderCell>
                        {
                            item.staff_state >0 ?
                            <div style={{color:COLOR.CYAN_BLUE}}>{"On"}</div>
                            :<div style={{color:COLOR.RED}}>{"Off"}</div>
                        }
                    </HeaderCell>
                    
                    <HeaderCell >
                        <ModifyButton
                            onClick={()=>{setModifyAcion(
                                <AdministratorModifiy info={item} setModifyAcion={setModifyAcion}/>
                            )}}
                        >수정</ModifyButton>
                    </HeaderCell>
                    
                    <HeaderCell style={{borderRight:0}}>
                        <ChangeButton>변경</ChangeButton>
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
    border-bottom:1px solid ${COLOR.BLACK};
    border-right : 1px solid ${COLOR.BLACK};
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
const InsideWrapper  = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction: column;
`;
const InputTableBox  = styled.div`
    min-width:1080px;
    border:2px solid;
`;
const PrView  = styled.div`
    display:flex;
    flex-direction:row;
`;
const ColView  = styled.div`
    display:flex;
    flex-direction: column;
`;
const CenterView  = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-around;
`;

const TwoNameBox  = styled.div`
    font-size: 18px;
    display:flex;
    align-items:center;
    justify-content:space-around;

`;
const NameBox  = styled.div`
    height : 80px;
    width : 200px;
    border 1px solid;
    font-size: 18px;
    display:flex;
    justify-content:center;
    align-items:center;
`;
const InputBox  = styled.div`
    height : 80px;
    flex:1.3;
    border 1px solid;
    display:flex;
    justyfiy-content:center;
    ailgn-items:center;
`;
const LongInputBox  = styled.div`
    height : 80px;
    flex:3.31;
    border 1px solid;
    display:flex;
    justyfiy-content:center;
    ailgn-items:center;
`;
const InputLine  = styled.input`
    border 1px solid;
    border-radius: 5px;
    padding-left:10px;
    font-size:20px;

`;
const InputLineArea  = styled.textarea`
    border 1px solid;
    border-radius: 5px;

`;

const RegistAligo  = styled.div`
    border-radius: 5px;
    color:${COLOR.RED};
    font-size:15px;
    &:hover {
        color: #ff8585;
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

export default Administrator