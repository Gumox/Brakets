import excuteQuery from "./db";

export async function staffLogin(type, store, kid, uid, phone, name) {
  try {
    let state = 0;
    let staffid = 0;

    //등록 확인
    const check = await excuteQuery({
      query: "SELECT staff_id FROM staff WHERE id=?",
      values: [kid],
    });

    //staff id 가져오기
    if (check.length !== 0) {
      //console.log('current id', check[0]["staff_id"]);
      staffid = check[0]["staff_id"];
      console.log("staff id ", staffid);
    }

    if (type === "signin") {
      state = 0;

      //아이디가 이미 있는 경우
      if (staffid != 0) {
        return "id-exist";
      }

      //신규등록
      else {
        const add_staff = await excuteQuery({
          query:
            "INSERT INTO `staff`(`store_id`, `id`, `name`, `account`) VALUES (?,?,?,?)",
          values: [store, kid, name, uid],
        });

        //console.log("add staff", add_staff);
        //console.log("inserttt", add_staff['insertId']);
        staffid = add_staff["insertId"];
        console.log("new staff id ", staffid);
      }
    } else if (type === "login") {
      state = 1;
    } else if (type === "logout") {
      state = 2;
    }

    //로그 기록
    if (staffid != 0) {
      const result = await excuteQuery({
        query:
          "INSERT INTO `staff_log`(`staff_id`, `status`, `account`, `phone_uuid`) VALUES (?,?,?,?)",
        values: [staffid, state, phone, uid],
      });

      //console.log(result);
      return staffid;
    } else {
      return "no-staff";
    }
  } catch (error) {
    console.log(error);
  }
}

const controller = (req, res) => {
  if (req.method === "POST") {
    console.log("req");
    console.log(req.body);
    const type = req.body.type; //signin, login,
    const store = req.body.store; //store id
    const kid = req.body.kid; //kakao token
    const uid = req.body.uid; //phone token
    const phone = req.body.phone; //phone num
    const name = req.body.name; //phone num

    //200 - 성공, 204 - 아이디 없음, 205 - 아이디 이미 존재
    staffLogin(type, store, kid, uid, phone, name).then((body) => {
      //console.log("bbb",body['affectedRows']);
      if (body == "no-staff") {
        console.log("Fail ", body);
        res.status(204).json({ message: "no-staff" });
      } else if (body == "id-exist") {
        console.log("Fail ", body);
        res.status(205).json({ message: "id-exist" });
      } else if (body) {
        console.log("StaffLogin/Logout/Signin SUCC");
        res.status(200).json({ body: "succ", staff_id: body });
      }
    });
  }
};

export default controller;
