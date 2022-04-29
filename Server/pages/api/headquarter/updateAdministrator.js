import excuteQuery from "../db"

async function updateHeadquarterAdministrator(
    state,
    phone,
    staff_email,
    staff_id
) {
  
    const result = await excuteQuery({
        query: `UPDATE staff 
                SET state = ?,
                    phone = ?,
                    staff_email = ? 
                WHERE staff.staff_id = ?`,
        values:[
            state,
            phone,
            staff_email,
            staff_id
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
          phone,
          staff_email,
          staff_id
        } =req.body
        
    try {
      let _phone = String(phone).replace(/-/g,"")
      const result = await updateHeadquarterAdministrator( state,_phone,staff_email,staff_id);
      if (result.error) throw new Error(result.error);
      console.log(result)

        res.status(200).json({ body: result });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default controller;