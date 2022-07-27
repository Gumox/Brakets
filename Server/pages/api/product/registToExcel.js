import formidable from "formidable";
import fs from "fs";
import excuteQuery from "../db";
import _ from "lodash"

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
async function getBrand(headquarterId) {
  const result = await excuteQuery({
    query: `SELECT UPPER(brand_name) AS brand_name , brand_id FROM brand  JOIN headquarter ON headquarter.headquarter_id = brand.headquarter_id
           WHERE brand.headquarter_id=?;
            `,
    values:[headquarterId]
  });

  return result;
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
async function getStyle(brandId,styleCode) {
  const result = await excuteQuery({
    query: `SELECT style_id, style_code
            FROM style_type 
            WHERE brand_id=? AND UPPER(style_code) = UPPER(?);`,
    values: [brandId,styleCode],
  });

  console.log(result)
  return result[0];
}

async function getSeason(brandId,seasonName) {
  const result = await excuteQuery({
    query: `SELECT season_id, season_code ,season_name
            FROM season_type 
            WHERE brand_id=? AND UPPER(season_name) = UPPER(?);
              `,
    values: [brandId,seasonName],
  });
  console.log(result)
  return result[0];
}

async function getProduct(barcode) {
  const result = await excuteQuery({
    query: `SELECT *
            FROM product 
            WHERE barcode = ?`,

    values: [barcode],
  });
  return result;
}


const emptySpace =(str)=>{
  let name = ""
  for(let i =0; i<str.length;i++){
      if(str[i] === " "&& str[i+1] && str[i+1] !== " "){
          name += "_"
      }else if(str[i] !== " " && str[i]){
          name += str[i]
      }
  }
  return(String(name).replace(/_/g," "))
  
}

const controller = async (req, res) => {
  if (req.method === "POST") {
    console.log("/api/product/registToExcel");
    console.log(req.body)

    const {headquarterId,list} = req.body;
    try {
        const brands = await getBrand(headquarterId)
        console.log("=================================================================")
        console.log(brands)
        for(let i =2; i<list.length; i++){
          const item = list[i]
          const itemBrand =_.find(brands,function(o){
            return o.brand_name === String(emptySpace(item["brand"])).toUpperCase() && item["brand"]
          })
          const itemBarcode = await getProduct(item["barcode"])

          if(itemBrand && itemBarcode.length < 1){
            const itemSeason  =await getSeason(itemBrand.brand_id,item["season"])
            const itemCategory  =await getProductCategory(itemBrand.brand_id,item["category"])
            const itemStyle  =await getStyle(itemBrand.brand_id,item["style"])

              console.log(itemSeason)
              console.log(itemCategory)
              console.log(itemStyle)
            
            
            if(itemSeason.season_id && itemCategory.pcategory_id && itemStyle.style_id){
              console.log("brand_id: ",itemBrand.brand_id)
              console.log("itemSeason: ",itemSeason.season_id)
              console.log("itemCategory: ",itemCategory.pcategory_id)
              console.log("itemStyle: ",itemStyle.style_id)
              
              const barcode = item["barcode"], brandId = itemBrand.brand_id, tagPrice = item["tag_price"],
                    orgPrice = item["org_price"], seasonId = itemSeason.season_id, categoryId = itemCategory.pcategory_id,
                    styleId = itemStyle.style_id, color = item["color"], degree = item["degree"],
                    size = item["size"], productName = item["product_name"], imgUrl = item["image_url"]

              const result = await registProduct(
                    barcode, brandId, tagPrice,
                    orgPrice, seasonId, categoryId,
                    styleId, color, degree,
                    size, productName, imgUrl)
              console.log(result)
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
