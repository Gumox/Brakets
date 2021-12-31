import excuteQuery from "./db";

async function addCustomer(name, phone, sms, clause) {
  return excuteQuery({
    query:
      "INSERT INTO `customer`(`name`, `phone`, `sms`, `clause`) VALUES (?,?,?,?)",
    values: [name, phone, sms, clause],
  });
}

const controller = async (req, res) => {
  if (req.method === "POST") {
    console.log("req");
    console.log(req.body);
    const name = req.body.name;
    const phone = req.body.phone;
    const sms = req.body.sms;
    const clause = req.body.clause;

    try {
      const result = await addCustomer(name, phone, sms, clause);
      if (result.error) throw new Error(result.error);
      if (result["affectedRows"]) {
        console.log("add Custmer");
        //res.json({body});
        res.status(200).json({ customer_id: result["insertId"] });
      } else {
        console.log("add Customer Fail");
        res.status(400).send();
      }
    } catch (err) {
      console.log(err.message);
      res.status(400).json({err: err.message});
    }
  }
};

export default controller;
