import excuteQuery from './db';

async function getProductCategory(brand) {
        return excuteQuery({
            query: `SELECT pcategory_id, category_name,brand.service_date FROM product_category 
                    LEFT JOIN brand ON brand.brand_id = product_category.brand_id
                    WHERE product_category.brand_id=? ORDER BY category_name`,
            values: [brand]
        });

}

const controller =  async (req, res) => {
  if (req.method === "POST") {
    console.log(`[${new Date().toISOString()}] /api/getProductCategory`);
    console.log(req.body);
    const brand = req.body.brand;

    try{
        const results = await getProductCategory(brand);
        if (results.error) throw new Error(results.error);
        res.status(200).json({body: results});
        
    }catch(err){
        console.log(err.message);
        res.status(400).json({err: err.message});
    }
  }
};

export default controller;
