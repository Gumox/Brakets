import excuteQuery from "../db";

async function getRepairType() {
  return excuteQuery({
    query: `SELECT repair_id AS value, repair_name AS text
              FROM repair_type `,
  });
}

const controller = async (req, res) => {
  if (req.method === "GET") {
    console.log("/api/type/repair");
    try {
      const types = await getRepairType();
      if (types.error) throw new Error(receipt.error);

      res.status(200).json({ data: types });
    } catch (err) {
      console.log(err.message);
      res.status(500).json(err);
    }
  }
};

export default controller;
