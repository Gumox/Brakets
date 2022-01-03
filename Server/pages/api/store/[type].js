import excuteQuery from "../db";

// 매장
async function getStore(type, brandId) {
  const result = await excuteQuery({
    query: `SELECT store_id AS value, name AS text
              FROM store 
              WHERE store_type=? AND brand_id=?`,
    values: [type, brandId],
  });

  return result;
}

// 생산업체
async function getManufacturer(type) {
  const result = await excuteQuery({
    query: `SELECT store_id AS value, name AS text
              FROM store 
              WHERE store_type=?`,
    values: [type],
  });

  return result;
}

const store = async (req, res) => {
  if (req.method === "GET") {
    console.log("/api/store/{type}");
    console.log("req.query");
    console.log(req.query);
    const { type, brandId } = req.query;
    try {
      let stores;
      if(!brandId) stores = await getManufacturer(type);
      else stores = await getStore(type, brandId);
      
      if (stores.error) throw new Error(receipt.error);

      res.status(200).json({ data: stores });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({err: err.message});
    }
  }
};

export default store;
