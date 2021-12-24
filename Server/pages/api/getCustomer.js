import excuteQuery from "./db";

async function getCustomer(name, phone) {
  let query = "SELECT * FROM customer ";

  if (typeof name !== "undefined" && typeof phone !== "undefined")
    query += " WHERE name LIKE '" + name + "' AND phone LIKE '%" + phone + "'";
  else if (typeof name !== "undefined")
    query += " WHERE name LIKE '" + name + "'";
  else if (typeof phone !== "undefined")
    query += " WHERE phone LIKE '%" + phone + "'";

  //console.log("qq" + query);

    return excuteQuery({
      query: query,
      values: [],
    });
}

const controller = async (req, res) => {
  if (req.method === "POST") {
    console.log("req");
    console.log(req.body);

    const name = req.body.name;
    const phone = req.body.lastphone;

    try {
      const result = await getCustomer(name, phone);
      if (result.error) throw new Error(result.error);
      if (result.length) {
        console.log("Custmer List");
        res.status(200).json({ body: result });
      } else {
        console.log("No Customer");
        res.status(204).send();
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).json(err);
    }
  }
};

export default controller;
