import excuteQuery from "../db";

async function getSeason(headquarterId) {
  const result = await excuteQuery({
    query: `SELECT season_id , season_code ,season_name ,brand.brand_name,
                   season_type.start_date,season_type.end_date
              FROM season_type 
              JOIN brand ON brand.brand_id = season_type.brand_id
              WHERE brand.headquarter_id=?
              ORDER BY start_date DESC`,
    values: [headquarterId],
  });
  return result;
}

const controller = async (req, res) => {
  if (req.method === "GET") {
    console.log("/api/brand/season");
    console.log()
    console.log(req.query)
    console.log()
    console.log("*********************")
    try {
      const { headquarterId } = req.query;
      const season = await getSeason(headquarterId);
      if (season.error) throw new Error(season.error);

      res.status(200).json({ data: season });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default controller;
