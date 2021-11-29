import excuteQuery from './db';


export async function getProductCategory(category, receipt, brand, season) {
    try {

	var q = "";

        if(category == 1 && receipt == 1){
    	    //고객용, 수선 -> 수선처
	    q = "SELECT * FROM product_category WHERE brand_id=? AND season_type=? ORDER BY category_name";
        }
        else{
	    //나머지 -> 본사
	    //q = "SELECT type.repair_id, type.repair_name, place.receiver, place.receiver_name FROM repair_type as type LEFT JOIN repair_type as place ON type.priority = place.repair_id WHERE type.repair_id>0 AND type.priority=0";

	    //q = "SELECT " 	
        }
	

        const result = await excuteQuery({
            query: q,
            values: [brand, season]
        });

	console.log(result);
        return result;

    } catch (error) {
        console.log(error);
    }
}

export default (req, res) => {
  if (req.method === "POST") {
    console.log("req");
    console.log(req.body);
    var category = req.body.category; 	//1:고객용 2:매장용 3:선처리
    var receipt = req.body.receipt; 	//1: 수선 2: 교환 3: 환불 4: 심의
    var brand = req.body.brand; 	//brand id
    var season = req.body.season; 	//0: 당시즌 1: 과시즌 

    getProductCategory(category, receipt, brand, season).then((body) => {

        if (body.length){
                console.log("Product Category Info");
                res.statusCode = 200;
                res.json({body});
        }
        else{
                console.log("Product Category Fail");
                res.status(400).send();
        }

    });
  }
};

