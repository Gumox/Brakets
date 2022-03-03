import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import e from "cors";


const sendSms = async ({ receivers, message }) => {
    try {
    const res = await axios
      .post('https://apis.aligo.in/send/', null, {
        params: {
          key: '58b93zstbkzmrkylw4bheggqu2cx2zb2',
          user_id: 'brackets',
          sender: '01027687973',
          receiver: '01087716197',
          msg: message,
          // 테스트모드
          testmode_yn: 'Y'
        },
      });
    // res.headers("Access-Control-Allow-Origin")
    res.data;
  } catch (err) {
    console.log('err', err);
  }
};

// const sendSms = ({ receivers, message }) => {
//   return axios
//         .post('https://apis.aligo.in/send/', null, {
//             params: {
//                 key: '58b93zstbkzmrkylw4bheggqu2cx2zb2',
//                 user_id: 'brackets',
//                 sender: '01027687973',
//                 receiver: '01087716197',
//                 msg: message,
//                 // 테스트모드
//                 testmode_yn: 'Y'
//             },
//         })
//         .then((res) => {
//           // res.headers("Access-Control-Allow-Origin")
//           res.data
//         })
//         .catch(err => {
//             console.log('err', err);
//         });
// }

// 메시지 보내기
// sendSms({ receivers: ['01012341234', '010-4321-4321'], message: '메시지 테스트' }).then((result) => {
//   console.log('전송결과', result);

//   /*
//   전송결과 {
//       result_code: '1',
//       message: 'success',
//       msg_id: '83819703',
//       success_cnt: 2,
//       error_cnt: 0,
//       msg_type: 'SMS'
//   }
//   */
// });

const SendMsg = ({ }) => {

  const [msgText, setMsgtext] = useState("");

  return (
    <Wrapper>
      <MsgView>
        // TODO: 등록된 전화번호를 주어주는 api
        <SelectBox>
          <option value="010-8771-6197">010-8771-6197</option>
        </SelectBox>

        <TextBox
          value={msgText}
          onChange={(e) => setMsgtext(e.target.value)}
        />

        <SendBtn
          onClick={() => 
            sendSms({ receivers: "", message: '메시지 테스트' }).then((result) => {
            console.log('전송결과', result);
          })}
        >
          전송
        </SendBtn>
      </MsgView>

      <SelectingView>
        <SelectedRow>
          <TextBox style={{ height: 200 }} readOnly
            value={"테스트 문자 입니다. 1"}
            onClick={(e) => setMsgtext("테스트 문자입니다. 1")}
          />
          <TextBox style={{ height: 200 }} readOnly
            value={"테스트 문자 입니다. 2"}
            onClick={(e) => setMsgtext("테스트 문자입니다. 2")}
          />
          <TextBox style={{ height: 200 }} readOnly
            value={"테스트 문자 입니다. 3"}
            onClick={(e) => setMsgtext("테스트 문자입니다. 3")}
          />
          <TextBox style={{ height: 200 }} readOnly
            value={"테스트 문자 입니다. 4"}
            onClick={(e) => setMsgtext("테스트 문자입니다. 4")}
          />
        </SelectedRow>

        {/* <SelectedRow>
          <TextBox style={{ height: 200 }} readOnly
            onClick={(e) => console.log("Clicekd")}
          />
          <TextBox style={{ height: 200 }} readOnly
            onClick={(e) => console.log("Clicekd")}
          />
          <TextBox style={{ height: 200 }} readOnly
            onClick={(e) => console.log("Clicekd")}
          />
          <TextBox style={{ height: 200 }} readOnly
            onClick={(e) => console.log("Clicekd")}
          />
        </SelectedRow> */}
      </SelectingView>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  
  height: 90%;
  width: 50%;
  overflow: scroll;
  border-bottom: 2px solid;
  border-left: 1px solid;
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
  display: flex;
  flex-direction: row;
`;

const TextBox = styled.textarea`
  /* padding: 5px; */
  width: 30%;
  height: 70%;
  border: 1px solid;
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
