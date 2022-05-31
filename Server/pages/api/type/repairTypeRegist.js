import excuteQuery from "../db";

async function repairTypeRegist(
    repairName,
    repairPrice,
    headquarterId,
    brandId,
    storeId 
) {
  const result = await excuteQuery({
    query: `INSERT INTO 
            repair_type(

                repair_name,
                repair_price,
                headquarter_id,
                brand_id,
                store_id
                ) VALUES (?,?,?,?,?)`,
    values: [
        repairName,
        repairPrice,
        headquarterId,
        brandId,
        storeId 
    ],
  });

  return result;
}

const productCategory = async (req, res) => {
  if (req.method === "POST") {
    console.log("/api/type/repairTypeRegist");
    console.log("req.body");
    console.log(req.body);
    
    const { 
        repairName,
        repairPrice,
        headquarterId,
        brandId,
        storeId 
    } = req.body;

    try {
        const category = await repairTypeRegist( 
                                                repairName,
                                                repairPrice,
                                                headquarterId,
                                                brandId,
                                                storeId 
                                                );
        if (category.error) throw new Error(category.error);

        res.status(200).json({ data: category });
    } catch (err) {
        console.log(err.message);
        res.status(400).json({err: err.message});
    }
  }
};

export default productCategory;
