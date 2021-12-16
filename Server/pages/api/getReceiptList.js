import excuteQuery from './db';


export async function getReceiptList(sdate, edate, customer, phone) {
    var query = "SELECT receipt_id, category, r.receipt_date, r.receipt_code, c.name, c.phone FROM receipt as r JOIN customer as c ON r.customer_id=c.customer_id WHERE r.receipt_date BETWEEN ? AND ? ";


    
    if (typeof customer !== "undefined" && typeof phone !== "undefined")
	query += " AND c.name LIKE '" + customer + "' AND c.phone LIKE '" + phone + "'";

    else if (typeof customer !== "undefined")
	query += " AND c.name LIKE '" + customer + "'";

    else if (typeof phone !== "undefined")
	query += " AND  c.phone LIKE '" + phone + "'";

    //console.log("qq" + query);
    
    try {
        const result = await excuteQuery({
            query: query,
            values: [sdate, edate]
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
    var sdate = req.body.start_date;
    var edate = req.body.end_date;
    var customer = req.body.customer;
    var phone = req.body.phone;

    getReceiptList(sdate, edate, customer, phone).then((body) => {

        if (body.length){
                console.log("Receipt List - Store");
                res.statusCode = 200;
                res.json({body});
        }
        else{
                console.log("No Receipt - Store");
                res.status(204).send();
        }

    });
  }
};

