import excuteQuery from "../db";

async function getStyle(brandId) {
  const result = await excuteQuery({
    query: `SELECT style_id AS value, style_code AS text
              FROM style_type WHERE brand_id=?
              ORDER BY style_code ASC`,
    values: [brandId],
  });

  return result;
}

const controller = async (req, res) => {
  if (req.method === "GET") {
    console.log("/api/product/style");
    try {
      const { brandId } = req.query;
      const style = await getStyle(brandId);
      if (style.error) throw new Error(style.error);

      res.status(200).json({ data: style });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default controller;
