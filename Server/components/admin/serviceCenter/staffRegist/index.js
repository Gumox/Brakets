import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../constants/color";
import Router, { useRouter } from "next/router";
import axios from "axios";
import getNextStaffCode from "./getNextStaffCode";
import { debounce } from "lodash";
import isInsertedAccount from "../../isInsertedAccount";
import { checkAccount,checkPhone,checkEmail } from "../../checkDuplicateInfo";

const StaffRegist = ({infos,user,staffs}) =>{
    const router = useRouter();
    const cName =infos.headquarter_name
    const cNameKr =infos.text
    const cCode =infos.headquarter_code
    const [adminCode,setAdminCode] =useState("")

    const [isAccountDuplicate,setIsAccountDuplicate] = useState(false)
    const [isPhoneDuplicate,setIsPhoneDuplicate] = useState(false)

    
    const [staffName,setStaffName] =useState()
    const [kakaoAccount,setKakaoAccount] =useState()
    const [staffAddress,setStaffAddress] =useState()
    const [staffEmail,setStaffEmail] =useState()
    const storeId =user.store_id;

    
    const registStaff = async() =>{
        if(staffName && kakaoAccount && staffAddress ){
            if(kakaoAccount){
                const accountCheck = await isInsertedAccount(kakaoAccount)
                if(accountCheck.length){
                    alert("이미 등록된 kakao계정 입니다")
                }else{
                    const bodyData = {
                        state: true,
                        account: kakaoAccount,
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
            }
        }else if(!staffName){
            alert("새로운 등록할 직원의 이름을 입력해주세요")
        }else if(!kakaoAccount){
            alert("새로운 등록할 직원의 kakao계정을 입력해주세요")
        }else if(!staffAddress){
            alert("새로운 등록할 직원의 연락처를 입력해주세요")
        }
        
        
    }
    const telHandler = async(value)=>{


        const onlyNumber = value.replace(/[^0-9-]/g, '')
        setStaffAddress(onlyNumber)

        
        const regex = /^[0-9-]{0,13}$/;
        if (regex.test(value)) {
            setStaffAddress(value.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
        }
        let tof = await checkPhone(onlyNumber)
        setIsPhoneDuplicate(tof)
        if(!value){
            setIsPhoneDuplicate(false)
        }
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
                    <RedDiv>*</RedDiv>
                    직원 이름
                </NameBox>

                <InputBox style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                    <InputLine value={staffName} style={{flex:1}} onChange={(e)=>{setStaffName(e.target.value)}}></InputLine>
                </InputBox>

                <NameBox style={{borderBottom:"2px solid rgb(244, 244, 244)"}}>
                    <RedDiv>*</RedDiv>
                    kakao 계정
                </NameBox>

                <InputBox style={{position:"relative",borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                    <InputLine value={kakaoAccount} style={{flex:1}} 
                        onChange={async(e)=>{
                            setKakaoAccount(e.target.value)
                            let tof = await checkAccount(e.target.value)
                            setIsAccountDuplicate(tof)
                            if(!e.target.value){
                                setIsAccountDuplicate(false)
                            }
                        }}
                    />
                   <div style={{position:"absolute",top: 0, right:5, height:"35%",width:"25%",display:"flex",justifyContent:"center"}}>
                        {(!isAccountDuplicate && kakaoAccount) ?
                            <div style={{color:COLOR.CYAN_BLUE}}>사용가능</div>
                            :
                            <div style={{color:COLOR.RED}}>사용불가</div>
                        }
                    </div>
                </InputBox>
            </PrView>
            <PrView style={{borderRadius: "0 0 10px 10px" }}>
                <NameBox style={{borderRadius: "0 0 0 10px"}}>
                    <RedDiv>*</RedDiv>
                    직원 연락처
                </NameBox>

                <InputBox style={{position:"relative",borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                    <InputLine value={staffAddress} style={{flex:1}} 
                        onChange={(e)=>{
                            telHandler(e.target.value)
                        }}
                    />
                    <div style={{position:"absolute",top: 0, right:5, height:"35%",width:"25%",display:"flex",justifyContent:"center"}}>
                        {(!isPhoneDuplicate && staffAddress) ?
                            <div style={{color:COLOR.CYAN_BLUE}}>사용가능</div>
                            :
                            <div style={{color:COLOR.RED}}>사용불가</div>
                        }
                    </div>
                </InputBox>

                <NameBox>
                    E-mail
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
const RedDiv =styled.div`
    margin: 2px;
    color: ${COLOR.RED};
` 
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
    font-size: 15px;
    display:flex;
    align-items:center;
    justify-content:space-around;

`;
const NameBox  = styled.div`
    height : 60px;
    width:140px;
    background-color:${COLOR.LIGHT_GRAY};
    font-size: 15px;
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





export default StaffRegist