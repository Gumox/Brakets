import excuteQuery from "../db";

async function getReceipt() {
  const result = await excuteQuery({
    query: `SELECT receipt.receipt_id AS receipt_id,
                    receipt.receipt_code AS receipt_code,
                    receipt.store_id AS store_id,
                    store.name AS store_name,
                    store.store_type AS store_type,
                    store.contact AS store_contact,
                    receipt.receipt_date AS receipt_date,
                    receipt.customer_id AS customer_id,
                    customer.phone AS customer_phone,
                    product.season AS product_season,
                    product.degree AS product_degree,
                    product.color AS product_color,
                    product.size AS product_size, 
                    receipt.receipt_type AS receipt_type
            FROM receipt 
            JOIN store ON receipt.store_id = store.store_id 
            JOIN product ON receipt.product_id = product.product_id 
            JOIN customer ON receipt.customer_id = customer.customer_id `,
  });

  return result;
}

const receipt = async (req, res) => {
  if (req.method === "GET") {
    console.log("req.headers.referer");
    console.log(req.headers.referer);
    console.log("req.query");
    console.log(req.query);
    try {
      const receipt = await getReceipt();
      if (receipt.error) throw new Error(receipt.error);
      res.status(200).json({ data: receipt });
    } catch (err) {
      console.log(err.message);
      res.status(500).json(err);
    }
  }
};

export default receipt;
