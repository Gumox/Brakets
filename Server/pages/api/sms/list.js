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

const smsList = (req, res,sender,msg,mid,hq_id,sendNumber) => {
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
            console.log(el.receiver)
            let result = await SetSmsMessageResult(sender,r.message,el.sms_state,msg,mid,hq_id,sendNumber,el.receiver)
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
  const controller =  async (req, res) => {
    if (req.method === "POST") {
        console.log("--------------------------------------")
    console.log(req.body)
    const { sender,mid ,headquarterId ,msg,sendNumber} = req.body.body
      console.log(sender,mid ,headquarterId,msg,sendNumber)
      try{
        const sms = smsList(req, res ,sender,msg,mid,headquarterId,sendNumber)
        res.status(200).send({data:"ss"})
        
      }catch(err){
          console.log(err.message);
          res.status(400).json({err: err.message});
      }
    }
  };
  
  export default controller;
  