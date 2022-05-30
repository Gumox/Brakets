
import excuteQuery from "../db";

async function getSmsMessage(smsMessage,smsMessageId) {
  const result = await excuteQuery({
    query: `UPDATE sms_message SET 
            sms_message = ? 
            WHERE sms_message.sms_message_id = ?;
        `,
    values: [smsMessage,smsMessageId],
  });

  return result;
}

const smsMessage = async (req, res) => {
  if (req.method === "POST") {
    console.log("/api/sms/smsMessageModify");
    console.log(req.body)
    try {
      const { smsMessage,smsMessageId } = req.body;
      const smsMessageResult = await getSmsMessage(smsMessage,smsMessageId);
      
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
