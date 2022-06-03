import axios from "axios";
import jwt from "jsonwebtoken";
import { setCookie } from "../../../../utils/cookies";
import excuteQuery from "../../db";

const REQUEST_TOKEN_URL = "https://kauth.kakao.com/oauth/token";
const REQUEST_TOKEN_INFO_URL = "https://kapi.kakao.com/v2/user/me";
const THIRTY_MINUTES = 60 * 30 * 1000;
const loginStore= async (query, values) => {
  
    const result = await excuteQuery({
      query: `SELECT  
              staff.staff_id,
              staff.level,
              store.store_id,
              store.store_code,
              store.brand_id,
              store.name,

              brand.headquarter_id
              FROM staff 
              JOIN staff_store ON staff.staff_id = staff_store.staff_id 
              JOIN store ON staff_store.store_id = store.store_id
              JOIN brand ON brand.brand_id = store.brand_id
              WHERE staff.level = 2 AND store_type=1  AND staff.state = 1 ${query}`,
      values,
    });
    return result;
}


const store = async (req, res) => {
    if (req.method === "GET") {
      console.log("req.headers.referer");
      console.log(req.headers.referer);
      console.log("req.query");
      console.log(req.query);
      try {
        const {
            userId, // 날짜기준
            email, // 기간전체, 하루만
        } = req.query;
        let query = "";
        let values = [];

        query += "AND (id=? OR account=?)";
        values = [userId,email];
  
        console.log(query)
        console.log(values)
        
        const login = await loginStore(query, values);

        const user = login;
        if(user[0] == undefined){
            
        }
        console.log(user[0])



        if (login.error) throw new Error(login.error);
        res.status(200).json({ data: login });
      } catch (err) {
        console.log(err.message);
        res.status(400).json({err: err.message});
      }

    
  }
};

export default store;