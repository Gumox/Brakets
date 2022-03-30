import excuteQuery from "../../db";


async function updatesStateAtTwo(List) {
    let results=[]
      for (let data of List) {
        if(data.state == 1){
          const toDay = new Date();
          const toDayString = toDay.getFullYear()+"-"+(toDay.getMonth()+1)+"-"+toDay.getDate()+" "+toDay.getHours()+":"+toDay.getMinutes()+":"+toDay.getSeconds();
          const result = await excuteQuery({
            query: `UPDATE repair_detail 
                    SET repair_detail_state = '2',
                    repair_staff=?,
                    confirm_date = ?,
                    adjustment = ?,
                    adjustment_reason = ?,
                    remarks = ?
                    WHERE repair_detail.repair_detail_id = ?`,
            values: [data.hq_staff,toDayString,data.adjustment,data.adjustment_reason,data.remarks,data.repair_detail_id],
        })
        console.log(result)
        if(result.error){
            return result.error
        }else{
            results.push(result)
        }
      }
    }
    return results
}
const setStateAtTwo = async (req, res) => {
   if (req.method == "PUT") { 
       const List  = req.body.body;
       console.log(List)
    try {
      const result = updatesStateAtTwo(List);
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

export default setStateAtTwo;