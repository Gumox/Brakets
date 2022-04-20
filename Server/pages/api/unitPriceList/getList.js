import excuteQuery from "../db";

async function getRepairType(brandId) {
  return excuteQuery({
    query: `SELECT * FROM unit_price_list WHERE brand_id = ? `,
    values:[brandId],
  });
}

const controller = async (req, res) => {
  if (req.method === "GET") {
    console.log("/api/unitPriceList/getList");
    try {
      const { 
        
        brandId,
         
      } = req.query;
      const result = await getRepairType(brandId);
      if (result.error) throw new Error(result.error);

      res.status(200).json({ data: result[0] });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default controller;
