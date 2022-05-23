import excuteQuery from "../db";

const brandDeassign= async (pcategoryStoreId) => {
  
    const result = await excuteQuery({
      query: `DELETE FROM pcategory_store 
              WHERE pcategory_store_id = ?`,
      values: [pcategoryStoreId],
    });
    return result;
}



const Repair = async (req, res) => {
    if (req.method === "POST") {
      console.log(req.query);
      try {
        const {
            pcategoryStoreId  
        } = req.query;

        const info = await brandDeassign(pcategoryStoreId)
        console.log(info)
        //console.log(user)
        if(info.error)
        {}
        console.log("staff");
        res.status(200).json({  data: info });
        
        


        
        
        
      } catch (err) {
        console.log(err.message);
        res.status(400).json({err: err.message});
      }

    
  }
};



export default Repair;