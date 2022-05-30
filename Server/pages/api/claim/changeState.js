import excuteQuery from "../db"

async function changeState(state ,claimId) {
    const result = await excuteQuery({
        query: `UPDATE claim SET state = ? WHERE claim_id = ?`,
        values:[state ,claimId],
      });
    
      return result;
}

const controller = async (req, res) => {
    if (req.method === "POST") {
        console.log("req.headers.referer");
        console.log(req.headers.referer);
        console.log("req.body");
        console.log(req.body);
        
        const { state,stateOn ,claimId } = req.body;

    try {

       
        if(stateOn){
            console.log("st")
            const result = await changeState(state ,claimId);
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