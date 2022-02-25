import excuteQuery from "../db";

async function getRepairType(addQuery,headquarterId) {
  return excuteQuery({
    query: `SELECT repair_id AS value, repair_name AS text,repair_type_code,repair_price,level
              FROM repair_type ${addQuery}`,
    values: [headquarterId],
  });
}

const controller = async (req, res) => {
  if (req.method === "GET") {
    console.log("/api/type/repair");
    try {
      const { headquarterId } = req.query;
      let addQuery ='';
      if(headquarterId){
        addQuery =`WHERE headquarter_id=?`
      }
      const types = await getRepairType(addQuery,headquarterId);
      if (types.error) throw new Error(receipt.error);

      res.status(200).json({ data: types });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default controller;
