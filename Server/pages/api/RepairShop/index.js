import excuteQuery from "../db";

const repairShopInfo= async (id) => {
  
    const result = await excuteQuery({
      query: `SELECT DISTINCT
                  pcategory_store.receiver_id AS repair_shop_id,
                  pcategory_store.receiver_name AS repair_shop_name,
                  store.store_code AS repair_shop_code,
                  store.address AS repair_shop_address,
                  store.contact AS repair_shop_contact,
                  store.store_state AS repair_shop_state,

                  repair_shop_info.brand_id,
                  brand.brand_name,
                  repair_shop_info.hq_id AS headquarter_id,
              
                  product_category.category_name AS pcategory_name,
                  pcategory_store.pcategory_id
              FROM pcategory_store
              
              JOIN product_category ON product_category.pcategory_id = pcategory_store.pcategory_id
              JOIN repair_shop_info ON repair_shop_info.brand_id = product_category.brand_id  
              JOIN brand ON brand.brand_id  = repair_shop_info.brand_id 
              JOIN store ON store.store_id = pcategory_store.receiver_id
  
              WHERE repair_shop_info.hq_id = ?
              ORDER BY pcategory_store.receiver_name ASC`,
      values: [id],
    });
    return result;
}



const Repair = async (req, res) => {
    if (req.method === "GET") {
      console.log(req.query);
      try {
        const {
            
            headquarterId, 
        } = req.query;

        const info = await repairShopInfo(headquarterId)
        console.log(info)
        //console.log(user)
        if(info.error)
        {}
        console.log("staff");
        res.status(200).json({  data: info });
        
        


        
        
        
      } catch (err) {
        console.log(err.message);
        res.status(400).json({err: err.message});
      }

    
  }
};

export default Repair;