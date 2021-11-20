import excuteQuery from './db';


export async function submitReceipt(receipt_id, receipt_type, receipt_code, mailbag, receipt_date, due_date, receiver, detail ) {
    try {

	var result="fail";
        const update_receipt = await excuteQuery({

	    query: "UPDATE receipt SET step=1, receipt_type=?, receipt_code=?, mailbag=?, receipt_date=?, due_date=?, receiver_id=?  WHERE receipt_id=?", 
            values: [receipt_type, receipt_code, mailbag, receipt_date, due_date, receiver, receipt_id]

        });

	console.log(update_receipt);
//	console.log(update_receipt['affectedRows']);

	if (update_receipt['affectedRows']){
		
		console.log(detail);	
		for(const det of detail){
			var num = det['num'];
			var repair_id = det['repair_id'];
			var message = det['message'];
			var image = det['image'];
			console.log("nnn" + num);
		
		
		}	
	
	
	
	
	
		result="succ";
	}

        return result;

    } catch (error) {
        console.log(error);
    }
}


export default (req, res) => {
  if (req.method === "POST") {
    console.log("req");
    console.log(req.body);
    var receipt_id = req.body.receipt_id; 
    var receipt_type = req.body.receipt_type; //1 수선 2 교환 3 환불 4 심의 
    var receipt_code = req.body.receipt_code; 
    var mailbag = req.body.mailbag; 
    var receipt_date = req.body.receipt_date; 
    var due_date = req.body.due_date; 
    var receiver = req.body.receiver; 
    var detail = req.body.detail; 

    submitReceipt(receipt_id, receipt_type, receipt_code, mailbag, receipt_date, due_date, receiver, detail ).then((body) => {

	//if(body['affectedRows']){
	    //
	if(body == "succ"){
                console.log("submit Receipt (step 5)");
                res.statusCode = 200;
                res.json({receipt_id: body['insertId']});
        }
        else{
                console.log("submit Receipt (step5) failed");
                res.status(400).send();
        }

    });
  }
};

