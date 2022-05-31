import excuteQuery from "../db";

async function getNotice( noticeType,headquarterId) {
  const result = await excuteQuery({
    query: `SELECT text
              FROM notice 
              WHERE notice_type = ? 
              AND headquarter_id = ?`,
    values:[ noticeType,headquarterId]
  });

  return result;
}

async function updateNotice(text,noticeId) {
  const result = await excuteQuery({
    query: `UPDATE notice SET text = ? WHERE id = ?`,
    values: [text,noticeId],
  });

  return result;
}

const notice = async (req, res) => {
  if (req.method === "POST") {
    console.log("/api/notice");
    console.log(req.body)
    const { noticeType,headquarterId} = req.body;
    try {
      const notice = await getNotice( noticeType,headquarterId);
      if (notice.error) throw new Error(notice.error);

      res.status(200).json({ data: notice });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  } else if (req.method == "PUT") {
    const { text ,noticeId} = req.body;
    try {
      const result = updateNotice(text,noticeId);
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

export default notice;
