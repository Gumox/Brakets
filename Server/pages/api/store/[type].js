import excuteQuery from "../db";

async function getStore(type) {
  const result = await excuteQuery({
    query: `SELECT store_id AS value, name AS text
              FROM store 
              WHERE store_type = ?`,
    values: [type],
  });

  return result;
}

const store = async (req, res) => {
  if (req.method === "GET") {
    console.log("/api/store/{type}");
    console.log("req.query");
    console.log(req.query);
    const { type } = req.query;
    try {
      const stores = await getStore(type);
      if (stores.error) throw new Error(receipt.error);

      res.status(200).json({ data: stores });
    } catch (err) {
      console.log(err.message);
      res.status(500).json(err);
    }
  }
};

export default store;
