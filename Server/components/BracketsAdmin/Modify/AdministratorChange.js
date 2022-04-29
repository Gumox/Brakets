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
    console.log(info)
    const router = useRouter();
    const cCode=info.headquarter_code
    const [KakaoAcount,setKakaoAcount] =useState(null)
    const [staffEmail,setStaffEmail] =useState(null)
    const [administratorName,setAdministratorName] =useState(null)
    const [phone,setPhone] =useState(null)
    const adminCode = info.staff_code;

    const changeAdministrator = async() =>{
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
            name: administratorName,
            phone: phone,
            staff_code:adminCode,
            staff_email:staffEmail,
            headquarter_id :info.headquarter_id
        }
        const [regist] = await Promise.all([
            axios
                .post(`${process.env.API_URL}/headquarter/registAdministrator`,body)
                .then(({ data }) => data.body), 
            ])
            console.log(result)
            router.push("/adminBrackeks/AdministratorList")
        window.location.reload();
    }
    
    return (
        <Wrapper>
            
            <SrollWrapper>
            
                <MainSpace  style={{padding:"2%"}}>
                    
                
                <InsideWrapper>
            <InputTableBox>
                
                <h2 style={{fontWeight:"bold"}}>{"전체관리자 변경"}</h2>
                <PrView>
                    <NameBox  >
                        회사 이름
                    </NameBox>
                    

                    <InputBox style={{alignItems:"center"}}>
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

                    <InputBox>
                        <CenterView  style={{paddingLeft:20,alignItems:"center",fontWeight:"bold",fontSize:18}}>
                            {cCode}
                        </CenterView>
                    </InputBox>
                    
                </PrView>
                
                <PrView>
                    <NameBox>
                        
                        <TwoNameBox >
                            <ColView  style={{justifyContent:"center",alignItems:"center"}}>
                                <div style={{marginBottom:5}}>전체관리자 코드</div>
                            </ColView>
                        </TwoNameBox>
                    </NameBox>

                    <LongInputBox style={{paddingLeft:20,alignItems:"center",fontWeight:"bold",fontSize:18}}>
                        {adminCode}
                    </LongInputBox>
                </PrView>
                
                <PrView>
                    <NameBox>
                        전체관리자 이름
                    </NameBox>

                    <InputBox >
                        <InputLine value={administratorName} style={{flex:1, margin: 10}} onChange={(e)=>{setAdministratorName(e.target.value)}}></InputLine>
                    </InputBox>

                    <NameBox>
                        <TwoNameBox >
                            <ColView  style={{justifyContent:"center",alignItems:"center"}}>
                                <div style={{marginBottom:5}}>전체관리자 </div>
                                <div >Kakao 계정</div>
                                
                            </ColView>
                        </TwoNameBox>
                    </NameBox>

                    <InputBox>
                         <InputLine value={KakaoAcount} style={{flex:1, margin: 10}} onChange={(e)=>{setKakaoAcount(e.target.value)}}></InputLine>
                    </InputBox>
                </PrView>
                <PrView>
                    <NameBox>
                        전체관리자 연락처
                    </NameBox>

                    <InputBox>
                        <InputLine value={phone} style={{flex:1, margin: 10}} onChange={(e)=>{setPhone(e.target.value)}}></InputLine>
                    </InputBox>

                    <NameBox>
                        전체관리자 이메일
                    </NameBox>

                    <InputBox>
                        <InputLine value={staffEmail} style={{flex:1, margin: 10}} onChange={(e)=>{setStaffEmail(e.target.value)}}></InputLine>
                    </InputBox>
                </PrView>
                
               
                
                
                
                    </InputTableBox>
                    </InsideWrapper>
                    <CenterView>
                        <RegistButton onClick={()=>{changeAdministrator()}}>
                            변경
                        </RegistButton>
                        <RegistButton  onClick={()=>{setModifyAcion(null)}}>
                            취소
                        </RegistButton>
                    </CenterView>
                </MainSpace>
            </SrollWrapper>
            

        </Wrapper>
    );
};
const RegistButton =styled.button`
    background-color : ${COLOR.INDIGO};
    width:80px;
    height : 50px;
    color:${COLOR.WHITE};
    margin:20px;
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
    width:1080px;
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



export default AdministratorChange