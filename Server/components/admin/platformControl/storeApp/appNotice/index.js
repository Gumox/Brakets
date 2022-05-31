import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../../constants/color";
import _ from "lodash";
import Notice from "./Notice";
import SmsNotice from "./SmsNotice";
import PrivacyNotice from "./Privacy";
import axios from "axios";

const AppNoticeControl = ({
    user,
    notice,
    smsNotice,
    privacy
}) => {
    const [onClickNoice,setOnClickNoice] = useState(false)
    
    const [onClickSmsNoice,setOnClickSmsNoice] = useState(false)
    
    const [onClickPrivacy,setOnClickPrivacy] = useState(false)
    return(
        <Wrapper>
            <div>
              
            
              <h2 style={{marginLeft:20}}>매장 APP – 자동발송 문자메시지 문구 설정과 관리</h2>

              <LaView style={{justifyContent:"space-between",marginBottom:10}}>
                  <ColView>
                      <InColView style={{marginLeft:20}}>{"아래 예시 문구를 참고하여 회사정책 또는 브랜드에 맞게"}</InColView>
                      <InColView style={{marginLeft:20}}>{" 자주 사용하는 문자메시지 문구를 만드세요. "}</InColView>
                  </ColView>
                  <div style={{width:50}}>

                  </div>
              </LaView>
            </div>
            <LaView style={{justifyContent:"space-between",}}>
                <DivContainer style={{}}>
                    {onClickNoice 
                        ?
                        <div style={{width:"100%",justifyContent:"space-evenly",display:"flex"}}>
                            <DivButton>
                                수정
                            </DivButton>
                            <DivButton style={{color:COLOR.RED}} onClick={()=>{setOnClickNoice(!onClickNoice)}}>
                                취소
                            </DivButton>
                        </div>
                        :
                        <DivButton onClick={()=>{setOnClickNoice(!onClickNoice)}}>
                            수정
                        </DivButton>

                    }
                    

                    <PhoneImage size={35} style={{backgroundSize :"cover",backgroundImage :`url(/icons/app.png)`}}>
                        <AppTitle size={35} >
                            수선관련고지사항
                        </AppTitle>
                        <AppPage size={35}>
                            <Notice data={notice.text}/>
                        </AppPage>
                    </PhoneImage>
                </DivContainer>
                
                <DivContainer >
                    {onClickSmsNoice 
                        ?
                        <div style={{width:"100%",justifyContent:"space-evenly",display:"flex"}}>
                            <DivButton>
                                수정
                            </DivButton>
                            <DivButton style={{color:COLOR.RED}} onClick={()=>{setOnClickSmsNoice(!onClickSmsNoice)}}>
                                취소
                            </DivButton>
                        </div>
                        :
                        <DivButton onClick={()=>{setOnClickSmsNoice(!onClickSmsNoice)}}>
                            수정
                        </DivButton>

                    }
                    <PhoneImage size={35} style={{backgroundSize :"cover",backgroundImage :`url(/icons/app.png)`}}>
                        <AppTitle size={35} >
                            문자수신동의여부
                        </AppTitle>
                        <AppPage size={35}>
                            <SmsNotice data={smsNotice.text}/>
                        </AppPage>
                    </PhoneImage>
                </DivContainer>
                
                <DivContainer>
                    {onClickPrivacy 
                        ?
                        <div style={{width:"100%",justifyContent:"space-evenly",display:"flex"}}>
                            <DivButton>
                                수정
                            </DivButton>
                            <DivButton style={{color:COLOR.RED}} onClick={()=>{setOnClickPrivacy(!onClickPrivacy)}}>
                                취소
                            </DivButton>
                        </div>
                        :
                        <DivButton onClick={()=>{setOnClickPrivacy(!onClickPrivacy)}}>
                            수정
                        </DivButton>

                    }
                    <PhoneImage size={35} style={{backgroundSize :"cover",backgroundImage :`url(/icons/app.png)`}}>
                        <AppTitle size={35} >
                            개인정보동의여부
                        </AppTitle>
                        <AppPage size={35}>
                            <PrivacyNotice data={privacy.text}/>
                        </AppPage>
                    </PhoneImage>

                </DivContainer>
            </LaView>
        </Wrapper>
    )
};
export default AppNoticeControl

const DivButton = styled.div`
    color:${COLOR.CYAN_BLUE};
    width:50px;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:15px;
    padding:5px;
    border-radius: 10px;
    cursor: pointer;
    &:hover{
        background-color:${COLOR.LIGHT_GRAY};
    }

`;
const Wrapper = styled.div`
    padding:2%;
    background-color:${COLOR.WHITE};
`;
const DivContainer = styled.div`
    display : flex;
    flex-direction : column;
    justify-content : center;
    align-items : center;
`
const PhoneImage =styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction : column;
    padding-bottom:15px;
    width: ${({ size }) => (size ? size*7 :24)}px;
    height: ${({ size }) => (size ? size*13.8: 52 )}px;
`;
const AppTitle = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
    width: ${({ size }) => (size ? (size*7)-30 :24)}px;
    height: ${({ size }) => (size ? size+5 :40)}px;
    margin-top:30px;
`
const AppPage = styled.div`
    display : flex;
    width: ${({ size }) => (size ? (size*7)-30 :24)}px;
    flex:1;
`
const LaView  = styled.div`
    display:flex;
    margin-top:50px;
    flex-direction:row;
    align-items:center; 
    width:950px;
`;
const ColView  = styled.div`
    display:flex;
    flex-direction: column;
`;
const InColView  = styled.div`
    display:flex;
    font-size:10px;
    align-items:center;
`;