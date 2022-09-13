import formidable from "formidable";
import fs from "fs";
import excuteQuery from "../db";
import _ from "lodash"

const emptySpace =(str)=>{
  
  return(str.trim())
  
}


async function repairTypeRegist(
  repairName,
  repairPrice,
  headquarterId,
  brandId,
  storeId 
) {
const result = await excuteQuery({
  query: `INSERT INTO 
          repair_type(

              repair_name,
              repair_price,
              headquarter_id,
              brand_id,
              store_id
              ) VALUES (?,?,?,?,?)`,
  values: [
      repairName,
      repairPrice,
      headquarterId,
      brandId,
      storeId 
  ],
});

return result;
}
async function getRepairType(repairName,storeId,brandId) {
  return excuteQuery({
    query: `SELECT *
            FROM repair_type
            WHERE  repair_type.repair_name = ? AND repair_type.store_id = ? AND repair_type.brand_id = ? 
            `,
    values: [repairName,storeId,brandId],
  });
}
const arrayFinder = (arr,targetName,targetValue)=>{
  let result
  for(let item  of arr){

    if(String(item[targetName]).replace(/ /g,"").toUpperCase() == String(targetValue).replace(/ /g,"").toUpperCase()){
      result = item;
      break;
    }
  }
  return result
}

const controller = async (req, res) => {
  if (req.method === "POST") {
    console.log("/api/type/repairTypeRegistToExcel");
    console.log(req.body)

    const {headquarterId,list,stores,brands} = req.body;
    const failList = []
    try {
        console.log("=================================================================")
        
        for(let i =2; i<list.length; i++){
          const item = list[i]
          
          if( item["brand"] && item["shop"] && item["repair_name"] && item["repair_price"] ){
            let _brand = arrayFinder(brands,"brand_name", item["brand"])
            let _shop = arrayFinder(stores,"repair_shop_name",item["shop"])

            let _repairType = await getRepairType(item["repair_name"],_shop.repair_shop_id,_brand.brand_id)
            
           if(_brand && _shop && _repairType.length < 1){
              const insertResult = await repairTypeRegist(
                                                            emptySpace(item["repair_name"]),
                                                            item["repair_price"],
                                                            headquarterId,
                                                            _brand.brand_id,
                                                            _shop.repair_shop_id

                                                          )
              if(insertResult.error){
                console.log(insertResult.error)
              } 
            }else{
              item["reason"] = "수선내용 중복"
              failList.push(item)
            }

          }
          
          
        }
        console.log({fail:failList})
        
        console.log("=================================================================")

        res.status(200).json({message:"succeed",fail:failList})
      
    } catch (err) {
      console.log(err.message);
      res.status(400).json({err: err.message, text: fields, file: files});
    } finally {
      res.end();
    }
  }
};

export default controller;
