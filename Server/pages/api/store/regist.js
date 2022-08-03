import excuteQuery from "../db";

async function registStore(
    name,
    store_code,
    brandId,
    storeCategory,
    useMailbag,
    contact,
    address
) {
    const result = await excuteQuery({
        query: `INSERT INTO 
        store(
                store_type,
                name,
                store_code,
                brand_id,
                store_category,
                use_mailbag,
                contact,
                address
                ) VALUES (1,?,?,?,?,?,?,?)`,
        
    values:[
        name,
        store_code,
        brandId,
        storeCategory,
        useMailbag,
        contact,
        address 
    ]
  });

  return result;
}
async function registManager(
    managerAccount,
    managerEmail,
    managerName,
    managerPhone,
    managerCode
) {
    const result = await excuteQuery({
        query: `INSERT INTO 
        staff(
            account,
            staff_email,
            name,
            phone,
            staff_code,
            level
                ) VALUES (?,?,?,?,?,2)`,
        
    values:[
        managerAccount,
        managerEmail,
        managerName,
        managerPhone,
        managerCode
    ]
  });

  return result;
}

async function setManagerStore(
    managerId,
    storeId 
) {
  const resultStore = await excuteQuery({
    query: `INSERT INTO 
                staff_store(
                    staff_id,
                    store_id
                ) VALUES (?,?)`,
    values:[
        managerId,
        storeId
    ]
  });
  
    return resultStore;
}
async function getManagerStore(manager_id) {
  const result = await excuteQuery({
    query: `SELECT * 
            FROM staff_store 
            WHERE staff_store.staff_id = ?`,
    values:[manager_id]
  });

  return result;
}

async function getStaffs(store_id,manager_id) {
  const result = await excuteQuery({
    query: `SELECT * FROM staff 
            LEFT JOIN staff_store ON staff.staff_id = staff_store.staff_id
            WHERE staff_store.store_id = ? AND NOT staff_store.staff_id = ?`,
    values:[store_id,manager_id]
  });

  return result;
}

const Regist = async (req, res) => {
  if (req.method === "POST") {
    console.log("/api/store/regist");
    const {
        storeName,
        storeCode,
        brandId,
        store_category,
        useMailbag,
        contact,
        address,
        
        managerAccount,
        managerEmail,
        managerName,
        managerPhone,
        managerCode,
        managerId
    } = req.body;

    console.log( req.body)

    try {
      const store = await registStore(
                                    storeName,
                                    storeCode,
                                    brandId,
                                    store_category,
                                    useMailbag,
                                    contact,
                                    address
                                    );
      console.log(store)
      if (store.error) throw new Error(store.error);

      if(managerId){
        
        console.log("store")
        
        await setManagerStore(managerId,store.insertId)
        const managerStore = await getManagerStore(managerId)

        const staffs = await getStaffs(managerStore[0].store_id,managerId)
        
        for(let staff of staffs){
          await setManagerStore(staff.staff_id,store.insertId)
        }

        res.status(200).json({ data: store });

      }else{
        const manager = await registManager(
                                    managerAccount,
                                    managerEmail,
                                    managerName,
                                    managerPhone,
                                    "A"
                                    );
        console.log(manager)
        
        await setManagerStore(manager.insertId,store.insertId)
        
        if (manager.error) throw new Error(manager.error);

        res.status(200).json({ data: store });
      }

    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default Regist;
