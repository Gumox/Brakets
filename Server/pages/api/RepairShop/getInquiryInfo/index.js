import excuteQuery from "../../db";
import _ from 'lodash'
async function getReceiptList(query,values) {
    const result = await excuteQuery({
        query: `SELECT  receipt.receipt_code,
                        receipt.receipt_date,
                        receipt.receipt_id,
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
                        receipt.image,
                        repair1_detail.store_id AS repair1_store_id, 
                        repair1_detail.repair_detail_id  AS repair1_detail_repair_detail_id ,
                        repair1_detail.fault_id AS repair1_detail_fault_id,
                        repair1_detail.result_id AS repair1_detail_result_id,
                        repair1_detail.analysis_id AS repair1_detail_analysis_id,
                        repair1_detail.repair1_type_id AS repair1_detail_repair1_type_id,
                        repair1_detail.repair1_price AS repair1_detail_repair1_price,
                        repair1_detail.repair2_type_id AS repair1_detail_repair2_type_id,
                        repair1_detail.repair2_price AS repair1_detail_repair2_price,
                        repair1_detail.repair3_type_id AS repair1_detail_repair3_type_id,
                        repair1_detail.repair3_price AS repair1_detail_repair3_price,
                        repair1_detail.register_date AS repair1_register_date,
                        repair1_detail.send_date AS repair1_send_date, 
                        repair2_detail.store_id AS repair2_store_id,
                        repair2_detail.repair_detail_id  AS repair2_detail_repair_detail_id ,
                        repair2_detail.fault_id AS repair2_detail_fault_id,
                        repair2_detail.result_id AS repair2_detail_result_id,
                        repair2_detail.analysis_id AS repair2_detail_analysis_id,
                        repair2_detail.repair1_type_id AS repair2_detail_repair1_type_id,
                        repair2_detail.repair1_price AS repair2_detail_repair1_price,
                        repair2_detail.repair2_type_id AS repair2_detail_repair2_type_id,
                        repair2_detail.repair2_price AS repair2_detail_repair2_price,
                        repair2_detail.repair3_type_id AS repair2_detail_repair3_type_id,
                        repair2_detail.repair3_price AS repair2_detail_repair3_price,
                        repair2_detail.register_date AS repair2_register_date,
                        repair2_detail.send_date AS repair2_send_date,
                        repair3_detail.store_id AS repair3_store_id,
                        repair3_detail.repair_detail_id  AS repair3_detail_repair_detail_id ,
                        repair3_detail.fault_id AS repair3_detail_fault_id,
                        repair3_detail.result_id AS repair3_detail_result_id,
                        repair3_detail.analysis_id AS repair3_detail_analysis_id,
                        repair3_detail.repair1_type_id AS repair3_detail_repair1_type_id,
                        repair3_detail.repair1_price AS repair3_detail_repair1_price,
                        repair3_detail.repair2_type_id AS repair3_detail_repair2_type_id,
                        repair3_detail.repair2_price AS repair3_detail_repair2_price,
                        repair3_detail.repair3_type_id AS repair3_detail_repair3_type_id,
                        repair3_detail.repair3_price AS repair3_detail_repair3_price,
                        repair3_detail.register_date AS repair3_register_date,
                        repair3_detail.send_date AS repair3_send_date 
                FROM repair_detail 
                LEFT JOIN receipt ON repair_detail.receipt_id = receipt.receipt_id
                LEFT JOIN receipt_detail ON receipt.receipt_id = receipt_detail.receipt_id
                LEFT JOIN product ON product.product_id = receipt.product_id
                LEFT JOIN store ON store.store_id = receipt.store_id
                LEFT JOIN season_type ON season_type.season_id = product.season_id
                LEFT JOIN style_type ON style_type.style_id  = product.style_id 
                LEFT JOIN brand ON brand.brand_id = product.brand_id
                LEFT JOIN store AS mfr ON mfr.store_id = product.mfr_id
                LEFT JOIN customer ON customer.customer_id  =  receipt.customer_id
                LEFT JOIN repair_detail AS repair1_detail ON repair1_detail.repair_detail_id = receipt.repair1_detail_id
                LEFT JOIN repair_detail AS repair2_detail ON repair2_detail.repair_detail_id = receipt.repair2_detail_id
                LEFT JOIN repair_detail AS repair3_detail ON repair3_detail.repair_detail_id = receipt.repair3_detail_id
                WHERE repair_detail.store_id = ? ${query} `,
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
        }  

    try {
      const result = await getReceiptList(query, values);
      if (result.error) throw new Error(result.error);
      if (result.length) {
        console.log("List");
        const _result = _.uniqBy(result,"receipt_code") 
        res.status(200).json({ body: _.sortBy(_result,"receipt_code")});
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