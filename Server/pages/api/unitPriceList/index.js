import formidable from "formidable";
import fs from "fs";
import excuteQuery from "../db";


const addUnitPriceList = async (
    brand_id,
    unit_price_list,
    timeStampToString
  ) => {
    const result = excuteQuery({
      query:
        "INSERT INTO `unit_price_list`(`brand_id`, `unit_price_list`) VALUES (?,?)",
      values: [brand_id, unit_price_list,timeStampToString],
  });
  console.log( brand_id,unit_price_list,timeStampToString)
  return result
};
const updateUnitPriceList = async (
    brand_id,
    unit_price_list,
    timeStampToString
  ) => {
    const result = excuteQuery({
      query:
        "UPDATE unit_price_list SET unit_price_list = ?, last_update = ? WHERE brand_id = ?",
      values: [unit_price_list,timeStampToString,brand_id],
  });
  console.log( brand_id,unit_price_list,timeStampToString)
  return result
};

const updateUnitPriceListAsId = async (
  unit_price_list_id ,
  unit_price_list,
  timeStampToString
) => {
  const result = excuteQuery({
    query:
      "UPDATE unit_price_list SET unit_price_list = ?, last_update = ? WHERE unit_price_list_id  = ?",
    values: [unit_price_list,timeStampToString,unit_price_list_id ],
});
console.log( brand_id, unit_price_list,timeStampToString)
return result
};

const check = async(brand_id)=>{
  const result = excuteQuery({
    query:
      `SELECT * FROM unit_price_list WHERE brand_id = ?` ,
    values: [brand_id],
  });
  return result
}

export const config = {
  api: {
    bodyParser: false,
  },
};

const controller = async (req, res) => {
  if (req.method === "POST") {
    console.log(`[${new Date().toISOString()}] api/unitPriceList`);
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
      console.log(fields);
      console.log(files);
      // console.log(files.signature);
        try {
            if (err) throw new Error(err);
            const name = fields["brand"];
            const brand_id = fields["brand_id"];
            const id = fields["unit_price_list_id"]
            

            const  timeStamp = new Date()
            const timeStampToString = timeStamp.getFullYear()+"-"+(timeStamp.getMonth()+1)+"-"+timeStamp.getDate()+" "+timeStamp.getHours()+":"+timeStamp.getMinutes()+":"+timeStamp.getSeconds()
            console.log(timeStampToString)
            console.log("timeStamp",timeStamp)
            
            const insertCheck = await check(brand_id)

            if(files["unitPriceList"]){
                const extension = files.unitPriceList.name.split(".").pop();
                const filePath = `/storage/unitPrice/${name}.${extension}`;
                const oldPath = files.unitPriceList.path;
                const newPath = `./public${filePath}`;

                // 파일 저장 (formidable 은 임시로 파일 저장해둠, 원하는 위치로 rename)
                fs.rename(oldPath, newPath, (err) => {
                if (err) throw new Error(err);
                });

                //
                if(id){
                  const results = await updateUnitPriceListAsId(id, filePath,timeStampToString);
  
                  if (results.error) {
                    console.log("update unitPriceList failed");
                    throw new Error(results.error);
                  } 

                  res.status(200).json({ receipt_id: results });
                }else{
                  console.log(insertCheck)
                  if(insertCheck.length >0){
                    const results = await updateUnitPriceList(brand_id, filePath,timeStampToString);
  
                    if (results.error) {
                      console.log("update unitPriceList failed");
                      throw new Error(results.error);
                    } 
  
                    res.status(200).json({ receipt_id: results });
                    
                  }else{
                    const results = await addUnitPriceList(brand_id, filePath,timeStampToString);
  
                    if (results.error) {
                      console.log("update unitPriceList failed");
                      throw new Error(results.error);
                    } 
  
                    res.status(200).json({ receipt_id: results });
                  }
                }
                
            }
            
            
            
        } catch (err) {
            console.log(err.message);
            res.status(400).json({err: err.message, text: fields, file: files});
        } finally {
            res.end();
        }
    });
  }
};

export default controller;