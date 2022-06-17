import React ,{useEffect,useState,useCallback, useContext} from "react";
import styled from "styled-components";
import COLOR from "../../../constants/color";
import Router, { useRouter } from "next/router";
import axios from "axios";
import _,{ debounce } from "lodash";
import remakeCallNumber from "../../../functions/remakeCallNumber";

const StaffModify = ({
    item=[],
    staffs=[],
    cancel=()=>{}
}) =>{
    
    const brandList =  _.sortBy(_.filter(staffs,{"staff_code":'A'}),"brand_name")
    
    let brandListToString = ""
    item.map((item)=>{
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
    const [state,setState] =useState(item[0].staff_state)
    const [staffAddress,setStaffAddress] =useState("")
    const [staffEmail,setStaffEmail] =useState("")

    
    const modifyStaff = async() =>{
        
        if(staffName.length>0 || staffAddress.length>0  || staffEmail.length>0 ){ 
            const bodyData = {
                staffState: state,
                staffName: staffName || item[0].staff_name,
                staffPhone: staffAddress || item[0].staff_phone,
                staffEmail: staffEmail || item[0].staff_email,
                
                staffId: item[0].staff_id
            }
            const [result] = await Promise.all([
                axios
                    .post(`${process.env.API_URL}/store/modifyStoreStaff`,bodyData)
                    .then(({ data }) => data), 
                ])
            alert("직원 정보가 변경되었습니다.")
           
        }
        window.location.reload();
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
                            직원 이름
                        </NameBox>

                        <InputBox style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                            <InputLine value={staffName} placeholder={item[0].staff_name} style={{flex:1}} onChange={(e)=>{setStaffName(e.target.value)}}></InputLine>
                        </InputBox>

                        <NameBox>
                            kakao 계정
                        </NameBox>

                        <InputBox style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                            <InputLine value={item[0].staff_account} readOnly style={{flex:1,color:COLOR.DARK_INDIGO}} ></InputLine>
                        </InputBox>
                    </PrView>
                    <PrView>
                        <NameBox  style={{borderRadius:"0 0 0 5px",}}>
                            연락처
                        </NameBox>

                        <InputBox style={{borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                            <InputLine value={staffAddress} placeholder={remakeCallNumber(item[0].staff_phone)} style={{flex:1}} onChange={(e)=>{telHandler(e.target.value)}}></InputLine>
                        </InputBox>

                        <NameBox>
                            이메일
                        </NameBox>

                        <InputBox style={{borderRadius:"0 0 5px 0",borderBottom:`2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                            <InputLine value={staffEmail} placeholder={item[0].staff_email||"ex) example@email.com"} style={{flex:1}} onChange={(e)=>{setStaffEmail(e.target.value)}}></InputLine>
                        </InputBox>
                    </PrView>
                    <PrView>
                        <NameBox  style={{borderRadius:"0 0 0 5px"}}>
                            상태
                        </NameBox>
                        

                        <LongInputBox style={{borderRadius:"0 0 5px 0",alignItems:"center",borderTop:0}}>
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
                </div>
                
                
                
                
                    <CenterView style={{width:"850px"}}>
                        <DivButton onClick={()=>{
                            modifyStaff()
                        }}>
                            수정
                        </DivButton>

                        <DivButton style={{backgroundColor:COLOR.RED}} onClick={()=>{cancel()}}>
                            취소
                        </DivButton>
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

const DivButton =styled.button`
    background-color : ${COLOR.INDIGO};
    width:80px;
    height : 50px;
    color:${COLOR.WHITE};
    margin:20px;
    font-size:16px;
    border-radius:10px;

`;
const PrView  = styled.div`
    min-width:540px;
    display:flex;
    flex-direction:row;
`;
const CenterView  = styled.div`
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
    padding-left:20px;
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