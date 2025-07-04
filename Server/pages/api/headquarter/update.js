import excuteQuery from "../db"

async function updateHeadquarter(
    state,
    ceo,
    ceo_address,
    ceo_email,
    company_registration_number,
    headquarter_call,
    headquarter_id
) {
    console.log(
        state,
    ceo,
    ceo_address,
    ceo_email,
    company_registration_number,
    headquarter_call,
    headquarter_id
    )
    const result = await excuteQuery({
        query: `UPDATE headquarter SET 
                
                    state = ?,
                    ceo = ?,
                    ceo_address = ?,
                    ceo_email = ?,
                    company_registration_number = ?,
                    headquarter_call = ?
                    WHERE headquarter_id = ?
                    `,
        values:[
            state,
            ceo,
            ceo_address,
            ceo_email,
            company_registration_number,
            headquarter_call,
            headquarter_id
        ]
      });
    
      return result;
}

const controller = async (req, res) => {
    if (req.method === "POST") {
        console.log("req.headers.referer");
        console.log(req.headers.referer);
        console.log("req.body");
        console.log(req.body);
        const{
            state,
            ceo,
            ceo_address,
            ceo_email,
            company_registration_number,
            headquarter_call,
            headquarter_id
        } =req.body

        
    try {
      const result = await updateHeadquarter(
                                    state,
                                    ceo,
                                    ceo_address,
                                    ceo_email,
                                    company_registration_number,
                                    headquarter_call,
                                    headquarter_id
                                    );
                                    console.log(result)
      if (result.error) throw new Error(result.error);
        res.status(200).json({ body: result });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default controller;