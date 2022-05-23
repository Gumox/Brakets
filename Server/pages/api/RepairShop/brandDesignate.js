import excuteQuery from "../db";

const brandDesignate= async (pcategory_id, receiver_id, receiver_name) => {
  
    const result = await excuteQuery({
      query: `INSERT INTO 
                pcategory_store(

                    pcategory_id,
                    receiver_id,	
                    receiver_name

                ) VALUES (?,?,?)`,
      values: [pcategory_id, receiver_id, receiver_name],
    });
    return result;
}



const Repair = async (req, res) => {
    if (req.method === "POST") {
      console.log(req.query);
      try {
        const {
            pcategoryId,
            receiverId,
            receiverName 
        } = req.query;

        const info = await brandDesignate(pcategoryId, receiverId, receiverName)
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