import axios from "axios";
import { setCookie } from "../../../utils/cookies";
import excuteQuery from "../db";
import moment from "moment";

const setStaffLog = async (staffId, account, uid)=>{
  
  const curruntTime = moment().format("YYYY-MM-DD HH:mm:ss");

  const result = await excuteQuery({
    query:
      "INSERT INTO staff_log(staff_id, status, account, kakao_uid,timestamp) VALUES (?,?,?,?,?)",
    values: [staffId, 2, account, uid, curruntTime],
  });
  return result
}


const logout = async (req, res) => {
  if (req.method === "GET") {

    /*const {
        accessToken,
        staffId,
        account,
        uid
      } = req.query

    /*const _url = 'https://kapi.kakao.com/v1/user/logout';
    const _headers = {
        Authorization: `Bearer ${accessToken}`,
    };
    console.log(accessToken);
    
    //axios.post(_url, '', { headers: _headers })

    await setStaffLog(staffId, account, uid)*/

    setCookie(res, "token", "", {
      httpOnly: true,
      path: "/",
    });
    res.redirect("/");
  }
};

export default logout;
