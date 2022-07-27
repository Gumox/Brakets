import formidable from "formidable";
import fs from "fs";
import excuteQuery from "../db";

async function updateProduct(
  barcode,
  brandId,
  seasonId,
  categoryId,
  styleId,
  name,
  color,
  size,
  degree,
  tag_price,
  org_price,
  image,
  productId
  ) {

  const result = await excuteQuery({
    query: `UPDATE  product 
            SET     barcode = ?,
                    brand_id = ?,
                    season_id = ?,
                    pcategory_id = ?,
                    style_id = ?,
                    name = ?,
                    color = ?,
                    size = ?,
                    degree = ?,
                    tag_price = ?,
                    org_price = ?,
                    image = ?
            WHERE product.product_id = ?`,
    values: [
              barcode,
              brandId,
              seasonId,
              categoryId,
              styleId,
              name,
              color,
              size,
              degree,
              tag_price,
              org_price,
              image,
              productId],
  });
  console.log(result)
  return result;
}

export const config = {
    api: {
      bodyParser: false,
    },
  };

const controller = async (req, res) => {
  if (req.method === "POST") {
    console.log("/api/product/updateProduct");
    
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
        console.log(fields);
        console.log(files);
        try {
          const {
            companyName,
            brandName,
            barcode,
            brandId,
            seasonId,
            categoryId,
            styleId,
            productName,
            color,
            size,
            degree,
            tag_price,
            org_price,
            useURL,
            imageUrl,
            productId
          } = fields

          if(useURL ==="true"){
            const result = await updateProduct(barcode,
                                                brandId,
                                                seasonId,
                                                categoryId,
                                                styleId,
                                                productName,
                                                color,
                                                size,
                                                degree,
                                                tag_price,
                                                org_price,
                                                imageUrl,
                                                productId)
            if(result.error)  throw new Error(result.error);
            console.log(result)
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
                
                const result = await updateProduct(barcode,
                                                    brandId,
                                                    seasonId,
                                                    categoryId,
                                                    styleId,
                                                    productName,
                                                    color,
                                                    size,
                                                    degree,
                                                    tag_price,
                                                    org_price,
                                                    filePath,
                                                    productId)
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
