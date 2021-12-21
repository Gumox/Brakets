import jwt from "jsonwebtoken";
import excuteQuery from "../db";
import { setCookie } from "../../../utils/cookies";

const signup = async (req, res) => {
  if (req.method === "POST") {
    // 입력 받은 추가사항
    const { store_id, name, phone } = req.body;
    // 회원 ID
    const { id } = req.cookies;
    console.log(id)

    // staff 생성
    // store_id, id, name, phone, lastupdate, timestamp Insert
    const result = await excuteQuery({
      query:
        "INSERT INTO `staff`(`store_id`, `id`, `name`, `phone`) VALUES (?,?,?,?)",
      values: [store_id, id, name, phone],
    });

    const staffId = result.insertId;
    // TODO: staff log 생성

    // token 만들어서 cookie 에 넣고
    const user = {
      staff_id: staffId,
      store_id,
      id,
      name,
    };
    const token = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET_KEY);
    setCookie(res, "token", token, {
      httpOnly: true,
      path: "/",
    });

    // admin 메인 페이지로 이동
    res.redirect("/");
  }
};

export default signup;
