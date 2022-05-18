import excuteQuery from './db';


async function getHeadquarters(querys,values) {
    let result = excuteQuery({
        query: `SELECT DISTINCT 
                    store.store_id AS receiver_id,
                    store.name AS receiver_name
                    FROM store
                    LEFT JOIN headquarter ON headquarter.headquarter_id = store.brand_id
                    LEFT JOIN brand ON headquarter.headquarter_id = brand.headquarter_id
                    WHERE store.store_type=0 ${querys}`,
        values
    })
    return result;
}

async function getRepairPlaces(query,values) {
    return excuteQuery({
        query: `SELECT 
                        receiver_id, 
                        receiver_name 
                FROM pcategory_store 
                JOIN store AS repairShop ON repairShop.store_id = pcategory_store.receiver_id
                WHERE repairShop.store_state = 1  ${query}`,
        values
    });

}
    
const controller =  async (req, res) => {
  if (req.method === "POST") {
    console.log(`[${new Date().toISOString()}] /api/getReapirList`);
    console.log(req.body);
    const category = req.body.category; 	//1:고객용 2:매장용 3:선처리
    const receipt = req.body.receipt; 	//1: 수선 2: 교환 3: 환불 4: 심의
    const pcategoryId = req.body.pcategory_id; 	//pcategory id
    const seasonId = req.body.season_id; // season_id
    const brandId = req.body.brand_id; //   
    
    let query = ``
    let values = []

    let query2 = ``
    let values2 = []

    if(brandId){
        query+=` AND brand.brand_id = ?`;
        values =[...values,brandId];    
        console.log("???","brandId")
    }
    
    if(pcategoryId){
        query2+=` AND pcategory_store.pcategory_id = ?`;
        values2 =[...values2,pcategoryId];    
        console.log("???","pcategoryId")
    }

    if(seasonId){
        query2+=` AND pcategory_store.season_id=?`;
        values2 =[...values2,seasonId];    
        console.log("???","seasonId")
    }

    try{
        const headquarters = await getHeadquarters(query,values);


        console.log(headquarters)

        
        if (headquarters.error) throw new Error(headquarters.error);

        let repairPlaces = [];
        if(category == 1 && receipt == 1) {
            repairPlaces = await getRepairPlaces(query2, values2);
            if (repairPlaces.error) throw new Error(repairPlaces.error);
        }

        const list = [...repairPlaces, ...headquarters];
        res.status(200).json({
            selected: list[0].receiver_id,
            list,
        });

    }catch(err){
        console.log(err.message);
        res.status(400).json({err: err.message});
    }
  }
};

export default controller;
