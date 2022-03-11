import excuteQuery from "../../db";
const addRepairDetail = async (
  receipt_id,
  store,
  register_date,
  fault_id,
  result_id,
  analysis_id,
  delivery_type,
  message,
  repair1_type_id,
  repair1_count,
  repair1_price,
  repair1_redo,
  repair2_type_id,
  repair2_count,
  repair2_price,
  repair2_redo,
  repair3_type_id,
  repair3_count,
  repair3_price,
  repair3_redo,
  paid,
  fee,
  cashreceipt_num
  
) => {
  return excuteQuery({
    query:
      "INSERT INTO `repair_detail`(`receipt_id`,`store_id`, `register_date`,`fault_id`,`result_id`,`analysis_id`, `delivery_type`, `message`,`repair1_type_id`,`repair1_count`,`repair1_price`,`repair1_redo`,`repair2_type_id`,`repair2_count`,`repair2_price`,`repair2_redo`,`repair3_type_id`,`repair3_count`,`repair3_price`,`repair3_redo`,`paid`,`fee`,`cashreceipt_num` ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    values: [receipt_id,store,  register_date, fault_id,result_id,analysis_id,delivery_type, message, repair1_type_id,repair1_count,repair1_price,repair1_redo,repair2_type_id,repair2_count,repair2_price,repair2_redo,repair3_type_id,repair3_count,repair3_price,repair3_redo,paid,fee,cashreceipt_num],
  });
};
const updateRepairDetail = async (
  store,
  register_date,
  fault_id,
  result_id,
  analysis_id,
  delivery_type,
  message,
  repair1_type_id,
  repair1_count,
  repair1_price,
  repair1_redo,
  repair2_type_id,
  repair2_count,
  repair2_price,
  repair2_redo,
  repair3_type_id,
  repair3_count,
  repair3_price,
  repair3_redo,
  paid,
  fee,
  cashreceipt_num,
  repair_detail_id
  
) => {
  return excuteQuery({
    query:
      `UPDATE repair_detail SET
              store_id = ?, 
              register_date = ?,
              fault_id = ?,
              result_id = ?,
              analysis_id = ?, 
              delivery_type = ?, 
              message = ?,
              repair1_type_id = ?,
              repair1_count = ?,
              repair1_price = ?,
              repair1_redo = ?,
              repair2_type_id = ?,
              repair2_count = ?,
              repair2_price = ?,
              repair2_redo = ?,
              repair3_type_id = ?,
              repair3_count = ?,
              repair3_price = ?,
              repair3_redo = ?,
              paid = ?,
              fee = ?,
              cashreceipt_num = ? 
              WHERE repair_detail_id =?`,
    values:[  store,
              register_date,
              fault_id,
              result_id,
              analysis_id,
              delivery_type, 
              message, 
              repair1_type_id,
              repair1_count,
              repair1_price,
              repair1_redo,
              repair2_type_id,
              repair2_count,
              repair2_price,
              repair2_redo,
              repair3_type_id,
              repair3_count,
              repair3_price,
              repair3_redo,
              paid,
              fee,
              cashreceipt_num,
              repair_detail_id
          ],
  });
};
const getReceiptInfo = async(receiptId) =>{
  return excuteQuery({
    query: "SELECT repair1_detail_id,repair2_detail_id,repair3_detail_id  FROM receipt WHERE receipt_id=?",
    values: [receiptId],
  });
};
const updateReceiptRepair = async (repair_detail_id,receiptId,num,paid) => {
  const insert = "repair"+num+"_detail_id"
  return excuteQuery({
    query: `UPDATE receipt SET ${insert}=?, paid=? WHERE receipt_id=?`,
    values: [repair_detail_id,paid,receiptId],
  });
};
const getFeeInfo = async(id) =>{
  return excuteQuery({
    query: `SELECT 
            repair1.fee AS repair1_fee,
            repair2.fee AS repair2_fee,
            repair3.fee AS repair3_fee
            FROM receipt
            LEFT JOIN  repair_detail AS repair1 ON repair1.repair_detail_id =receipt.repair1_detail_id
            LEFT JOIN  repair_detail AS repair2 ON repair2.repair_detail_id =receipt.repair2_detail_id
            LEFT JOIN  repair_detail AS repair3 ON repair3.repair_detail_id =receipt.repair3_detail_id
            WHERE receipt.receipt_id=?`,
    values: [id],
  });
}
const updateReceiptFee = async (receiptId,fee1,fee2,fee3) => {
  
  console.log("*********************")
  console.log(fee1,fee2,fee3)
  console.log()
  console.log("*********************")
  const insert = fee1+fee2+fee3
  return excuteQuery({
    query: `UPDATE receipt SET fee=? WHERE receipt_id=?`,
    values: [insert,receiptId],
  });
};
const sendRepairInfo = async (req, res) => {
  console.log("-----------------sendRepairInfo-------------------")
  if (req.method === "POST") {
    
    console.log(req.body)
    const receipt_id = req.body.receipt_id; 

    const store = req.body.store_id;
    const register_date = req.body.register_date;
    const fault_id = req.body.fault_id;
    const result_id = req.body.result_id;
    const analysis_id = req.body.analysis_id;
    const delivery_type = req.body.delivery_type; 
    const message = req.body.message; 

    const repair1_type_id = req.body.repair1_type_id;
    const repair1_count = req.body.repair1_count;
    const repair1_price = req.body.repair1_price;
    const repair1_redo	= req.body.repair1_redo;

    const repair2_type_id = req.body.repair2_type_id;
    const repair2_count = req.body.repair2_count;
    const repair2_price = req.body.repair2_price;
    const repair2_redo	= req.body.repair2_redo;

    const repair3_type_id = req.body.repair3_type_id;
    const repair3_count = req.body.repair3_count;
    const repair3_price = req.body.repair3_price;
    const repair3_redo	= req.body.repair3_redo;
    const paid = req.body.paid;
    const fee = req.body.fee;
    const cashreceipt_num = req.body.cashreceipt_num;
    const repair_detail_id = req.body.repair_detail_id;

    console.log("store")
    console.log(req.body)
    console.log(1,"repair_detail_id:",repair_detail_id)
    
    try {
        const info = await getReceiptInfo(receipt_id)
        console.log(2,"repair_detail_id:",repair_detail_id)
        if(info[0] !== undefined){
          console.log(3,"repair_detail_id:",repair_detail_id)
          if(repair_detail_id === null){
            const result = await addRepairDetail(receipt_id,store, register_date, fault_id, result_id,analysis_id,delivery_type,message,
              repair1_type_id,repair1_count,repair1_price,repair1_redo,
              repair2_type_id,repair2_count,repair2_price,repair2_redo,
              repair3_type_id,repair3_count,repair3_price,repair3_redo,
              paid,fee,cashreceipt_num,
            ); 
            console.log(result)
            const id = result.insertId
            const fees = await getFeeInfo(receipt_id)
            console.log(fees)
            //const feeUpdate= updateReceiptFee(receipt_id,fees[0].repair1_fee,fees[0].repair2_fee,fees[0].repair3_fee,)
            if(info[0].repair1_detail_id === null){
              const update =updateReceiptRepair(id,receipt_id,1,paid)
              console.log(update)
              res.status(200).json({ msg: "suc" });
            }else if(info[0].repair1_detail_id !== null&&info[0].repair2_detail_id === null){
              const update =updateReceiptRepair(id,receipt_id,2,paid)
              res.status(200).json({ msg: "suc" });
            }else if(info[0].repair1_detail_id !== null&&info[0].repair2_detail_id !== null && info[0].repair3_detail_id === null){
              const update =updateReceiptRepair(id,receipt_id,3,paid)
              res.status(200).json({ msg: "suc" });
            }else{
              res.status(205).json({msg : "Full"})
            }
          }
          else{
            const result = await updateRepairDetail(store, register_date, fault_id, result_id,analysis_id,delivery_type,message,
              repair1_type_id,repair1_count,repair1_price,repair1_redo,
              repair2_type_id,repair2_count,repair2_price,repair2_redo,
              repair3_type_id,repair3_count,repair3_price,repair3_redo,
              paid,fee,cashreceipt_num,repair_detail_id
            );
            
            const fees =  await getFeeInfo(receipt_id)
            
            const feeUpdate= updateReceiptFee(receipt_id,fees[0].repair1_fee,fees[0].repair2_fee,fees[0].repair3_fee,)
              
            console.log(result)
            //res.status(200).json({ msg: "suc" });
          }
        }
        else{
          res.status(210).json({ msg: "non proper receipt_id" });
        }
        
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default sendRepairInfo;