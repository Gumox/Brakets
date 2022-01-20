import excuteQuery from "../db";
import formidable from "formidable";
import fs from "fs";
/**
 * 0단계 고객 수정
 */
 async function updateReceiptImage(image, receipt_id) {
    return excuteQuery({
      query: "UPDATE receipt SET image=? WHERE receipt_id=?",
      values: [image,receipt_id],
    });
  }
  
  const insertNeedPoint = async (receipt_id,store_id, need_pont_image) => {
      console.log(receipt_id,store_id, need_pont_image)
      return excuteQuery({
        query:
          "INSERT INTO `repair_need_point`(`receipt_id`, `store_id`,`need_pont_image`) VALUES (?,?,?)",
        values: [receipt_id,store_id,need_pont_image],
      });
    }
    export const config = {
        api: {
          bodyParser: false,
        },
      };
  const controller = async (req, res) => {
    if (req.method === "POST") {
        console.log(`[${new Date().toISOString()}] api/needRepair`);
        //console.log(req.body);
        
        const form = new formidable.IncomingForm();
        console.log(">>>>>>")
        form.parse(req, async function (err, fields, files) {
            console.log("<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>")
            try {
                if (err) throw new Error(err);
            console.log("<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>")
                const receiptId = parseInt(fields["receipt"]);
                const storeId = parseInt(fields["store"]);
                
                const images = ["image","image1", "image2", "image3", "image4"];
                //console.log(receiptId)
                //console.log(files)
                images.forEach(async (image, index) => {
                    if(!files[image]) return
                    const key = (index);
                    const extension = files[image].name.split(".").pop();
                    if(extension === ''){
                        console.log("is null")
                       
                    }else{
                        console.log("extension : "+extension)
                        const filePath = `/storage/repair/need${receiptId}_${key}.${extension}`;
                        console.log(filePath)
                        const oldPath = files[image].path;
                        const newPath = `./public${filePath}`;
                        // 파일 저장 (formidable 은 임시로 파일 저장해둠, 원하는 위치로 rename)
                        fs.rename(oldPath, newPath, (err) => {
                            if (err) throw new Error(err);
                        });
                        
                        if(index == 0) {
                            console.log(receiptId+" "+storeId+" "+filePath)
                            const ImageResult = await updateReceiptImage(filePath,receiptId);
                            //console.log(ImageResult)
                            if(ImageResult.error){ 
                                throw new Error(ImageResult.error);
                            }
                        }else{
                            console.log(index)
                            console.log(receiptId+" "+storeId+" "+filePath)
                            console.log("???????")
                            const saveResult = await insertNeedPoint(receiptId,storeId,filePath);
                            //console.log(saveResult)
                            if(saveResult.error){ 
                                throw new Error(saveResult.error);
                            }
                        }
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
  
        //res.status(210).json({msg:"images?"}); 
    }
  };
  
  export default controller;