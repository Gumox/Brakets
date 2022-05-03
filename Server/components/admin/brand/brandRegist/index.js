import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../constants/color";
import Router, { useRouter } from "next/router";
import axios from "axios";
import { debounce } from "lodash";

const BrandRegist = ({infos,user}) =>{
    console.log(infos)
    const router = useRouter();
    const cName =infos.headquarter_name
    const cNameKr =infos.text
    const headquarterId = infos.value
    const [brandName,setBrandName] =useState("")
    const [serviceDate,setServiceDate] =useState(null)

    const emptySpace =(str)=>{
        console.log("s ",str)
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
        let _brandName = emptySpace(brandName)
        
        const [result] = await Promise.all([
            axios
              .post(`${process.env.API_URL}/brand/regist?brandName=${_brandName}&headquarterId=${headquarterId}&serviceDate=${serviceDate}`,)
              .then(({ data }) => data.body), 
            ])
        alert("새로운 브랜드 가 등록되었습니다.")
        router.push("/admin/brandControl")
    }
  
    return (
        <Wrapper >
            <InsideWrapper>
           
            
                    
                
                <h2>브렌드 등록</h2>
                <PrView>
                    <NameBox  >
                        회사 이름
                    </NameBox>
                    <LongInputBox style={{paddingRight:280,justifyContent:"center",alignItems:"center",fontSize:20,fontWeight:"bold",borderBottom:0}}>
                        <TwoNameBox >
                            <ColView  style={{justifyContent:"center",alignItems:"center"}}>
                                <div style={{marginBottom:5}}>{cNameKr}</div>
                                <div >{cName}</div>
                                
                            </ColView>
                        </TwoNameBox>
                    </LongInputBox>
                    
                </PrView>
                
                
                <PrView>
                    <NameBox>
                        브랜드 이름
                    </NameBox>

                    <LongInputBox >
                        <InputLine value={brandName} style={{flex:1}} onChange={(e)=>{setBrandName(e.target.value)}}/>
                    </LongInputBox>
                </PrView>
                <PrView>
                    <NameBox>
                        <TwoNameBox >
                            <ColView  style={{justifyContent:"center",alignItems:"center"}}>
                                <div style={{marginBottom:5}}>{"서비스 기간 설정"}</div>
                                <div >{"( 매장앱-고객약속일로 표시 )"}</div>
                                
                            </ColView>
                        </TwoNameBox>
                    </NameBox>

                    <LongInputBox style={{borderTop:0,display:"flex"}}>
                        <InputLine value={serviceDate} style={{flex:1,textAlign:"center",paddingRight:280}} onChange={(e)=>{setServiceDate(e.target.value)}}/>
                    </LongInputBox>
                </PrView>
                
                
                
                
                
                    <CenterView>
                        <RegistButton onClick={()=>{registBrand()}}>
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
    font-size: 18px;
    display:flex;
    align-items:center;
    justify-content:space-around;

`;
const NameBox  = styled.div`
    height : 80px;
    width:280px;
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
    font-size:18px;

`;
const InputLine  = styled.input`
    border 0px;
    padding-left:10px;
    font-size:20px;
    display:flex;

`;





export default BrandRegist