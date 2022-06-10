import React ,{useEffect,useState,useCallback, useContext} from "react";
import styled from "styled-components";
import COLOR from "../../../constants/color";
import Router, { useRouter } from "next/router";
import axios from "axios";
import _,{ debounce } from "lodash";

const StaffRegist = ({infos,user,staffs=[]}) =>{
 

    const brandList =  _.sortBy(_.filter(staffs,{"staff_code":'A'}),"brand_name")
    const router = useRouter();
    const [store,setStore] =useState("")


    let brandListToString = ""
    brandList.map((item)=>{
        if(brandListToString.length>0){
            brandListToString += ", "+item.brand_name
            if(brandListToString.length+String(item.brand_name).length > 50){
                if(brandListToString.indexOf("\n")>-1){
                    let strList = brandListToString.split("\n")
                    if(strList[strList.length-1].length+String(item.brand_name).length >50){
                        brandListToString += "\n"+item.brand_name
                    }else{
                        brandListToString += ", "+item.brand_name
                    }
                }else{
                    brandListToString += "\n"+item.brand_name
                }
            }
        }else{
            brandListToString += item.brand_name
        }
    })

    
    const [staffName,setStaffName] =useState("")
    const [kakaoAccount,setKakaoAccount] =useState("")
    const [staffAddress,setStaffAddress] =useState("")
    const [staffEmail,setStaffEmail] =useState("")

    
    const registStaff = async() =>{
        if(staffName.length>0 && kakaoAccount.length>0 && staffAddress.length >0){
            const bodyData = {
                staffAccount:emptySpace(kakaoAccount),
                staffName:emptySpace(staffName),
                staffPhone:staffAddress,
                staffEmail:staffEmail,
                
                managerId:brandList[0].staff_id
            }
            const [result] = await Promise.all([
                axios
                  .post(`${process.env.API_URL}/store/registStoreStaff`,bodyData)
                  .then(({ data }) => data), 
                ])
            alert("새로운 직원이 등록되었습니다.")
            router.push("/adminStore/staffList")
        }else if(staffName.length === 0){
            alert("직원 이름을 입력해주세요")

        }else if(kakaoAccount.length === 0){
            alert("카카오 계정을 입력해주세요")
            
        }else if(staffAddress.length === 0){
            alert("연락처를 입력해주세요")
        }
    }

    const telHandler = (value)=>{


        const onlyNumber = value.replace(/[^0-9-]/g, '')
        setStaffAddress(onlyNumber)

        
        const regex = /^[0-9-]{0,13}$/;
        if (regex.test(value)) {
            setStaffAddress(value.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
        }
    }
    
   
    return (
        <Wrapper >
            
           
            
                    
                
                <h2 style={{marginLeft:15}}>직원 등록</h2>
                <div style={{border:`2px solid ${COLOR.LIGHT_GRAY}` ,borderRadius:"10px",padding:5,width:"850px"}}>
                    <PrView>
                        <NameBox  style={{borderRadius:"5px 0 0 0"}}>
                            브랜드
                        </NameBox>
                        

                        <LongInputBox style={{alignItems:"center"}}>
                            {brandListToString}
                            
                            
                        </LongInputBox>

                        
                        
                    </PrView>
                    
                    <PrView>
                        <NameBox>
                            <RedDiv>*</RedDiv>
                            직원 이름
                        </NameBox>

                        <InputBox style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                            <InputLine value={staffName} placeholder={"ex) 홍길동"} style={{flex:1}} onChange={(e)=>{setStaffName(e.target.value)}}></InputLine>
                        </InputBox>

                        <NameBox>
                            <RedDiv>*</RedDiv>
                            kakao 계정
                        </NameBox>

                        <InputBox style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                            <InputLine value={kakaoAccount} placeholder={"ex) example@kakao.com"} style={{flex:1}} onChange={(e)=>{setKakaoAccount(e.target.value)}}></InputLine>
                        </InputBox>
                    </PrView>
                    <PrView>
                        <NameBox  style={{borderRadius:"0 0 0 5px",}}>
                            <RedDiv>*</RedDiv>
                            연락처
                        </NameBox>

                        <InputBox style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                            <InputLine value={staffAddress} placeholder={"ex) xxx-xxxx-xxxx"} style={{flex:1}} onChange={(e)=>{telHandler(e.target.value)}}></InputLine>
                        </InputBox>

                        <NameBox>
                            이메일
                        </NameBox>

                        <InputBox style={{borderRadius:"0 0 5px 0",borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                            <InputLine value={staffEmail} placeholder={"ex) example@email.com"} style={{flex:1}} onChange={(e)=>{setStaffEmail(e.target.value)}}></InputLine>
                        </InputBox>
                    </PrView>
                </div>
                
                
                
                
                    <CenterView style={{width:"850px"}}>
                        <RegistButton onClick={()=>{registStaff()}}>
                            등록
                        </RegistButton>
                    </CenterView>
                

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
    border-radius : 10px 0 0 0;
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
    min-width:540px;
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
const RedDiv =styled.div`
    margin:2px;
    color:${COLOR.RED};
` 
const NameBox  = styled.div`
    min-height : 60px;
    width:140px;
    background-color:${COLOR.LIGHT_GRAY};
    font-size: 18px;
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
    min-height : 60px;
    flex:1;
    border: 2px solid ${COLOR.LIGHT_GRAY};
    border-left :0;
    display:flex;
    padding-left:20px;
    padding-right:20px;
    border-radius:0 5px 0 0;
    font-size:16px;
    color:${COLOR.DARK_INDIGO};
    white-space: pre-line;
`;
const InputLine  = styled.input`
    border 0px;
    padding-left:10px;
    font-size:16px;
    &:focus { 
        outline: none !important;
        border-color: #719ECE;
    }
`;
const SearchSelect = styled.select`
  border :0;
  font-size:16px;
  padding:20px;
  &:focus { 
    outline: none !important;
    border-color: #719ECE;
  }
`;




export default StaffRegist