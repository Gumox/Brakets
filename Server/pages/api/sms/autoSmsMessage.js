import excuteQuery from "../db";

async function getSmsMessage(messageType,headquarterId) {
    const result = await excuteQuery({
      query: `SELECT * 
              FROM auto_sms_message 
              WHERE message_type = ? AND headquarter_id = ?`,
      values:[messageType,headquarterId]
    });
  
    return result;
}

async function setSmsMessage(autoSmsMessage1,
                            autoSmsMessage2,
                            autoSmsMessage3,
                            autoSmsMessageId,
                            repairProduct,
                            changeProduct,
                            refundProduct,
                            deliberateProduct
  ) {
    const result = await excuteQuery({
      query: `UPDATE 
                auto_sms_message
                SET 
                auto_sms_message1 = ? ,
                auto_sms_message2 = ? ,
                auto_sms_message3 = ? ,
                repair_product = ? ,
                change_product = ? ,
                refund_product = ? ,
                deliberate_product = ? 
                WHERE auto_sms_message_id  = ?`,
      values:[autoSmsMessage1,autoSmsMessage2,autoSmsMessage3,repairProduct,changeProduct,refundProduct,deliberateProduct,autoSmsMessageId]
    });
  
    return result;
}

  
const controller =  async (req, res) => {
    if (req.method === "POST") {
      console.log(req.body)
      const {   
        messageType,
        headquarterId
      } = req.body

      try {

        const smsMessage = await getSmsMessage(messageType,headquarterId);
        if (smsMessage.error) throw new Error(smsMessage.error);
        
        res.status(200).json({ data: smsMessage });
      } catch (err) {
        console.log(err.message);
        res.status(400).json({ err: err.message });
      }
  
    }if(req.method === "PUT"){
        console.log(req.body)
        const {
            autoSmsMessage1,
            autoSmsMessage2,
            autoSmsMessage3,
            autoSmsMessageId,
            repairProduct,
            changeProduct,
            refundProduct,
            deliberateProduct
        } = req.body
        try {

            const smsMessage = await setSmsMessage( autoSmsMessage1,
                                                    autoSmsMessage2,
                                                    autoSmsMessage3,
                                                    autoSmsMessageId,
                                                    repairProduct,
                                                    changeProduct,
                                                    refundProduct,
                                                    deliberateProduct);
            if (smsMessage.error) throw new Error(smsMessage.error);
      
            res.status(200).json({ data: smsMessage });
          } catch (err) {
            console.log(err.message);
            res.status(400).json({ err: err.message });
          }
    }
        
  };
    
    export default controller;
  