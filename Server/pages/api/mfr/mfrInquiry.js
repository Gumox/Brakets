import excuteQuery from "../db";
import _ from 'lodash'
async function getReceiptList(query,values) {
    const result = await excuteQuery({
        query: `SELECT  receipt.receipt_code,
                        receipt.receipt_date,
                        receipt.receipt_id,
                        receipt.store_message,
                        receipt.message,
                        headquarter_store.store_id AS headquarter_store_id,
                        headquarter_store.name AS headquarter_name,
                        store.name AS store_name,
                        store.contact AS store_contact,
                        brand.headquarter_id,
                        brand.brand_name,
                        product.degree,
                        season_type.season_name,
                        season_type.season_code,
                        style_type.style_code,
                        product.color,
                        product.size,
                        product.degree,
                        
                        mfr.name AS mfr_name,
                        mfr.store_id AS mfr_id,
                        mfr_detail.send_date AS mfr_send_date,
                        mfr_detail.register_date AS mfr_register_date,
                        mfr_detail.substitute AS mfr_substitute,
                        mfr_detail.message AS mfr_message,
                        mfr_detail.complete_date AS mfr_complete_date,

                        customer.name AS customer_name,
                        customer.phone  AS customer_phone,
                        product.name AS product_name,
                        receipt.image
                FROM mfr_detail 
                LEFT JOIN receipt ON mfr_detail.receipt_id = receipt.receipt_id
                LEFT JOIN receipt_detail ON receipt.receipt_id = receipt_detail.receipt_id
                LEFT JOIN product ON product.product_id = receipt.product_id
                LEFT JOIN brand ON product.brand_id  = brand.brand_id 
                LEFT JOIN store AS headquarter_store ON headquarter_store.brand_id  = brand.headquarter_id 
                LEFT JOIN store ON store.store_id = receipt.store_id
                LEFT JOIN season_type ON season_type.season_id = product.season_id
                LEFT JOIN style_type ON style_type.style_id  = product.style_id 
                LEFT JOIN store AS mfr ON mfr.store_id = product.mfr_id
                LEFT JOIN customer ON customer.customer_id  =  receipt.customer_id
                WHERE mfr_detail.store_id = ? AND receipt.step > 0  ${query} 
                ORDER BY receipt.receipt_date ASC`,
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
            brand,
            code,
            startDate,
            endDate,
            dateOption
        } = req.query;
        let query = "";
        let values = [shop_id];
        
        if(brand){
            query += " AND brand.brand_id  = ? ";
            values = [...values, brand];
        }
        if(code){
            query += " AND receipt.receipt_code = ? ";
            values = [...values, code];
        }
        if(dateOption ==="receipt_date"){
          if (startDate !== null || endDate !== null) {
              if (startDate) {
              query += ` AND DATE(receipt.receipt_date) > ? `;
              values = [...values, startDate];
              }
              if (endDate) {
              query += ` AND DATE(receipt.receipt_date) <= ? `;
              values = [...values, endDate];
              }
          }
        }else if(dateOption ==="mfr_register_date"){
            if (startDate !== null || endDate !== null) {
                if (startDate) {
                query += ` AND DATE(mfr_detail.register_date) > ? `;
                values = [...values, startDate];
                }
                if (endDate) {
                query += ` AND DATE(mfr_detail.register_date) <= ? `;
                values = [...values, endDate];
                }
            }
        }else if(dateOption ==="mfr_complete_date"){
            if (startDate !== null || endDate !== null) {
                if (startDate) {
                query += ` AND DATE(mfr_detail.complete_date) > ? `;
                values = [...values, startDate];
                }
                if (endDate) {
                query += ` AND DATE(mfr_detail.complete_date) <= ? `;
                values = [...values, endDate];
                }
            }
          } 

    try {
      const result = await getReceiptList(query, values);
      if (result.error) throw new Error(result.error);
      if (result.length) {
        console.log("List");
        res.status(200).json({ body: result});
      } else {
        console.log("No List");
        res.status(200).json({ body: []});
      }
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default controller;