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
                
                <h2>회사 정보 등록</h2>
                <PrView>
                    <NameBox  >
                        회사 이름
                    </NameBox>
                    

                    <InputBox style={{}}>
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

                    <InputBox>
                    <CenterView>
                        <div style={{marginLeft:10,fontSize:20}}>
                            {info.headquarter_code}
                        </div>
                    </CenterView>
                    </InputBox>
                    
                </PrView>
                
                <PrView>
                    <NameBox>
                        대표자 이름
                    </NameBox>

                    <InputBox>
                        <InputLine style={{flex:1, margin: 10}} value={ceo || ''} onChange={(e)=>{setCeo(e.target.value)}}></InputLine>
                    </InputBox>

                    <NameBox>
                        사업자 등록 번호
                    </NameBox>

                    <InputBox>
                        <InputLine style={{flex:1, margin: 10}} value={companyRegistrationNumber || ''}  onChange={(e)=>{setCompanyRegistrationNumber(e.target.value)}}></InputLine>
                    </InputBox>
                </PrView>
                
                <PrView>
                    <NameBox>
                        대표자 연락처
                    </NameBox>

                    <InputBox>
                        <InputLine value={ceoAddress} style={{flex:1, margin: 10}} 
                            onChange={(e)=>{setCeoAddress(remakeCallNumber(e))}}                        
                        />
                    </InputBox>

                    <NameBox>
                        대표자 이메일
                    </NameBox>

                    <InputBox>
                        <InputLine style={{flex:1, margin: 10}} value={ceoEmail || ''} onChange={(e)=>{setceoEmail(e.target.value)}}></InputLine>
                    </InputBox>
                </PrView>
                
                <PrView>
                    <NameBox>
                        <div>
                            <div>
                                SMS 대표전화
                            </div>
                            <div>
                            (발신 전용)
                            </div>
                        </div>
                        
                    </NameBox>
                    <InputBox style={{borderRight:0}}>
                        <InputLine style={{flex:1, margin: 10}} value={call || ''} onChange={(e)=>{setCall(e.target.value)}}></InputLine>
                    </InputBox>

                    <NameBox style={{borderLeft:0,borderRight:0,borderColor:COLOR.BLACK }}>
                        <Link href={{ pathname: "https://smartsms.aligo.in/login.html"}}>
                            <a target="_blank">
                                <RegistAligo>**알리고에 등록하기</RegistAligo>
                            </a>
                        </Link>
                        
                    </NameBox>

                    <InputBox style={{borderLeft:0}}>
                    </InputBox>
                </PrView>
                
                <PrView>
                    <NameBox>
                        수선 OK 사용 여부
                    </NameBox>

                    <LongInputBox style={{}}>
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
const RegistButton =styled.button`
    background-color : ${COLOR.INDIGO};
    width:80px;
    height : 50px;
    color:${COLOR.WHITE};
    margin:20px;
    font-size:16px;
    border-radius:10px;

`
const Wrapper  = styled.div`
    overflow:auto;
    &::-webkit-scrollbar {
        width: 8px;
        height: 10px;
        background: rgba(210, 210, 210, 0.4);
      }
      &::-webkit-scrollbar-thumb {
        background: rgba(96, 96, 96, 0.7);
        border-radius: 6px;
      }
`;
const InsideWrapper  = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction: column;
`;
const InputTableBox  = styled.div`
    min-height:720px;
    width:1080px;
`;
const PrView  = styled.div`
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
    width : 200px;
    border 1px solid;
    font-size: 18px;
    display:flex;
    justify-content:center;
    align-items:center;
`;
const InputBox  = styled.div`
    height : 80px;
    flex:1.3;
    border 1px solid;
    display:flex;
    justyfiy-content:center;
    ailgn-items:center;
`;
const LongInputBox  = styled.div`
    height : 80px;
    flex:3.31;
    border 1px solid;
    display:flex;
    justyfiy-content:center;
    ailgn-items:center;
`;
const InputLine  = styled.input`
    border 1px solid;
    border-radius: 5px;
    padding-left:10px;
    font-size:20px;

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

export default CompanyModify