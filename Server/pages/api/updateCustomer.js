import excuteQuery from "./db";

async function updateCustomer(cid, name, phone) {
    return excuteQuery({
      query: "UPDATE customer SET name=?, phone=? WHERE customer_id=?",
      values: [name, phone, cid],
    });
}

const controller = async (req, res) => {
  if (req.method === "POST") {
    console.log("req");
    console.log(req.body);
    const cid = req.body.customer_id;
    const name = req.body.name;
    const phone = req.body.phone;

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
        res.status(400).send();
      }
    } catch (err) {
      console.log(err.message);
      res.status(400).json({err: err.message});
    }
  }
};

export default controller;
