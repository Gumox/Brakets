import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import store from "../../../store/store";
import { UserContext } from "../../../store/Context";
import COLOR from "../../../constants/color";
import { debounce } from "lodash";


// correct way

const sendSms = async (user,sendNumber,{ _receivers, message }) => {
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
      console.log(messageResult)
      return datas; 
    } catch (err) {
      console.log('err', err);
    }
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

const SendMsg = ({}) => {

  const [msgText, setMsgtext] = useState("");
  const user =useContext(UserContext)
  const [smsMessage,setSmsMessage] = useState([]);
  const [sendNumber,setSendNumber] = useState('010-2768-7973');
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
      let smsMsg = await getSmsMessage(user.headquarter_id)
      setSmsMessage(smsMsg)
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
          console.log(e.target.value)
          setSendNumber(e.target.value)
          }}>
          <option value="010-2768-7973">010-2768-7973</option>
          <option value="010-2709-0856">010-2709-0856</option>
        </SelectBox>

        <TextBoxTop
          value={msgText}
          onChange={(e) => setMsgtext(e.target.value)}
        />

        <SendBtn
          onClick={() => 
            sendSms(user,sendNumber,{ _receivers: store.getState().phone_num, message: msgText }).then((result) => {
              
            console.log('전송결과', result);
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

