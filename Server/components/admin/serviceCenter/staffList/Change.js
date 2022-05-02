import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../constants/color";
import Router, { useRouter } from "next/router";
import axios from "axios";

const StaffChange = ({
    user,
    staff,
    setActionView =()=>{}
}) =>{
    console.log(staff)
    const router = useRouter();
    const cName =staff.headquarter_name;
    const cNameKr =staff.headquarter_name_kr;
    const cCode =staff.headquarter_code;
    const adminCode = staff.staff_code;

    
    const [staffName,setStaffName] = useState();
    const [kakaoAcount,setKakaoAcount] = useState();
    const [staffAddress,setStaffAddress] =useState()
    const [staffEmail,setStaffEmail] =useState()
    const storeId =user.store_id;
    

    
    const changeStaff = async() =>{
        const bodyData = {
            state:false,
            phone:staff.staff_phone,
            staff_email:staff.staff_email,
            staff_id:staff.staff_id,
        }
        const [result] = await Promise.all([
            axios
              .post(`${process.env.API_URL}/headquarter/updateAdministrator`,bodyData)
              .then(({ data }) => data.body), 
            ])

        const body = {
            state: true,
            account: kakaoAcount,
            name: staffName,
            phone: staffAddress,
            level:1,
            staff_code:adminCode,
            staff_email:staffEmail,
            store_id :storeId
        }
        const [regist] = await Promise.all([
                axios
                  .post(`${process.env.API_URL}/staff/regist`,body)
                  .then(({ data }) => data.body), 
                ])
        alert("새로운 직원으로 변경되었습니다.")
        window.location.reload();
    }

    
   

    return (
        <Wrapper >
            
           
            
                    
                
                <h2>서비스 센터 직원 등록</h2>
                <PrView>
                    <NameBox  >
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

                    <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <CenterView  style={{paddingLeft:20,alignItems:"center",fontWeight:"bold",fontSize:18}}>
                            {cCode}
                        </CenterView>
                    </InputBox>
                    
                </PrView>
                
                <PrView>
                    <NameBox>
                        
                        <TwoNameBox >
                            <ColView  style={{justifyContent:"center",alignItems:"center"}}>
                                <div style={{marginBottom:5}}>직원 코드</div>
                                <div style={{color:COLOR.RED}}>
                                    {`(자동 완성)`}
                                </div>
                                
                            </ColView>
                        </TwoNameBox>
                    </NameBox>

                    <LongInputBox style={{paddingLeft:20,alignItems:"center",fontWeight:"bold",fontSize:18}}>
                        {adminCode}
                    </LongInputBox>
                </PrView>
                
                <PrView style={{height:"120px"}}>
                    <NameBox style={{height:"120px"}}>
                        직원 이름
                    </NameBox>

                    <InputBox style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,height:"120px"}}>
                            <ColView  style={{justifyContent:"center",fontSize:"16px",paddingLeft:10}}>
                                <PrView style={{margin:10,fontSize:"18px"}}>
                                    {"변경 할 직원"}
                                    <div style={{marginLeft:20,fontWeight:"bold"}}>
                                        {staff.staff_name}
                                    </div>
                                </PrView>
                                <PrView style={{margin:10}}>
                                    {"새 직원"}
                                    <InputLine value={staffName} style={{marginLeft:20,flex:1,fontSize:"16px", borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}} onChange={(e)=>{setStaffName(e.target.value)}}/>
                                </PrView>
                                
                                
                            </ColView>
                            
                    </InputBox>

                    <NameBox style={{height:"120px"}}>
                        <TwoNameBox >
                            <ColView  style={{justifyContent:"center",alignItems:"center"}}>
                                <div style={{marginBottom:5}}>직원 </div>
                                <div >Kakao 계정</div>
                                
                            </ColView>
                        </TwoNameBox>
                    </NameBox>

                    <InputBox style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`,height:"120px"}}>
                        <InputLine value={kakaoAcount} style={{flex:1}} onChange={(e)=>{setKakaoAcount(e.target.value)}}></InputLine>
                    </InputBox>
                </PrView>
                <PrView>
                    <NameBox>
                        직원 연락처
                    </NameBox>

                    <InputBox style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <InputLine value={staffAddress} style={{flex:1}} onChange={(e)=>{setStaffAddress(e.target.value)}}></InputLine>
                    </InputBox>

                    <NameBox>
                        직원 이메일
                    </NameBox>

                    <InputBox style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <InputLine value={staffEmail} style={{flex:1}} onChange={(e)=>{setStaffEmail(e.target.value)}}></InputLine>
                    </InputBox>
                </PrView>
                
                
                
                
                <CenterView>
                        <CustomButton onClick={()=>{changeStaff()}}>
                            변경
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
    width:80px;
    height : 50px;
    color:${COLOR.WHITE};
    margin:20px;
    font-size:16px;
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
    font-size: 18px;
    display:flex;
    align-items:center;
    justify-content:space-around;

`;
const NameBox  = styled.div`
    height : 80px;
    width:140px;
    background-color:${COLOR.LIGHT_GRAY};
    font-size: 18px;
    display:flex;
    justify-content:center;
    align-items:center;
`;
const InputBox  = styled.div`
    height : 80px;
    flex:1.3;
    display:flex;
    justyfiy-content:center;
    ailgn-items:center;
`;
const LongInputBox  = styled.div`
    height : 80px;
    flex:3.31;
    border: 2px solid ${COLOR.LIGHT_GRAY};
    border-left :0;
    display:flex;
    justyfiy-content:center;
    ailgn-items:center;
`;
const InputLine  = styled.input`
    border 0px;
    padding-left:10px;
    font-size:20px;

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



export default StaffChange