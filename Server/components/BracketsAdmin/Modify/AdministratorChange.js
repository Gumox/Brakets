import React,{useState,useEffect,} from "react";
import styled from "styled-components";
import COLOR from "../../../constants/color";
import { useRouter } from "next/router";
import Link from 'next/link';
import remakeCallNumber from "../../../functions/remakeCallNumber";
import axios from "axios";

const AdministratorChange = ({
    info,
    user,
    setModifyAcion=()=>{}
}) =>{
    const router = useRouter();
    const cCode=info.headquarter_code
    const [KakaoAcount,setKakaoAcount] =useState(null)
    const [staffEmail,setStaffEmail] =useState(null)
    const [administratorName,setAdministratorName] =useState(null)
    const [phone,setPhone] =useState(null)
    const adminCode = info.staff_code;

    const changeAdministrator = async() =>{
        if(KakaoAcount && administratorName && phone){
            const bodyData = {
                state:false,
                phone:info.staff_phone,
                staff_email:info.staff_email,
                staff_id:info.staff_id,
            }
            const [result] = await Promise.all([
                axios
                .post(`${process.env.API_URL}/headquarter/updateAdministrator`,bodyData)
                .then(({ data }) => data.body), 
                ])

            const body = {
                state: true,
                account: KakaoAcount,
                name: administratorName || info.staff_name,
                phone: phone || info.staff_phone,
                staff_code:adminCode,
                staff_email:staffEmail,
                headquarter_id :info.headquarter_id
            }
            const [regist] = await Promise.all([
                axios
                    .post(`${process.env.API_URL}/headquarter/registAdministrator`,body)
                    .then(({ data }) => data.body), 
                ])
                router.push("/adminBrackets/AdministratorList")
            window.location.reload();
        }else if(!KakaoAcount){
            alert("변경하실 관리자의 카카오 계정을 입력해 주세요")
        }
    }
    
    return (
        <Wrapper>
            
            <SrollWrapper>
            
                <MainSpace  style={{padding:"2%"}}>
                    
                <InputTableBox>
                
                <h2 style={{margin:20}}>{"전체관리자 변경"}</h2>
                <PrView>
                    <NameBox style={{borderRadius:"10px 0 0 0"}}>
                        회사 이름
                    </NameBox>
                    

                    <InputBox style={{alignItems:"center",borderTop:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <ColView style={{ marginLeft:10,}}>
                            <div style={{marginBottom:5,fontSize:15}}>한글</div>
                            <div style={{marginTop:5,fontSize:15}}>영문</div>
                            
                        </ColView>
                        <ColView>
                            <div style={{ marginLeft:10,marginBottom:5,fontSize:15, flex:1, fontWeight:"bold"}}>
                                {info.headquarter_name_kr}
                            </div>

                            <div style={{ marginLeft:10,marginTop:5,fontSize:15, flex:1, fontWeight:"bold"}}>
                                {info.headquarter_name} 
                            </div>
                            
                        </ColView>
                    </InputBox>

                    <NameBox>
                        회사코드
                    </NameBox>

                    <InputBox style={{borderRadius:"0 10px 0 0",borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <CenterView  style={{paddingLeft:20,alignItems:"center",fontWeight:"bold",fontSize:15}}>
                            {cCode}
                        </CenterView>
                    </InputBox>
                    
                </PrView>
                
                <PrView>
                    <NameBox style={{borderTop:"2px solid rgb(244,244,244)"}}>
                        
                        <TwoNameBox >
                            <ColView  style={{justifyContent:"center",alignItems:"center"}}>
                                <div style={{marginBottom:5}}>전체관리자 코드</div>
                            </ColView>
                        </TwoNameBox>
                    </NameBox>

                    <LongInputBox style={{paddingLeft:20,alignItems:"center",fontWeight:"bold",fontSize:15}}>
                        {adminCode}
                    </LongInputBox>
                </PrView>
                
                <PrView>
                    <NameBox style={{borderTop:"2px solid rgb(244,244,244)"}}>
                        전체관리자 이름
                    </NameBox>

                    <InputBox >
                        <InputLine value={administratorName || ""} placeholder={info.staff_name} style={{flex:1}} onChange={(e)=>{setAdministratorName(e.target.value)}}></InputLine>
                    </InputBox>

                    <NameBox>
                        <TwoNameBox >
                            <ColView  style={{justifyContent:"center",alignItems:"center"}}>
                                <div style={{marginBottom:5}}>전체관리자 </div>
                                <div >kakao 계정</div>
                                
                            </ColView>
                        </TwoNameBox>
                    </NameBox>

                    <InputBox style={{borderLeft:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                         <InputLine value={KakaoAcount || ""} placeholder={info.staff_account} style={{flex:1}} onChange={(e)=>{setKakaoAcount(e.target.value)}}></InputLine>
                    </InputBox>
                </PrView>
                <PrView>
                    <NameBox style={{borderRadius:"0 0 0 10px",borderTop:"2px solid rgb(244,244,244)"}}>
                        전체관리자 연락처
                    </NameBox>

                    <InputBox style={{ borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <InputLine value={phone || ""} placeholder={info.staff_account} style={{flex:1}} onChange={(e)=>{setPhone(e.target.value)}}></InputLine>
                    </InputBox>

                    <NameBox style={{borderTop:"2px solid rgb(244,244,244)"}}>
                        전체관리자 이메일
                    </NameBox>

                    <InputBox style={{borderRadius:"0 0 10px 0",borderLeft:0,border:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <InputLine value={staffEmail || ""} placeholder={info.staff_email} style={{flex:1}} onChange={(e)=>{setStaffEmail(e.target.value)}}></InputLine>
                    </InputBox>
                </PrView>
                
               
                
                
                
                <CenterView >
                    <RegistButton onClick={()=>{changeAdministrator()}}>
                        변경
                    </RegistButton>
                    <RegistButton  style={{backgroundColor:COLOR.RED}} onClick={()=>{setModifyAcion(null)}}>
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
    width: 60px;
    height : 40px;
    color:${COLOR.WHITE};
    margin:20px;
    font-size:15px;
    border-radius:10px;

`
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
    font-size: 15px;
    display:flex;
    align-items:center;
    justify-content:space-around;

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

const MainSpace=styled.div`
    background-color:${COLOR.WHITE};
    width :100%;
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

export default AdministratorChange