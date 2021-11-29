import excuteQuery from './db';


export async function updateCustomer(cid, name, phone) {
    if (typeof cid !== "undefined" ){

	    try {
		const result = await excuteQuery({
		    query: "UPDATE customer SET name=?, phone=? WHERE customer_id=?",
		    values: [name, phone, cid]
		});
		console.log(result);
		return result;

	    } catch (error) {
		console.log(error);
	    }

    }


    else
	return "no customer id"

}

export default (req, res) => {
  if (req.method === "POST") {
    console.log("req");
    console.log(req.body);
    var cid = req.body.customer_id;
    var name = req.body.name;
    var phone = req.body.phone;

    updateCustomer(cid, name, phone).then((body) => {

	if(body['affectedRows']){
                console.log("update Custmer");
                res.statusCode = 200;
                //res.json({body});
                res.json({customer_id: cid});
        }
        else{
                console.log("update Customer Fail");
                res.status(400).send();
        }

    });
  }
};

