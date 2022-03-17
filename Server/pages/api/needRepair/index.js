import excuteQuery from "../db";
import formidable from "formidable";

const fs = require("fs"); 
 const updateReceiptImage = async (image, receipt_id) => {
    return excuteQuery({
      query: "UPDATE receipt SET image=? WHERE receipt_id=?",
      values: [image,receipt_id],
    });
  }
  const needPointCheck = async (receipt_id,number) => {
    return excuteQuery({
      query: "SELECT * FROM repair_need_point WHERE receipt_id = ? AND number =?",
      values: [receipt_id,number],
    });
  }
  const updateNeedPoint = async (image, repair_need_id ) => {
      console.log(image, repair_need_id )
    return excuteQuery({
      query: "UPDATE repair_need_point SET need_point_image=? WHERE repair_need_id =?",
      values: [image,repair_need_id ],
    });
  }
  const insertNeedPoint = async (receipt_id,num,store_id, need_point_image) => {
      console.log(receipt_id,store_id, need_point_image)
      return excuteQuery({
        query:
          "INSERT INTO `repair_need_point`(`receipt_id`,`number`,`store_id`,`need_point_image`) VALUES (?,?,?)",
        values: [receipt_id,num,store_id,need_point_image],
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
        
        const form = new formidable.IncomingForm();
        form.parse(req, async function (err, fields, files) {
          console.log(fields);
          console.log(files);
            try {
                if (err) throw new Error(err);
                const receiptId = parseInt(fields["receipt"]);
                const storeId = parseInt(fields["store"]);
                
                const images = ["image","image1", "image2", "image3", "image4"];
                images.forEach(async (image, index) => {
                    if(!files[image]) return
                    const key = (index);
                    const extension = files[image].name.split(".").pop();
                    if(extension === ''){
                        console.log("is null")
                       
                    }else{
                        console.log("extension : "+extension)
                        const filePath = `/storage/repair/need_${new Date().getTime()}_${receiptId}_${key}.${extension}`;
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
                            
                            if(ImageResult.error){ 
                                throw new Error(ImageResult.error);
                            }
                        }else{
                            const check = await needPointCheck(receiptId,key)
                            console.log("-----------")
                            console.log()
                            console.log()
                            console.log()
                            console.log()
                            console.log(check)
                            console.log()
                            console.log()
                            console.log()
                            console.log()
                            console.log("-----------")
                            if(check[0] !== undefined){
                                console.log(check[0].repair_need_id)
                                const saveResult = await updateNeedPoint(filePath,check[0].repair_need_id);
                                if(saveResult.error){ 
                                    throw new Error(saveResult.error);
                                }
                                
                            }else{
                                console.log("filePath")
                                
                                console.log(filePath)
                                const saveResult = await insertNeedPoint(receiptId,key,storeId,filePath);
                                console.log(saveResult)
                                if(saveResult.error){ 
                                    throw new Error(saveResult.error);
                                }
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