import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../constants/color";
import axios from "axios";
import _ from "lodash";
import remakeCallNumber from "../../../../functions/remakeCallNumber";
import { checkAccount,checkPhone,checkEmail } from "../../checkDuplicateInfo";

const StaffChange = ({
    item,
    cancel=()=>{}
}) =>{

    const [state,setState] = useState(item.staff_state)

    const [staffName,setStaffName] =useState()
    const [kakaoAccount,setKakaoAccount] =useState()
    const [staffAddress,setStaffAddress] =useState()
    const [staffEmail,setStaffEmail] =useState()

    const [isAccountDuplicate,setIsAccountDuplicate] = useState(false)

    
    
    const changeStaff = async() =>{
        if(kakaoAccount && !isAccountDuplicate){
            const body = {
                state : state,
                phone: staffAddress || item.staff_phone,
                staff_email :staffEmail || item.staff_email,
                staff_store_id : item.staff_store_id,
                isChange: true,
                staff_id: item.staff_id,
            }
            const [result] = await Promise.all([
                axios
                .post(`${process.env.API_URL}/RepairShop/repairShopStaffModify`,body)
                .then(({ data }) => data.body), 
                ])

            const bodyData = {
                state: true,
                account: kakaoAccount,
                name: staffName || item.staff_name,
                phone: staffAddress || item.staff_phone,
                level:3,
                staff_code:item.staff_code,
                staff_email:staffEmail || item.staff_email,
                store_id :item.repair_shop_id
            }
            const [changeResult] = await Promise.all([
                axios
                    .post(`${process.env.API_URL}/staff/regist`,bodyData)
                    .then(({ data }) => data.body), 
                ])
            alert("수선처 직원이 변경 되었습니다.")
            window.location.reload()
        }else if(isAccountDuplicate){
            alert("사용 불가능한 계정입니다")
        }else{
            alert("변경하실 카카오 계정을 입력해주세요")
        }
    }

    
    
   
    return (
        <Wrapper >
            
           
            
                <InputTableBox>
                    <h2 style={{margin:20}}>수선처 직원 정보 / 상태 수정</h2>
                    <PrView>
                        <NameBox style={{borderRadius:"10px 0 0 0"}}>
                            수선처 이름
                        </NameBox>
                        

                        <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,display:"flex"}}>
                            <CenterView  style={{color:COLOR.DARK_INDIGO,paddingLeft:20,alignItems:"center",fontWeight:"bold",fontSize:15}}>
                                {item.repair_shop_name}
                            </CenterView>
                        </InputBox>

                        <NameBox>
                            직원 코드
                        </NameBox>

                        <InputBox style={{borderRadius:"0 10px 0 0",borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                            <CenterView  style={{borderRadius:"0 10px 0 0",color:COLOR.DARK_INDIGO,paddingLeft:20,alignItems:"center",fontWeight:"bold",fontSize:15}}>
                                {item.staff_code}
                            </CenterView>
                        </InputBox>
                        
                    </PrView>
                    
                
                    
                    <PrView>
                        <NameBox style={{borderTop:`2px solid rgb(244,244,244)`}}>
                            직원 이름
                        </NameBox>

                        <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}} >
                            <InputLine value={staffName || ""} placeholder={item.staff_name} style={{paddingLeft:20,flex:1}}
                            onChange={(e)=>{
                                    setStaffName(e.target.value)
                            }}
                        />
                        </InputBox>

                        <NameBox style={{borderTop:`2px solid rgb(244,244,244)`}}>
                            kakao 계정
                        </NameBox>

                        <InputBox style={{position:"relative",borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>

                            <InputLine value={kakaoAccount || ""} placeholder={item.account}  style={{paddingLeft:20,flex:1}}
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
                        <NameBox style={{borderTop:`2px solid rgb(244,244,244)`}}>
                            직원 연락처
                        </NameBox>

                        <InputBox style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                            <InputLine value={staffAddress || ""} placeholder={remakeCallNumber(item.staff_phone)} style={{flex:1}} onChange={(e)=>{setStaffAddress(e.target.value)}} />
                        </InputBox>

                        <NameBox style={{borderTop:`2px solid rgb(244,244,244)`}}>
                            E-mail
                        </NameBox>

                        <InputBox style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                            <InputLine value={staffEmail || ""} placeholder={item.staff_email} style={{flex:1}} onChange={(e)=>{setStaffEmail(e.target.value)}} />
                        </InputBox>
                    </PrView>
                    <PrView>
                        <NameBox style={{borderRadius:"0 0 0 10px",borderTop:`2px solid rgb(244,244,244)`}}>
                            상태
                        </NameBox>

                        <LongInputBox style={{borderTop:0,borderRadius:"0 0 10px 0"}}>
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
                        <DivButton style={{backgroundColor:COLOR.RED}}  onClick={()=>{changeStaff()}}>
                            변경
                        </DivButton>

                        <DivButton onClick={()=>{cancel()}}>
                            취소
                        </DivButton>
                    </CenterView>
                </InputTableBox>
                
                
                

        </Wrapper>
    );
};

const emptySpace =(str)=>{
    let name = ""
    for(let i =0; i<str.length;i++){
        if(str[i] === " "&& str[i+1] && str[i+1] !== " "){
            name += "_"
        }else if(str[i] !== " " && str[i]){
            name += str[i]
        }
    }
    return(String(name).replace(/_/g," "))
    
}



const Wrapper = styled.div`
    padding:2%;
    background-color:${COLOR.WHITE};
`;

const DivButton =styled.button`
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
    width:860px;
    border: 2px solid ${COLOR.LIGHT_GRAY};
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