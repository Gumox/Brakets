import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../constants/color";
import Router, { useRouter } from "next/router";
import axios from "axios";
import remakeCallNumber from "../../../../functions/remakeCallNumber";

const StaffModify = ({
    infos,
    user,
    staffs,
    staff,
    setActionView =()=>{}
}) =>{
    console.log(staff)
    const router = useRouter();
    const cName =staff.headquarter_name;
    const cNameKr =staff.headquarter_name_kr;
    const cCode =staff.headquarter_code;
    const adminCode = staff.staff_code;

    
    const staffName = staff.staff_name;
    const kakaoAcount = staff.staff_account;
    const [staffAddress,setStaffAddress] =useState(null)
    const [staffEmail,setStaffEmail] =useState(null)
    const [state,setState] =useState(staff.staff_state)
    

    const modifyStaff = async() =>{
        if(state !== staff.staff_state || staffAddress || staffEmail){   
            const bodyData = {
                state:state,
                phone:staffAddress || staff.staff_phone,
                staff_email:staffEmail || staff.staff_email,
                staff_id:staff.staff_id,
            }
            const [result] = await Promise.all([
                axios
                .post(`${process.env.API_URL}/headquarter/updateAdministrator`,bodyData)
                .then(({ data }) => data.body), 
                ])
            
                alert("서비스센터 직원 정보가 변경 되었습니다.")
            window.location.reload();
        }else{
            setActionView(null)
        }
    }

    
   

    return (
        <Wrapper >
            
           
            
                    
                
                <h2 style={{margin:20}}>서비스 센터 직원 등록</h2>
                <PrView style={{borderRadius:"10px 10px 0 0"}}>
                    <NameBox  style={{borderRadius:"10px 0 0 0"}}>
                        회사 이름
                    </NameBox>
                    

                    <InputBox style={{justifyContent:"center",alignItems:"center",borderTop:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <TwoNameBox >
                            <ColView  style={{justifyContent:"center",alignItems:"center"}}>
                                <div style={{marginBottom:5}}>{cNameKr}</div>
                                <div >{cName}</div>
                                
                            </ColView>
                        </TwoNameBox>
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
                    <NameBox style={{borderTop:`2px solid rgb(244,244,244)`}}>
                        
                        <TwoNameBox >
                            <ColView  style={{justifyContent:"center",alignItems:"center"}}>
                                <div style={{marginBottom:5,fontSize:"16px"}}>직원 코드</div>
                                <div style={{color:COLOR.RED,fontSize:"12px"}}>
                                    {`(자동 완성)`}
                                </div>
                                
                            </ColView>
                        </TwoNameBox>
                    </NameBox>

                    <LongInputBox style={{paddingLeft:20,alignItems:"center",fontWeight:"bold",fontSize:15}}>
                        {adminCode}
                    </LongInputBox>
                </PrView>
                
                <PrView>
                    <NameBox style={{borderTop:`2px solid rgb(244,244,244)`}}>
                        직원 이름
                    </NameBox>

                    <InputBox style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <InputLine value={staffName || ""} style={{flex:1}}></InputLine>
                    </InputBox>

                    <NameBox>
                        kakao 계정
                    </NameBox>

                    <InputBox style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <InputLine value={kakaoAcount  || ""} style={{flex:1}} ></InputLine>
                    </InputBox>
                </PrView>
                <PrView>
                    <NameBox style={{borderTop:`2px solid rgb(244,244,244)`}}>
                        직원 연락처
                    </NameBox>

                    <InputBox >
                        <InputLine value={staffAddress || ""} placeholder={remakeCallNumber(staff.staff_phone)} style={{flex:1}} onChange={(e)=>{setStaffAddress(e.target.value)}}></InputLine>
                    </InputBox>

                    <NameBox style={{borderTop:`2px solid rgb(244,244,244)`}}>
                        E-mail
                    </NameBox>

                    <InputBox style={{borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <InputLine value={staffEmail || ""} placeholder={staff.staff_email} style={{flex:1}} onChange={(e)=>{setStaffEmail(e.target.value)}}></InputLine>
                    </InputBox>
                </PrView>

                <PrView style={{borderRadius:"0 0 10px 10px"}}>
                    <NameBox style={{borderRadius:"0 0 0 10px",borderTop:`2px solid rgb(244,244,244)`}}>
                        직원 상태
                    </NameBox>

                    <LongInputBox style={{borderRadius:"0 0 10px 0"}}>
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
                
                
                
                <CenterView>
                        <CustomButton onClick={()=>{modifyStaff()}}>
                            수정
                        </CustomButton>
                        <CustomButton style={{backgroundColor:COLOR.RED}} onClick={()=>{setActionView(null)}}>
                            취소
                        </CustomButton>
                    </CenterView>
                

        </Wrapper>
    );
};




const Wrapper = styled.div`
    padding:2%;
    background-color:${COLOR.WHITE};
`;

const CustomButton =styled.button`
    background-color : ${COLOR.INDIGO};
    width:60px;
    height : 40px;
    color:${COLOR.WHITE};
    margin:20px;
    font-size:15px;
    border-radius:10px;

`;
const InsideWrapper  = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction: column;
`;
const PrView  = styled.div`
    mon-width:540px;
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
    font-size: 16px;
    display:flex;
    align-items:center;
    justify-content:space-around;

`;
const NameBox  = styled.div`
    height : 60px;
    width:140px;
    background-color:${COLOR.LIGHT_GRAY};
    font-size: 16px;
    display:flex;
    justify-content:center;
    align-items:center;
`;
const InputBox  = styled.div`
    height : 60px;
    flex:1.3;
    display:flex;
    justyfiy-content:center;
    ailgn-items:center;
`;
const LongInputBox  = styled.div`
    height : 60px;
    flex:3.31;
    border: 2px solid ${COLOR.LIGHT_GRAY};
    border-left :0;
    display:flex;
    justyfiy-content:center;
    ailgn-items:center;
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



export default StaffModify