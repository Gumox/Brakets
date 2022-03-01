import excuteQuery from "../db";

async function codeCheck(code) {
  const result = await excuteQuery({
    query: `SELECT * FROM receipt WHERE receipt_code = ?`,
    values: [code],
  });

  return result;
}

const check = async (req, res) => {
  if (req.method === "GET") {
    console.log("/api/codeCheck");
    try {
        const { code } = req.query;
        const check = await codeCheck(code);
        if (check.error) throw new Error(check.error);
        if(check.length){
            res.status(200).json({ message : true });
        }
        else{
            res.status(200).json({ message : false });
        }
        
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default check;
