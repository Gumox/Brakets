import formidable from "formidable";
import fs from "fs";
import excuteQuery from "../db";


const addUnitPriceList = async (
  brand_id,
  unit_price_list
) => {
   const result = excuteQuery({
    query:
      "INSERT INTO `unit_price_list`(`brand_id`, `unit_price_list`) VALUES (?,?)",
    values: [brand_id, unit_price_list],
  });
  console.log( brand_id,
    unit_price_list)
  return result
};


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
                const results = await addUnitPriceList(brand_id, filePath);
                if (results.error) {
                    console.log("update unitPriceList failed");
                    throw new Error(results.error);
                } 

                res.status(200).json({ receipt_id: results });
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