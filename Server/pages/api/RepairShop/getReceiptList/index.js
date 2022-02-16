import excuteQuery from "../../db";
/**
 * 0단계 고객 조회
 */

async function getReceiptList(query,values) {
    const result = await excuteQuery({
        query: `SELECT  receipt.receipt_code,
                        receipt.receipt_date,
                        receipt.receipt_id,
                        receipt.receipt_date,
                        receipt.store_message,
                        receipt.message,
                        store.name AS store_name,
                        store.contact AS store_contact,
                        brand.headquarter_id,
                        brand.brand_name,
                        store.name,
                        product.degree,
                        season_type.season_name,
                        season_type.season_code,
                        style_type.style_code,
                        product.color,
                        product.size,
                        product.degree,
                        mfr.name AS mfr_name,
                        mfr.store_id AS mfr_id,
                        customer.name AS customer_name,
                        customer.phone  AS customer_phone,
                        product.name AS product_name,
                        receipt.image
                FROM receipt 
                LEFT JOIN receipt_detail ON receipt.receipt_id = receipt_detail.receipt_id
                LEFT JOIN product ON product.product_id = receipt.product_id
                LEFT JOIN store ON store.store_id = receipt.store_id
                LEFT JOIN season_type ON season_type.season_id = product.season_id
                LEFT JOIN style_type ON style_type.style_id  = product.style_id 
                LEFT JOIN brand ON brand.brand_id = product.brand_id
                LEFT JOIN store AS mfr ON mfr.store_id = product.mfr_id
                LEFT JOIN customer ON customer.customer_id  =  receipt.customer_id
                WHERE receipt.step = 1 AND receipt.receiver = ? ${query} `,
        values,
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
            shop_id, //  id
            hq_id,
            code
        } = req.query;
        let query = "";
        let values = [shop_id];
        
        if(hq_id){
            query += " AND brand.headquarter_id = ? ";
            values = [...values, hq_id];
        }
        if(code){
            query += " AND receipt.receipt_code = ? ";
            values = [...values, code];
        }

    try {
      const result = await getReceiptList(query, values);
      if (result.error) throw new Error(result.error);
      if (result.length) {
        console.log("List");
        res.status(200).json({ body: result });
      } else {
        console.log("No List");
        res.status(204).json({ message: "No List" });
      }
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default controller;
