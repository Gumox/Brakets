import excuteQuery from "../db";

async function modifyStore(
    name,
    useMailbag,
    contact,
    address,
    storeId
) {
    const result = await excuteQuery({
        query: `UPDATE store 
                SET 
                    name = ?,
                    use_mailbag = ?,
                    contact = ?,
                    address = ?
                WHERE store_id = ?;`,
        
    values:[
        name,
        useMailbag,
        contact,
        address,
        storeId
    ]
  });

  return result;
}

async function modifyManager(
    phone,
    staffEmail,
    state,
    staffId 
) {
    const result = await excuteQuery({
        query: `UPDATE staff 
                SET 
                    phone = ?,
                    staff_email = ?,
                    state = ?
                WHERE staff_id  = ?;`,
        
    values:[
        phone,
        staffEmail,
        state,
        staffId 
    ]
  });

  return result;
}
async function managerStateOff(
    state,
    staffId 
) {
    const result = await excuteQuery({
        query: `UPDATE staff 
                SET 
                    state = ?
                WHERE staff_id  = ?;`,
        
    values:[
        state,
        staffId 
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

async function deleteManagerStore(
    staffStoreId
) {
  const resultStore = await excuteQuery({
    query: `DELETE FROM staff_store WHERE staff_store_id = ?`,
    values:[staffStoreId]
  });
  
    return resultStore;
}

const Regist = async (req, res) => {
  if (req.method === "POST") {
    console.log("/api/store/modify");
    const {
        storeId,
        storeName,
        useMailbag,
        contact,
        address,
        
        managerStoreId,

        isManagerChange,
        
        isNewManager,
        
        managerAccount,
        managerEmail,
        managerName,
        managerPhone,

        managerState,

        managerId
    } = req.body;

    console.log( req.body)

    try {
        const store = await modifyStore(
                                        storeName,
                                        useMailbag,
                                        contact,
                                        address,
                                        storeId
                                        );
        console.log("store")
        console.log(store)
        if (store.error) throw new Error(store.error);


        if(isManagerChange){
            await deleteManagerStore(managerStoreId)
            
            if(!isNewManager){


                await setManagerStore(managerId,storeId)

                res.status(200).json({ data: store });

            }else{

                const manager = await registManager(
                                            managerAccount,
                                            managerEmail,
                                            managerName,
                                            managerPhone,
                                            "A"
                                            );
                console.log("manager")
                console.log(manager)

                //const stateOff = await managerStateOff(false,managerId)
                
                //if (stateOff.error) throw new Error(stateOff.error);
                
                await setManagerStore(manager.insertId,storeId)
                
                if (manager.error) throw new Error(manager.error);

                res.status(200).json({ data: store });

            }
        }else{
            const manager =await modifyManager(managerPhone,managerEmail,managerState,managerId)
            
            if (manager.error) throw new Error(manager.error);

            res.status(200).json({ data: store });

        }

    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
    res.status(200).send("dd")
  }
};

export default Regist;
