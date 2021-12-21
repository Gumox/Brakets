import { setCookie } from "../../../utils/cookies";

const logout = async (req, res) => {
  if (req.method === "GET") {
    setCookie(res, "token", "", {
      httpOnly: true,
      path: "/",
    });
    res.redirect("/login");
  }
};

export default logout;
