import excuteQuery from "../db";

async function getReceipt(code) {
  const result = await excuteQuery({
    query: `SELECT receipt.*,
                            receipt.receipt_id AS receipt_id,
                            receipt.receipt_code AS receipt_code,
                            receipt.category AS receipt_category,
                            receipt.store_id AS store_id,
                            receipt.customer_id AS customer_id,
                            receipt.product_id AS product_id,
                            receipt.receipt_type AS receipt_type,
                            product.season AS product_season,
                            product.color AS product_color,
                            product.size AS product_size, 
                            product.degree AS product_degree,
                            product.qrcode AS product_qrcode,  
                            product.image AS product_image,
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
                     repair_id,
                     num,
                     send_date,
                     message,
                     charge        
            FROM receipt_detail WHERE receipt_id = ?
            ORDER BY num ASC`,
    values: [id],
  });

  return result;
}

const receipt = async (req, res) => {
  if (req.method === "GET") {
    console.log("req.headers");
    console.log(req.headers);
    console.log("req.query");
    console.log(req.query);
    const { code } = req.query;
    try {
      const receipt = await getReceipt(code);
      if (receipt.error) throw new Error(receipt.error);
      if (receipt.length == 0) return res.status(204).send();
      console.log(receipt);
      const details = await getReceiptDetail(receipt[0].receipt_id);
      if (details.error) throw new Error(details.error);
      res.status(200).json({ data: { ...receipt[0], details } });
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

export default receipt;
