import excuteQuery from "../db";
const aligoapi = require('aligoapi');


async function SetSmsMessageResult(sender,sms_result,sms_result_message,msg,mid,headquarterId,send_number,calling_number) {
  const toDay = new Date()
  let inputDate = toDay.getFullYear()+"-"+(toDay.getMonth()+1)+"-"+toDay.getDate()+" "+toDay.getHours()+":"+toDay.getMinutes()+":"+toDay.getSeconds();
    const result = await excuteQuery({
      query: 'INSERT INTO `sms_result` (`sender`, `send_number`,`calling_number`,`sms_result`, `sms_result_message`, `msg`,`mid`, `headquarter_id`,send_date) VALUES (?,?,?,?,?,?,?,?,?)',
      values: [sender,send_number,calling_number,sms_result,sms_result_message,msg,mid,headquarterId,inputDate],
    });
    console.log(result)
    return result;
  }

const smsList = (req,msg,mid,hq_id,sendNumber) => {
    let AuthData = {
        key: '58b93zstbkzmrkylw4bheggqu2cx2zb2',
        user_id: 'brackets',
      }
    // 전송결과보기 상세
  
    req.body = {
       mid: mid
  
     }
    let result;
    aligoapi.smsList(req, AuthData)
      .then((r) => {
        console.log(r.list)
        r.list.map(async(el)=>{
            console.log(el.receiver)
            let result = await SetSmsMessageResult(1,r.message,el.sms_state,msg,mid,hq_id,sendNumber,el.receiver)
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
async function getSender(headquarterId) {
  const result = await excuteQuery({
    query: `SELECT headquarter_call 
              FROM headquarter WHERE headquarter_id =?`,
    values: [headquarterId],
  });

  return result;
}

const controller =  async (req, res) => {
  if (req.method === "POST") {
    console.log(req.body)
    const { 
      headquarterId,
      receiver,
      msg } = req.body

    const senderString = await getSender(headquarterId)
    
    const sender =String(senderString[0].headquarter_call).replace(/-/g, '') 

    console.log(sender)

    
    
      
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
    console.log( req.body)

    aligoapi.send(req, AuthData)
      .then((r) => {
        smsList(req,msg,r.msg_id,headquarterId,String(senderString[0].headquarter_call))
        res.status(200).send(r)
      })
      .catch((e) => {
        res.status(203)
        res.send(e)
      })
  }
      
};
  
  export default controller;
