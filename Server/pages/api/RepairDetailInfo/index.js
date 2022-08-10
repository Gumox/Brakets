import excuteQuery from "../db";
async function getReturnUnregistered(shop_id,receipt_id) {
  const result = await excuteQuery({
      query: `SELECT *
              FROM return_unregistered 
              WHERE return_store_id = ? AND receipt_id = ?;`,
      values:[shop_id,receipt_id],
    });
  
    return result;
}
async function getImageList(code) {
  const result = await excuteQuery({
    query: `SELECT num, type, before_image, before_store_id, after_image, after_store_id FROM receipt_image
            LEFT JOIN receipt ON receipt_image.receipt_id = receipt.receipt_id
            WHERE receipt.receipt_code = ?`,
    values: [code],
  });
  return result;
}
async function getRepairNeed_Point(id) {
  const result = await excuteQuery({
    query: `SELECT repair_need_point.repair_need_id ,repair_need_point.receipt_id, 
                   repair_need_point.store_id, repair_need_point.need_point_image,
                   number,after_need_point_image
            FROM repair_need_point
            LEFT JOIN receipt ON repair_need_point.receipt_id = receipt.receipt_id
            WHERE receipt.receipt_code = ?`,
    values: [id],
  });
  return result;
}
async function getReceipt(code) {
  const result = await excuteQuery({
    query: `SELECT 
              receipt.receipt_id,
              receipt.receiver,
              receiver.name AS receiver_name,
              brand.brand_name,
              brand.brand_code,
              store.name AS store_name,
              receipt.store_id AS store_id,
              customer.name AS customer_name,
              style_type.style_code,
              product.color,
              product.size,
              headquarter_store.store_id AS headquarter_store_id,
              headquarter_store.name AS headquarter_store_name,
              receipt.store_message,
              repair1_detail_id,
              repair2_detail_id,
              repair3_detail_id,
              mfr_detail_id,
              repair1.store_id AS repair1_store_id,
              repair2.store_id AS repair2_store_id,
              repair3.store_id AS repair3_store_id,
              repair1.complete_date AS repair1_complete_date,
              repair2.complete_date AS repair2_complete_date,
              repair3.complete_date AS repair3_complete_date,
              repair1.shipment_type AS repair1_shipment_type,
              repair2.shipment_type AS repair2_shipment_type,
              repair3.shipment_type AS repair3_shipment_type,
              repair1_store.store_type AS repair1_store_type,
              repair2_store.store_type AS repair2_store_type,
              repair3_store.store_type AS repair3_store_type, 
              receipt.image
              FROM receipt 
              LEFT JOIN brand ON brand.brand_id = receipt.brand_id
              LEFT JOIN store ON store.store_id = receipt.store_id
              LEFT JOIN customer ON customer.customer_id = receipt.customer_id
              LEFT JOIN product ON product.product_id = receipt.product_id
              LEFT JOIN store AS receiver ON receiver.store_id = receipt.receiver
              LEFT JOIN style_type ON style_type.style_id = product.style_id
              LEFT JOIN repair_detail AS repair1 ON repair1.repair_detail_id = receipt.repair1_detail_id
              LEFT JOIN repair_detail AS repair2 ON repair2.repair_detail_id = receipt.repair2_detail_id
              LEFT JOIN repair_detail AS repair3 ON repair3.repair_detail_id = receipt.repair3_detail_id
              LEFT JOIN store AS repair1_store ON repair1.store_id = repair1_store.store_id
              LEFT JOIN store AS repair2_store ON repair2.store_id = repair2_store.store_id
              LEFT JOIN store AS repair3_store ON repair3.store_id = repair3_store.store_id
              LEFT JOIN store AS headquarter_store ON headquarter_store.brand_id = brand.headquarter_id AND headquarter_store.store_type = 0
              WHERE receipt.receipt_code = ?`,
    values: [code],
  });

  return result;
}

const RepairDetailInfo = async (req, res) => {
  if (req.method === "GET") {
    console.log("req.headers.referer");
    console.log("req.query");
    console.log(req.query);
    const { code,shop_id } = req.query;
    
    try {
      const receipt = await getReceipt(code);
      const imageResult = await getImageList(code);
      const needRepairImageResult = await getRepairNeed_Point(code)
      console.log(needRepairImageResult)
      if (receipt.error) throw new Error(receipt.error);
      if (receipt.length == 0) return res.status(204).send();
      console.log(receipt);
      console.log(imageResult);
      if(shop_id){
        console.log('shop_id: ',shop_id)
        console.log('receipt.receipt_id: ',receipt[0].receipt_id)
        const reactReturn = await getReturnUnregistered(shop_id,receipt[0].receipt_id)
        console.log(reactReturn)
        res.status(200).json({ data: { ...receipt[0] },returnd : {...reactReturn[0]} });
      }else{
        res.status(200).json({ data: { ...receipt[0] }, imageList: imageResult , needRepairImage: needRepairImageResult });
      }
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default RepairDetailInfo;
