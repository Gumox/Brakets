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

    const [onClickNotice,setOnClickNotice] = useState(false)
    
    const [onClickSmsNotice,setOnClickSmsNotice] = useState(false)
    
    const [onClickPrivacy,setOnClickPrivacy] = useState(false)

    
    const [noticeText,setNoticeText] = useState(notice.text)
    const [noticeRedText,setNoticeRedText] = useState(notice.red_text)
    
    const [smsNoticeText,setSmsNoticeText] = useState(smsNotice.text)
    const [smsNoticeRedText,setSmsNoticeRedText] = useState(smsNotice.red_text)
    
    const [privacyText,setPrivacyText] = useState(privacy.text)
    const [privacyRedText,setPrivacyRedText] = useState(privacy.red_text)

    const modifyText = async(id,text,redText) =>{
        let data={
            noticeId: id,

            text: text,
            redText: redText
        }
        const[result] =await Promise.all([

            axios.put(`${process.env.API_URL}/notice/noticeByNoticeType`,data)
            .then(({ data }) => data.data)
            .catch(error=>{
  
            })
        ])
        alert("수정 되었습니다.")
        window.location.reload()
        
    }

    return(
        <Wrapper>
            <div>
              
            
              <h2 style={{marginLeft:20}}>매장 APP – 수선관련고지사항 / 문자수신동의여부 / 개인정보동의여부 - 설정과 관리 </h2>

              <LaView style={{justifyContent:"space-between",marginBottom:10,marginTop:0}}>
                  <ColView>
                    <InColView style={{marginLeft:20}}>{"ㆍ 위치: 매장 APP > 접수 탭 > 고객조회 (또는 신규고객등록) > 고객정보"}</InColView>
                    <InColView style={{marginLeft:20}}>{"ㆍ 접수 시, 아래 3가지 사항들에 대하여 고객의 동의를 받아야 합니다."}</InColView>
                    <InColView style={{marginLeft:20}}>{"ㆍ 아래 예시를 참고하시고, 회사정책에 따른 규정사항을 각각의 앱 화면에 직접 입력해 주세요. "}</InColView>
                      
                  </ColView>
              </LaView>
            </div>
            <LaView style={{justifyContent:"space-between",}}>
                <DivContainer style={{}}>
                    {onClickNotice 
                        ?
                        <div style={{width:"100%",justifyContent:"space-evenly",display:"flex"}}>
                            <DivButton onClick={()=>{modifyText(notice.id,noticeText,noticeRedText)}}>
                                확인
                            </DivButton>
                            <DivButton style={{color:COLOR.RED}} onClick={()=>{setOnClickNotice(!onClickNotice)}}>
                                취소
                            </DivButton>
                        </div>
                        :
                        <DivButton onClick={()=>{setOnClickNotice(!onClickNotice)}}>
                            수정
                        </DivButton>

                    }
                    

                    <PhoneImage size={35} style={{backgroundSize :"cover",backgroundImage :`url(/icons/app.png)`}}>
                        <AppTitle size={35} style={{color:"rgb(0,80,130)" ,fontWeight:"bold"}} >
                            수선관련고지사항
                        </AppTitle>
                        <AppPage size={35} check={!onClickNotice}>
                            {
                                onClickNotice
                                ?
                                <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center"}}>
                                    <ModifyArea value={noticeText} style={{flex:0.7,borderRadius:0}} onChange={(e)=>{setNoticeText(e.target.value)}}></ModifyArea>
                                    
                                    <ModifyArea value={noticeRedText || ""} style={{flex:0.3,color:COLOR.RED,borderColor:COLOR.RED}} onChange={(e)=>{setNoticeRedText(e.target.value)}}></ModifyArea>
                                </div>
                                :
                                <Notice data={noticeText} red={noticeRedText || ""} fontSize={((35*7)-30)*0.05}/>
                            }
                        </AppPage>
                    </PhoneImage>
                </DivContainer>
                
                <DivContainer >
                    {onClickSmsNotice 
                        ?
                        <div style={{width:"100%",justifyContent:"space-evenly",display:"flex"}}>
                            <DivButton onClick={()=>{modifyText(smsNotice.id,smsNoticeText,smsNoticeRedText)}}>
                                확인
                            </DivButton>
                            <DivButton style={{color:COLOR.RED}} onClick={()=>{setOnClickSmsNotice(!onClickSmsNotice)}}>
                                취소
                            </DivButton>
                        </div>
                        :
                        <DivButton onClick={()=>{setOnClickSmsNotice(!onClickSmsNotice)}}>
                            수정
                        </DivButton>

                    }
                    <PhoneImage size={35} style={{backgroundSize :"cover",backgroundImage :`url(/icons/app.png)`}}>
                        <AppTitle size={35} style={{color:"rgb(0,80,130)" ,fontWeight:"bold"}}>
                            문자수신동의여부
                        </AppTitle>
                        <AppPage size={35} check={!onClickSmsNotice}>
                        {onClickSmsNotice 
                            ?
                            <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center"}}>
                                <ModifyArea value={smsNoticeText} style={{flex:0.7,borderRadius:0}} onChange={(e)=>{setSmsNoticeText(e.target.value)}}></ModifyArea>
                                
                                <ModifyArea value={smsNoticeRedText ||""} style={{flex:0.3,color:COLOR.RED,borderColor:COLOR.RED}} onChange={(e)=>{setSmsNoticeRedText(e.target.value)}}></ModifyArea>
                            </div>
                            :
                            <SmsNotice data={smsNoticeText} red={smsNoticeRedText || ""} fontSize={((35*7)-30)*0.05}/>
                        }
                        </AppPage>
                    </PhoneImage>
                </DivContainer>
                
                <DivContainer>
                    {onClickPrivacy 
                        ?
                        <div style={{width:"100%",justifyContent:"space-evenly",display:"flex"}}>
                            <DivButton onClick={()=>{modifyText(privacy.id,privacyText,privacyRedText)}}>
                                확인
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
                        <AppTitle size={35} style={{color:"rgb(0,80,130)" ,fontWeight:"bold"}}>
                            개인정보동의여부
                        </AppTitle>
                        <AppPage size={35} check={!onClickPrivacy}>
                        {onClickPrivacy 
                            ?
                            <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center"}}>
                                <ModifyArea value={privacyText} style={{flex:0.7,borderRadius:0,textAlign:"center"}} onChange={(e)=>{setPrivacyText(e.target.value)}}></ModifyArea>
                                
                                <ModifyArea value={privacyRedText ||""} style={{flex:0.3,color:COLOR.RED,borderColor:COLOR.RED}} onChange={(e)=>{setPrivacyRedText(e.target.value)}}></ModifyArea>
                            </div>
                            :
                            <PrivacyNotice data={privacyText} red={privacyRedText || ""} fontSize={((35*7)-30)*0.05}/>
                        }
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
    font-weight: bold;
    &:hover{
        background-color: ${COLOR.LIGHT_GRAY};
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
    margin-bottom:  ${({ check }) => (check ? 5 :0)}px;
    overflow: auto;
    &::-webkit-scrollbar {
        width: 8px;
        height: 10px;
        background: rgba(210, 210, 210, 0.4);
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(96, 96, 96, 0.7);
        border-radius: 6px;
    }
`
const LaView  = styled.div`
    display:flex;
    margin-top:50px;
    flex-direction:row;
    align-items:center; 
    width:950px;
`;
const ModifyArea = styled.textarea`
    resize: none;
    margin-left:5px;
    margin-right:5px;
    margin-bottom:3px;
    border-radius : 0 0 16px 16px;
    flex:1;
    font-size:12px;
    border:2px solid #000000;

    &::-webkit-scrollbar {
        width: 5px;
        height: 8px;
        background: rgba(210, 210, 210, 0.4);
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(96, 96, 96, 0.7);
        border-radius: 6px;
    }
    &:focus { 
        outline: none !important;
        //border-bottom-color: #719ECE;
    }
`;
const ColView  = styled.div`
    display:flex;
    flex-direction: column;
`;
const InColView  = styled.div`
    display:flex;
    font-size:13px;
    align-items:center;
`;