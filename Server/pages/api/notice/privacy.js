import excuteQuery from "../db";

async function getPrivacyNotice() {
  const result = await excuteQuery({
    query: `SELECT text
              FROM notice WHERE id=3`,
  });

  return result;
}

async function updatePrivacyNotice(text) {
  const result = await excuteQuery({
    query: `UPDATE notice SET text=? WHERE id=3`,
    values: [text],
  });

  return result;
}

const privacyNotice = async (req, res) => {
  if (req.method === "GET") {
    console.log("/api/notice/privacy");
    try {
      const privacy = await getPrivacyNotice();
      if (privacy.error) throw new Error(privacy.error);

      res.status(200).json({ data: privacy });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  } else if (req.method == "PUT") {
    const { text } = req.body;
    try {
      const result = updatePrivacyNotice(text);
      if (result.error) throw new Error(result.error);

      console.log(result);

      res.status(200);
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    } finally {
      res.end();
    }
  }
};

export default privacyNotice;
