import excuteQuery from "../db"

async function getHeadquarter(headquarter_id) {
      const result = await excuteQuery({
        query: `SELECT 
                headquarter_id  AS value,
                headquarter_name_kr AS text,
                headquarter_name,
                headquarter_code,
                headquarter_call
                FROM headquarter
                WHERE headquarter_id =?`,
        values:[headquarter_id],
      });
      return result
}

const controller = async (req, res) => {
    if (req.method === "GET") {
        console.log("req.headers.referer");
        console.log(req.headers.referer);
        console.log("req.query");
        console.log(req.query);
      
        const {headquarterId} = req.query
        
    try {
      const result = await getHeadquarter(headquarterId);
      console.log(result)
      if (result.error) throw new Error(result.error);
      if (result.length) {
        console.log("result");
        res.status(200).json({ body: result[0] });
      } else {
        console.log("No result");
        res.status(204).json({ message: "No result" });
      }
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default controller;