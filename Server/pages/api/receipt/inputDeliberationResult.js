import formidable from "formidable";
import fs from "fs";
import excuteQuery from "../db";


const inputDeliberationResult = async (receipt_id,filePath) => {
  return excuteQuery({
    query:`UPDATE receipt 
            SET deliberation_result=?
            WHERE receipt_id=?
          `,
    values: [filePath,receipt_id],
  });
};


export const config = {
  api: {
    bodyParser: false,
  },
};

const controller = async (req, res) => {
  if (req.method === "POST") {
    console.log(`[${new Date().toISOString()}] /api/receipt/inputDeliberationResult`);
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
      console.log(fields);
      console.log(files);
      // console.log(files.signature);
      try {
       

          const receiptId = fields["receiptId"];
          const customerId = fields["customerId"];
          if(files.deliberation){


            const extension = files.deliberation.name.split(".").pop();
            const filePath = `/storage/deliberation/${customerId}_${receiptId}.${extension}`;
            const oldPath = files.deliberation.path;
            const newPath = `./public${filePath}`;

            // 파일 저장 (formidable 은 임시로 파일 저장해둠, 원하는 위치로 rename)
            fs.rename(oldPath, newPath, (err) => {
              if (err) throw new Error(err);
            });

            //
            const results = await inputDeliberationResult(receiptId, filePath);
            if (results.error) {
              console.log("update Signature failed");
              throw new Error(results.error);
            }
          }

          res.status(200).json({msg:"suc"});
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