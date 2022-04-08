import excuteQuery from "../db";

const addMfrDetail = async (
    receipt_id,
    store_id,
    register_date,
    substitute,
    message
  
) => {
  return excuteQuery({
    query:
      "INSERT INTO `mfr_detail`(`receipt_id`,`store_id`, `register_date`, `substitute`,`message` ) VALUES (?,?,?,?,?,?)",
    values: [receipt_id,store_id,  register_date, substitute, message],
  });
};
const updateMfrDetail = async (
    store_id,
    register_date,
    substitute,
    complete_date,
    message,
    mfr_id
  
) => {
  return excuteQuery({
    query:
      `UPDATE mfr_detail SET
              store_id = ?, 
              register_date = ?,
              substitute = ?,
              complete_date = ?,
              message = ?
              WHERE mfr_detail_id =?`,
    values:[  store_id,
              register_date,
              substitute,
              complete_date,
              message, 
              mfr_id
          ],
  });
};

const updateMfrRepair = async (mfr_id,receiptId) => {
  return excuteQuery({
    query: `UPDATE receipt SET mfr_id=?,  step=3 WHERE receipt_id=?`,
    values: [mfr_id,receiptId],
  });
};
const updateMfrReceipt = async (mfr_id,receiptId) => {
  return excuteQuery({
    query: `UPDATE receipt SET receiver=?,  step=3 WHERE receipt_id=?`,
    values: [mfr_id,receiptId],
  });
};

const sendRepairInfo = async (req, res) => {
  if (req.method === "POST") {
    
    console.log("api/mfr/setMfr")

    console.log(req.body)

    

    const {
        mfr_id,
        receipt_id,	
        store_id,
        register_date,	
        substitute,	
        message,	
        complete_date,
        headquarter_id
      } =  req.body

     

      
    try {
        
        if(mfr_id){
            const mfrDetailUpdate = await updateMfrDetail(
                store_id,
                register_date,
                substitute,
                complete_date,
                message,
                mfr_id
            )
            console.log(mfrDetailUpdate)
            if(mfrDetailUpdate.error) throw new Error(mfrDetailUpdate.error);

            if(complete_date){
              const updateReceipt  = await updateMfrReceipt(headquarter_id,receipt_id)
              console.log(updateReceipt)
              if(updateReceipt.error) throw new Error(updateReceipt.error);
            }
          
            
            res.status(200).json({ message: true });
        }
        else{
            const mfrDetailInsert = await addMfrDetail(
                receipt_id,
                store_id,
                register_date,
                substitute,
                complete_date,
                message,
                mfr_id
            )
            console.log(mfrDetailInsert)
            if(mfrDetailInsert.error) throw new Error(mfrDetailInsert.error);

            const updateReceipt  = await updateMfrRepair(mfrDetailInsert.insertId,receipt_id)
            console.log(updateReceipt)
            if(updateReceipt.error) throw new Error(updateReceipt.error);
            res.status(200).json({ message: true });
        } 
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default sendRepairInfo;


    