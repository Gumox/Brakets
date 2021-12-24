import excuteQuery from "../db";

async function getReceipt(id) {
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
                    mfr.store_code AS manufacturer_code,
                    mfr.name AS manufacturer_name,
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
                    customer.phone AS customer_phone
              FROM receipt 
              LEFT JOIN product ON receipt.product_id = product.product_id 
              LEFT JOIN customer ON receipt.customer_id = customer.customer_id 
              LEFT JOIN store AS mfr ON receipt.mfr_id = mfr.store_id
              WHERE receipt_id = ?`,
    values: [id],
  });

  return result;
}

const receipt = async (req, res) => {
  if (req.method === "GET") {
    console.log("req.headers.referer");
    console.log(req.headers.referer);
    console.log("req.query");
    console.log(req.query);
    const { id } = req.query;
    try {
      const receipt = await getReceipt(id);
      if (receipt.error) throw new Error(receipt.error);
      if (receipt.length == 0) return res.status(204).send();

      res.status(200).json({ data: { ...receipt[0]} });
    } catch (err) {
      console.log(err.message);
      res.status(500).json(err);
    }
  }
};

export default receipt;
