import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../constants/color";
import Router, { useRouter } from "next/router";
import axios from "axios";
import _ from "lodash";

const BrandRegist = ({infos,brands,user}) =>{
    const router = useRouter();
    const cName =infos.headquarter_name
    const cNameKr =infos.text
    const headquarterId = infos.value
    const [brandName,setBrandName] =useState("")
    const [serviceDate,setServiceDate] =useState('')

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

    const registBrand = async() =>{
        if(brandName && Number((serviceDate).replace(/ 일/,'')) > 0){
            if((_.filter(brands,{brand_name:brandName})).length > 0){
                alert("이미 등록된 브랜드명 입니다")
            }else{
                let _brandName = emptySpace(brandName)
                
                const [result] = await Promise.all([
                    axios
                    .post(`${process.env.API_URL}/brand/regist?brandName=${_brandName}&headquarterId=${headquarterId}&serviceDate=${ Number((serviceDate).replace(/ 일/,''))}`,)
                    .then(({ data }) => data.body), 
                    ])
                alert("새로운 브랜드 가 등록되었습니다.")
                router.push("/admin/brandControl")
            }
        }else if(!brandName){
            alert("추가하실 브랜드 이름을 입력해주세요.")
        }else if(!serviceDate > 0){
            alert("올바르지 않은 서비스 기간입니다.")
        }
    }
    const dateHandleFocus = () => {
        let result = String(serviceDate).replace(/ 일/,'')
        setServiceDate(result)
    }
        

    const dateHandlePress = useCallback(
        (e) => {
          if (e.key == "Enter") {
            setServiceDate(serviceDate.replace(/ 일/,"")+' 일')
          }
        },
        
        [serviceDate]
    );
  
    return (
        <Wrapper >
            <InsideWrapper>
           
            
                    
                
                <h2 style={{marginLeft:"20px"}}>브렌드 등록</h2>
                <PrView style={{borderRadius: "10px 10px 0 0 "}}>
                    <NameBox  style={{borderRadius: "10px 0 0 0 "}}>
                        회사 이름
                    </NameBox>
                    <LongInputBox style={{borderRadius: "0 10px 0 0 ",paddingRight:280,justifyContent:"center",alignItems:"center",fontSize:20,fontWeight:"bold",borderBottom:0}}>
                        <TwoNameBox >
                            <ColView  style={{justifyContent:"center",alignItems:"center"}}>
                                <div style={{marginBottom:5}}>{cNameKr}</div>
                                <div >{cName}</div>
                                
                            </ColView>
                        </TwoNameBox>
                    </LongInputBox>
                    
                </PrView>
                
                
                <PrView>
                    <NameBox style={{borderTop:"2px solid rgb(244, 244, 244)",borderBottom:"2px solid rgb(244, 244, 244)"}}>
                        <RedDiv>*</RedDiv>
                        브랜드 이름
                    </NameBox>

                    <LongInputBox >
                        <InputLine value={brandName} style={{flex:1}} onChange={(e)=>{setBrandName(e.target.value)}}/>
                    </LongInputBox>
                </PrView>

                <PrView style={{borderRadius: "0 0 10px 10px" }}>
                    <NameBox style={{borderRadius: "0 0 0 10px"}}>
                        <TwoNameBox >
                            
                            <ColView  style={{justifyContent:"center",alignItems:"center"}}>
                                <div style={{marginBottom:5,display:"flex",flexDirection:"row"}}><RedDiv>*</RedDiv>{"서비스 기간 설정"}</div>
                                <div >{"( 매장앱-고객약속일로 표시 )"}</div>
                                
                            </ColView>
                        </TwoNameBox>
                    </NameBox>

                    <LongInputBox style={{borderTop:0,display:"flex",borderRadius: "0 0 10px 0"}}>
                        <InputLine type={"text"} value={serviceDate} style={{flex:1,borderRadius: "0 0 10px 0",textAlign:"center",paddingRight:280}} 
                            onKeyPress={(e)=>{dateHandlePress(e)}}
                            onFocus={()=>{dateHandleFocus()}}
                            onBlur={()=>{
                                if(serviceDate){
                                    setServiceDate(serviceDate.replace(/ 일/,"")+' 일')
                                }
                            }}
                            onChange={(e)=>{
                                let value = String(e.target.value).replace(/[^0-9]/g, '')
                                setServiceDate(value)
                            }}/>
                    </LongInputBox>
                </PrView>
                
                
                
                
                
                    <CenterView>
                        <RegistButton onClick={()=>{
                            registBrand()
                        }}>
                            등록
                        </RegistButton>
                    </CenterView>
                
            </InsideWrapper>
        </Wrapper>
    );
};




const Wrapper = styled.div`
    padding:2%;
    background-color:${COLOR.WHITE};
    justify-content:center;
    display:flex;
    min-width:750px;
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
    width:850px;
    justify-content:center;
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
    font-size: 14px;
    display:flex;
    align-items:center;
    justify-content:space-around;

`;
const NameBox  = styled.div`
    height : 60px;
    width:280px;
    background-color:${COLOR.LIGHT_GRAY};
    font-size: 14px;
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
    font-size:18px;

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




export default BrandRegist