import excuteQuery from './db';


export async function addCustomer(name, phone, sms, clause) {

    try {
        const result = await excuteQuery({
            query: "INSERT INTO `customer`(`name`, `phone`, `sms`, `clause`) VALUES (?,?,?,?)",
            values: [name, phone, sms, clause]
        });

        return result;

    } catch (error) {
        console.log(error);
    }
}

export default (req, res) => {
  if (req.method === "POST") {
    console.log("req");
    console.log(req.body);
    var name = req.body.name;
    var phone = req.body.phone;
    var sms = req.body.sms;
    var clause = req.body.clause;

    addCustomer(name, phone, sms, clause).then((body) => {

	if(body['affectedRows']){
                console.log("add Custmer");
                res.statusCode = 200;
                //res.json({body});
                res.json({customer_id: body['insertId']});
        }
        else{
                console.log("add Customer Fail");
                res.status(400).send();
        }

    });
  }
};

