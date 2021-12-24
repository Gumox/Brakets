import excuteQuery from "../../db";

async function getRepairDetails(id) {
  const repairs = await excuteQuery({
    query: `SELECT detail_id, repair_detail_id, DATE_FORMAT(send_date, '%Y-%m-%d %H:%i:%s') AS send_date, receiver AS store_id  
            FROM receipt_detail 
            WHERE receipt_id = ? AND receiver_type = 2
            ORDER BY num ASC`,
    values: [id],
  });

  if (repairs.length == 0) return [];

  const querying = repairs.map((repair) => {
    const repairId = repair.repair_detail_id;
    if (!repairId) return repair;

    return excuteQuery({
      query: `SELECT repair_detail_id, 
                        store_id,
                        DATE_FORMAT(register_date, '%Y-%m-%d %H:%i:%s') AS register_date,
                        delivery_type,
                        fault_id,
                        result_id,
                        analysis_id,
                        message,
                        repair1_type_id,
                        repair1_count,
                        repair1_price,
                        repair2_type_id,
                        repair2_count,
                        repair2_price,
                        repair3_type_id, 
                        repair3_count,
                        repair3_price,
                        DATE_FORMAT(complete_date, '%Y-%m-%d %H:%i:%s') AS complete_date,   
                        shipment_type,
                        shipment_price
                FROM repair_detail 
                WHERE repair_detail_id = ?`,
      values: [repairId],
    });
  });

  const results = await Promise.all(querying);

  return repairs.map((repair, index) => {
    if (!results[index].length || results[index].length == 0) return repair;
    const detail = results[index][0];
    return {
      ...repair,
      ...detail,
      total:
        detail.repair1_price +
        detail.repair2_price +
        detail.repair3_price +
        detail.shipment_price,
    };
  });
}

const receipt = async (req, res) => {
  if (req.method === "GET") {
    console.log("req.headers.referer");
    console.log(req.headers.referer);
    console.log("req.query");
    console.log(req.query);
    const { id } = req.query;
    try {
      const repairs = await getRepairDetails(id);
      res.status(200).json({ data: repairs });
    } catch (err) {
      console.log(err.message);
      res.status(500).json(err);
    }
  }
};

export default receipt;
