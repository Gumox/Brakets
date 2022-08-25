import axios from "axios";
import jwt from "jsonwebtoken";
import { setCookie } from "../../../../utils/cookies";
import excuteQuery from "../../db";

const loginRepair= async (query, values) => {
  
    const result = await excuteQuery({
      query: `SELECT  
              staff.staff_id,
              staff.level,
              staff.staff_code,
              store.store_id,
              store.store_code,
              store.store_type,
              store.name
              FROM staff 
              JOIN staff_store ON staff.staff_id = staff_store.staff_id 
              JOIN store ON staff_store.store_id = store.store_id
              WHERE   ${query}  AND staff.state = 1`,
      values,
    });
    return result;
}
/*const repairShopInfo2 = async (id) => {
  
    const result = await excuteQuery({
      query: `SELECT DISTINCT
              repair_shop_info.hq_id,
              headquarter_name,
              headquarter_name_kr,
              repair_shop_info.brand_id,
              brand_name,
              brand_code,
              store.name,
              repair_shop_info.store_id
              FROM repair_shop_info
              LEFT JOIN headquarter ON repair_shop_info.hq_id = headquarter.headquarter_id
              LEFT JOIN store ON repair_shop_info.store_id = store.store_id 
              LEFT JOIN brand ON repair_shop_info.brand_id = brand.brand_id 
              WHERE store.store_id = ?`,
      values: [id],
    });
    return result;
}*/

const repairShopInfo= async (id) => {
  
  const result = await excuteQuery({
    query: `SELECT DISTINCT
            headquarter.headquarter_id AS hq_id,
            headquarter_name,
            headquarter_name_kr,
            brand.brand_id,
            brand_name,
            brand_code,
            store.name,
            store.store_id

            FROM pcategory_store

            JOIN store ON pcategory_store.receiver_id = store.store_id 


            JOIN product_category ON product_category.pcategory_id = pcategory_store.pcategory_id
            JOIN brand ON product_category.brand_id = brand.brand_id 
            JOIN headquarter ON brand.headquarter_id = headquarter.headquarter_id

            WHERE store.store_id = ?`,
    values: [id],
  });
  return result;
}

const repair = async (req, res) => {
    if (req.method === "GET") {
      console.log(req.query);
      try {
        const {
            
            email,
        } = req.query;
        let query = "";
        let values = [];

        query += "account=?";
        values = [email];
  
        console.log(query)
        console.log(values)
        
        const login = await loginRepair(query, values);
        const user = login;
        const info = await repairShopInfo(user[0].store_id)
        console.log(info)
        //console.log(user)
        
        if (login[0].level!==2) {
          console.log("staff");
          res.status(200).json({ body:login , data: info });
        } else {
          console.log("No staff");
          res.status(204).json({ body: null});
        }


        
        
        
      } catch (err) {
        console.log(err.message);
        res.status(400).json({err: err.message});
      }

    
  }
};

export default repair;