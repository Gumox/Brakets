import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import store from "../../../store/store";
import { UserContext } from "../../../store/Context";
import COLOR from "../../../constants/color";
import { debounce } from "lodash";


// correct way

const sendSms = async (user,sendNumber,{ _receivers, message }) => {
    if(user.level == 0 || user.level == 1){
      if(_receivers){
      const receivers = _receivers.join(',').replace(/-/g,'')
        try {
        const[datas] =await Promise.all([
          axios.post(`${process.env.API_URL}/smsHandler`,
            {
            
            senderId : user.staff_id,
            headquarterId :user.headquarter_id,
            sender: sendNumber,
            receiver: receivers,
            msg: message,
            // 테스트모드
            testmode_yn: 'N'},
          )
          .then(({ data }) => data)
          .catch(error=>{
      
          })
        ])
        const[messageResult] =await Promise.all([
          axios.post(`${process.env.API_URL}/sms/list`,
            {
                sender: user.staff_id,
                headquarterId :user.headquarter_id,
                msg: message,
                mid: datas.msg_id,
                sendNumber:sendNumber,
            }
          )
          .then(({ data }) => data)
          .catch(error=>{
      
          })
        ])
        return datas; 
      } catch (err) {
        console.log('err', err);
      }
    }
  }else{
    alert("SMS 전송 권한이 없습니다")
  }
};

const getSmsMessage = async (hq_id) => {
  try {
  const[datas] =await Promise.all([
    axios.get(`${process.env.API_URL}/sms/smsMessage?headquarterId=${hq_id}`)
    .then(({ data }) => data.data)
    .catch(error=>{

    })
  ])
  return datas;
} catch (err) {
  console.log('err', err);
}
};
const setSmsResult = async (sender,mid,hq_id) => {
  try {
  const[datas] =await Promise.all([
    axios.get(`${process.env.API_URL}/sms/list`,{sender:sender,mid:mid,headquarterId:hq_id})
    .then(({ data }) => data.data)
    .catch(error=>{

    })
  ])
  return datas;
  } catch (err) {
  console.log('err', err);
  }
};

const SendMsg = ({infos}) => {

  const [msgText, setMsgtext] = useState("");
  const user =useContext(UserContext)
  const [smsMessage,setSmsMessage] = useState([]);
  const [sendNumber,setSendNumber] = useState(infos.headquarter_call);
  const [windowTof,setWindowTof] = useState(false)

  const [windowWidth,setWindowWidth] = useState(0)
    const [windowHeight,setWindowHeight] = useState(0)
    const handleResize = debounce(()=>{
        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
    },1000)
  
  let myWidth;

  if(windowTof){
    myWidth =window.innerWidth-660
  }

  useEffect(()=>{
    const fetch =async()=>{
      if(user.level !== 5){
        let smsMsg = await getSmsMessage(user.headquarter_id)
        setSmsMessage(smsMsg)
      }else if(user.level === 5){
        let smsMsg = await getSmsMessage(infos.value)
        setSmsMessage(smsMsg)
      }
    }
    fetch();
  },[user])
  useEffect(()=>{
    if(!windowTof){
      setWindowTof(true)
    }
    setWindowWidth(window.innerWidth)
    setWindowHeight(window.innerHeight)
    window.addEventListener('resize',handleResize);
    return ()=>{
        window.removeEventListener('resize',handleResize);
    }
  },[])
  return (
    <Wrapper style={{width:myWidth}}>
      <MsgView>
        <SelectBox onChange={(e)=>{
          setSendNumber(e.target.value)
          }}>
          <option value={infos.headquarter_call}>{infos.headquarter_call}</option>
        </SelectBox>

        <TextBoxTop
          value={msgText}
          onChange={(e) => setMsgtext(e.target.value)}
        />

        <SendBtn
          onClick={() => 
            sendSms(user,sendNumber,{ _receivers: store.getState().phone_num, message: msgText }).then((result) => {
              
          })}
        >
          전송
        </SendBtn>
      </MsgView>

      <SelectingView>
        <SelectedRow>
          {
            smsMessage.map((el,i)=>{
              let color = COLOR.TEXT_MAIN;
              if(el.level === 2){
                color = COLOR.RED
              }
              return(
              <TextBox key={i} style={{ color:color,height: 200 }} readOnly
                value={el.text}
                onClick={(e) => setMsgtext(el.text)}
              />
            )})
          }
        </SelectedRow>
      </SelectingView>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  
  height: calc(95% - 15px);
  overflow: auto;
  border-bottom: 2px solid;
  border-left: 1px solid;
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

const MsgView = styled.div`
    display: flex;
    height: 40%;
    border-bottom: 1px solid;
    padding: 1rem 1rem;
    flex-direction: column;
`

const SelectingView = styled.div`
    border-top: 1px solid;
    padding: 20px;
`

const SelectedRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr ;
  grid-gap: 10px;
`;

const TextBox = styled.textarea`
  width: 100%;
  height: 70%;
  border: 1px solid ${COLOR.BLACK};
  resize: none;
`;
const TextBoxTop = styled.textarea`
  width: 30%;
  height: 70%;
  border: 1px solid ${COLOR.BLACK};
  resize: none;
`;
const SendBtn = styled.button`
  margin-left: 30px;
  margin-top: 15px;
  width: 25%;
`;

const SelectBox = styled.select`
  width: 30%;
  height: 10%;
  margin-bottom: 20px;
`;

export default SendMsg;

