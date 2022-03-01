import excuteQuery from "../db";

async function getRepairType(addQuery,values) {
  return excuteQuery({
    query: `SELECT repair_id AS value, repair_name AS text,repair_price,level
              FROM repair_type ${addQuery}`,
    values,
  });
}

const controller = async (req, res) => {
  if (req.method === "GET") {
    console.log("/api/type/repair");
    try {
      const { 
        headquarterId,
        brandId,
        storeId 
      } = req.query;
      let addQuery ='';
      let values=[]
      if(headquarterId){
        if(addQuery ===''){
          addQuery +=`WHERE headquarter_id=?`
        }else{
          addQuery +=`AND headquarter_id=?=?`
        }
        values=[...values,headquarterId]
      }
      if(brandId){
        if(addQuery ===''){
          addQuery +=`WHERE brand_id=?`
        }else{
          addQuery +=`AND brand_id=?`
        }
        values=[...values,brandId]
      }
      if(storeId){
        if(addQuery ===''){
          addQuery +=`WHERE store_id=?`
        }else{
          addQuery +=`AND store_id=?`
        }
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
