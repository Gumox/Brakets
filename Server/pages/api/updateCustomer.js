import excuteQuery from "./db";

/**
 * 0단계 고객 수정
 */

async function updateCustomer(cid, name, phone) {
  return excuteQuery({
    query: "UPDATE customer SET name=?, phone=? WHERE customer_id=?",
    values: [name, phone, cid],
  });
}

const controller = async (req, res) => {
  if (req.method === "POST") {
    console.log(`[${new Date().toISOString()}] /api/updateCustomer`);
    console.log(req.body);

    const { customer_id: cid, name, phone } = req.body;

    if (!cid) return res.status(400).send();

    try {
      const result = await updateCustomer(cid, name, phone);
      if (result.error) throw new Error(result.error);

      if (result["affectedRows"]) {
        console.log("update Custmer");
        //res.json({body});
        res.status(200).json({ customer_id: cid });
      } else {
        console.log("update Customer Fail");
        res.status(400).json({ message: "update Customer Fail" });
      }
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default controller;
