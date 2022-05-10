import excuteQuery from "../db";

async function registSeason( seasonName, seasonCode, startDate, endDate,brandId) {
  const result = await excuteQuery({
    query: `INSERT INTO 
                season_type(
                    season_name,
                    season_code,
                    start_date,
                    end_date,
                    brand_id
                ) VALUES (?,?,?,?,?)`,
    values: [ seasonName, seasonCode, startDate, endDate, brandId],
  });
  return result;
}

const controller = async (req, res) => {
  if (req.method === "POST") {
    console.log("/api/brand/season");
    console.log()
    console.log(req.body)
    console.log()
    console.log("*********************")
    try {
      const {  
            seasonName,
            seasonCode,
            startDate,
            endDate,
            brandId
        } = req.body;
      const season = await registSeason( seasonName, seasonCode, startDate, endDate,brandId) ;
      if (season.error) throw new Error(season.error);

      res.status(200).json({ data: season });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default controller;
