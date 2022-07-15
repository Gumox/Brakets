import React,{useState,useEffect,} from "react";
import styled from "styled-components";
import COLOR from "../../../constants/color";
import { useRouter } from "next/router";
import _ from "lodash";
import Link from 'next/link';
import remakeCallNumber from "../../../functions/remakeCallNumber";
import axios from "axios";

const AdministratorModifiy = ({
    info,
    staffs=[],
    user,
    setModifyAcion=()=>{}
}) =>{
    const [state,setState] =useState(info.staff_state)
    const [KakaoAcount] =useState(info.staff_account)
    const [staffEmail,setStaffEmail] =useState(null)
    const [phone,setPhone] =useState(null)
    const adminCode = info.staff_code;

    const modifyAdministrator = async() =>{
        const bodyData = {
            state:state,
            phone:phone || info.staff_phone,
            staff_email:staffEmail || info.staff_email,
            staff_id:info.staff_id,
        }
        const [result] = await Promise.all([
            axios
              .post(`${process.env.API_URL}/headquarter/updateAdministrator`,bodyData)
              .then(({ data }) => data.body), 
            ])
        window.location.reload();
    }
    const checkBeforeModify = () =>{
        let filt = _.filter(staffs,{headquarter_id: Number(info.headquarter_id)})
        let check = _.filter(filt,{staff_state: 1})
        if(check.length>0 && check[0].staff_id !== info.staff_id){
            alert("해당 회사의 사용중인 전채관리자가 존재합니다")
            setState(false)
        }else{
            setState(!state)
        }
    }
    return (
        <Wrapper>
            
            <SrollWrapper>
            
                <MainSpace  style={{padding:"2%"}}>
                    
                
            <InputTableBox>
                
                <h2 style={{fontWeight:"bold",margin:20}}>{"전체관리자 정보 & 상태 수정"}</h2>
                
                
                <PrView>
                    <NameBox style={{borderRadius:"10px 0 0 0"}}>
                        
                        <TwoNameBox >
                            <ColView  style={{justifyContent:"center",alignItems:"center"}}>
                                <div style={{marginBottom:5}}>전체관리자 코드</div>
                            </ColView>
                        </TwoNameBox>
                    </NameBox>

                    <LongInputBox style={{paddingLeft:20,alignItems:"center",fontWeight:"bold",borderRadius:"0 10px 0 0",fontSize:14}}>
                        {adminCode}
                    </LongInputBox>
                </PrView>
                
                <PrView>
                    <NameBox style={{borderTop:"2px solid rgb(244,244,244)"}}>
                        전체관리자 이름
                    </NameBox>

                    <InputBox >
                        <div style={{paddingLeft:20,display:"flex",alignItems:"center",fontWeight:"bold",fontSize:14}}>
                            {info.staff_name}
                        </div>
                    </InputBox>

                    <NameBox>
                        <TwoNameBox >
                            <ColView  style={{justifyContent:"center",alignItems:"center"}}>
                                <div style={{marginBottom:5}}>전체관리자 </div>
                                <div >kakao 계정</div>
                                
                            </ColView>
                        </TwoNameBox>
                    </NameBox>

                    <InputBox style={{borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <div style={{paddingLeft:20,display:"flex",alignItems:"center",fontWeight:"bold",fontSize:14}}>
                            {KakaoAcount}
                        </div>
                    </InputBox>
                </PrView>
                <PrView>
                    <NameBox style={{borderTop:"2px solid rgb(244,244,244)"}}>
                        전체관리자 연락처
                    </NameBox>

                    <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <InputLine value={phone || ''} style={{flex:1}} placeholder={remakeCallNumber(info.staff_phone)} onChange={(e)=>{setPhone(e.target.value)}}></InputLine>
                    </InputBox>

                    <NameBox style={{borderTop:"2px solid rgb(244,244,244)"}}>
                        전체관리자 이메일
                    </NameBox>

                    <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <InputLine value={staffEmail || '' } placeholder={info.staff_email} style={{flex:1}} onChange={(e)=>{setStaffEmail(e.target.value)}}></InputLine>
                    </InputBox>
                </PrView>
                
                <PrView>
                    <NameBox style={{borderTop:"2px solid rgb(244,244,244)",borderRadius:"0 0 0 10px"}}>
                        전체관리자 상태
                    </NameBox>

                    <LongInputBox style={{borderRadius:"0 0 10px 0"}}>
                        <PrView>
                            <CenterView style={{margin:10}}>
                            <CheckBox type="checkbox" checked={state} onChange ={()=>{checkBeforeModify(!state)}}/>
                            <div>사용함</div>

                            </CenterView>
                            <CenterView style={{margin:15}}>
                            <CheckBoxRed type="checkbox" checked={!state} onChange ={()=>{checkBeforeModify(!state)}}/>
                            <div>사용 안함</div>

                            </CenterView>
                        </PrView>
                    </LongInputBox>
                </PrView>
                
                
                    <CenterView>
                        <RegistButton onClick={()=>{modifyAdministrator()}}>
                            수정
                        </RegistButton>
                        <RegistButton style={{backgroundColor:COLOR.RED}} onClick={()=>{setModifyAcion(null)}}>
                            취소
                        </RegistButton>
                    </CenterView>
                </InputTableBox>
                   
                </MainSpace>
            </SrollWrapper>
            

        </Wrapper>
    );
};
const RegistButton =styled.button`
    background-color : ${COLOR.INDIGO};
    width:60px;
    height : 40px;
    color:${COLOR.WHITE};
    margin:20px;
    font-size:14px;
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
    width:980px;
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
    font-size: 14px;
    display:flex;
    align-items:center;
    justify-content:space-around;

`;
const InputLine  = styled.input`
    border: 0px;
    margin: 2px;
    padding-left:10px;
    font-size:14px;
    display:flex;
    &:focus { 
        outline: none !important;
        border-color: #719ECE;
        box-shadow: 0 0 10px #719ECE;
    }
`;
const SrollWrapper = styled.nav`
    display:flex;
    flex-direction:row;
    overflow: auto;
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
const MainSpace=styled.div`
    background-color:${COLOR.WHITE};
    width :100%;
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
    min-width:540px;
    display:flex;
    flex-direction:row;
`;

const NameBox  = styled.div`
    height : 60px;
    width:145px;
    background-color:${COLOR.LIGHT_GRAY};
    font-size: 14px;
    display:flex;
    justify-content:center;
    align-items:center;
`;
const InputBox  = styled.div`
    height : 60px;
    width:360px;
    display:flex;
    justyfiy-content:center;
    ailgn-items:center;
`;
const InputBoxTr  = styled.div`
    height : 60px;
    background-color:${COLOR.WHITE};
    color:${COLOR.DARK_INDIGO};
    font-size: 14px;
    display:flex;
    width:210px;
    font-size:20px;
    font-weight:bold;
    justify-content:center;
`;
const LongInputBox  = styled.div`
    height : 60px;
    width:865px;
    border: 2px solid ${COLOR.LIGHT_GRAY};
    border-left :0;
    display:flex;
    justyfiy-content:center;
    ailgn-items:center;
    font-size:14px;

`;



export default AdministratorModifiy