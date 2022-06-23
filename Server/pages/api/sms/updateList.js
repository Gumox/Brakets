import excuteQuery from "../db";
const aligoapi = require('aligoapi');

const updateResult = async(message,id)=>{
    const info = await excuteQuery({
        query: 'UPDATE sms_result SET sms_result_message = ? WHERE sms_result_id = ?',
        values: [message,id],
      });
}

const smsList = (req, res,mid,id) => {
    let AuthData = {
        key: process.env.ALIGO_API_KEY,
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
        console.log(r.list)
        r.list.map(async(el)=>{
            console.log(el.sms_state)
            const update = updateResult(el.sms_state,id)
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
async function updateSmsMessageResult(req, res,headquarterId) {
    const info = await excuteQuery({
      query: 'SELECT sms_result_id ,mid FROM sms_result WHERE headquarter_id =?',
      values: [headquarterId],
    });

    info.map((el)=>{
        smsList(req, res,el.mid,el.sms_result_id)
        
    })
    return info;
  }

  const controller =  async (req, res) => {
    if (req.method === "POST") {
    console.log(req.body)
    const { headquarterId} = req.query
      console.log(headquarterId)
      try{
        const sms = updateSmsMessageResult(req, res,headquarterId)
        res.status(200).send({data: sms})
        
      }catch(err){
          console.log(err.message);
          res.status(400).json({err: err.message});
      }
    }
  };
  
  export default controller;