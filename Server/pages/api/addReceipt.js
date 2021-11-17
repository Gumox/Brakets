import excuteQuery from './db';


export async function addReceipt(store, staff, customer, category, pid, pcode, subsititude) {
    try {
        const result = await excuteQuery({
            query: "INSERT INTO `receipt`(`store_id`, `staff_id`, `customer_id`,`category`, `product_id`, `product_code`, `subsititude`) VALUES (?,?,?,?,?,?,?)",
            values: [store, staff, customer, category, pid, pcode, subsititude]
        });

	//console.log("id"+ result['insertId']);
        return result;

    } catch (error) {
        console.log(error);
    }
}


export default (req, res) => {
  if (req.method === "POST") {
    console.log("req");
    console.log(req.body);
    var store = req.body.store; 
    var staff = req.body.staff; 
    var customer = req.body.customer; 
    var category = req.body.category; 
    var pid = req.body.pid; 
    var pcode = req.body.pcode; 
    var subsititude = req.body.subsititude;

    addReceipt(store, staff, customer, category, pid, pcode, subsititude).then((body) => {

	if(body['affectedRows']){
                console.log("add Receipt (step 2)");
                res.statusCode = 200;
                res.json({receipt_id: body['insertId']});
        }
        else{
                console.log("add Receipt (step2) failed");
                res.status(400).send();
        }

    });
  }
};

