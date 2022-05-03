import excuteQuery from "../db";

async function brandInfoChange(brandName,serviceDate,brandId) {
    const result = await excuteQuery({
        query: `UPDATE brand SET brand_name = ?, service_date = ? WHERE brand_id = ?`,
        
        values:[brandName,serviceDate,brandId]
  });

  return result;
}

const AllBrandList = async (req, res) => {
  if (req.method === "POST") {
    console.log("/api/brand/serviceDateChange");
    const {brandName,serviceDate,brandId} = req.query;
    console.log( req.query)
    
    try {
      const brand = await brandInfoChange(brandName,serviceDate,brandId);
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
