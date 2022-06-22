import React,{useState,useEffect} from "react";
import styled from "styled-components";
import COLOR from "../../../constants/color";
import Link from 'next/link';
import remakeCallNumber from "../../../functions/remakeCallNumber";
import axios from "axios";
const CompanyModify = ({
    info=[],
    cancelButton=(e)=>{}
}) =>{
    console.log(info)
    const [state,setState] = useState(info.state)

    const [ceo,setCeo] = useState(info.ceo)
    const [ceoAddress,setCeoAddress] = useState(info.ceo_address)
    const [ceoEmail,setceoEmail] = useState(info.ceo_email)
    const [companyRegistrationNumber,setCompanyRegistrationNumber] = useState(info.company_registration_number)
    const [call,setCall] = useState(info.headquarter_call)

   
    const modifyHeadquarter = async() =>{
        const bodyData = {
            state:state,
            ceo:ceo,
            ceo_address:ceoAddress,
            ceo_email:ceoEmail,
            company_registration_number:companyRegistrationNumber,
            headquarter_call:call,

            headquarter_id:info.value
        }
        console.log(bodyData)
        const [result] = await Promise.all([
            axios
              .post(`${process.env.API_URL}/headquarter/update`,bodyData)
              .then(({ data }) => data.body), 
            ])
            console.log(result)
        window.location.reload();
    }
    
    
    return(
        <Wrapper>
            <InsideWrapper>
            <InputTableBox>
                
                <h2 style={{margin:20}}>회사 정보 등록</h2>
                <PrView>
                    <NameBox  style={{borderRadius:"10px 0 0 0"}}>
                        회사 이름
                    </NameBox>
                    

                    <InputBox style={{borderTop: `2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <TwoNameBox >
                            <ColView style={{ marginLeft:10,}}>
                                <div style={{marginBottom:5,fontSize:15}}>한글</div>
                                <div style={{marginTop:5,fontSize:15}}>영문</div>
                                
                            </ColView>
                            <ColView>
                                <div style={{ marginLeft:10,marginBottom:5,fontSize:15, flex:1,fontWeight:"bold"}}>
                                    {info.text}
                                </div>
                                <div style={{ marginLeft:10,marginTop:5,fontSize:15, flex:1,fontWeight:"bold"}}>
                                    {info.headquarter_name}
                                </div>
                                
                            </ColView>
                        </TwoNameBox>
                    </InputBox>

                    <NameBox>
                        회사코드설정
                    </NameBox>

                    <InputBox style={{borderRadius:"0 10px 0 0",borderTop: `2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <CenterView>
                            <div style={{marginLeft:10,fontSize:20}}>
                                {info.headquarter_code}
                            </div>
                        </CenterView>
                    </InputBox>
                    
                </PrView>
                
                <PrView>
                    <NameBox style={{borderTop: `2px solid rgb(244,244,244)`}}>
                        대표자 이름
                    </NameBox>

                    <InputBox style={{borderTop: `2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <InputLine style={{flex:1, margin: 10}} value={ceo || ''} onChange={(e)=>{setCeo(e.target.value)}}></InputLine>
                    </InputBox>

                    <NameBox style={{borderTop: `2px solid rgb(244,244,244)`}}>
                        사업자 등록 번호
                    </NameBox>

                    <InputBox style={{borderTop: `2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <InputLine style={{flex:1, margin: 10}} value={companyRegistrationNumber || ''}  onChange={(e)=>{setCompanyRegistrationNumber(e.target.value)}}></InputLine>
                    </InputBox>
                </PrView>
                
                <PrView>
                    <NameBox style={{borderTop: `2px solid rgb(244,244,244)`}}>
                        대표자 연락처
                    </NameBox>

                    <InputBox style={{borderTop: `2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <InputLine value={ceoAddress} style={{flex:1, margin: 10}} 
                            onChange={(e)=>{setCeoAddress(remakeCallNumber(e))}}                        
                        />
                    </InputBox>

                    <NameBox style={{borderTop: `2px solid rgb(244,244,244)`}}>
                        대표자 이메일
                    </NameBox>

                    <InputBox style={{borderTop: `2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <InputLine style={{flex:1, margin: 10}} value={ceoEmail || ''} onChange={(e)=>{setceoEmail(e.target.value)}}></InputLine>
                    </InputBox>
                </PrView>
                
                <PrView>
                    <NameBox style={{borderTop: `2px solid rgb(244,244,244)`}}>
                        <div>
                            <div>
                                SMS 대표전화
                            </div>
                            <div>
                            (발신 전용)
                            </div>
                        </div>
                        
                    </NameBox>
                    <InputBox style={{borderTop: `2px solid ${COLOR.LIGHT_GRAY}`}}>
                        <InputLine style={{flex:1, margin: 10}} value={call || ''} onChange={(e)=>{setCall(e.target.value)}}></InputLine>
                    </InputBox>

                    <NameBox style={{borderTop: `2px solid rgb(244,244,244)`}}>
                        <Link href={{ pathname: "https://smartsms.aligo.in/login.html"}}>
                            <a target="_blank">
                                <RegistAligo>* 알리고에 등록하기</RegistAligo>
                            </a>
                        </Link>
                        
                    </NameBox>

                    <InputBox style={{borderTop: `2px solid ${COLOR.LIGHT_GRAY}`,borderRight:`2px solid ${COLOR.LIGHT_GRAY}`}}>
                    </InputBox>
                </PrView>
                
                <PrView>
                    <NameBox style={{borderRadius:"0 0 0 10px",borderTop: `2px solid rgb(244,244,244)`}}>
                        수선 OK 사용 여부
                    </NameBox>

                    <LongInputBox style={{borderRadius:"0 0 10px 0"}}>
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
                <RegistButton onClick={()=>{modifyHeadquarter()}}>
                    수정
                </RegistButton>

                <RegistButton style={{backgroundColor : COLOR.RED}} onClick={()=>{cancelButton()}}>
                    취소
                </RegistButton>
            </CenterView>
                
                
            </InputTableBox>
            </InsideWrapper>
           
        </Wrapper>
    )
}
const InputTableBox  = styled.div`
    min-height:720px;
    width:1080px;
`;
const InputLineArea  = styled.textarea`
    border 1px solid;
    border-radius: 5px;

`;

const RegistAligo  = styled.div`
    border-radius: 5px;
    color:${COLOR.RED};
    font-size:15px;
    &:hover {
        color: #ff8585;
        }

`;


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
const Wrapper = styled.div`
    padding:2%;
    background-color:${COLOR.WHITE};
    display:flex;
    min-width:750px;
`;

const RegistButton =styled.button`
    background-color : ${COLOR.INDIGO};
    width:60px;
    height : 40px;
    color:${COLOR.WHITE};
    margin:20px;
    font-size:16px;
    border-radius:10px;

`;
const InsideWrapper  = styled.div`
    display:flex;
    width:1000px;
    justify-content:center;
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
    font-size: 14px;
    display:flex;
    align-items:center;
    display:flex;
    flex-direction:row;

`;
const NameBox  = styled.div`
    height : 60px;
    width:145px;
    background-color:${COLOR.LIGHT_GRAY};
    font-size: 14px;
    display:flex;
    justify-content:center;
    align-items:center;
`;
const InputBox  = styled.div`
    height : 60px;
    width:360px;
    display:flex;
    justyfiy-content:center;
    ailgn-items:center;
`;
const InputBoxTr  = styled.div`
    height : 60px;
    background-color:${COLOR.WHITE};
    color:${COLOR.DARK_INDIGO};
    font-size: 14px;
    display:flex;
    width:210px;
    font-size:20px;
    font-weight:bold;
    justify-content:center;
`;
const LongInputBox  = styled.div`
    height : 60px;
    width:865px;
    border: 2px solid ${COLOR.LIGHT_GRAY};
    border-left :0;
    display:flex;
    justyfiy-content:center;
    ailgn-items:center;
    font-size:14px;

`;
const InputLine  = styled.input`
    border 0px;
    padding-left:10px;
    font-size:20px;

`;

const ImageInput = styled.input`
    visibility:hidden;
`
const ImageButton = styled.img`
    width:100px;
    height:100px;
    background-color:${COLOR.WHITE};
    padding:10px;
    object-fit: contain;
    margin-left: 25px;
`
const ProductImage = styled.img`
    background-color:${COLOR.WHITE};
    padding:10px;
    flex:1;
    object-fit: contain;
`
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


export default CompanyModify