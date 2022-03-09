import excuteQuery from "../../db";

async function getImageList(code) {
    const result = await excuteQuery({
      query: `SELECT receipt.receipt_id,num, type, before_image, before_store_id, after_image, after_store_id FROM receipt_image
              LEFT JOIN receipt ON receipt_image.receipt_id = receipt.receipt_id
              WHERE receipt.receiver = ?`,
      values: [code],
    });
    return result;
}

const controller = async (req, res) => {
    if (req.method === "GET") {
        console.log("req.headers.referer");
        console.log(req.headers.referer);
        console.log("req.query");
        console.log(req.query);
        
        const {
            shop_id
        } = req.query;
        let query = "";
        
        

    try {
      const result = await getImageList(shop_id);
      if (result.error) throw new Error(result.error);
      if (result.length) {

        console.log("List");
        
      } else {
        console.log("No List");
       
      }
      res.status(200).json({ body: result });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default controller;
