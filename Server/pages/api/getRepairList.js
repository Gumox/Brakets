import excuteQuery from './db';


async function getHeadquarters() {
    return excuteQuery({
        query: "SELECT store_id AS receiver_id, name AS receiver_name FROM store WHERE store_type=0 ORDER BY name",
        values: []
    });
}

async function getRepairPlaces(pcategoryId) {
    return excuteQuery({
        query: "SELECT receiver_id, receiver_name FROM product_category WHERE pcategory_id=?",
        values: [pcategoryId]
    });

}

const controller =  async (req, res) => {
  if (req.method === "POST") {
    console.log("req");
    console.log(req.body);
    const category = req.body.category; 	//1:고객용 2:매장용 3:선처리
    const receipt = req.body.receipt; 	//1: 수선 2: 교환 3: 환불 4: 심의
    const pcategoryId = req.body.pcategory_id; 	//pcategory id

    try{
        const headquarters = await getHeadquarters();
        if (headquarters.error) throw new Error(headquarters.error);

        let repairPlaces = [];
        if(category == 1 && receipt == 1) {
            repairPlaces = await getRepairPlaces(pcategoryId);
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
