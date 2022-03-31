import excuteQuery from "../../db";

async function getImageList(code) {
  const result = await excuteQuery({
    query: `SELECT num, type, before_image, before_store_id, after_image, after_store_id FROM receipt_image
            LEFT JOIN receipt ON receipt_image.receipt_id = receipt.receipt_id
            WHERE receipt.receipt_code = ?`,
    values: [code],
  });
  return result;
}
async function getNeedImageList(code) {
  const result = await excuteQuery({
    query: `SELECT 
            repair_need_point.repair_need_id ,
            repair_need_point.receipt_id,
            repair_need_point.number,
            repair_need_point.store_id,
            repair_need_point.need_point_image
            FROM repair_need_point
            LEFT JOIN receipt ON repair_need_point.receipt_id = receipt.receipt_id
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
        const needImageResult = await getNeedImageList(code);
        if (imageResult.error) throw new Error(imageResult.error);
        if (imageResult.length == 0) return res.status(204).send();
        if (needImageResult.error) throw new Error(needImageResult.error);
        
        console.log(imageResult);
        res.status(200).json({ data: imageResult ,needImages :needImageResult});
      } catch (err) {
        console.log(err.message);
        res.status(400).json({ err: err.message });
      }
    }
  };
  
  export default images;