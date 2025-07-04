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
        key: process.env.ALIGO_API_KEY,
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

async function getSender(storeId) {
  const result = await excuteQuery({
    query: `SELECT *
            FROM headquarter 
            LEFT JOIN brand ON headquarter.headquarter_id = brand.headquarter_id 
            LEFT JOIN store ON store.brand_id = brand.brand_id 
            WHERE store.store_type = 1 AND store.store_id =?`,
    values: [storeId],
  });

  return result;
}
async function smsMessage(messageType,headquarterId,brand,store,code,sendState) {
  const result = await excuteQuery({
    query: `SELECT * 
            FROM auto_sms_message 
            WHERE message_type = ? AND headquarter_id = ?`,
    values:[messageType,headquarterId]
  });
  const msg = brand+" "+result[0].auto_sms_message1+" "+store +result[0].auto_sms_message2+" "+code +result[0].auto_sms_message3
  let isSend = false
  if(result[0][sendState]){
    isSend = true
  }

  return [msg,isSend];
}
async function getReceiver(receiptId){
  const result = await excuteQuery({
    query: `SELECT 
            customer.phone,
            receipt.receipt_code,
            receipt.receipt_type
            FROM receipt 
            JOIN customer ON receipt.customer_id = customer.customer_id 
            WHERE receipt.receipt_id = ? `,
    values: [receiptId],
  });

  return result[0];
}

async function getReceiverAsCode(receiptCode){
  const result = await excuteQuery({
    query: `SELECT 
            customer.phone,
            receipt.receipt_code,
            receipt.receipt_type
            FROM receipt 
            JOIN customer ON receipt.customer_id = customer.customer_id 
            WHERE receipt.receipt_code = ? `,
    values: [receiptCode],
  });

  return result[0];
}

const controller =  async (req, res) => {
  if (req.method === "POST") {
    console.log(req.body)
    const { 
      storeId,
      receiptId,
      receiptCode,

      messageType,
      headquarterId
    } = req.body

    
    let customer
    let sendMessageReceiptType = {1:"repair_product",2:"change_product",3:"refund_product",4:"deliberate_product"}
    if(receiptId){
      customer = await getReceiver(receiptId)
    }else if(receiptCode){
      customer = await getReceiverAsCode(receiptCode)
    }
    
    if(customer.phone){
      const sendState = sendMessageReceiptType[customer.receipt_type]
      const storeSenderString = await getSender(storeId)
      const sender =String(storeSenderString[0].headquarter_call).replace(/-/g, '') 

      const hq_id = storeSenderString[0].headquarter_id

      const message = await smsMessage(messageType,headquarterId,storeSenderString[0].brand_name,storeSenderString[0].name,customer.receipt_code,sendState)

      console.log(message)
      
      if(message[1]){
      
        
        let AuthData = {
          key: process.env.ALIGO_API_KEY,
          user_id: 'brackets',
        }
        
        AuthData.testmode_yn = 'N'

        req.body = {
            
          sender: sender,
          receiver:  String(customer.phone).replace(/-/g, ''),
          msg: message[0],
        }
        console.log( req.body)

        aligoapi.send(req, AuthData)
          .then((r) => {
            smsList(req,message[0],r.msg_id,hq_id,sender)
            res.status(200).send(r)
          })
          .catch((e) => {
            res.status(400)
            res.send(e)
          })
      }else{
        res.status(204).send()
      }
    }else{
      res.status(204).send()
    }
  }
      
};
  
  export default controller;

