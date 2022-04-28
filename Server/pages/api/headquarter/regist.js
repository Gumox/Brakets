import excuteQuery from "../db"

async function setHeadquarter(
    state,
    headquarter_name,
    headquarter_name_kr,
    headquarter_code,
    ceo,
    ceo_address,
    ceo_email,
    company_registration_number,
    headquarter_call

) {
    const result = await excuteQuery({
        query: `INSERT INTO 
                headquarter(
                    state,
                    headquarter_name,
                    headquarter_name_kr,
                    headquarter_code,
                    ceo,
                    ceo_address,
                    ceo_email,
                    company_registration_number,
                    headquarter_call
                    ) VALUES (?,?,?,?,?,?,?,?,?)`,
        values:[
            state,
            headquarter_name,
            headquarter_name_kr,
            headquarter_code,
            ceo,
            ceo_address,
            ceo_email,
            company_registration_number,
            headquarter_call
        ]
      });
    
    
      return result;
}
async function setHeadquarterStore(
  headquarter_name,
  headquarter_code,
  headquarter_call,
  headquarter_id,
  address

) {
  const resultStore = await excuteQuery({
    query: `INSERT INTO 
              store(
                store_type,
                name,
                store_code,
                brand_id,
                use_mailbag,
                contact,
                address
                ) VALUES (?,?,?,?,?,?,?)`,
    values:[
      0,
      headquarter_name+" 서비스센터",
      headquarter_code,
      headquarter_id,
      1,
      headquarter_call,
      address
    ]
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
            headquarter_name,
            headquarter_name_kr,
            headquarter_code,
            ceo,
            ceo_address,
            ceo_email,
            company_registration_number,
            headquarter_call,
            address
        } =req.body
        
    try {
      const result = await setHeadquarter(
                                    state,
                                    headquarter_name,
                                    headquarter_name_kr,
                                    headquarter_code,
                                    ceo,
                                    ceo_address,
                                    ceo_email,
                                    company_registration_number,
                                    headquarter_call
                                    );
      if (result.error) throw new Error(result.error);

      const id = result.insertId
      const resultStore = await setHeadquarterStore( headquarter_name,headquarter_code,headquarter_call, id, address);
        res.status(200).json({ body: resultStore });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default controller;