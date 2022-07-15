import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../constants/color";
import Router, { useRouter } from "next/router";
import axios from "axios";
import getNextStaffCode from "./getNextStaffCode";
import _ from "lodash";
import SearchFocus from "./SearchFocus";
import { checkAccount,checkPhone,checkEmail } from "../../checkDuplicateInfo";

const StaffRegist = ({infos,user,staffs,repairShops}) =>{

    const router = useRouter();
    
    const [shopId,setShopId] = useState(null)
    const [shopName,setShopName] = useState()
    
    
    const [shopCode,setShopCode] = useState("")

    const [staffCode,setStaffCode] = useState("")
    const [staffName,setStaffName] =useState()
    const [kakaoAccount,setKakaoAccount] =useState()
    const [staffAddress,setStaffAddress] =useState()
    const [staffEmail,setStaffEmail] =useState()
    const [isAccountDuplicate,setIsAccountDuplicate] = useState(false)
    const [isPhoneDuplicate,setIsPhoneDuplicate] = useState(false)


    //const storeId =user.store_id;

    
    const registStaff = async() =>{
        if(shopId && staffName && kakaoAccount && staffAddress){
            const bodyData = {
                state: true,
                account: kakaoAccount,
                name: staffName,
                phone: staffAddress,
                level:3,
                staff_code:staffCode,
                staff_email:staffEmail,
                store_id :shopId
            }
            const [result] = await Promise.all([
                axios
                .post(`${process.env.API_URL}/staff/regist`,bodyData)
                .then(({ data }) => data.body), 
                ])
            alert("새로운 수선처 직원이 등록되었습니다.")
            router.push("/admin/repairControl/repairShopStaff")
        }else if(!shopId){
            alert("수선처를 입력해 주세요")   
        }else if(!staffName){
            alert("직원 이름을 입력해 주세요")   
        }else if(!kakaoAccount){
            alert("직원 카카오 계정을 입력해 주세요")   
        }else if(!staffAddress){
            alert("직원 연락처를 입력해 주세요")   
        }
    }

    
    const searchHandler =(text,value,code)=>{
        

        setShopCode(code)
        setShopId(value)
        let repairStaffs = _.filter(staffs,{"repair_shop_id":value})

        if(code){
            if(getNextStaffCode(staffs) !== "over staff"){
                setStaffCode(code+"."+getNextStaffCode(repairStaffs))
            }else{
                alert("직원 수가 허용치를 넘어 갔습니다 서비스 관리자에게 연락해 주시길 바랍니다")
            }
        }
        
    }
   
    return (
        <Wrapper >
            
           
            
                <InputTableBox>
                    <h2 style={{margin:20}}>수선처 직원 등록</h2>
                    <PrView>
                        <NameBox style={{borderRadius:"10px 0 0 0"}}>
                            <RedDiv>*</RedDiv>
                            수선처
                        </NameBox>
                        

                        <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,display:"flex"}}>
                            <div style={{position:"absolute",width:"358px",height:"60px"}}>
                                
                                <SearchFocus shopList={repairShops} name={shopName} setName={setShopName} handler={searchHandler}/>
                            </div>
                        </InputBox>

                        <NameBox>
                            직원 코드
                        </NameBox>

                        <InputBox style={{borderRadius:"0 10px 0 0",borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                            <CenterView  style={{paddingLeft:20,alignItems:"center",fontWeight:"bold",fontSize:15}}>
                                {staffCode}
                            </CenterView>
                        </InputBox>
                        
                    </PrView>
                    
                
                    
                    <PrView>
                        <NameBox style={{borderTop:`2px solid rgb(244,244,244)`}}>
                        <RedDiv>*</RedDiv>
                            직원 이름
                        </NameBox>

                        <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}} >
                            <InputLine value={staffName || ""} placeholder={"ex) 홍길동"} style={{flex:1}} onChange={(e)=>{setStaffName(e.target.value)}} />
                        </InputBox>

                        <NameBox style={{borderTop:`2px solid rgb(244,244,244)`}}>
                        <RedDiv>*</RedDiv>
                            kakao 계정
                        </NameBox>

                        <InputBox style={{position:"relative",borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                            <InputLine value={kakaoAccount || ""} placeholder={"ex) example@kakao.com"} style={{flex:1}} 
                                onChange={async(e)=>{
                                    setKakaoAccount(e.target.value)
                                    let tof = await checkAccount(e.target.value)
                                    setIsAccountDuplicate(tof)
                                    if(!e.target.value){
                                        setIsAccountDuplicate(false)
                                    }
                                }}
                            />
                            <div style={{position:"absolute",top: 1, right:5, height:"35%",width:"25%",display:"flex",justifyContent:"center"}}>
                                {(!isAccountDuplicate && kakaoAccount) ?
                                    <div style={{color:COLOR.CYAN_BLUE}}>사용가능</div>
                                    :
                                    <div style={{color:COLOR.RED}}>사용불가</div>
                                }
                            </div>
                        </InputBox>
                    </PrView>
                    <PrView>
                        <NameBox style={{borderRadius:"0 0 0 10px",borderTop:`2px solid rgb(244,244,244)`}}>
                        <RedDiv>*</RedDiv>
                            직원 연락처
                        </NameBox>

                        <InputBox style={{position:"relative",borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                            <InputLine value={staffAddress || ""} placeholder={"ex) xxx-xxxx-xxxx"} style={{flex:1}} 
                                onChange={async(e)=>{
                                    setStaffAddress(e.target.value)
                                    let tof = await checkPhone(e.target.value)
                                    setIsPhoneDuplicate(tof)
                                    if(!e.target.value){
                                        setIsPhoneDuplicate(false)
                                    }
                                }}
                            />
                            <div style={{position:"absolute",top: 1, right:5, height:"35%",width:"25%",display:"flex",justifyContent:"center"}}>
                                {(!isPhoneDuplicate && staffAddress) ?
                                    <div style={{color:COLOR.CYAN_BLUE}}>사용가능</div>
                                    :
                                    <div style={{color:COLOR.RED}}>사용불가</div>
                                }
                            </div>
                        </InputBox>

                        <NameBox style={{borderTop:`2px solid rgb(244,244,244)`}}>
                            E-mail
                        </NameBox>

                        <InputBox style={{borderRadius:"0 0 10px 0",borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                            <InputLine value={staffEmail || ""} placeholder={"ex) example@kakao.com"} style={{borderRadius:"0 0 10px 0",flex:1}} onChange={(e)=>{setStaffEmail(e.target.value)}}></InputLine>
                        </InputBox>
                    </PrView>
                
                
                
                
                    <CenterView>
                        <RegistButton onClick={()=>{registStaff()}}>
                            등록
                        </RegistButton>
                    </CenterView>
                </InputTableBox>
                
                
                

        </Wrapper>
    );
};




const Wrapper = styled.div`
    padding:2%;
    background-color:${COLOR.WHITE};
`;
const RedDiv =styled.div`
    margin: 2px;
    color: ${COLOR.RED};
` 
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
const InputTableBox  = styled.div`
    width:1005px;
    margin-top:20px;
`;
const HeaderCell = styled.div`
    display:flex;
    height:60px;
    min-width:20px;
    justify-content:center;
    align-items:center;
    font-size:16px;
    flex:1;
    padding:5px;
`;
const InputBox  = styled.div`
    border-left: 2px solid ${COLOR.LIGHT_GRAY};
    height : 60px;
    width:360px;
    display:flex;
    justyfiy-content:center;
    ailgn-items:center;
`;
const LongInputBox  = styled.div`
    height : 60px;
    width:855px;
    border: 2px solid ${COLOR.LIGHT_GRAY};
    border-bottom:0;
    border-left :0;
    display:flex;
    justyfiy-content:center;
    ailgn-items:center;
    font-size:15px;

`;
const PrView  = styled.div`
    min-width:1000px;
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