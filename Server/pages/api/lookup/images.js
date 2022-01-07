import excuteQuery from "../db";

async function getImageList(code) {
  const result = await excuteQuery({
    query: `SELECT num, type, before_image, before_store_id, after_image, after_store_id FROM receipt_image
            LEFT JOIN receipt ON receipt_image.receipt_id = receipt.receipt_id
            WHERE receipt.receipt_code = ?`,
    values: [code],
  });
  return result;
}
const images = async (req, res) => {
    if (req.method === "GET") {
      console.log("req.headers.referer");
      console.log(req.headers.referer);
      console.log("req.query");
      console.log(req.query);
      const { code } = req.query;
      try {
        const imageResult = await getImageList(code);
        if (imageResult.error) throw new Error(imageResult.error);
        if (imageResult.length == 0) return res.status(204).send();
        
        console.log(imageResult);
        res.status(200).json({ data: imageResult });
      } catch (err) {
        console.log(err.message);
        res.status(400).json({ err: err.message });
      }
    }
  };
  
  export default images;