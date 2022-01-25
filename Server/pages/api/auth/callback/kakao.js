import axios from "axios";
import jwt from "jsonwebtoken";
import { setCookie } from "../../../../utils/cookies";
import excuteQuery from "../../db";
import store from "../../../../store/store";

const REQUEST_TOKEN_URL = "https://kauth.kakao.com/oauth/token";
const REQUEST_TOKEN_INFO_URL = "https://kapi.kakao.com/v2/user/me";
const THIRTY_MINUTES = 60 * 30 * 1000;
const kakao = async (req, res) => {
  if (req.method === "GET") {
    const { code } = req.query;

    // 인가 코드로 토큰 요청
    const query = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.KAKAO_CLIENT_ID,
      redirect_uri: process.env.KAKAO_REDIRECT_URI,
      code,
    }).toString();

    const { data: tokenData } = await axios.post(
      `${REQUEST_TOKEN_URL}?${query}`
    );
    const accessToken = tokenData.access_token;

    // 사용자 정보 요청
    const { data: tokenInfoData } = await axios.get(REQUEST_TOKEN_INFO_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    // 회원 고유 ID, email 조회
    const {
      id: userId,
      kakao_account: { email },
    } = tokenInfoData;

    // DB 에서 해당 ID or Email 조회 (본사, 최고관리자 중에서 조회)
    const result = await excuteQuery({
      query: `SELECT staff.staff_id, id, email, staff.name, level, store.brand_id AS headquarter_id,staff.level
              FROM staff 
              JOIN staff_store ON staff.staff_id = staff_store.staff_id 
              JOIN store ON staff_store.store_id = store.store_id
              WHERE (id=? OR email=?)`,
      values: [userId, email],
    });
    if (result.error) {
      console.log(result.error);
    }
    const user = result[0];
    console.log(user)
    if (!user) {
      // 없으면
      // login 페이지로 redirect
      res.redirect("/login?r=fail");
    } else {
      // 있으면
      // 아직 id 가 등록 안되어있으면 id 등록
      if (!user.id) {
        const result = await excuteQuery({
          query: "UPDATE staff SET id=?,lastupdate=NOW() WHERE email=?",
          values: [userId, email],
        });
        // console.log(result)
      }
      
      // 해당 데이터로 token 만들어서 cookie 에 넣고
      // 메인 페이지로 redirect
      
      if(user.level >2){
        const token = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET_KEY);
        setCookie(res, "token", token, {
        httpOnly: true,
        path: "/repairReception",
        });
        res.redirect("/repairReception")
        
        
      }else if(user.level <2){
        const token = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET_KEY);
        setCookie(res, "token", token, {
        httpOnly: true,
        path: "/",
        });
        res.redirect("/");
      }
    }
  }
};

export default kakao;
