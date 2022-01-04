import excuteQuery from "../db";

async function setCompleteDate(code, date) {
  return excuteQuery({
    query: "UPDATE receipt SET complete_date=? WHERE receipt_code=?",
    values: [date, code],
  });
}

const complete = async (req, res) => {
  if (req.method === "PUT") {
    console.log("req.headers.referer");
    console.log(req.headers.referer);
    console.log("req.body");
    console.log(req.body);
    const { date, code } = req.query;
    try {
      const result = setCompleteDate(code, date);
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

export default complete;
