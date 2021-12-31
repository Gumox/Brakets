import excuteQuery from './db';


async function getProductCategory(brand) {
        return excuteQuery({
            query: "SELECT pcategory_id, category_name FROM product_category WHERE brand_id=? ORDER BY category_name",
            values: [brand]
        });

}

const controller =  async (req, res) => {
  if (req.method === "POST") {
    console.log("req");
    console.log(req.body);
    // const category = req.body.category; 	//1:고객용 2:매장용 3:선처리
    // const receipt = req.body.receipt; 	//1: 수선 2: 교환 3: 환불 4: 심의
    const brand = req.body.brand; 	//brand id
    // const season = req.body.season; 	//0: 당시즌 1: 과시즌 

    try{
        const results = await getProductCategory(brand);
        if (results.error) throw new Error(results.error);

        if (results.length){
            console.log("Product Category Info");
            res.status(200).json({body: results});
    }
    else{
            console.log("No Product Category");
            res.status(204).send();
    }
    }catch(err){
        console.log(err.message);
        res.status(400).json({err: err.message});
    }
  }
};

export default controller;
