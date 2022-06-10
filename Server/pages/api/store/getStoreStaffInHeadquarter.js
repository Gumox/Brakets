import excuteQuery from "../db";

async function getStoreShop(headquarterId) {
  const result = await excuteQuery({
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
            WHERE store.store_type = 1 AND brand.headquarter_id=?`,
    values:[headquarterId]
  });


  return result;
}

const getAllStoreShop = async (req, res) => {
  if (req.method === "GET") {
    console.log("/api/store/getStoreStaff");
    const { headquarterId  } = req.query;
    try {
          const store = await getStoreShop(headquarterId);
          console.log(store)
          if(store.error){ console.log(store) }
          res.status(200).json({ data: store });
      
      
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default getAllStoreShop;