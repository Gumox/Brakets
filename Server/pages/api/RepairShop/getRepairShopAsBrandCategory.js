import excuteQuery from "../db";

const repairShopInfo= async (query,values) => {
  
    const result = await excuteQuery({
      query:   `SELECT DISTINCT
                        product_category.pcategory_id, 
                        product_category.category_name,
                        brand.brand_name,
                        brand.brand_id,
                        pcategory_store.receiver_id,
                        pcategory_store.receiver_name
                        

                FROM product_category 
                LEFT JOIN pcategory_store ON pcategory_store.pcategory_id  = product_category.pcategory_id 
                JOIN brand ON brand.brand_id = product_category.brand_id
                WHERE ${query} `,
      values,
    });
    return result;
}

const Repair = async (req, res) => {
    if (req.method === "GET") {
      console.log(req.query);
      try {
        const {
            headquarterId
        } = req.query;

        let query = ""
        let values = []

        if(headquarterId){
            query += ` brand.headquarter_id =? `
            values=[...values,headquarterId]
        }

        const info = await repairShopInfo(query,values)
        console.log(info)
        //console.log(user)
        if(info.error){console.log(info.error)}
        res.status(200).json({  data: info });
        
        


        
        
        
      } catch (err) {
        console.log(err.message);
        res.status(400).json({err: err.message});
      }

    
  }
};

export default Repair;