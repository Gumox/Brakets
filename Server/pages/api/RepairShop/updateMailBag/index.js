import excuteQuery from "../../db";

/**
 * 0단계 고객 수정
 */

async function updataccountBag(mailbagCode, receipt_id) {
  return excuteQuery({
    query: "UPDATE receipt_detail SET mailbag=? WHERE receipt_id=?",
    values: [mailbagCode,receipt_id],
  });
}

const insertHistory = async (receipt_id,mailbag_code,to, from) => {
    console.log(receipt_id,mailbag_code,to, from)
    return excuteQuery({
      query:
        "INSERT INTO `mailbag_history`(`receipt_id`, `mailbag_code`,`to_send`,`from_recive`) VALUES (?,?,?,?)",
      values: [receipt_id,mailbag_code,to, from],
    });
  }
const controller = async (req, res) => {
  if (req.method === "POST") {
    console.log(`[${new Date().toISOString()}] /api/RepairShop/updataccountBag`);
    console.log(req.body);

    const to = req.body.to;
    const from = req.body.from;
    const code  = req.body.code;
    const receipt_id  = req.body.receipt_id;
    console.log(to,from,code,receipt_id)

    if (!receipt_id) return res.status(400).send();
    if (!code) return res.status(400).send();
    if (!from) return res.status(400).send();
    if (!to) return res.status(400).send();

    try {
        const historyResult = await insertHistory(receipt_id,code,to, from);
        const result = await updataccountBag(code, receipt_id);
        console.log(result)

        if (historyResult.error) throw new Error(historyResult.error);
        //if (result.error) throw new Error(result.error);

        if (result.affectedRows&&historyResult.insertId) {
            //res.json({body});
            res.status(200).json({ mes: "sucess"});
        } else {
            console.log("update Fail");
            res.status(400).json({ message: "update Fail" });
        }
        } catch (err) {
        console.log(err.message);
        res.status(400).json({ err: err.message });
        }
  }
};

export default controller;
