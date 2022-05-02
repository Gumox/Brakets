import excuteQuery from "../db"

async function getHeadquarter(query,values) {
    const result = await excuteQuery({
        query: `SELECT
                    headquarter.headquarter_id,
                    headquarter.headquarter_name,
                    headquarter.headquarter_name_kr,
                    headquarter.headquarter_code,
                    staff.staff_id  AS staff_id,
                    staff.name AS staff_name,
                    staff.account AS staff_account,
                    staff.phone AS staff_phone,
                    staff.staff_code AS staff_code,
                    staff.state AS staff_state,
                    staff.staff_email
                FROM staff
                JOIN staff_store ON staff.staff_id = staff_store.staff_id 
                LEFT JOIN store ON staff_store.store_id = store.store_id
                LEFT JOIN headquarter ON store.brand_id = headquarter.headquarter_id
                WHERE  ${query}
                `,
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

        let query = "staff.level = 0";
        let values = [];
        if(headquarterId){
          query = "headquarter.headquarter_id =? AND staff.level = 1"
          values = [headquarterId]
        }
        
    try {
      const result = await getHeadquarter(query,values);
      if (result.error) throw new Error(result.error);
        res.status(200).json({ body: result });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default controller;