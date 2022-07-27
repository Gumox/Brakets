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

            
            
            console.log("------------")
            
            console.log(_brand.brand_id)
            console.log(item["brand"])
            console.log(_shop.repair_shop_id)
            console.log(item["shop"])

            console.log("------------")

            console.log(item["repair_name"])
            console.log(item["repair_price"])
            if(_brand && _shop){
              const insertResult = await repairTypeRegist(
                                                            emptySpace(item["repair_name"]),
                                                            item["repair_price"],
                                                            headquarterId,
                                                            _brand.brand_id,
                                                            _shop.repair_shop_id

                                                          )
              console.log(insertResult)
            }else{
              failList.push(item)
            }

          }
          

        }

        console.log("=================================================================")
        console.log({fail:failList})

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
