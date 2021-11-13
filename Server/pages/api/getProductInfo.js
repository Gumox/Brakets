import excuteQuery from './db';


export async function getProductInfo(code) {
    try {
        const result = await excuteQuery({
            query: "SELECT * FROM product WHERE qrcode=? OR barcode=?",
            values: [code,code]
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
    var code = req.body.code;

    getProductInfo(code).then((body) => {

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

