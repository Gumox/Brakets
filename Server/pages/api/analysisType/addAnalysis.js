import excuteQuery from "../db"

async function addFaultDivision(analysisName ,headquarterId) {
    const result = await excuteQuery({
        query: `INSERT INTO 
                analysis_type(
                    analysis_name,
                    headquarter_id
                    ) VALUES (?,?)`,
        values:[analysisName ,headquarterId],
      });
    
      return result;
}

const controller = async (req, res) => {
    if (req.method === "POST") {
        console.log("req.headers.referer");
        console.log(req.headers.referer);
        console.log("req.query");
        console.log(req.query);
        
        const { analysisName ,headquarterId } = req.query;

    try {
      const result = await addFaultDivision(analysisName ,headquarterId);

      if (result.error) throw new Error(result.error);
      if (result.length) {
        console.log("result");
        res.status(200).json({ body: result });
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