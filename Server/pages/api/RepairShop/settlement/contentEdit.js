import excuteQuery from "../../db";


async function contentEdit(List) {
    let results=[]
      for (let data of List) {
        
          const result = await excuteQuery({
            query: `UPDATE repair_detail 
                    SET
                    adjustment = ?,
                    adjustment_reason = ?,
                    remarks = ?
                    WHERE repair_detail.repair_detail_id = ?`,
            values: [data.adjustment,data.adjustment_reason,data.remarks,data.repair_detail_id],
        })
        console.log(result)
        if(result.error){
            return result.error
        }else{
            results.push(result)
        }
      
    }
    return results
}
const setEdit = async (req, res) => {
   if (req.method == "PUT") { 
       const List  = req.body.body;
    try {
      const result = contentEdit(List);
      if (result.error) throw new Error(result.error);
      res.status(200);
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    } finally {
      res.end();
    }
  }
};

export default setEdit;