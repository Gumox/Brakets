import excuteQuery from '../db';

async function getCategoryInHeadquarter(headquarterId) {
        return excuteQuery({
            query: `SELECT pcategory_id, category_name,brand.brand_name,brand.brand_id
                    FROM product_category 
                    JOIN brand ON brand.brand_id = product_category.brand_id
                    WHERE brand.headquarter_id=? `,
            values: [headquarterId]
        });

}

const controller =  async (req, res) => {
  if (req.method === "GET") {
    console.log(`[${new Date().toISOString()}] /api/brand/getCategoryInHeadquarter`);
    console.log(req.query);
    const {headquarterId} = req.query;

    try{
        const results = await getCategoryInHeadquarter(headquarterId);
        if (results.error) throw new Error(results.error);
        res.status(200).json({body: results});
        
    }catch(err){
        console.log(err.message);
        res.status(400).json({err: err.message});
    }
  }
};

export default controller;
