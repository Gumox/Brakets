import excuteQuery from "../db";

async function getReceipt(code) {
  const result = await excuteQuery({
    query: `SELECT receipt.receipt_id AS receipt_id,
                    receipt.receipt_code AS receipt_code,
                    receipt.category AS receipt_category,
                    receipt.receipt_date AS receipt_date,
                    receipt.register_date AS register_date,
                    receipt.complete_date AS complete_date,
                    receipt.due_date AS due_date,
                    receipt.store_id AS store_id,
                    receipt.customer_id AS customer_id,
                    receipt.product_id AS product_id,
                    receipt.receipt_type AS receipt_type,
                    receipt.message AS receipt_message,
                    receipt.fault_id AS fault_id,
                    receipt.analysis_id AS analysis_id,
                    receipt.result_id AS result_id,
                    product.season AS product_season,
                    product.style AS product_style,
                    product.color AS product_color,
                    product.size AS product_size, 
                    product.degree AS product_degree,
                    IF(receipt.substitute=0, "N", "Y") AS substitute,
                    receipt.product_code AS product_code,
                    product.image AS product_image,
                    product.release_date AS product_release_date,
                    customer.name AS customer_name,
                    customer.phone AS customer_phone
              FROM receipt 
              JOIN product ON receipt.product_id = product.product_id 
              JOIN customer ON receipt.customer_id = customer.customer_id 
              WHERE receipt_code = ?`,
    values: [code],
  });

  return result;
}

async function getReceiptDetail(id) {
  const result = await excuteQuery({
    query: `SELECT detail_id,
                     pcategory_id,
                     num,
                     send_date,
                     message,
                     charge,
                     receiver      
            FROM receipt_detail WHERE receipt_id = ? 
            ORDER BY num ASC`,
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
    const { code } = req.query;
    try {
      const receipt = await getReceipt(code);
      if (receipt.error) throw new Error(receipt.error);
      if (receipt.length == 0) return res.status(204).send();

      const details = await getReceiptDetail(receipt[0].receipt_id);
      if (details.error) throw new Error(details.error);

      res.status(200).json({ data: { ...receipt[0], details } });
    } catch (err) {
      console.log(err.message);
      res.status(500).json(err);
    }
  }
};

export default receipt;
