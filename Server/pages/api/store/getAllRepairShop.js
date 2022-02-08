import excuteQuery from "../db";

async function getRepairShop() {
  const result = await excuteQuery({
    query: `SELECT * FROM store WHERE brand_id IS null `
  });

  return result;
}

const getAllRepairShop = async (req, res) => {
  if (req.method === "GET") {
    console.log("/api/store/getAllRepairShop");
    try {
      const brand = await getRepairShop();
      if (brand.error) throw new Error(brand.error);

      res.status(200).json({ data: brand });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default getAllRepairShop;
