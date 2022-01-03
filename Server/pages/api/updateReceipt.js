import formidable from "formidable";
import fs from "fs";
import excuteQuery from "./db";
 
/**
 * 공통
 * step
 * receipt
 */

/**
 * 2단계
 * 요구 사항 type:receipt_type
 */

 const updateStepTwo = async (receiptId, {type}) => {
    return excuteQuery({
      query: "UPDATE receipt SET receipt_type=? WHERE receipt_id=?",
      values: [type, receiptId],
    });
  };

/**
 * 3단게
 * store
 * 제품 구분 pcategory:pcategory_id
 * 추가 요청 사항 message:store_message
 * 수선처 receiver:receiver
 * 
 * 이미지
 * image
 * image1
 * image2
 * iamge3
 * image4
 * image5
 */

const updateMainImage = async(receiptId, imagePath) => {
    return excuteQuery({
        query: "UPDATE receipt SET image=? WHERE receipt_id=?",
        values: [imagePath, receiptId],
      });
}

const saveDetailImage = async(receiptId, num, imagePath, storeId) => {
    return excuteQuery({
        query:
          "INSERT INTO `receipt_image`(`receipt_id`, `num`, `type`, `before_image`,`before_store_id`) VALUES (?,?,0,?,?)",
        values: [receiptId, num, imagePath, storeId],
      });
}

 const updateStepThree = async (receiptId, {pcategory, message, receiver}) => {
    return excuteQuery({
      query: "UPDATE receipt SET pcategory_id=?, store_message=?, receiver=? WHERE receipt_id=?",
      values: [pcategory, message, receiver, receiptId],
    });
  };

/**
 * 4단계
 * 서비스카드 바코드 code:receipt_code
 * 매장 접수일 receiptdate:receipt_date
 * 고객 약속일 duedate:due_date
 */

 const updateStepFour = async (receiptId, {code, receiptdate, duedate}) => {
    return excuteQuery({
      query: "UPDATE receipt SET receipt_code=?, receipt_date=?, due_date=? WHERE receipt_id=?",
      values: [code, receiptdate, duedate, receiptId],
    });
  };
 
 export const config = {
   api: {
     bodyParser: false,
   },
 };
 
 const controller = async (req, res) => {
  console.log(`[${new Date().toISOString()}] /api/updateReceipt`);
   if (req.method === "POST") {
     const form = new formidable.IncomingForm();
     form.parse(req, async function (err, fields, files) {
       console.log(fields);
       // console.log(files.signature);
       try {
         if (err) throw new Error(err);

         const step = parseInt(fields["step"]);
         const receiptId = parseInt(fields["receipt"]);
         const storeId = parseInt(fields["store"]);
         if(!step || !receiptId) return res.status(400).send("step and receipt is required");

         let results;
         if(step === 2) {
            results = await updateStepTwo(receiptId, fields);
         } else if (step === 3) {
            const images = ["image", "image1", "image2", "image3", "image4", "image5"];
            images.forEach(async (image, index) => {
                if(!files[image]) return
                const extension = files[image].name.split(".").pop();
                const filePath = `/storage/receipt/${receiptId}_${index}.${extension}`;
                const oldPath = files[image].path;
                const newPath = `./public${filePath}`;
                // 파일 저장 (formidable 은 임시로 파일 저장해둠, 원하는 위치로 rename)
                fs.rename(oldPath, newPath, (err) => {
                    if (err) throw new Error(err);
                });
                if(index == 0) {
                    const updateResult = await updateMainImage(receiptId, filePath);
                    if(updateResult.error) throw new Error(updateResult.error);
                } else {
                    const saveResult = await saveDetailImage(receiptId, index, filePath, storeId);
                    if(saveResult.error) throw new Error(saveResult.error);
                }
            });
            results = await updateStepThree(receiptId, fields);
         } else if (step === 4) {
            results = await updateStepFour(receiptId, fields);
         } 
         if(!results) return res.status(400).send("step is invalid");

         if (results.error) {
           console.log(`update Receipt step${step} failed`);
           throw new Error(results.error);
         }
 
         console.log(`update Receipt step${step}`);
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
 