import excuteQuery from "../db";

const repairShopRegist= async (
    shopName,
    storeCode,
    useMailbag,
    contact,
    ceoName,
    address,
    storeRegistrationNumber
    ) => {
  
    const result = await excuteQuery({
        query: `INSERT INTO 
                    store(
                        store_type,
                        name,
                        store_code,

                        store_category,
                        use_mailbag,
                        contact,
                        ceo_name,
                        address,
                        store_registration_number

                    ) VALUES (
                        
                        2,
                        ?,
                        ?,
                        
                        0,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?
                    )`,
                    
        values: [ 
            shopName,
            storeCode,
            useMailbag,
            contact,
            ceoName,
            address,
            storeRegistrationNumber
        ],
      });
    return result;
}



const repairShopInfo= async (id) => {
  
    const result = await excuteQuery({
      query: `SELECT * FROM store WHERE store_registration_number = ?`,
      values: [id],
    });
    return result;
}
const emptySpace =(str)=>{
    
    return(str.trim())
    
}


const Repair = async (req, res) => {
    if (req.method === "POST") {
      console.log(req.body);
      try {
        const {
            
            shopName,
            storeCode,
            
            useMailbag,
            contact,
            ceoName,
            address,
            storeRegistrationNumber

        } = req.body;

        const info = await repairShopInfo(storeRegistrationNumber)

        if(info.error){console.log(info.error)}

        if(info.length){
            console.log(info)
            res.status(200).json({data : info[0].store_id })
            
        }else{

            const Regist = await repairShopRegist(shopName,
                                            storeCode,
                                            useMailbag,
                                            contact,
                                            ceoName,
                                            address,
                                            emptySpace(storeRegistrationNumber))
            console.log(Regist)

            if(Regist.error){console.log(Regist.error)}

            res.status(200).json({  data: Regist.insertId })
        }
        
        console.log(shopName,
            storeCode,
            
            useMailbag,
            contact,
            address,
            storeRegistrationNumber
            )
        
       

        
        
        
      } catch (err) {
        console.log(err.message);
        res.status(400).json({err: err.message});
      }

    
  }
};

export default Repair;