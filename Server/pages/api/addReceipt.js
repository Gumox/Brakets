import formidable from "formidable";
import fs from "fs";
import excuteQuery from "./db";

/**
 * 1단계
 * 매장 store:store_id
 * 직원 staff:staff_id
 * 접수 구분 category:category
 * 고객 customer:customer_id
 * 제품 pid:product_id, pcode:product_code, substitute:substitute, mfrid:mfr_id
 * 서명 signature:signature
 */

const addReceipt = async ({
  store,
  staff,
  customer,
  category,
  pid,
  pcode,
  substitute,
  mfrid,
}) => {
  return excuteQuery({
    query:
      "INSERT INTO `receipt`(`store_id`, `staff_id`, `customer_id`,`category`, `product_id`, `product_code`, `substitute`, `mfr_id`) VALUES (?,?,?,?,?,?,?,?)",
    values: [store, staff, customer, category, pid, pcode, substitute, mfrid],
  });
};

const updateSignature = async (receipt, signaturePath) => {
  return excuteQuery({
    query: "UPDATE receipt SET signature=? WHERE receipt_id=?",
    values: [signaturePath, receipt],
  });
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const controller = async (req, res) => {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
      console.log(fields);
      // console.log(files.signature);
      try {
        if (err) throw new Error(err);
        // receipt 생성
        const receipt = await addReceipt(fields);
        if (receipt.error) {
          console.log("add Receipt failed");
          throw new Error(receipt.error);
        }

        const receiptId = receipt["insertId"];
        const customerId = fields["customer"];
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

        console.log("add Receipt (step 2)");
        res.status(200).json({ receipt_id: receiptId });
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
