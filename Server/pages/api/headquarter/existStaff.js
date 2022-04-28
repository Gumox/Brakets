import excuteQuery from "../db"

async function getHeadquarter(headquarterId) {
    const result = await excuteQuery({
        query: `SELECT
                    staff.staff_id,
                    headquarter.headquarter_id
                FROM staff
                LEFT JOIN staff_store ON staff.staff_id = staff_store.staff_id 
                LEFT JOIN store ON staff_store.store_id = store.store_id
                LEFT JOIN headquarter ON store.brand_id = headquarter.headquarter_id
                WHERE staff.level = 0 AND staff.state = 1  AND headquarter.headquarter_id=?
                `,
        values:[headquarterId]
      });
    
      return result;
}

const controller = async (req, res) => {
    if (req.method === "GET") {
        console.log("req.headers.referer");
        console.log(req.headers.referer);
        console.log("req.query");
        console.log(req.query);

      const {headquarterId}=req.query;
        
    try {
      const result = await getHeadquarter(headquarterId);
      if (result.error) throw new Error(result.error);
      //res.status(200).json({ body: result });
      
      if (result.length) {
        console.log("result");
        res.status(200).json({ message: true });
      } else {
        console.log("No result");
        res.status(200).json({ message: false });
      }
     
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default controller;