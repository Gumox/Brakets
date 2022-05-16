import excuteQuery from "../db";

async function getStaffs(query,values) {
  const result = await excuteQuery({
    query: `SELECT 
                    
            staff.staff_id  AS staff_id,
            staff.name AS staff_name,
            staff.account AS staff_account,
            staff.phone AS staff_phone,
            staff.staff_code AS staff_code,
            staff.state AS staff_state,
            staff.staff_email
            FROM staff
            WHERE state = 1 AND staff_id != 1  ${query}
            `,
    values
  });

  return result;
}

const staff = async (req, res) => {
  if (req.method == "GET") {
    const { state,staffCode , level } = req.query;
    

    let query =``
    let values =[]

    if(level == 0){
      query = `AND level = 0`
    }else if(level == 1){
      query = `AND level <= 1`
    }else if(level == 2){
      query = `AND level = 2`
    }else if(level == 3){
      query = `AND level = 3`
    }

    if(staffCode) {
      query += ` AND staff_code = ?`
      values=[...values,staffCode]
    }

    console.log(req.query)

    
    try {
      const result = await getStaffs(query,values);
      
      if (result.error) throw new Error(result.error);

      res.status(200).json({ data : result });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    } finally {
      res.end();
    }
  }
};

export default staff;