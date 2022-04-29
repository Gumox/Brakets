import excuteQuery from "../db"

async function setHeadquarterAdministrator(
    state,
    account,
    name,
    phone,
    staff_code,
    staff_email

) {
  console.log(
    state,
    account,
    name,
    phone,
    staff_code,
    staff_email

  )
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
            0,
            staff_code,
            staff_email
        ]
      });
    
    
      return result;
}

async function setHeadquarterAdministratorStore(
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


async function getHeadquarterStore(
    headquarter_id
) {
  const resultStore = await excuteQuery({
    query: `SELECT * FROM store WHERE store_type=0 AND brand_id =? `,
    values:[headquarter_id]
  });
  
    return resultStore[0];
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
            staff_code,
            staff_email,
            headquarter_id
        } =req.body
        
    try {
      let _phone = String(phone).replace(/-/g,"")
      const result = await setHeadquarterAdministrator(
                                            state,
                                            account,
                                            name,
                                            _phone,
                                            staff_code,
                                            staff_email
                                    );
      if (result.error) throw new Error(result.error);
      console.log(result)

      const staff_id = result.insertId
      const getStore = await getHeadquarterStore(headquarter_id)
      const resultStore = await setHeadquarterAdministratorStore(staff_id, getStore.store_id);
        res.status(200).json({ body: resultStore });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default controller;