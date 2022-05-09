import formidable from "formidable";
import fs from "fs";
import excuteQuery from "../db";

async function registProduct(
    barcode, brandId, tagPrice,
    orgPrice, seasonId, categoryId,
    styleId, color, degree,
    size, productName, imgUrl) {
  const result = await excuteQuery({
    query: `INSERT INTO 
            product(
                barcode, name, season_id,
                style_id, pcategory_id, brand_id,
                color, size, degree,
                tag_price, org_price, image
                    )
             VALUES (
                 ?,?,?,
                 ?,?,?,
                 ?,?,?,
                 ?,?,?
                 )`,
    values: [
            barcode,productName,seasonId,
            styleId,categoryId, brandId,
            color,size,degree,
            tagPrice, orgPrice,imgUrl],
  });
  return result;
}

export const config = {
    api: {
      bodyParser: false,
    },
  };

const controller = async (req, res) => {
  if (req.method === "POST") {
    console.log("/api/product/regist");
    
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
        console.log(fields);
        console.log(files);
        // console.log(files.signature);
        try {
          const {
              companyName,
              brandName,
              barcode,
              brandId,
              tagPrice,
              orgPrice,
              seasonId,
              categoryId,
              styleId,
              color,
              degree,
              size,
              productName,
              useURL,
              imgUrl
          } = fields

          if(useURL ==="true"){
            const result = await registProduct(
                                                barcode, brandId, tagPrice,
                                                orgPrice, seasonId, categoryId,
                                                styleId, color, degree,
                                                size, productName, imgUrl)
            if(result.error)  throw new Error(result.error);
            res.status(200).json({result:result});
          }else{
            if(files.imgfiles){
                const extension = files.imgfiles.name.split(".").pop();
                const filePath = `/storage/products/${companyName}_${brandName}_${barcode}.${extension}`;
                const oldPath = files.imgfiles.path;
                const newPath = `./public${filePath}`;
                console.log(filePath)
    
                // 파일 저장 (formidable 은 임시로 파일 저장해둠, 원하는 위치로 rename)
                fs.rename(oldPath, newPath, (err) => {
                  if (err) throw new Error(err);
                });
    
                //
                
                const result = await registProduct(
                    barcode, brandId, tagPrice,
                    orgPrice, seasonId, categoryId,
                    styleId, color, degree,
                    size, productName, filePath)
                if(result.error)  throw new Error(result.error);
                res.status(200).json({result:result});
                console.log(result)
              }
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
