import excuteQuery from "../db";

async function setStaff(
    list,
    staffAccount,
    staffName,
    staffPhone,
    staffEmail
) {
  const staffResult = await excuteQuery({
    query: `INSERT INTO staff(account, name, phone, staff_email, staff_code, level) VALUES (?,?,?,?,?,2)`,
    values:[
        staffAccount,
        staffName,
        staffPhone,
        staffEmail,
        staffName
    ]
  });

  for(let index in list){
      const item = list[index];
      console.log("item")
      console.log(item.store_id)

      const itemResult = await excuteQuery({
        query: `INSERT INTO staff_store(staff_id, store_id ) VALUES (?,?)`,
        values:[staffResult.insertId,item.store_id]
      });
      console.log(itemResult)
      if(itemResult.error){
          console.log(itemResult.error)
          break;
      }
    }


  return staffResult;
}

async function getManagerStore(storeId) {
    const result = await excuteQuery({
      query: `SELECT  *
  
              FROM staff_store

              WHERE staff_store.staff_id=?`,
      values:[storeId]
    });
  
    return result;
  }

const registStoreStaff = async (req, res) => {
  if (req.method === "POST") {
    console.log("/api/store/registStoreStaff");
    const {
        staffAccount,
        staffName,
        staffPhone,
        staffEmail,
        
        
        managerId,
    } = req.body;
    
    console.log("req.body")
    console.log(req.body)
    console.log("req.body")
    try {
        let _phone =String(staffPhone).replace(/-/g,"")
        const staffStoreList = await getManagerStore(managerId)
        
        if(staffStoreList.error){ console.log(staffStoreList) }
        console.log(staffStoreList)
        if(staffStoreList.length){
            const staff = await setStaff(
                                            staffStoreList,
                                            staffAccount,
                                            staffName,
                                            _phone,
                                            staffEmail,
                                            
                                            );
            //
            console.log(staff)
            res.status(200).json({ data: staff });
        }else{
          res.status(201).json({ err: "fail" });

        }
      
      
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default registStoreStaff;