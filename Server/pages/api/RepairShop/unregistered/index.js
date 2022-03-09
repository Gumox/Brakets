import excuteQuery from "../../db";

async function getReceipt(query,values) {
    const result = await excuteQuery({
        query: `SELECT  
                        return_unregistered.return_id ,
                        receipt.receipt_code, 							
                        return_unregistered.return_store_id AS shop_id,	
                        return_store.name AS return_store_name,							
                        return_unregistered.to_store_id AS receiver_id,								
                        return_unregistered.from_store_id AS store_id,								
                        return_unregistered.return_regist_date AS return_date,					
                        return_unregistered.receipt_id AS receipt_id,					
                        return_unregistered.customer_id AS customer_id,
                        customer.name AS customer_name,
                        receiver.name AS receiver_name,	
                        brand.brand_name,
                        brand.headquarter_id,					
                        store.name AS store_name,		  
                        return_unregistered.brand_id AS brand_id
                FROM return_unregistered
                LEFT JOIN receipt ON return_unregistered.receipt_id = receipt.receipt_id
                LEFT JOIN store AS receiver ON return_unregistered.to_store_id = receiver.store_id
                LEFT JOIN brand ON brand.brand_id = return_unregistered.brand_id
                LEFT JOIN store ON store.store_id = return_unregistered.from_store_id
                LEFT JOIN store AS return_store ON return_store.store_id =  return_unregistered.return_store_id
                LEFT JOIN customer ON customer.customer_id  =  return_unregistered.customer_id
                ${query}`,
        values,
      });
    
      return result;
}

const getTargetInfo = async (req, res) => {
  if (req.method === "GET") {
    console.log("/api/RepairShop/unregistered");
    const {
        shop_id,
    } = req.query;
    let query=``;
    if(shop_id){
      query = ` WHERE return_unregistered.return_store_id = ?`
    }
    try {
      const result = await getReceipt(query,shop_id);
      if (result.error) throw new Error(result.error);

      res.status(200).json({ data: result });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default getTargetInfo;
