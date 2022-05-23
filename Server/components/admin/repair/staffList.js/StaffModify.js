import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../constants/color";
import Router, { useRouter } from "next/router";
import axios from "axios";
import _ from "lodash";
import remakeCallNumber from "../../../../functions/remakeCallNumber";

const StaffModify = ({
    item,
    repairShopsstaffs,
    cancel=()=>{}
}) =>{

    const router = useRouter();
    console.log(item)
    
    const [shopId,setShopId] = useState(null)
    const [shopName,setShopName] = useState()
    
    
    const [state,setState] = useState(item.staff_state)

    const [staffCode,setStaffCode] = useState("")
    const [staffName,setStaffName] =useState()
    const [kakaoAcount,setKakaoAcount] =useState()
    const [staffAddress,setStaffAddress] =useState()
    const [staffEmail,setStaffEmail] =useState()

    //const storeId =user.store_id;

    
    const modifyStaff = async() =>{

        const bodyData = {
            state : state,
            phone: staffAddress || item.staff_phone,
            staff_email :staffEmail || item.staff_email,
            staff_store_id : null,
            isChange: false,
            staff_id: item.staff_id,
        }
        const [result] = await Promise.all([
            axios
              .post(`${process.env.API_URL}/RepairShop/repairShopStaffModify`,bodyData)
              .then(({ data }) => data.body), 
            ])
        alert("수선처 직원 정보가 변경 되었습니다.")
        window.location.reload()
    }

    
    
   
    return (
        <Wrapper >
            
           
            
                <InputTableBox>
                    <h2>수선처 직원 정보 / 상태 수정</h2>
                    <PrView>
                        <NameBox  >
                            수선처 이름
                        </NameBox>
                        

                        <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,display:"flex"}}>
                            <CenterView  style={{color:COLOR.DARK_INDIGO,paddingLeft:20,alignItems:"center",fontWeight:"bold",fontSize:18}}>
                                {item.repair_shop_name}
                            </CenterView>
                        </InputBox>

                        <NameBox>
                            직원 코드
                        </NameBox>

                        <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                            <CenterView  style={{color:COLOR.DARK_INDIGO,paddingLeft:20,alignItems:"center",fontWeight:"bold",fontSize:18}}>
                                {item.staff_code}
                            </CenterView>
                        </InputBox>
                        
                    </PrView>
                    
                
                    
                    <PrView>
                        <NameBox>
                            직원 이름
                        </NameBox>

                        <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}} >
                            <InputLine value={item.staff_name} readOnly style={{fontWeight:"bold",paddingLeft:20,flex:1,color:COLOR.DARK_INDIGO}}/>
                        </InputBox>

                        <NameBox>
                            <TwoNameBox >
                                <ColView  style={{justifyContent:"center",alignItems:"center"}}>
                                    <div style={{marginBottom:5}}>직원 </div>
                                    <div >Kakao 계정</div>
                                    
                                </ColView>
                            </TwoNameBox>
                        </NameBox>

                        <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>

                            <InputLine value={item.account} readOnly style={{fontWeight:"bold",paddingLeft:20,flex:1,color:COLOR.DARK_INDIGO}} />

                        </InputBox>
                    </PrView>
                    <PrView>
                        <NameBox>
                            직원 연락처
                        </NameBox>

                        <InputBox style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                            <InputLine value={staffAddress || ""} placeholder={remakeCallNumber(item.staff_phone)} style={{flex:1}} onChange={(e)=>{setStaffAddress(e.target.value)}} />
                        </InputBox>

                        <NameBox>
                            직원 이메일
                        </NameBox>

                        <InputBox style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                            <InputLine value={staffEmail || ""} placeholder={item.staff_email} style={{flex:1}} onChange={(e)=>{setStaffEmail(e.target.value)}} />
                        </InputBox>
                    </PrView>
                    <PrView>
                        <NameBox>
                            상태
                        </NameBox>

                        <LongInputBox style={{borderTop:0}}>
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
                        <DivButton onClick={()=>{modifyStaff()}}>
                            수정
                        </DivButton>

                        <DivButton style={{backgroundColor:COLOR.RED}} onClick={()=>{cancel()}}>
                            취소
                        </DivButton>
                    </CenterView>
                </InputTableBox>
                
                
                

        </Wrapper>
    );
};




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
    font-size:18px;

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
    font-size: 18px;
    display:flex;
    align-items:center;
    justify-content:space-around;

`;
const NameBox  = styled.div`
    height : 60px;
    width:140px;
    background-color:${COLOR.LIGHT_GRAY};
    font-size: 18px;
    display:flex;
    justify-content:center;
    align-items:center;
`;
const InputLine  = styled.input`
    border 0px;
    padding-left:20px;
    font-size:15px;
    &:focus { 
        outline: none !important;
          
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