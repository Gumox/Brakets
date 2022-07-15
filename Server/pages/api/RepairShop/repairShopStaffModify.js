import excuteQuery from "../db"

async function setStaff(
    state,
    phone,
    staff_email,
    staff_id

) {
    const result = await excuteQuery({
        query: `UPDATE  staff 
                   SET  state = ?,
                        phone = ? ,
                        staff_email = ?
                 WHERE  staff.staff_id = ?`,
        values:[
            state,
            phone,
            staff_email,
            staff_id
        ]
      });
    
    
      return result;
}
async function setStaffState( state,staff_id ) {
    const result = await excuteQuery({
        query: `UPDATE  staff 
                   SET  state = ?
                 WHERE  staff_id = ?`,
        values:[state,staff_id]
      });
    
    
      return result;
}
async function deleteStaffStore( staff_store_id ) {
  const resultStore = await excuteQuery({
    query: `DELETE FROM staff_store 
            WHERE staff_store_id = ?`,
    values:[staff_store_id]
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
            phone,
            staff_email,
            staff_store_id,
            isChange,
            staff_id
        } =req.body
        
    try {

      if(isChange){

        const del =await deleteStaffStore(staff_store_id)
        console.log(del)

        const result = await setStaffState(0,staff_id);
        console.log(result)
        
        res.status(200).json({ body: result });
      }else{
        let _phone = String(phone).replace(/-/g,"")
        const result = await setStaff(state,_phone,staff_email,staff_id );

        if (result.error) throw new Error(result.error);
        console.log(result)

        res.status(200).json({ body: result });
      }
      
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default controller;