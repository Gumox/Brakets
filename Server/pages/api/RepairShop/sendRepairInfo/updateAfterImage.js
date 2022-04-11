import formidable from "formidable";
import fs from "fs";
import excuteQuery from "../../db";

const saveDetailImage = async(receiptId,num,imagePath, storeId) => {
    console.log("---------------------------------------------")
    console.log("receiptId",receiptId)
    return excuteQuery({
        query:"UPDATE receipt_image SET after_image=?, after_store_id=? WHERE receipt_id=? AND num=?",
        values: [ imagePath, storeId, receiptId, num],
    });
}
const saveNeedAfterImage = async(receiptId,num,imagePath, storeId) => {
    console.log("8888888888888888888888888888888888888888888888")
    console.log("receiptId",receiptId)
    return excuteQuery({
        query:"UPDATE repair_need_point SET after_need_point_image=? ,after_store_id=? WHERE receipt_id=? AND number=?",
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
            
            const images = ["image1", "image2", "image3", "image4"];
             
            const needAfterLabels = JSON.parse(fields["needAfterLabels"])
            console.log(needAfterLabels)
            console.log(receiptId)
            console.log(files)
            images.forEach(async (image, index) => {
                if(!files[image]) return
                const key = (index+1);
                const extension = files[image].name.split(".").pop();
                if(extension === ''){
                    console.log("is null")
                   
                }else{
                    const filePath = `/storage/repair/${receiptId}_${key}.${extension}`;
                    console.log(filePath)
                    const oldPath = files[image].path;
                    const newPath = `./public${filePath}`;
                    // 파일 저장 (formidable 은 임시로 파일 저장해둠, 원하는 위치로 rename)
                    fs.rename(oldPath, newPath, (err) => {
                        if (err) throw new Error(err);
                    });
                        
                    const saveResult = await saveDetailImage(receiptId,key,filePath, storeId);
                    console.log(saveResult)
                    if(saveResult.error){ 
                        throw new Error(saveResult.error);
                    }
                }
                
            });
            if(needAfterLabels){
                console.log("here")
                needAfterLabels.forEach(async (label, index) => {
                    if(!files[label]) return
                    const key = (index+1);
                    const extension = files[label].name.split(".").pop();
                    if(extension === ''){
                        console.log("is null")
                       
                    }else{
                        const filePath = `/storage/repair/need_after_${receiptId}_${key}.${extension}`;
                        console.log(filePath)
                        const oldPath = files[label].path;
                        const newPath = `./public${filePath}`;
                        // 파일 저장 (formidable 은 임시로 파일 저장해둠, 원하는 위치로 rename)
                        fs.rename(oldPath, newPath, (err) => {
                            if (err) throw new Error(err);
                        });
                            
                        const saveResult = await saveNeedAfterImage(receiptId,key,filePath, storeId);
                        console.log(saveResult)
                        if(saveResult.error){ 
                            throw new Error(saveResult.error);
                        }
                    }
                    
                });
            }
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
