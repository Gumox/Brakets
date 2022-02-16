import excuteQuery from "../../db";


async function updatesStateAtTwo(List) {
    let results=[]
      for (let data of List) {
        if(data.state == 1){
        const result = await excuteQuery({
            query: `UPDATE repair_detail SET repair_detail_state = '2' WHERE repair_detail.repair_detail_id = ?;`,
            values: [data.repair_detail_id],
        })
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