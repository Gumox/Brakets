import formidable from "formidable";
import fs from "fs";
import excuteQuery from "../db";
import _ from "lodash"

async function addStyle( styleNo,category, brandId) {
    const result = await excuteQuery({
      query: `INSERT INTO 
                  style_type(
                      style_code,
                      brand_id,
                      pcategory_id
                  ) VALUES (?,?,?)`,
      values: [ styleNo, brandId,category],
    });
    return result;
}

async function getBrand(headquarterId) {
  const result = await excuteQuery({
    query: `SELECT * FROM brand  JOIN headquarter ON headquarter.headquarter_id = brand.headquarter_id
           WHERE brand.headquarter_id=?;
            `,
    values:[headquarterId]
  });

  return result;
}

async function getStyle(brandId,styleCode) {
    const result = await excuteQuery({
      query: `SELECT style_id, style_code
              FROM style_type 
              WHERE brand_id=? AND style_type.style_code = ?`,
      values: [brandId,styleCode],
    });
  
    return result[0];
}
  

async function getProductCategory(brand,categoryName) {
  const result =await excuteQuery({
      query: `SELECT pcategory_id, category_name,brand.service_date FROM product_category 
              LEFT JOIN brand ON brand.brand_id = product_category.brand_id
              WHERE product_category.brand_id=? AND product_category.category_name = ?`,
      values: [brand,categoryName]
  });
  return result[0];
}
async function addCategory( categoryName, brandId) {
    const result = await excuteQuery({
      query: `INSERT INTO 
                  product_category(
                      category_name,
                      brand_id
                  ) VALUES (?,?)`,
      values: [ categoryName, brandId],
    });
    return result;
}


const controller = async (req, res) => {
  if (req.method === "POST") {
    console.log("/api/product/addStyleToExcel");
    console.log(req.body)

    const {headquarterId,list} = req.body;
    try {
        const brands = await getBrand(headquarterId)
        console.log("=================================================================")
        console.log(brands)
        for(let i =2; i<list.length; i++){
          const item = list[i]
          console.log(item)
          const itemBrand =_.find(brands,{brand_name:item["brand_name"]})
          console.log(itemBrand)
            if(itemBrand){
                const itemCategory  = await getProductCategory(itemBrand.brand_id,item["category_name"])
                const style = await getStyle(itemBrand.brand_id,item["style_code"])
                
                console.log(itemBrand.brand_id,item["category_name"])
                console.log(itemCategory)
                if(!style){
                    if(itemCategory){
                        const styleCode = item["style_code"],
                                brandId = itemBrand.brand_id,
                                pcategory_id = itemCategory.pcategory_id

                            const styleAdd = await addStyle(styleCode, pcategory_id, brandId)
                            console.log(styleAdd)
                    }else{
                        const categoryAdd = await addCategory(item["category_name"],itemBrand.brand_id)
                        const styleCode = item["style_code"],
                                brandId = itemBrand.brand_id,
                                pcategory_id = categoryAdd.insertId

                            const styleAdd = await addStyle(styleCode, pcategory_id, brandId)
                            console.log(styleAdd)
                    }
                }
            }
        }
        console.log("=================================================================")
      
        res.status(200).send("succeed")
      
    } catch (err) {
      console.log(err.message);
      res.status(400).json({err: err.message, text: fields, file: files});
    } finally {
      res.end();
    }
  }
};

export default controller;
