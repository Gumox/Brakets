import excuteQuery from "./db";
/**
 * 1단계 제품정보 조회
 */

async function getProductInfo(code) {
  return excuteQuery({
    query: "SELECT * FROM product WHERE qrcode=? OR barcode=?",
    values: [code, code],
  });
}

const controller = async (req, res) => {
  if (req.method === "POST") {
    console.log(`[${new Date().toISOString()}] /api/getProductInfo`);
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
      res.status(400).json({err: err.message});
    }
  }
};

export default controller;
