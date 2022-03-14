import excuteQuery from "../db";

async function getStyle(seasonId,brandId) {
  const result = await excuteQuery({
    query: `SELECT DISTINCT 
              style_type.style_id AS value, 
              style_type.style_code AS text
              FROM style_type 
              LEFT JOIN product ON product.style_id = style_type.style_id
              LEFT JOIN season_type ON season_type.season_id = product.season_id
              WHERE product.season_id=? AND product.brand_id =?
              ORDER BY style_code ASC`,
    values: [seasonId,brandId],
  });

  return result;
}

const controller = async (req, res) => {
  if (req.method === "GET") {
    console.log("/api/product/seasonStyle");
    try {
      const { seasonId ,brandId } = req.query;
      const style = await getStyle(seasonId,brandId);
      if (style.error) throw new Error(style.error);

      res.status(200).json({ data: style });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default controller;
