import excuteQuery from "../db";

async function getNotice() {
  const result = await excuteQuery({
    query: `SELECT text
              FROM notice WHERE id=1`,
  });

  return result;
}

async function updateNotice(text) {
  const result = await excuteQuery({
    query: `UPDATE notice SET text=? WHERE id = 1`,
    values: [text],
  });

  return result;
}

const notice = async (req, res) => {
  if (req.method === "GET") {
    console.log("/api/notice");
    try {
      const notice = await getNotice();
      if (notice.error) throw new Error(notice.error);

      res.status(200).json({ data: notice });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  } else if (req.method == "PUT") {
    const { text } = req.body;
    try {
      const result = updateNotice(text);
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
