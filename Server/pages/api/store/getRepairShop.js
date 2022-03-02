import excuteQuery from "../db";

async function getRepairShop() {
  const result = await excuteQuery({
    query: `SELECT
                    store_id AS value,
                    name AS text,
                    store_type,
                    address,
                    contact
            FROM store WHERE store_type = 2 `
  });

  return result;
}

const getAllRepairShop = async (req, res) => {
  if (req.method === "GET") {
    console.log("/api/store/getRepairShop");
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
