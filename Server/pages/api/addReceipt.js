import formidable from "formidable";
import fs from "fs";
import excuteQuery from "./db";

/**
 * 1단계
 * 접수 구분 category:category
 * 매장 store:store_id
 * 직원 staff:staff_id
 * 고객 customer:customer_id
 * 제품 pid:product_id, pcode:product_code, substitute:substitute, mfrid:mfr_id
 * 브랜드 brand: brand_id
 * 서명 signature:signature
 */

const updateReceipt = async ({
  store,
  staff,
  customer,
  category,
  pid,
  pcode,
  substitute,
  mfrid,
  brand,
},receipt_id
) => {
  console.log()
  return excuteQuery({
    query:`UPDATE receipt 
            SET store_id=?,
                staff_id=?,
                customer_id=?,
                category=?, 
                product_id=?, 
                product_code=?, 
                substitute=?, 
                mfr_id=?, 
                brand_id=?
            WHERE receipt_id=?
                
          `,
    values: [store, staff, customer, category, pid, pcode, substitute, mfrid, brand,receipt_id],
  });
};

const updateSignature = async (receipt, signaturePath) => {
  return excuteQuery({
    query: "UPDATE receipt SET signature=? WHERE receipt_id=?",
    values: [signaturePath, receipt],
  });
};


const addReceiptZeroStep = async ({
  store,
  staff,
  customer
}) => {
  return excuteQuery({
    query:
      "INSERT INTO `receipt`(`store_id`, `staff_id`,`customer_id`) VALUES (?,?,?)",
    values: [store, staff, customer],
  });
};


export const config = {
  api: {
    bodyParser: false,
  },
};

const controller = async (req, res) => {
  if (req.method === "POST") {
    console.log(`[${new Date().toISOString()}] /api/addReceipt`);
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
      console.log(fields);
      console.log(files);
      // console.log(files.signature);
      try {
        if (err) throw new Error(err);
        const step = fields["step"];

        if(step == 0){
            
          // receipt 생성
          const receipt = await addReceiptZeroStep(fields);
          if (receipt.error) {
            console.log("add Receipt failed");
            throw new Error(receipt.error);
          }

          const receiptId = receipt["insertId"];
          const customerId = fields["customer"];
          if(files.signature){
            const extension = files.signature.name.split(".").pop();
            const filePath = `/storage/signature/${customerId}_${receiptId}.${extension}`;
            const oldPath = files.signature.path;
            const newPath = `./public${filePath}`;

            // 파일 저장 (formidable 은 임시로 파일 저장해둠, 원하는 위치로 rename)
            fs.rename(oldPath, newPath, (err) => {
              if (err) throw new Error(err);
            });

            //
            const results = await updateSignature(receiptId, filePath);
            if (results.error) {
              console.log("update Signature failed");
              throw new Error(results.error);
            }
          }

          console.log("add Receipt (step 1)");
          res.status(200).json({ receipt_id: receiptId });
        }else if(step == 1){
          console.log("?????????????????????")
          const receiptId = fields["receiptId"];
          const receipt = await updateReceipt(fields,receiptId);
          console.log(receipt)
          res.status(200).json({ receipt:receipt, receipt_id: receiptId });
        }else{
          if (err) throw new Error(err);
          // receipt 생성
          const receipt = await addReceipt(fields);
          if (receipt.error) {
            console.log("add Receipt failed");
            throw new Error(receipt.error);
          }

          const receiptId = receipt["insertId"];
          const customerId = fields["customer"];
          if(files.signature){
            const extension = files.signature.name.split(".").pop();
            const filePath = `/storage/signature/${customerId}_${receiptId}.${extension}`;
            const oldPath = files.signature.path;
            const newPath = `./public${filePath}`;

            // 파일 저장 (formidable 은 임시로 파일 저장해둠, 원하는 위치로 rename)
            fs.rename(oldPath, newPath, (err) => {
              if (err) throw new Error(err);
            });

            //
            const results = await updateSignature(receiptId, filePath);
            if (results.error) {
              console.log("update Signature failed");
              throw new Error(results.error);
            }
          }

          console.log("add Receipt (step 1)");
          res.status(200).json({ receipt_id: receiptId });
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