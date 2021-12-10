import excuteQuery from './db';


export async function getCustomer(name, phone) {
    var query = "SELECT * FROM customer ";


    if (typeof name !== "undefined" && typeof phone !== "undefined")
	query += " WHERE name LIKE '" + name + "' AND phone LIKE '%" + phone + "'";

    else if (typeof name !== "undefined")
	query += " WHERE name LIKE '" + name + "'";

    else if (typeof phone !== "undefined")
	query += " WHERE phone LIKE '%" + phone + "'";

    //console.log("qq" + query);

    try {
        const result = await excuteQuery({
            query: query,
            values: []
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
    var phone = req.body.lastphone;

    getCustomer(name, phone).then((body) => {

        if (body.length){
                console.log("Custmer List");
                res.statusCode = 200;
                res.json({body});
        }
        else{
                console.log("No Customer");
                res.status(204).send();
        }

    });
  }
};

