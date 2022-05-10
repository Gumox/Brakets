import excuteQuery from "../db";

async function getStyle(headquarterId) {
  const result = await excuteQuery({
    query: `SELECT style_id AS value, style_code AS text ,style_type.brand_id, brand.brand_name
              FROM style_type 
              JOIN brand ON brand.brand_id = style_type.brand_id
              WHERE brand.headquarter_id=?
              ORDER BY style_code ASC`,
    values: [headquarterId],
  });

  return result;
}

const controller = async (req, res) => {
  if (req.method === "GET") {
    console.log("/api/product/style");
    try {
      const { headquarterId } = req.query;
      const style = await getStyle(headquarterId);
      if (style.error) throw new Error(style.error);

      res.status(200).json({ data: style });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default controller;
