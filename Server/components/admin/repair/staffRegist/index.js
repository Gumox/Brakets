import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../constants/color";
import Router, { useRouter } from "next/router";
import axios from "axios";
import getNextStaffCode from "./getNextStaffCode";
import _ from "lodash";
import SearchFocus from "./SearchFocus";

const StaffRegist = ({infos,user,staffs,repairShops}) =>{

    const router = useRouter();
    
    const [shopId,setShopId] = useState(null)
    const [shopName,setShopName] = useState()
    
    
    const [shopCode,setShopCode] = useState("")

    const [staffCode,setStaffCode] = useState("")
    const [staffName,setStaffName] =useState()
    const [kakaoAcount,setKakaoAcount] =useState()
    const [staffAddress,setStaffAddress] =useState()
    const [staffEmail,setStaffEmail] =useState()

    //const storeId =user.store_id;

    
    const registStaff = async() =>{
        const bodyData = {
            state: true,
            account: kakaoAcount,
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
                    <h2>수선처 직원 등록</h2>
                    <PrView>
                        <NameBox  >
                            수선처 이름
                        </NameBox>
                        

                        <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,display:"flex"}}>
                            <div style={{position:"absolute",width:"358px",height:"60px"}}>
                                
                                <SearchFocus shopList={repairShops} name={shopName} setName={setShopName} handler={searchHandler}/>
                            </div>
                        </InputBox>

                        <NameBox>
                            직원 코드
                        </NameBox>

                        <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                            <CenterView  style={{paddingLeft:20,alignItems:"center",fontWeight:"bold",fontSize:18}}>
                                {staffCode}
                            </CenterView>
                        </InputBox>
                        
                    </PrView>
                    
                
                    
                    <PrView>
                        <NameBox>
                            직원 이름
                        </NameBox>

                        <InputBox style={{borderTop:`2px solid ${COLOR.LIGHT_GRAY}`,borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}} >
                            <InputLine value={staffName || ""} placeholder={"ex) 홍길동"} style={{flex:1}} onChange={(e)=>{setStaffName(e.target.value)}} />
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
                            <InputLine value={kakaoAcount || ""} placeholder={"ex) example@kakao.com"} style={{flex:1}} onChange={(e)=>{setKakaoAcount(e.target.value)}}></InputLine>
                        </InputBox>
                    </PrView>
                    <PrView>
                        <NameBox>
                            직원 연락처
                        </NameBox>

                        <InputBox style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                            <InputLine value={staffAddress || ""} placeholder={"ex) xxx-xxxx-xxxx"} style={{flex:1}} onChange={(e)=>{setStaffAddress(e.target.value)}}></InputLine>
                        </InputBox>

                        <NameBox>
                            직원 이메일
                        </NameBox>

                        <InputBox style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                            <InputLine value={staffEmail || ""} placeholder={"ex) example@kakao.com"} style={{flex:1}} onChange={(e)=>{setStaffEmail(e.target.value)}}></InputLine>
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
    padding-left:10px;
    font-size:15px;
    &:focus { 
        outline: none !important;
          
      }

`;





export default StaffRegist