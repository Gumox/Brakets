
import excuteQuery from "../db";

async function setSmsMessage(smsMessage,headquarterId,level) {
  const result = await excuteQuery({
    query: `INSERT INTO sms_message 
            (   
                sms_message,
                headquarter_id,
                level
                ) VALUES (?,?,?)
        `,
    values: [smsMessage,headquarterId,level],
  });

  return result;
}

const smsMessage = async (req, res) => {
  if (req.method === "POST") {
    console.log("/api/sms/smsMessageModify");
    console.log(req.body)
    try {
      const {   smsMessage,
                headquarterId,
                level 
            } = req.body;
      const smsMessageResult = await setSmsMessage(smsMessage,
                                                    headquarterId,
                                                    level );
      
      if (smsMessageResult.error) throw new Error(smsMessageResult.error);
      else{console.log(smsMessageResult)}

      res.status(200).json({ data: smsMessageResult });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default smsMessage;
