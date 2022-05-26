import excuteQuery from "../db";

async function getStoreShop(list) {
  const result =[]

  for(let index in list){
      const item = list[index];
      console.log("item")
      console.log(item.store_id)

      const itemResult = await excuteQuery({
        query: `SELECT  store.store_id,
                        store.store_type,
                        store.name AS store_name,
                        store.store_code,
                        store.brand_id,
                        store.store_category,
                        store.use_mailbag,
                        store.contact,
                        store.address,
                        store.timestamp,
                        
                        staff.name AS staff_name,
                        staff.staff_id,
                        staff.state AS staff_state,
                        staff.account AS staff_account,
                        staff.staff_email,
                        staff.phone AS staff_phone,
                        staff.staff_code,
                        staff_store.staff_store_id,

                        brand.brand_id,
                        brand.brand_name
    
                FROM store
                JOIN staff_store ON staff_store.store_id = store.store_id
                JOIN staff ON staff.staff_id = staff_store.staff_id
                JOIN brand ON brand.brand_id = store.brand_id
                WHERE store.store_id=?`,
        values:[item.store_id]
      });
      console.log(itemResult)
      result.push(...itemResult)
      if(itemResult.error){
          console.log(itemResult.error)
          break;
      }
    }


  return result;
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

const getAllStoreShop = async (req, res) => {
  if (req.method === "GET") {
    console.log("/api/store/getStoreStaff");
    const { storeId ,staffId } = req.query;
    try {
        const staffStore = await getManagerStore(staffId)
        
        if(staffStore.error){ console.log(staffStore) }
        
        if(staffStore.length){
            const store = await getStoreShop(staffStore);
            //
            console.log(store)
            res.status(200).json({ data: store });
        }
      
      
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default getAllStoreShop;