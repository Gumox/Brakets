import excuteQuery from "../db";

async function getSmsNotice() {
  const result = await excuteQuery({
    query: `SELECT text
              FROM notice WHERE id=2`,
  });

  return result;
}

async function updateSmsNotice(text) {
  const result = await excuteQuery({
    query: `UPDATE notice SET text=? WHERE id = 2`,
    values: [text],
  });

  return result;
}

const smsNotice = async (req, res) => {
  if (req.method === "GET") {
    console.log("/api/notice/sms");
    try {
      const smsNotice = await getSmsNotice();
      if (smsNotice.error) throw new Error(smsNotice.error);

      res.status(200).json({ data: smsNotice });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  } else if (req.method == "PUT") {
    const { text } = req.body;
    try {
      const result = updateSmsNotice(text);
      if (result.error) throw new Error(result.error);

      res.status(200);
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    } finally {
      res.end();
    }
  }
};

export default smsNotice;
