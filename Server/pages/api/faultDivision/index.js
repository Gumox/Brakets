import excuteQuery from "../db"

async function getFaultDivision(addQuery,id) {
    const result = await excuteQuery({
        query: `SELECT  
                  fault_id	AS value,
                  fault_name AS text,
                  fault_code,	
                  level,
                  state,
                  headquarter_id
                FROM fault_type 
                ${addQuery}`,
        values:[id],
      });
    
      return result;
}

const controller = async (req, res) => {
    if (req.method === "GET") {
        console.log("pages/api/faultDivision");
        console.log(req.headers.referer);
        console.log("req.query");
        console.log(req.query);
        
        const { hq_id ,state } = req.query;
        let addQuery ='';

        if(hq_id){
          addQuery +=`WHERE headquarter_id=?`
        }
        if(state == 1){
          addQuery +=` AND state = 1`
        }
    try {
      const result = await getFaultDivision(addQuery,hq_id);
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