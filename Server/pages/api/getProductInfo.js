import excuteQuery from './db';


export async function getProductInfo(type, code) {
    try {
        const result = await excuteQuery({
            query: "SELECT * FROM product WHERE "+type+"=?",
            values: [code]
        });

        return result;

    } catch (error) {
        console.log(error);
    }
}

export default (req, res) => {
  if (req.method === "POST") {
    console.log("req"+ req.body);
    var type = req.body.type; //qrcode, barcode
    var code = req.body.code;

    getProductInfo(type,code).then((body) => {

        if (body.length){
                console.log("Product Info");
                res.statusCode = 200;
                res.json({body});
        }
        else{
                console.log("No Product");
                res.status(204).send();
        }

    });
  }
};

