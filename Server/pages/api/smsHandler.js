import excuteQuery from "./db";
const aligoapi = require('aligoapi');

async function SetSmsMessageResult(sender,sms_result,sms_result_message,mid,headquarterId) {
  const result = await excuteQuery({
    query: 'INSERT INTO `sms_result` (`sender`, `sms_result`, `sms_result_message`, `mid`, `headquarter_id`) VALUES (?,?,?,?,?)',
    values: [sender,sms_result,sms_result_message,mid,headquarterId],
  });

  return result;
}

const smsList = (req, res,sender,mid,hq_id) => {
  let AuthData = {
      key: '58b93zstbkzmrkylw4bheggqu2cx2zb2',
      user_id: 'brackets',
    }
  // 전송결과보기 상세

  req.body = {
  /*** 필수값입니다 ***/
     mid: mid
  /*** 필수값입니다 ***/

   }
  // req.body 요청값 예시입니다.
  let result;
  aligoapi.smsList(req, AuthData)
    .then((r) => {
      //res.send(r)
      //console.log(r)
      //result = await SetSmsMessageResult(sender,r.message,r.list.sms_state,mid,hq_id)
      //console.log(result)
      console.log(r.list)
      r.list.map(async(el)=>{
          console.log(el.sms_state)
          console.log(sender,mid,hq_id)
          let result = await SetSmsMessageResult(sender,r.message,el.sms_state,mid,hq_id)
          console.log(result)
      })
      if(result.error){

      }
    })
    .catch((e) => {
      //res.send(e)
      result = e;
    })
    return result
}
const send = (req, res,
              senderId,
              headquarterId,
              sender,
              receiver,
              msg
            ) => {

    let AuthData = {
        key: '58b93zstbkzmrkylw4bheggqu2cx2zb2',
        user_id: 'brackets',
      }
      
      AuthData.testmode_yn = 'N'
  
  req.body = {
      
    sender: sender,
    receiver: receiver,
    msg: msg,
  }

  aligoapi.send(req, AuthData)
    .then((r) => {
      res.status(200).send(r)
      //const sms = smsList(req, res ,senderId,r.msg_id,headquarterId)
    })
    .catch((e) => {
      res.status(203)
      res.send(e)
    })
}

  const controller =  async (req, res) => {
    if (req.method === "POST") {
    console.log(req.body)
    const { 
      senderId,
      headquarterId,
      sender,
      receiver,
      msg } = req.body.body
      
       
        let AuthData = {
          key: '58b93zstbkzmrkylw4bheggqu2cx2zb2',
          user_id: 'brackets',
        }
        
        AuthData.testmode_yn = 'N'
    
    req.body = {
        
      sender: sender,
      receiver: receiver,
      msg: msg,
    }
  
    aligoapi.send(req, AuthData)
      .then((r) => {
        res.status(200).send(r)
        //const sms = smsList(req, res ,senderId,r.msg_id,headquarterId)
      })
      .catch((e) => {
        res.status(203)
        res.send(e)
      })
    }
      
  };
  
  export default controller;
  
