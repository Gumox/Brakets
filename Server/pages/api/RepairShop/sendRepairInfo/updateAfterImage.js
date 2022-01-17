import formidable from "formidable";
import fs from "fs";
import excuteQuery from "../../db";


/**
 * 0단계 고객 수정
 */

const saveDetailImage = async(receiptId,num,imagePath, storeId) => {
    return excuteQuery({
        query:"UPDATE receipt_image SET after_image=?, after_store_id=? WHERE receipt_id=? AND num=?",
        values: [ imagePath, storeId, receiptId, num],
    });
}

export const config = {
    api: {
      bodyParser: false,
    },
  };

const controller = async (req, res) => {
  if (req.method === "PUT") {
    console.log(`[${new Date().toISOString()}] /api/RepairShop/sendRepairInfo/updateAfterImage`);
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
        try {
            if (err) throw new Error(err);
            const receiptId = parseInt(fields["receipt"]);
            const storeId = parseInt(fields["store"]);

            const images = ["image1", "image2", "image3", "image4", "image5"];
            console.log(files)
            images.forEach(async (image, index) => {
                if(!files[image]) return
                const key =index+1;
                console.log(key)
                const extension = files[image].name.split(".").pop();
                const filePath = `/storage/repair/${receiptId}_${key}.${extension}`;
                console.log(filePath)
                const oldPath = files[image].path;
                const newPath = `./public${filePath}`;
                console.log(oldPath)
                console.log(newPath)
                // 파일 저장 (formidable 은 임시로 파일 저장해둠, 원하는 위치로 rename)
                fs.rename(oldPath, newPath, (err) => {
                    if (err) throw new Error(err);
                });
                    
                const saveResult = await saveDetailImage(receiptId,key,filePath, storeId);
                console.log(saveResult)
                if(saveResult.error){ 
                    throw new Error(saveResult.error);
                }
            });
            res.status(200).json({msg:"images saved"});
        }catch (err) {
            console.log(err.message);
            res.status(400).json({err: err.message});
        } finally {
            res.end();
        }
    })
  }
};

export default controller;
