import excuteQuery from "../db"

async function getHeadquarter(query,values) {
    const result = await excuteQuery({
        query: `SELECT 
                      headquarter_id  AS value,
                      headquarter_name_kr AS text,
                      headquarter_name,
                      headquarter_code,
                      headquarter_call,
                      state,
                      ceo,	
                      ceo_address,	
                      ceo_email,
                      company_registration_number,
                      timestamp
                FROM headquarter ${query}`
                ,
          values
      });
    
      return result;
}

const controller = async (req, res) => {
    if (req.method === "GET") {
        console.log("req.headers.referer");
        console.log(req.headers.referer);
        console.log("req.query");
        console.log(req.query);

        const {headquarterId} = req.query
        let query =""
        let values =[]
        if(headquarterId){
          query = "WHERE headquarter_id= ?"
          values = [headquarterId]
        }

    try {
      const result = await getHeadquarter(query,values);
      if (result.error) throw new Error(result.error);
      if (result.length) {
        console.log("result");
        res.status(200).json({ body: result });
      } else {
        console.log("No result");
        res.status(204).json({ message: "No result" });
      }
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default controller;