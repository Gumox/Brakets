import excuteQuery from "../db"

async function setStaff(
    state,
    account,
    name,
    phone,
    level,
    staff_code,
    staff_email

) {
    const result = await excuteQuery({
        query: `INSERT INTO 
                    staff(
                    state,
                    account,
                    name,
                    phone,
                    level,
                    staff_code,
                    staff_email
                    ) VALUES (?,?,?,?,?,?,?)`,
        values:[
            state,
            account,
            name,
            phone,
            level,
            staff_code,
            staff_email
        ]
      });
    
    
      return result;
}

async function setStaffStore(
    staff_id,
    store_id
) {
  const resultStore = await excuteQuery({
    query: `INSERT INTO 
                staff_store(
                    staff_id,
                    store_id
                ) VALUES (?,?)`,
    values:[
        staff_id,
        store_id
    ]
  });
  
    return resultStore;
}

async function getStaffInfo(account) {
const resultStore = await excuteQuery({
  query: `SELECT * FROM staff
          WHERE account = ?`,
  values:[account]
});

  return resultStore;
}

const controller = async (req, res) => {
    if (req.method === "POST") {
        console.log("req.headers.referer");
        console.log(req.headers.referer);
        console.log("req.body");
        console.log(req.body);
        const{
            state,
            account,
            name,
            phone,
            level,
            staff_code,
            staff_email,
            store_id
        } =req.body
        
    try {

      const info = await getStaffInfo(account)
        
      if(info.length){
        res.status(200).json({ body: info });
      }else{
          
        let _phone = String(phone).replace(/-/g,"")
        const result = await setStaff(
                                              state,
                                              account,
                                              name,
                                              _phone,
                                              level,
                                              staff_code,
                                              staff_email
                                      );
        if (result.error) throw new Error(result.error);
        console.log(result)

        const staff_id = result.insertId
        const resultStore = await setStaffStore(staff_id, store_id);
        res.status(200).json({ body: resultStore });
      }
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default controller;