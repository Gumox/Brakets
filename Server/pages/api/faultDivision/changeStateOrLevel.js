import excuteQuery from "../db"

async function changeLevel(level ,faultId) {
    const result = await excuteQuery({
        query: `UPDATE fault_type SET level = ? WHERE fault_id = ?`,
        values:[level ,faultId],
      });
    
      return result;
}

async function changeState(state ,faultId) {
    const result = await excuteQuery({
        query: `UPDATE fault_type SET state = ? WHERE fault_id = ?`,
        values:[state ,faultId],
      });
    
      return result;
}

const controller = async (req, res) => {
    if (req.method === "POST") {
        console.log("req.headers.referer");
        console.log(req.headers.referer);
        console.log("req.body");
        console.log(req.body);
        
        const { level,levelOn, state,stateOn ,faultId } = req.body;

        console.log("level",level, "state",state ,"faultId" ,faultId)

    try {

        if(levelOn){
            console.log("lv")
            const result = await changeLevel(level ,faultId);
            console.log(result)

            if (result.error) throw new Error(result.error);
            res.status(200).json({ body: result });

            
        }
        if(stateOn){
            console.log("st")
            const result = await changeState(state ,faultId);
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