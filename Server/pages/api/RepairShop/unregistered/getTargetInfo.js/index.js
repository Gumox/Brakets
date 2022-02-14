import excuteQuery from "../../../db";

async function getReceipt(values) {
    const result = await excuteQuery({
        query: `SELECT  receipt.receipt_code,
                        receipt.receipt_id,
                        store.store_id AS store_id,
                        store.name AS store_name,
                        brand.brand_name,
                        brand.brand_id,
                        brand.headquarter_id,
                        receiver.name AS receiver_name,
                        customer.name AS customer_name,
                        customer.customer_id ,
                        receipt.receiver AS receiver_id
                FROM receipt 
                LEFT JOIN store ON store.store_id = receipt.store_id
                LEFT JOIN product ON product.product_id = receipt.product_id
                LEFT JOIN brand ON brand.brand_id = product.brand_id
                LEFT JOIN customer ON customer.customer_id  =  receipt.customer_id
                LEFT JOIN store AS receiver ON receipt.receiver = receiver.store_id 
                WHERE receipt.receipt_code = ?  `,
        values,
      });
    
      return result;
}


const getTargetInfo = async (req, res) => {
  if (req.method === "GET") {
    console.log("/api/RepairShop/unregistered/getTargetInfo");
    const {
        code,
    } = req.query;
    try {
      const result = await getReceipt(code);
      if (result.error) throw new Error(result.error);

      res.status(200).json({ data: result });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default getTargetInfo;
