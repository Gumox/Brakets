import excuteQuery from "../db";

async function getSeason(brandId) {
  const result = await excuteQuery({
    query: `SELECT season_id AS value, season_name AS text
              FROM season_type WHERE brand_id=?
              ORDER BY start_date DESC`,
    values: [brandId],
  });

  return result;
}

const controller = async (req, res) => {
  if (req.method === "GET") {
    console.log("/api/product/season");
    try {
      const { brandId } = req.query;
      const season = await getSeason(brandId);
      if (season.error) throw new Error(season.error);

      res.status(200).json({ data: season });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default controller;
