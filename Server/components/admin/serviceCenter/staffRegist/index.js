import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../constants/color";
import Router, { useRouter } from "next/router";
import axios from "axios";
import getNextStaffCode from "./getNextStaffCode";
import { debounce } from "lodash";

const StaffRegist = ({infos,user,staffs}) =>{
    console.log(user)
    const router = useRouter();
    const cName =infos.headquarter_name
    const cNameKr =infos.text
    const cCode =infos.headquarter_code
    const [adminCode,setAdminCode] =useState("")

    
    const [staffName,setStaffName] =useState()
    const [kakaoAcount,setKakaoAcount] =useState()
    const [staffAddress,setStaffAddress] =useState()
    const [staffEmail,setStaffEmail] =useState()
    const storeId =user.store_id;

    
    const registStaff = async() =>{
        const bodyData = {
            state: true,
            account: kakaoAcount,
            name: staffName,
            phone: staffAddress,
            level:1,
            staff_code:adminCode,
            staff_email:staffEmail,
            store_id :storeId
        }
        const [result] = await Promise.all([
            axios
              .post(`${process.env.API_URL}/staff/regist`,bodyData)
              .then(({ data }) => data.body), 
            ])
        alert("새로운 서비스센터 직원이 등록되었습니다.")
        router.push("/admin/serviceCenterControl")
    }

    const [windowWidth,setWindowWidth] = useState(0)
    const [windowHeight,setWindowHeight] = useState(0)
    const handleResize = debounce(()=>{
        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
    },1000)
    
    useEffect(()=>{
        if(getNextStaffCode(staffs) !== "over staff"){
            setAdminCode(cCode+"."+getNextStaffCode(staffs))
        }else{
            alert("직원 수가 허용치를 넘어 갔습니다 서비스 관리자에게 연락해 주시길 바랍니다")
        }
    },[adminCode])
    useEffect(()=>{
        
        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
        window.addEventListener('resize',handleResize);
        return ()=>{
            window.removeEventListener('resize',handleResize);
        }
    },[])
    return (
        <Wrapper style={{minWidth:"900px"}}>
            
           
            
                    
                
            <h2>서비스 센터 직원 등록</h2>
            <PrView style={{borderRadius: "10px 10px 0 0 "}}>
                <NameBox  style={{borderRadius: "10px 0 0 0 "}}>
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

                <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`,borderRadius: "0 10px  0 0 "}}>
                    <CenterView  style={{paddingLeft:20,alignItems:"center",fontWeight:"bold",fontSize:16}}>
                        {cCode}
                    </CenterView>
                </InputBox>
                
            </PrView>
            
            <PrView>
                <NameBox style={{borderTop:"2px solid rgb(244, 244, 244)",borderBottom:"2px solid rgb(244, 244, 244)"}}>
                    
                    <TwoNameBox >
                        <ColView  style={{justifyContent:"center",alignItems:"center"}}>
                            <div style={{marginBottom:5}}>직원 코드</div>
                            <div style={{color:COLOR.RED}}>
                                {`(자동 완성)`}
                            </div>
                            
                        </ColView>
                    </TwoNameBox>
                </NameBox>

                <LongInputBox style={{paddingLeft:20,alignItems:"center",fontWeight:"bold",fontSize:16}}>
                    {adminCode}
                </LongInputBox>
            </PrView>
            
            <PrView>
                <NameBox style={{borderBottom:"2px solid rgb(244, 244, 244)"}}>
                    직원 이름
                </NameBox>

                <InputBox style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                    <InputLine value={staffName} style={{flex:1}} onChange={(e)=>{setStaffName(e.target.value)}}></InputLine>
                </InputBox>

                <NameBox style={{borderBottom:"2px solid rgb(244, 244, 244)"}}>
                    <TwoNameBox >
                        kakao 계정
                            
                    </TwoNameBox>
                </NameBox>

                <InputBox style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                    <InputLine value={kakaoAcount} style={{flex:1}} onChange={(e)=>{setKakaoAcount(e.target.value)}}></InputLine>
                </InputBox>
            </PrView>
            <PrView style={{borderRadius: "0 0 10px 10px" }}>
                <NameBox style={{borderRadius: "0 0 0 10px"}}>
                    직원 연락처
                </NameBox>

                <InputBox style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                    <InputLine value={staffAddress} style={{flex:1}} onChange={(e)=>{setStaffAddress(e.target.value)}}></InputLine>
                </InputBox>

                <NameBox>
                    직원 이메일
                </NameBox>

                <InputBox style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`,borderRadius: "0 0 10px 0"}}>
                    <InputLine value={staffEmail} style={{flex:1,borderRadius: "0 0 10px 0"}} onChange={(e)=>{setStaffEmail(e.target.value)}}></InputLine>
                </InputBox>
            </PrView>
            
            
            
            
            <CenterView>
                <RegistButton onClick={()=>{registStaff()}}>
                    등록
                </RegistButton>
            </CenterView>
                

        </Wrapper>
    );
};




const Wrapper = styled.div`
    padding:2%;
    background-color:${COLOR.WHITE};
`;

const RegistButton =styled.button`
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
    border 0px;
    padding-left:10px;
    font-size: 16px;

`;





export default StaffRegist