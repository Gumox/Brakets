import excuteQuery from "../../db";
import _ from 'lodash'
async function getReceiptList(query,values) {
    const result = await excuteQuery({
        query: `SELECT  receipt.receipt_code,
                        receipt.receipt_date,
                        receipt.receipt_id,
                        receipt.store_message,
                        receipt.message,
                        repair_detail.message AS repair_message,
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
                        customer.name AS customer_name,
                        customer.phone  AS customer_phone,
                        product.name AS product_name,
                        receipt.image,

                        repair1_detail.store_id AS repair1_store_id,
                        repair1_detail_store.name AS repair1_store_name,
                        repair1_detail.cashreceipt_num AS repair1_cashreceipt_num,
                        repair1_detail.repair_detail_id  AS repair1_detail_repair_detail_id ,
                        repair1_detail.fault_id AS repair1_detail_fault_id,
                        repair1_detail.result_id AS repair1_detail_result_id,
                        repair1_detail.analysis_id AS repair1_detail_analysis_id,
                        repair1_detail.paid AS repair1_paid,
                        repair1_detail.fee AS repair1_fee,
                        repair1_detail.repair1_type_id AS repair1_detail_repair1_type_id,
                        repair1_detail.repair1_price AS repair1_detail_repair1_price,
                        repair1_detail.repair1_count AS repair1_detail_repair1_count,
                        repair1_detail.repair1_redo AS repair1_detail_repair1_redo,
                        repair1_detail.repair2_type_id AS repair1_detail_repair2_type_id,
                        repair1_detail.repair2_price AS repair1_detail_repair2_price,
                        repair1_detail.repair2_count AS repair1_detail_repair2_count,
                        repair1_detail.repair2_redo AS repair1_detail_repair2_redo,
                        repair1_detail.repair3_type_id AS repair1_detail_repair3_type_id,
                        repair1_detail.repair3_price AS repair1_detail_repair3_price,
                        repair1_detail.repair3_count AS repair1_detail_repair3_count,
                        repair1_detail.repair3_redo AS repair1_detail_repair3_redo,
                        repair1_detail.register_date AS repair1_register_date,
                        repair1_detail.send_date AS repair1_send_date,
                        repair1_detail.complete_date AS repair1_complete_date,
                        repair1_detail.shipment_type AS repair1_shipment_type,
                        repair1_detail.shipment_price AS repair1_shipment_price,

                        repair2_detail.store_id AS repair2_store_id,
                        repair2_detail_store.name AS repair2_store_name,
                        repair2_detail.cashreceipt_num AS repair2_cashreceipt_num,
                        repair2_detail.paid AS repair2_paid,
                        repair2_detail.fee AS repair2_fee,
                        repair2_detail.repair_detail_id  AS repair2_detail_repair_detail_id ,
                        repair2_detail.fault_id AS repair2_detail_fault_id,
                        repair2_detail.result_id AS repair2_detail_result_id,
                        repair2_detail.analysis_id AS repair2_detail_analysis_id,
                        repair2_detail.repair1_type_id AS repair2_detail_repair1_type_id,
                        repair2_detail.repair1_price AS repair2_detail_repair1_price,
                        repair2_detail.repair1_count AS repair2_detail_repair1_count,
                        repair2_detail.repair1_redo AS repair2_detail_repair1_redo,
                        repair2_detail.repair2_type_id AS repair2_detail_repair2_type_id,
                        repair2_detail.repair2_price AS repair2_detail_repair2_price,
                        repair2_detail.repair2_count AS repair2_detail_repair2_count,
                        repair2_detail.repair2_redo AS repair2_detail_repair2_redo,
                        repair2_detail.repair3_type_id AS repair2_detail_repair3_type_id,
                        repair2_detail.repair3_price AS repair2_detail_repair3_price,
                        repair2_detail.repair3_count AS repair2_detail_repair3_count,
                        repair2_detail.repair3_redo AS repair2_detail_repair3_redo,
                        repair2_detail.register_date AS repair2_register_date,
                        repair2_detail.send_date AS repair2_send_date,
                        repair2_detail.complete_date AS repair2_complete_date,
                        repair2_detail.shipment_type AS repair2_shipment_type,
                        repair2_detail.shipment_price AS repair2_shipment_price,

                        repair3_detail.store_id AS repair3_store_id,
                        repair3_detail_store.name AS repair3_store_name,
                        repair3_detail.cashreceipt_num AS repair3_cashreceipt_num,
                        repair3_detail.paid AS repair3_paid,
                        repair3_detail.fee AS repair3_fee,
                        repair3_detail.repair_detail_id  AS repair3_detail_repair_detail_id ,
                        repair3_detail.fault_id AS repair3_detail_fault_id,
                        repair3_detail.result_id AS repair3_detail_result_id,
                        repair3_detail.analysis_id AS repair3_detail_analysis_id,
                        repair3_detail.repair1_type_id AS repair3_detail_repair1_type_id,
                        repair3_detail.repair1_price AS repair3_detail_repair1_price,
                        repair3_detail.repair1_count AS repair3_detail_repair1_count,
                        repair3_detail.repair1_redo AS repair3_detail_repair1_redo,
                        repair3_detail.repair2_type_id AS repair3_detail_repair2_type_id,
                        repair3_detail.repair2_price AS repair3_detail_repair2_price,
                        repair3_detail.repair2_count AS repair3_detail_repair2_count,
                        repair3_detail.repair2_redo AS repair3_detail_repair2_redo,
                        repair3_detail.repair3_type_id AS repair3_detail_repair3_type_id,
                        repair3_detail.repair3_price AS repair3_detail_repair3_price,
                        repair3_detail.repair3_count AS repair3_detail_repair3_count,
                        repair3_detail.repair3_redo AS repair2_detail_repair3_redo,
                        repair3_detail.register_date AS repair3_register_date,
                        repair3_detail.send_date AS repair3_send_date,
                        repair3_detail.complete_date AS repair3_complete_date,
                        repair3_detail.shipment_type AS repair3_shipment_type,
                        repair3_detail.shipment_price AS repair3_shipment_price,

                        repair1_fault.fault_name AS repair1_fault_name,
                        repair1_result.judgment_name AS repair1_result_name,
                        repair1_analysis.analysis_name AS repair1_analysis_name,

                        repair2_fault.fault_name AS repair2_fault_name,
                        repair2_result.judgment_name AS repair2_result_name,
                        repair2_analysis.analysis_name AS repair2_analysis_name,
                        
                        repair3_fault.fault_name AS repair3_fault_name,
                        repair3_result.judgment_name AS repair3_result_name,
                        repair3_analysis.analysis_name AS repair3_analysis_name
                FROM repair_detail 
                LEFT JOIN receipt ON repair_detail.receipt_id = receipt.receipt_id
                LEFT JOIN receipt_detail ON receipt.receipt_id = receipt_detail.receipt_id
                LEFT JOIN product ON product.product_id = receipt.product_id
                LEFT JOIN brand ON product.brand_id  = brand.brand_id 
                LEFT JOIN store AS headquarter_store ON headquarter_store.brand_id  = brand.headquarter_id 
                LEFT JOIN store ON store.store_id = receipt.store_id
                LEFT JOIN season_type ON season_type.season_id = product.season_id
                LEFT JOIN style_type ON style_type.style_id  = product.style_id 
                LEFT JOIN store AS mfr ON mfr.store_id = product.mfr_id
                LEFT JOIN customer ON customer.customer_id  =  receipt.customer_id
                LEFT JOIN repair_detail AS repair1_detail ON repair1_detail.repair_detail_id = receipt.repair1_detail_id
                LEFT JOIN repair_detail AS repair2_detail ON repair2_detail.repair_detail_id = receipt.repair2_detail_id
                LEFT JOIN repair_detail AS repair3_detail ON repair3_detail.repair_detail_id = receipt.repair3_detail_id
                LEFT JOIN store AS repair1_detail_store ON repair1_detail.store_id = repair1_detail_store.store_id
                LEFT JOIN store AS repair2_detail_store ON repair2_detail.store_id = repair2_detail_store.store_id
                LEFT JOIN store AS repair3_detail_store ON repair3_detail.store_id = repair3_detail_store.store_id

                LEFT JOIN fault_type AS repair1_fault ON repair1_fault.fault_id = repair1_detail.fault_id 
                LEFT JOIN judgment_result AS repair1_result ON repair1_result.judgment_result_id  = repair1_detail.result_id 
                LEFT JOIN analysis_type AS repair1_analysis ON repair1_analysis.analysis_id = repair1_detail.analysis_id 
                
                LEFT JOIN fault_type AS repair2_fault ON repair2_fault.fault_id = repair2_detail.fault_id 
                LEFT JOIN judgment_result AS repair2_result ON repair2_result.judgment_result_id  = repair2_detail.result_id 
                LEFT JOIN analysis_type AS repair2_analysis ON repair2_analysis.analysis_id = repair2_detail.analysis_id 
                
                LEFT JOIN fault_type AS repair3_fault ON repair3_fault.fault_id = repair3_detail.fault_id 
                LEFT JOIN judgment_result AS repair3_result ON repair3_result.judgment_result_id  = repair3_detail.result_id 
                LEFT JOIN analysis_type AS repair3_analysis ON repair3_analysis.analysis_id = repair3_detail.analysis_id 

                WHERE  receipt.step > 0   ${query} 
                ORDER BY receipt.receipt_date ASC`,
        values,
      });
      console.log("is here")
      console.log(query)
    
      console.log(values)
      console.log(result)
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
            brand,
            code,
            startDate,
            endDate,
            dateOption
        } = req.query;
        let query = "";
        let values = [];

        if(shop_id){
          query += " AND repair_detail.store_id = ? ";
          values = [...values, shop_id];
        }

        if(hq_id){
          query += " AND brand.headquarter_id = ? ";
          values = [...values, hq_id];
        }
        
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