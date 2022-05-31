import excuteQuery from "../db";

async function getRepairType(addQuery,values) {
  return excuteQuery({
    query: `SELECT repair_id AS value, 
                   repair_name AS text,
                   repair_price,

                   brand.brand_id,
                   brand.brand_name,

                   store.store_id,
                   store.name AS store_name
              FROM repair_type
              JOIN brand ON brand.brand_id = repair_type.brand_id
              JOIN store ON store.store_id = repair_type.store_id
              WHERE store.store_type = 2 ${addQuery}`,
    values,
  });
}

const controller = async (req, res) => {
  if (req.method === "GET") {
    console.log("/api/type/repairTypeInfo");
    try {
      const { 
        headquarterId,
        brandId,
        storeId 
      } = req.query;
      let addQuery ='';
      let values=[]
      if(headquarterId){
        addQuery +=`AND brand.headquarter_id=?`
        values=[...values,headquarterId]
      }
      if(brandId){
        addQuery +=`AND brand.brand_id=?`
        values=[...values,brandId]
      }
      if(storeId){
        addQuery +=`AND repair_type.store_id=?`
        values=[...values,storeId]
      }
      const types = await getRepairType(addQuery,values);
      if (types.error) throw new Error(types.error);

      res.status(200).json({ data: types });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default controller;
