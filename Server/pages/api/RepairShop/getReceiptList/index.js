import excuteQuery from "../../db";

 async function getNeedImageList(List) {
  let results=[]
  for (let data of List) {
    const result = await excuteQuery({
      query: `SELECT * 
              FROM repair_need_point
              WHERE receipt_id = ?`,
      values: [data.receipt_id],
    });
    if(result.error){
      return result.error
    }else{
        results.push(result)
    }
  }
  return results;
}
async function getReceiptList(query,values) {
    const result = await excuteQuery({
        query: `SELECT  receipt.receipt_code,
                        receipt.receipt_date,
                        receipt.receipt_id,
                        receipt.receipt_date,
                        receipt.store_message,
                        receipt.message,
                        receipt.store_id,
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
                        product.brand_id,
                        mfr.name AS mfr_name,
                        mfr.store_id AS mfr_id,
                        customer.name AS customer_name,
                        customer.phone  AS customer_phone,
                        product.name AS product_name,
                        repair1.store_id AS repair1_store_id,
                        repair1.result_id AS repair1_result_id,
                        repair1_result.judgment_name AS repair1_result_name,
                        repair1.fault_id AS repair1_fault_id,
                        repair1.analysis_id AS repair1_analysis_id,
                        repair2.store_id AS repair2_store_id,
                        repair2.result_id AS repair2_result_id,
                        repair2_result.judgment_name AS repair2_result_name,
                        repair2.fault_id AS repair2_fault_id,
                        repair2.analysis_id AS repair2_analysis_id,
                        repair3.store_id AS repair3_store_id,
                        repair3.result_id AS repair3_result_id,
                        repair3_result.judgment_name AS repair3_result_name,
                        repair3.fault_id AS repair3_fault_id,
                        repair3.analysis_id AS repair3_analysis_id,
                        receipt.repair1_detail_id,
                        receipt.repair2_detail_id,
                        receipt.repair3_detail_id,
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
                LEFT JOIN repair_detail AS repair1 ON receipt.repair1_detail_id = repair1.repair_detail_id
                LEFT JOIN store AS repair1_store ON repair1.store_id = repair1_store.store_id
                LEFT JOIN repair_detail AS repair2 ON receipt.repair2_detail_id = repair2.repair_detail_id
                LEFT JOIN store AS repair2_store ON repair2.store_id = repair2_store.store_id
                LEFT JOIN repair_detail AS repair3 ON receipt.repair3_detail_id = repair3.repair_detail_id
                LEFT JOIN store AS repair3_store ON repair3.store_id = repair3_store.store_id
                LEFT JOIN judgment_result AS repair1_result ON repair1_result.judgment_result_id  = repair1.result_id
                LEFT JOIN judgment_result AS repair2_result ON repair2_result.judgment_result_id  = repair2.result_id
                LEFT JOIN judgment_result AS repair3_result ON repair3_result.judgment_result_id  = repair3.result_id
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
        let  needImages = await getNeedImageList(result)
        
        res.status(200).json({ body: result ,needImages : needImages});
      } else {
        console.log("No List");
        res.status(200).json({body: result ,needImages : []});
      }
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default controller;
