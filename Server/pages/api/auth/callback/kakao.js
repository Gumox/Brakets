import axios from "axios";
import jwt from "jsonwebtoken";
import { setCookie } from "../../../../utils/cookies";
import excuteQuery from "../../db";

const REQUEST_TOKEN_URL = "https://kauth.kakao.com/oauth/token";
const REQUEST_TOKEN_INFO_URL =
  "https://kapi.kakao.com/v1/user/access_token_info";
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

    // 토큰 정보 요청
    const { data: tokenInfoData } = await axios.get(REQUEST_TOKEN_INFO_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    // 회원 고유 ID 조회
    const userId = tokenInfoData.id;

    // DB 에서 해당 ID 조회
    const [user] = await excuteQuery({
      query: "SELECT staff_id, store_id, id, name FROM staff WHERE id=?",
      values: [userId],
    });

    if (!user) {
      // 있으면
      // 회원 ID cookie 에 넣고
      // 추가 입력받을 페이지로 redirect
      setCookie(res, "id", userId, {
        httpOnly: true,
        path: "/",
        maxAge: THIRTY_MINUTES,
      });
      res.redirect("/admin/signup");
    } else {
      // 없으면
      // 해당 데이터로 token 만들어서 cookie 에 넣고
      // 메인 페이지로 redirect
      const token = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET_KEY);
      setCookie(res, "token", token, {
        httpOnly: true,
        path: "/",
      });
      res.redirect("/admin");
    }
  }
};

export default kakao;
