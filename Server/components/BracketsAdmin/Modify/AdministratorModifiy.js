import React,{useState,useEffect,} from "react";
import styled from "styled-components";
import COLOR from "../../../constants/color";
import { useRouter } from "next/router";
import Link from 'next/link';
import remakeCallNumber from "../../../functions/remakeCallNumber";
import axios from "axios";

const AdministratorModifiy = ({
    info,
    user,
    setModifyAcion=()=>{}
}) =>{
    console.log(info)
    const router = useRouter();
    const [cCode,setCCode] =useState("")
    const [state,setState] =useState(info.staff_state)
    const [KakaoAcount,setKakaoAcount] =useState(info.staff_account)
    const [phone,setPhone] =useState(info.staff_phone)
    const adminCode = info.staff_code;

    
    return (
        <Wrapper>
            
            <SrollWrapper>
            
                <MainSpace  style={{padding:"2%"}}>
                    
                
                <InsideWrapper>
            <InputTableBox>
                
                <h2 style={{fontWeight:"bold"}}>{"전체관리자 정보 & 상태 수정"}</h2>
                
                
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
                        <div style={{paddingLeft:20,display:"flex",alignItems:"center",fontWeight:"bold",fontSize:18}}>
                            {info.staff_name}
                        </div>
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
                        <InputLine style={{flex:1, margin: 10}}></InputLine>
                    </InputBox>
                </PrView>
                
                <PrView>
                    <NameBox>
                        전체관리자 상태
                    </NameBox>

                    <LongInputBox style={{}}>
                        <PrView>
                            <CenterView style={{margin:10}}>
                            <CheckBox type="checkbox" checked={state} onChange ={()=>{setState(!state)}}/>
                            <div>사용함</div>

                            </CenterView>
                            <CenterView style={{margin:15}}>
                            <CheckBoxRed type="checkbox" checked={!state} onChange ={()=>{setState(!state)}}/>
                            <div>사용 안함</div>

                            </CenterView>
                        </PrView>
                    </LongInputBox>
                </PrView>
                
                
                
                    </InputTableBox>
                    </InsideWrapper>
                    <CenterView>
                        <RegistButton>
                            수정
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



export default AdministratorModifiy