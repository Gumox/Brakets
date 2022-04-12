import excuteQuery from "../../db";

async function getReceiptList(receipt_id) {
    const result = await excuteQuery({
        query: `SELECT  
                    receipt.repair1_detail_id,
                    receipt.fee,
                    repair1_store.name AS repair1_store_name,
                    repair1.store_id AS repair1_store_id,
                    repair1.delivery_type AS repair1_delivery_type,
                    repair1.fault_id AS repair1_fault_id,
                    repair1.result_id AS repair1_result_id,
                    repair1.analysis_id AS repair1_analysis_id,
                    repair1.message AS repair1_message,
                    repair1.repair1_type_id AS repair1_repair1_type_id,
                    repair1.repair1_count AS repair1_repair1_count,
                    repair1.repair1_price AS repair1_repair1_price,
                    repair1.repair1_redo AS repair1_repair1_redo,
                    repair1.repair2_type_id AS repair1_repair2_type_id,
                    repair1.repair2_count AS repair1_repair2_count,
                    repair1.repair2_price AS repair1_repair2_price,
                    repair1.repair2_redo AS repair1_repair2_redo,
                    repair1.repair3_type_id AS repair1_repair3_type_id,
                    repair1.repair3_count AS repair1_repair3_count,
                    repair1.repair3_price AS repair1_repair3_price,
                    repair1.repair3_redo AS repair1_repair3_redo,
                    repair1.shipment_type AS repair1_shipment_type,
                    repair1.paid AS repair1_paid,
                    repair1.fee AS repair1_fee, 
                    repair1.cashreceipt_num AS repair1_cashreceipt_num,
                    receipt.repair2_detail_id,
                    repair2_store.name AS repair2_store_name,
                    repair2.store_id AS repair2_store_id,
                    repair2.delivery_type AS repair2_delivery_type,
                    repair2.fault_id AS repair2_fault_id,
                    repair2.result_id AS repair2_result_id,
                    repair2.analysis_id AS repair2_analysis_id,
                    repair2.message AS repair2_message,
                    repair2.repair1_type_id AS repair2_repair1_type_id,
                    repair2.repair1_count AS repair2_repair1_count,
                    repair2.repair1_price AS repair2_repair1_price,
                    repair2.repair1_redo AS repair2_repair1_redo,
                    repair2.repair2_type_id AS repair2_repair2_type_id,
                    repair2.repair2_count AS repair2_repair2_count,
                    repair2.repair2_price AS repair2_repair2_price,
                    repair2.repair2_redo AS repair2_repair2_redo,
                    repair2.repair3_type_id AS repair2_repair3_type_id,
                    repair2.repair3_count AS repair2_repair3_count,
                    repair2.repair3_price AS repair2_repair3_price,
                    repair2.repair3_redo AS repair2_repair3_redo,
                    repair2.shipment_type AS repair2_shipment_type,
                    repair2.paid AS repair2_paid,
                    repair2.fee AS repair2_fee, 
                    repair2.cashreceipt_num AS repair2_cashreceipt_num,
                    receipt.repair3_detail_id,
                    repair3_store.name AS repair3_store_name,
                    repair3.store_id AS repair3_store_id,
                    repair3.delivery_type AS repair3_delivery_type,
                    repair3.fault_id AS repair3_fault_id,
                    repair3.result_id AS repair3_result_id,
                    repair3.analysis_id AS repair3_analysis_id,
                    repair3.message AS repair3_message,
                    repair3.repair1_type_id AS repair3_repair1_type_id,
                    repair3.repair1_count AS repair3_repair1_count,
                    repair3.repair1_price AS repair3_repair1_price,
                    repair3.repair1_redo AS repair3_repair1_redo,
                    repair3.repair2_type_id AS repair3_repair2_type_id,
                    repair3.repair2_count AS repair3_repair2_count,
                    repair3.repair2_price AS repair3_repair2_price,
                    repair3.repair2_redo AS repair3_repair2_redo,
                    repair3.repair3_type_id AS repair3_repair3_type_id,
                    repair3.repair3_count AS repair3_repair3_count,
                    repair3.repair3_price AS repair3_repair3_price,
                    repair3.repair3_redo AS repair3_repair3_redo,
                    repair3.shipment_type AS repair3_shipment_type,
                    repair3.paid AS repair3_paid,
                    repair3.fee AS repair3_fee, 
                    repair3.cashreceipt_num AS repair3_cashreceipt_num,
                    receipt.mfr_detail_id,
                    mfr_store.name AS manufacturer_name,
                    mfr.store_id AS mfr_store_id,
                    IF(mfr.substitute=0, "N", "Y") AS mfr_substitute,
                    mfr.message AS mfr_message
                FROM receipt 
                LEFT JOIN repair_detail AS repair1 ON receipt.repair1_detail_id = repair1.repair_detail_id
                LEFT JOIN store AS repair1_store ON repair1.store_id = repair1_store.store_id
                LEFT JOIN repair_detail AS repair2 ON receipt.repair2_detail_id = repair2.repair_detail_id
                LEFT JOIN store AS repair2_store ON repair2.store_id = repair2_store.store_id
                LEFT JOIN repair_detail AS repair3 ON receipt.repair3_detail_id = repair3.repair_detail_id
                LEFT JOIN store AS repair3_store ON repair3.store_id = repair3_store.store_id
                LEFT JOIN mfr_detail AS mfr ON receipt.mfr_detail_id = mfr.mfr_detail_id
                LEFT JOIN store AS mfr_store ON receipt.mfr_id = mfr_store.store_id
                WHERE receipt.step = 1 AND receipt.receipt_id = ?  `,
        values:[receipt_id],
      });
      
      return result;
}

const controller = async (req, res) => {
    if (req.method === "GET") {
        console.log("req.headers.referer");
        console.log(req.headers.referer);
        console.log("req.query");
        console.log(req.query);
        
        const {
            receipt_id
        } = req.query;
        
        

    try {
      const result = await getReceiptList(receipt_id);
      if (result.error) throw new Error(result.error);
      res.status(200).json({ body: result });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default controller;
