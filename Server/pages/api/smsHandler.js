import excuteQuery from "./db";
const aligoapi = require('aligoapi');

  const controller =  async (req, res) => {
    if (req.method === "POST") {
    console.log(req.body)
    const { 
      senderId,
      headquarterId,
      sender,
      receiver,
      msg } = req.body
      
       
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
  
