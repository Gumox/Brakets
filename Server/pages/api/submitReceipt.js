import excuteQuery from './db';


export async function submitReceipt(receipt_id, receipt_type, receipt_code, mailbag, receipt_date, due_date, receiver, detail ) {
    try {

	var result="{";
        const update_receipt = await excuteQuery({

	    query: "UPDATE receipt SET step=1, receipt_type=?, receipt_code=?, mailbag=?, receipt_date=?, due_date=?, receiver_id=?  WHERE receipt_id=?", 
            values: [receipt_type, receipt_code, mailbag, receipt_date, due_date, receiver, receipt_id]

        });

	const r_info = await excuteQuery({

	    query: "SELECT * FROM receipt WHERE receipt_id=?", 
            values: [receipt_id]

        });

	//console.log(update_receipt);

	if (update_receipt['affectedRows']){
		//console.log(r_info);	
		var product_id = r_info[0]['product_id'];
		var product_code = r_info[0]['product_code'];
		var substitute = r_info[0]['substitute'];
		var sender = r_info[0]['store_id'];
 		var send_date = r_info[0]['send_date'];	

		for(const det of detail){
			var num = det['num'];
			var pcategory_id = det['pcategory_id'];
			var message = det['message'];


			var query = "INSERT INTO `receipt_detail`";
			query += "(`receipt_id`, `receipt_code`, `mailbag`, `product_id`, `product_code`, `substitute`,";
			query += "`num`, `pcategory_id`, `step`, `sender`, `send_date`, `message`, `receiver`)";
			query += "VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)"

			const insert_detail = await excuteQuery({

		            query: query,
		            values: [receipt_id, receipt_code, mailbag, product_id, product_code, substitute, num, pcategory_id, 1, sender, send_date, message, receiver]

		        });

			if (result != "{")
				result += ",";


			result += '"num' + num + '": ' + insert_detail['insertId']+'';
		}	
	
	
	
	
	
	}

	result += "}";
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
	//console.log(body);
	if(body != "{}"){
                console.log("submit Receipt (step 5)");
                res.statusCode = 200;
                res.json(body);
        }
        else{
                console.log("submit Receipt (step5) failed");
                res.status(400).send();
        }

    });
  }
};

