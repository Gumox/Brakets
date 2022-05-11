import excuteQuery from "../db";

async function getStyle(pcategoryId,brandId) {
  const result = await excuteQuery({
    query: `SELECT style_id AS value, style_code AS text ,style_type.brand_id, brand.brand_name, style_type.pcategory_id,product_category.category_name
            FROM style_type 
            JOIN brand ON brand.brand_id = style_type.brand_id
            JOIN product_category ON product_category.pcategory_id =style_type.pcategory_id
            WHERE style_type.pcategory_id=? AND style_type.brand_id =?
            ORDER BY style_code ASC`,
    values: [pcategoryId,brandId],
  });

  return result;
}

const controller = async (req, res) => {
  if (req.method === "GET") {
    console.log("/api/product/seasonStyle");
    try {
      const { pcategoryId ,brandId } = req.query;
      const style = await getStyle(pcategoryId,brandId);
      if (style.error) throw new Error(style.error);

      res.status(200).json({ data: style });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default controller;
