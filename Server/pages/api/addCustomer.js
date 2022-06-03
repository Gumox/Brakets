import excuteQuery from "./db";


async function addCustomer(headquarterId,name, phone) {
  return excuteQuery({
    query:
      "INSERT INTO customer(headquarter_id,name, phone) VALUES (?,?,?)",
    values: [headquarterId,name, phone],
  });
}

const controller = async (req, res) => {
  if (req.method === "POST") {
    console.log(`[${new Date().toISOString()}] /api/addCustomer`);
    console.log(req.body);
    const {headquarterId, name, phone } = req.body;

    try {
      const result = await addCustomer(headquarterId,name, phone);
      if (result.error) throw new Error(result.error);
      if (result["affectedRows"]) {
        console.log("add Custmer");
        res.status(200).json({ customer_id: result["insertId"] });
      } else {
        console.log("add Customer Fail");
        res.status(400).json({message: "add Customer Fail"});
      }
    } catch (err) {
      console.log(err.message);
      res.status(400).json({err: err.message});
    }
  }
};

export default controller;
