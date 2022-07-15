import React ,{useEffect,useState,useCallback} from "react";
import styled from "styled-components";
import COLOR from "../../../../../constants/color";
import _ from "lodash";
import axios from "axios";
import AutoSmsMessage from "./AutoSmsMessage";

const AutoSmsMessageControl = ({user,info,receiptSmsMessage,takeOverSmsMessage}) => {

    const [messageReceipt1,setMessageReceipt1] = useState(receiptSmsMessage.auto_sms_message1)
    const [messageReceipt2,setMessageReceipt2] = useState(receiptSmsMessage.auto_sms_message2)
    const [messageReceipt3,setMessageReceipt3] = useState(receiptSmsMessage.auto_sms_message3)

    
    const [messageTakeOver1,setMessageTakeOver1] = useState(takeOverSmsMessage.auto_sms_message1)
    const [messageTakeOver2,setMessageTakeOver2] = useState(takeOverSmsMessage.auto_sms_message2)
    const [messageTakeOver3,setMessageTakeOver3] = useState(takeOverSmsMessage.auto_sms_message3)

    
    
    const [onClickSmsReceipt,setOnClickSmsReceipt] = useState(false)
    
    const [onClickTakeOver,setOnClickTakeOver] = useState(false)

    const modifyText = async(text1,text2,text3,id)=>{
        let data={
            autoSmsMessage1 : text1,
            autoSmsMessage2 : text2,
            autoSmsMessage3 : text3,
            autoSmsMessageId : id
        }

        const[result] =await Promise.all([

            axios.put(`${process.env.API_URL}/sms/autoSmsMessage`,data)
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
              
            
              <h2 style={{marginLeft:20}}>매장 APP – 자동발송 문자메시지 문구 설정과 관리</h2>

              <LaView style={{justifyContent:"space-between",marginBottom:10}}>
                  <ColView>
                    <InColView style={{marginLeft:20}}>{"ㆍ 매장 앱 접수 시, “고객용 제품”이면서 접수유형(요구)이 “수선”인 경우에만"}</InColView>
                    <InColView style={{marginLeft:20}}>{"　  해당 고객에게 자동으로 문자 발송 ( 교환/환불/심의 문자 발송 X )"}</InColView>
                    <InColView style={{marginLeft:20}}>{"ㆍ 매장 앱 접수 완료되면, 수선접수상태과 접수번호 알림"}</InColView>
                    <InColView style={{marginLeft:20}}>{"ㆍ 매장 앱 인수 완료되면, 수선완료된 제품 수령 안내 알림"}</InColView>
                     
                  </ColView>
                  <div style={{width:50}}>

                  </div>
              </LaView>
            </div>
            <LaView style={{justifyContent:"space-evenly",marginTop:50}}>
                
                <DivContainer>
                    <HeaderCell >
                        접수 완료 시
                    </HeaderCell>
                    {onClickSmsReceipt 
                        ?
                        <div style={{width:"100%",justifyContent:"space-evenly",display:"flex"}}>
                            <DivButton onClick={()=>{modifyText(messageReceipt1,messageReceipt2,messageReceipt3,receiptSmsMessage.auto_sms_message_id)}}>
                                확인
                            </DivButton>
                            <DivButton style={{color:COLOR.RED}} onClick={()=>{setOnClickSmsReceipt(!onClickSmsReceipt)}}>
                                취소
                            </DivButton>
                        </div>
                        :
                        <DivButton onClick={()=>{setOnClickSmsReceipt(!onClickSmsReceipt)}}>
                            수정
                        </DivButton>

                    }
                    <PhoneImage size={35} style={{backgroundSize :"cover",backgroundImage :`url(/icons/iPhoneMessage.png)`}}>
                        <AppTitle size={35} style={{fontWeight:"bold",paddingBottom:5}}>
                            {info.headquarter_call}
                        </AppTitle>
                        <AppPage size={35}>
                            <AutoSmsMessage text={receiptSmsMessage} state={onClickSmsReceipt} message1={messageReceipt1} message2={messageReceipt2} message3={messageReceipt3} 
                            setMessage1={setMessageReceipt1} setMessage2={setMessageReceipt2} setMessage3={setMessageReceipt3}/>
                        </AppPage>
                    </PhoneImage>
                    
                </DivContainer>
                <DivContainer>
                    <HeaderCell >
                        인수 완료 시
                    </HeaderCell>
                    {onClickTakeOver 
                        ?
                        <div style={{width:"100%",justifyContent:"space-evenly",display:"flex"}}>
                            <DivButton onClick={()=>{modifyText(messageTakeOver1,messageTakeOver2,messageTakeOver3,takeOverSmsMessage.auto_sms_message_id)}}>
                                확인
                            </DivButton>
                            <DivButton style={{color:COLOR.RED}} onClick={()=>{setOnClickTakeOver(!onClickTakeOver)}}>
                                취소
                            </DivButton>
                        </div>
                        :
                        <DivButton onClick={()=>{setOnClickTakeOver(!onClickTakeOver)}}>
                            수정
                        </DivButton>

                    }
                    <PhoneImage size={35} style={{backgroundSize :"cover",backgroundImage :`url(/icons/iPhoneMessage.png)`}}>
                        <AppTitle size={35} style={{fontWeight:"bold",paddingBottom:5}}>
                            {info.headquarter_call}
                        </AppTitle>
                        <AppPage size={35}>
                            <AutoSmsMessage text={takeOverSmsMessage} state={onClickTakeOver} message1={messageTakeOver1} message2={messageTakeOver2} message3={messageTakeOver3}
                            setMessage1={setMessageTakeOver1} setMessage2={setMessageTakeOver2} setMessage3={setMessageTakeOver3}/>
                        </AppPage>
                    </PhoneImage>
            </DivContainer>
            </LaView>
            
        </Wrapper>
    )
};
export default AutoSmsMessageControl
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
    color: ${COLOR.BLACK};
    width: ${({ size }) => (size ? (size*7)-30 :24)}px;
    height: ${({ size }) => (size ? size+10 :40)}px;
    margin-top:35px;
`
const AppPage = styled.div`
    display : flex;
    margin-bottom:50px;
    width: ${({ size }) => (size ? (size*7)-30 :24)}px;
    flex:1;
    overflow: auto;

    &::-webkit-scrollbar {
        width: 6px;
        height: 5px;
        background: rgba(210, 210, 210, 0.4);
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(96, 96, 96, 0.7);
        border-radius: 6px;
    }
`;
const LaView  = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center; 
    width:800px;
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
const HeaderCell = styled.div`
    display:flex;
    height:60px;
    width: 245px;
    border-radius: 10px;
    justify-content:center;
    align-items:center;
    font-size:16px;
    flex:1;
    padding:5px;
    background-color: ${COLOR.LIGHT_GRAY};
`;
const DivButton = styled.div`
    margin:5px;
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
        background-color:${COLOR.LIGHT_GRAY};
    }

`;