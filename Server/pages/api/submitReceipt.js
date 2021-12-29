import formidable from "formidable";
import fs from "fs";
import excuteQuery from "./db";

/**
 * 5단계
 * receipt
 * 행낭바코드 mailbag:mailbag
 */

const getReceipt = async(receiptId) => {
    return excuteQuery({
        query: `SELECT 
                    receipt.receipt_id,
                    receipt.receipt_code, 
                    receipt.product_id, 
                    receipt.product_code, 
                    receipt.store_id, 
                    receipt.receipt_date, 
                    receipt.receiver,
                    store.store_type AS receiver_type  
                FROM receipt LEFT JOIN store ON receipt.receiver = store.store_id 
                WHERE receipt_id=?`,
        values: [receiptId],
      });
}

const addReceiptDetail = async ({mailbag}, {receipt_id, receipt_code, product_id, product_code, store_id, receipt_date, receiver, receiver_type}) => {
    return excuteQuery({
        query:
          "INSERT INTO `receipt_detail`(`receipt_id`, `receipt_code`, `num`, `mailbag`, `product_id`,`product_code`, `sender`, `send_date`, `receiver`, `receiver_type`) VALUES (?,?,?,?,?,?,?,?,?,?)",
        values: [receipt_id, receipt_code, 1, mailbag, product_id, product_code, store_id, receipt_date, receiver, receiver_type],
      });
}

const addRepairDetail = async ({receiver, receipt_date}) => {
  return excuteQuery({
    query:
      "INSERT INTO `repair_detail`(`store_id`, `send_date`) VALUES (?,?)",
    values: [receiver, receipt_date],
  });
}

 const submitReceipt = async (receiptId, reapirDetailId) => {
    return excuteQuery({
      query: "UPDATE receipt SET step=1, repair1_detail_id=? WHERE receipt_id=?",
      values: [reapirDetailId, receiptId],
    });
  };


  export const config = {
    api: {
      bodyParser: false,
    },
  };
  

  const controller = async (req, res) => {
    if (req.method === "POST") {
      const form = new formidable.IncomingForm(); // 행낭 사진 업로드 해야할 수도 있기 때문에 form-data
      form.parse(req, async function (err, fields, files) {
        console.log(fields);
        try {
          if (err) throw new Error(err);
  
          const receiptId = fields["receipt"];
          if(!receiptId) return res.status(400).send("receipt is required");

          const receipt = await getReceipt(receiptId);
          console.log(receipt)
          if (receipt.error) {
            console.log(`retrieve receipt failed`);
            throw new Error(receipt.error);
          }

          const addResults = await addReceiptDetail(fields, receipt[0]);
          if (addResults.error) {
            console.log(`add receipt detail failed`);
            throw new Error(addResults.error);
          }

          let repairDetailId;
          if(receipt[0].receiver_type === 2) {
            const addRepairResult = await addRepairDetail(receipt[0]);
            if (addRepairResult.error) {
              console.log(`add repair detail failed`);
              throw new Error(addRepairResult.error);
            }
            repairDetailId = addRepairResult["insertId"];
          }

          const results = await submitReceipt(receiptId, repairDetailId);
          if (results.error) {
            console.log(`submit receipt failed`);
            throw new Error(results.error);
          }
  
          console.log("submit Receipt");
          res.status(200).json({ receipt_id: receiptId });
        } catch (err) {
          console.log(err.message);
          res.status(400).json({err: err.message});
        } finally {
          res.end();
        }
      });
    }
  };
  
  export default controller;
