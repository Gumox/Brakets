import excuteQuery from "./db";

/**
 * 0단계 고객 등록
 */

async function addCustomer(name, phone) {
  return excuteQuery({
    query:
      "INSERT INTO `customer`(`name`, `phone`) VALUES (?,?)",
    values: [name, phone],
  });
}

const controller = async (req, res) => {
  if (req.method === "POST") {
    console.log(`[${new Date().toISOString()}] /api/addCustomer`);
    console.log(req.body);
    const { name, phone } = req.body;

    try {
      const result = await addCustomer(name, phone);
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
