import excuteQuery from "../db";

async function getSeasonInfo(query,values) {
  const result = await excuteQuery({
    query: `SELECT season_id , season_code ,season_name ,brand_id,
                   season_type.start_date,season_type.end_date
              FROM season_type
              WHERE brand_id = ? ${query}`,
    values,
  });
  return result;
}

const controller = async (req, res) => {
  if (req.method === "POST") {
    console.log("/api/brand/seasonCheck");
    console.log()
    console.log(req.body)
    console.log()
    console.log("*********************")
    try {
      const { seasonName,seasonCode,brandId } = req.body;

      let result1 =true;
      let result2 =true;
        
      const seasonNameInfo = await getSeasonInfo("AND season_name = ?",[brandId,seasonName]);
      const seasonCodeInfo = await getSeasonInfo("AND season_code = ?",[brandId,seasonCode]);

      console.log(seasonNameInfo)
      console.log(seasonCodeInfo)

      if (seasonNameInfo.error) throw new Error(seasonNameInfo.error);
      if (seasonCodeInfo.error) throw new Error(seasonCodeInfo.error);

      if(seasonNameInfo.length>0){
        result1 = false
      }
      if(seasonCodeInfo.length>0){
        result2 = false
      }

      res.status(200).json({ info1: result1 ,info2: result2});
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default controller;
