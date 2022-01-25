import excuteQuery from "../../db";
/**
 * 0단계 고객 조회
 */

async function getReceiptList(query,values) {
    const result = await excuteQuery({
        query: `SELECT receipt.receipt_code,
                       brand.headquarter_id,
                       brand.brand_name,
                       product.name
                FROM receipt 
                LEFT JOIN receipt_detail ON receipt.receipt_id = receipt_detail.receipt_id
                LEFT JOIN product ON product.product_id = receipt.product_id
                LEFT JOIN brand ON brand.brand_id = product.brand_id
                WHERE receipt.receiver = ? ${query} `,
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
