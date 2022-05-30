import excuteQuery from "../db"

async function changeState(state ,analysisId) {
    const result = await excuteQuery({
        query: `UPDATE analysis_type SET state = ? WHERE analysis_id = ?`,
        values:[state ,analysisId],
      });
    
      return result;
}

const controller = async (req, res) => {
    if (req.method === "POST") {
        console.log("req.headers.referer");
        console.log(req.headers.referer);
        console.log("req.body");
        console.log(req.body);
        
        const { state,stateOn ,analysisId } = req.body;

    try {

       
        if(stateOn){
            console.log("st")
            const result = await changeState(state ,analysisId);
            console.log(result)

            if (result.error) throw new Error(result.error);
            res.status(200).json({ body: result });
            
        }
        

       
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ err: err.message });
    }
  }
};

export default controller;