
import excuteQuery from "../db";

async function getSmsMessage(headquarterId) {
  const result = await excuteQuery({
    query: `SELECT sms_message_id AS value, sms_message AS text, level
              FROM sms_message WHERE headquarter_id=?`,
    values: [headquarterId],
  });

  return result;
}

const smsMessage = async (req, res) => {
  if (req.method === "GET") {
    console.log("/api/sms/smsMessage");
    try {
      const { headquarterId } = req.query;
      const smsMessage = await getSmsMessage(headquarterId);
      if (smsMessage.error) throw new Error(smsMessage.error);

      res.status(200).json({ data: smsMessage });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default smsMessage;
