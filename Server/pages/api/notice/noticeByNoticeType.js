import excuteQuery from "../db";

async function getNotice( noticeType,headquarterId) {
  const result = await excuteQuery({
    query: `SELECT 
              id,
              notice_type,
              text,
              red_text,
              headquarter_id
              FROM notice 
              WHERE notice_type = ? 
              AND headquarter_id = ?`,
    values:[ noticeType,headquarterId]
  });

  return result;
}

async function updateNotice( text,redText,noticeId) {
  const result = await excuteQuery({
    query: `UPDATE notice 
            SET text = ?,
                red_text = ?
            WHERE notice.id =?`,
    values:[ text,redText,noticeId]
    
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

    const { text, redText, noticeId} = req.body;
    try {
      const result = await updateNotice(text, redText, noticeId);

      console.log(result)
      if (result.error) throw new Error(result.error);

      res.status(200).json({ message: true });

    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    } finally {
      res.end();
    }
  }
};

export default notice;
