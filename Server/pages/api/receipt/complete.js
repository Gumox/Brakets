import excuteQuery from "../db";

async function setCompleteDate(step,code, date) {
  return excuteQuery({
    query: "UPDATE receipt SET  step =?,complete_date=? WHERE receipt_code=?",
    values: [step,date, code],
  });
}

const complete = async (req, res) => {
  if (req.method === "PUT") {
    console.log("req.headers.referer");
    console.log(req.headers.referer);
    console.log("req.body");
    console.log(req.body);
    const { step,date, code } = req.body;
    console.log(req.body)
    try {
      const result = await setCompleteDate(step,code, date);
      if (result.error) throw new Error(result.error);
      console.log(result);
      res.status(200).json({ message: "Take" });

    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    } finally {
      res.end();
    }
  }
};

export default complete;