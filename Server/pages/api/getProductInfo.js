import excuteQuery from "./db";

async function getProductInfo(code) {
  return excuteQuery({
    query: "SELECT * FROM product WHERE qrcode=? OR barcode=?",
    values: [code, code],
  });
}

const controller = async (req, res) => {
  if (req.method === "POST") {
    console.log("req");
    console.log(req.body);
    const code = req.body.code;

    try {
      const results = await getProductInfo(code);
      if (results.error) throw new Error(results.error);
      if (results.length) {
        console.log("Product Info");
        res.status(200).json({ body: results });
      } else {
        console.log("No Product");
        res.status(204).send();
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).json(err);
    }
  }
};

export default controller;
