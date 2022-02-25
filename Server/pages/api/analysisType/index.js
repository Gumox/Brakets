import excuteQuery from "../db"

async function getAnalysisType(addQuery,id) {
    const result = await excuteQuery({
        query: `SELECT  
                analysis_id  AS value,
                analysis_name  AS text,
                analysis_code,
                headquarter_id,
                level
                FROM analysis_type
                ${addQuery}`,
        values:[id],
      });
    
      return result;
}

const controller = async (req, res) => {
    if (req.method === "GET") {
        console.log("req.headers.referer");
        console.log(req.headers.referer);
        console.log("req.query");
        console.log(req.query);
        
        const { hq_id } = req.query;
        let addQuery ='';
      if(hq_id){
        addQuery =`WHERE headquarter_id=?`
      }
    try {
      const result = await getAnalysisType(addQuery,hq_id);
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
