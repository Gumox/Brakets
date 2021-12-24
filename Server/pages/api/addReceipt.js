import excuteQuery from "./db";

async function addReceipt(
  store,
  staff,
  customer,
  category,
  pid,
  pcode,
  substitute,
  mfrid
) {
  return excuteQuery({
    query:
      "INSERT INTO `receipt`(`store_id`, `staff_id`, `customer_id`,`category`, `product_id`, `product_code`, `substitute`, `mfr_id`) VALUES (?,?,?,?,?,?,?,?)",
    values: [store, staff, customer, category, pid, pcode, substitute, mfrid],
  });
}

const controller = async (req, res) => {
  if (req.method === "POST") {
    console.log("req");
    console.log(req.body);
    const store = req.body.store;
    const staff = req.body.staff;
    const customer = req.body.customer;
    const category = req.body.category;
    const pid = req.body.pid;
    const pcode = req.body.pcode;
    const substitute = req.body.substitute || 0;
    const mfrid = req.body.mfrid;

    try {
      const results = await addReceipt(
        store,
        staff,
        customer,
        category,
        pid,
        pcode,
        substitute,
        mfrid
      );
      if (results.error) throw new Error(results.error);
      if (results["affectedRows"]) {
        console.log("add Receipt (step 2)");
        res.status(200).json({ receipt_id: results["insertId"] });
      } else {
        console.log("add Receipt (step2) failed");
        res.status(400).send();
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).json(err);
    }
  }
};

export default controller;
