import excuteQuery from "../../../db";
async function regist(List) {
let results=[]
  for (let data of List) {
    if(data.level){
        console.log("in")
        console.log(data)
        const InsertResult = await excuteQuery({
        query:
            "INSERT INTO `return_unregistered`(`return_store_id`, `to_store_id`, `from_store_id`, `return_regist_date`,`receipt_id`,`customer_id`,`brand_id`) VALUES (?,?,?,?,?,?,?)",
        values: [
            data.shop_id, 
            data.receiver_id,
            data.store_id,
            data.return_date,
            data.receipt_id,
            data.customer_id,
            data.brand_id],
        });
        let result = InsertResult
        console.log(result)
        results.push(result)
        if(result.error){
            return result.error
        }
        
        
    }
  }
  return results
}

// staff = { account, name, phone, level, store };
const registReturn = async (req, res) => {
  if (req.method == "POST") {
    console.log("api/RepairShop/unregistered/registReturn")

    const List  = req.body.body;
    try {
      const result = regist(List);
      if (result.error) throw new Error(result.error);
        console.log(result)
      res.status(200).json({msg: true});
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    } finally {
      res.end();
    }
  }
};

export default registReturn;
