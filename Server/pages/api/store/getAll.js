import excuteQuery from "../db";

async function getRepairShop() {
  const result = await excuteQuery({
    query: `SELECT * FROM store`
  });

  return result;
}

const getAllRepairShop = async (req, res) => {
  if (req.method === "GET") {
    console.log("/api/store/getAll");
    try {
      const store = await getRepairShop();
      if (store.error) throw new Error(store.error);

      res.status(200).json({ data: store });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default getAllRepairShop;
