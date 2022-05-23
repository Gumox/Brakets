import excuteQuery from "../db";

async function getBrand(brandName,headquarterId,serviceDate) {
    const result = await excuteQuery({
        query: `INSERT INTO 
        brand(
                brand_name,
                headquarter_id,
                service_date    ) VALUES (?,?,?)`,
        
    values:[brandName,headquarterId,serviceDate]
  });

  return result;
}

const AllBrandList = async (req, res) => {
  if (req.method === "POST") {
    console.log("/api/brand/regist");
    const {brandName,headquarterId,serviceDate} = req.query;
    console.log( req.query)
    try {
      const brand = await getBrand(brandName,headquarterId,serviceDate);
      //console.log(brand)
      if (brand.error) throw new Error(brand.error);

      res.status(200).json({ data: brand });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default AllBrandList;
