import excuteQuery from "../db";

async function repairTypeRegist(
    repairName,
    repairPrice,
    repairId 
) {
  const result = await excuteQuery({
    query: `UPDATE repair_type 
                SET 
                repair_name = ?,
                repair_price = ? 
            WHERE repair_id = ?`,
    values: [
        repairName,
        repairPrice,
        repairId 
    ],
  });

  return result;
}

const productCategory = async (req, res) => {
  if (req.method === "POST") {
    console.log("/api/type/modifyRepairType");
    console.log("req.body");
    console.log(req.body);
    
    const { 
        repairName,
        repairPrice,
        repairId ,
    } = req.body;

    try {
        const result = await repairTypeRegist( 
                                                repairName,
                                                repairPrice,
                                                repairId 
                                                );
        if (result.error) throw new Error(result.error);
        console.log(result)

        res.status(200).json({ data: result });
    } catch (err) {
        console.log(err.message);
        res.status(400).json({err: err.message});
    }
  }
};

export default productCategory;
