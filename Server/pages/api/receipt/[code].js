import excuteQuery from "../db";

async function getReceipt(code) {
  const result = await excuteQuery({
    query: `SELECT receipt.receipt_id AS receipt_id,
                    receipt.receipt_code AS receipt_code,
                    receipt.category AS receipt_category,
                    receipt.receipt_type AS receipt_type,
                    receipt.store_id AS store_id,
                    receipt.customer_id AS customer_id,
                    receipt.pcategory_id AS pcategory_id,
                    receipt.product_id AS product_id,
                    receipt.product_code AS product_code,
                    IF(receipt.substitute=0, "N", "Y") AS substitute,
                    receipt.mfr_id AS manufacturer_id,
                    mfr_store.store_code AS manufacturer_code,
                    mfr_store.name AS manufacturer_name,
                    receipt.store_message AS store_message,
                    receipt.receipt_date AS receipt_date,
                    receipt.due_date AS due_date,
                    receipt.register_date AS register_date,
                    receipt.complete_date AS complete_date,
                    receipt.received_date AS received_date,
                    receipt.fault_id AS fault_id,
                    receipt.result_id AS result_id,
                    receipt.analysis_id AS analysis_id,
                    receipt.message AS receipt_message,
                    receipt.freecharge AS freecharge,
                    receipt.charge AS charge,
                    receipt.cashreceipt_num AS cashreceipt_num,
                    product.season AS product_season,
                    product.style AS product_style,
                    product.color AS product_color,
                    product.size AS product_size, 
                    product.degree AS product_degree,
                    product.image AS product_image,
                    product.release_date AS product_release_date,
                    customer.name AS customer_name,
                    customer.phone AS customer_phone,
                    receipt.repair1_detail_id,
                    repair1.store_id AS repair1_store_id,
                    DATE_FORMAT(repair1.send_date, '%Y-%m-%d %H:%i:%s') AS repair1_send_date,  
                    DATE_FORMAT(repair1.register_date, '%Y-%m-%d %H:%i:%s') AS repair1_register_date,  
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
                    DATE_FORMAT(repair1.complete_date, '%Y-%m-%d %H:%i:%s') AS repair1_complete_date,  
                    (repair1.repair1_price + repair1.repair2_price + repair1.repair3_price) AS repair1_total,
                    repair1.shipment_type AS repair1_shipment_type,
                    repair1.shipment_price AS repair1_shipment_price,
                    receipt.repair2_detail_id,
                    repair2.store_id AS repair2_store_id,
                    DATE_FORMAT(repair2.send_date, '%Y-%m-%d %H:%i:%s') AS repair2_send_date,  
                    DATE_FORMAT(repair2.register_date, '%Y-%m-%d %H:%i:%s') AS repair2_register_date,  
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
                    DATE_FORMAT(repair2.complete_date, '%Y-%m-%d %H:%i:%s') AS repair2_complete_date,  
                    (repair2.repair1_price + repair2.repair2_price + repair2.repair3_price) AS repair2_total,
                    repair2.shipment_type AS repair2_shipment_type,
                    repair2.shipment_price AS repair2_shipment_price,
                    receipt.repair3_detail_id,
                    repair3.store_id AS repair3_store_id,
                    DATE_FORMAT(repair3.send_date, '%Y-%m-%d %H:%i:%s') AS repair3_send_date,  
                    DATE_FORMAT(repair3.register_date, '%Y-%m-%d %H:%i:%s') AS repair3_register_date,  
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
                    DATE_FORMAT(repair3.complete_date, '%Y-%m-%d %H:%i:%s') AS repair3_complete_date,  
                    (repair3.repair1_price + repair3.repair2_price + repair3.repair3_price) AS repair3_total,
                    repair3.shipment_type AS repair3_shipment_type,
                    repair3.shipment_price AS repair3_shipment_price,
                    receipt.mfr_detail_id,
                    mfr.store_id AS mfr_store_id,
                    DATE_FORMAT(mfr.send_date, '%Y-%m-%d %H:%i:%s') AS mfr_send_date,  
                    DATE_FORMAT(mfr.register_date, '%Y-%m-%d %H:%i:%s') AS mfr_register_date,  
                    IF(mfr.substitute=0, "N", "Y") AS mfr_substitute,
                    mfr.message AS mfr_message,
                    mfr.redo AS mfr_redo,
                    DATE_FORMAT(mfr.complete_date, '%Y-%m-%d %H:%i:%s') AS mfr_complete_date,
                    receipt.image  
              FROM receipt 
              LEFT JOIN product ON receipt.product_id = product.product_id 
              LEFT JOIN customer ON receipt.customer_id = customer.customer_id 
              LEFT JOIN store AS mfr_store ON receipt.mfr_id = mfr_store.store_id
              LEFT JOIN repair_detail AS repair1 ON receipt.repair1_detail_id = repair1.repair_detail_id
              LEFT JOIN repair_detail AS repair2 ON receipt.repair2_detail_id = repair2.repair_detail_id
              LEFT JOIN repair_detail AS repair3 ON receipt.repair3_detail_id = repair3.repair_detail_id
              LEFT JOIN mfr_detail AS mfr ON receipt.mfr_detail_id = mfr.mfr_detail_id
              WHERE receipt.receipt_code = ?`,
    values: [code],
  });

  return result;
}

const receipt = async (req, res) => {
  if (req.method === "GET") {
    console.log("req.headers.referer");
    console.log(req.headers.referer);
    console.log("req.query");
    console.log(req.query);
    const { code } = req.query;
    try {
      const receipt = await getReceipt(code);
      if (receipt.error) throw new Error(receipt.error);
      if (receipt.length == 0) return res.status(204).send();

      res.status(200).json({ data: { ...receipt[0]} });
    } catch (err) {
      console.log(err.message);
      res.status(400).json(err);
    }
  }
};

export default receipt;
