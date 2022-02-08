import excuteQuery from "../../db";

/**
 * 0단계 고객 수정
 */
const addRepairDetail = async (
  store,
  register_date,
  fault_id,
  result_id,
  analysis_id,
  delivery_type,
  message,
  complete_date,
  shipment_type,
  shipment_price
) => {
    console.log({store,
        register_date,
        fault_id,
        result_id,
        analysis_id,
        delivery_type,
        message,
        complete_date,
        shipment_type,
        shipment_price

    })
  return excuteQuery({
    query:
      "INSERT INTO `repair_detail`(`store_id`, `register_date`,`fault_id`,`result_id`,`analysis_id`, `delivery_type`, `message`,`complete_date`,`shipment_type`,`shipment_price`) VALUES (?,?,?,?,?,?,?,?,?,?)",
    values: [store,  register_date, fault_id, result_id, analysis_id, delivery_type, message, complete_date, shipment_type, shipment_price],
  });
};

const getReceiptInfo = async(receiptId) =>{
  return excuteQuery({
    query: "SELECT repair1_detail_id,repair2_detail_id,repair3_detail_id  FROM receipt WHERE receipt_id=?",
    values: [receiptId],
  });
};
const updateReceiptRepair = async (repair_detail_id,receiptId,num) => {
  const insert = "repair"+num+"_detail_id"
  return excuteQuery({
    query: `UPDATE receipt SET ${insert}=? WHERE receipt_id=?`,
    values: [repair_detail_id,receiptId],
  });
};
const sendRepairInfo = async (req, res) => {
  if (req.method === "POST") {
    console.log(`[${new Date().toISOString()}] /api/RepairShop/sendRepairInfo`);
    
    console.log(req.body)
    const receipt_id = req.body.receipt_id; 

    const store = req.body.store_id;
    const register_date = req.body.register_date;
    const fault_id = req.body.fault_id;

    const result_id = req.body.result_id;
    
    const analysis_id = req.body.analysis_id;
    const delivery_type = req.body.delivery_type; 
    const message = req.body.message; 
    
    const complete_date =req.body.complete_date
    const shipment_type =req.body.shipment_type
    const shipment_price =req.body.shipment_price


    console.log("store")
    console.log(req.body)
    
    try {
        const info = await getReceiptInfo(receipt_id)
        if(info[0] !== undefined){
          const result = await addRepairDetail(store, register_date, fault_id, result_id,analysis_id,delivery_type,message,
                complete_date,shipment_type,shipment_price);
            
            console.log(result)
            const id = result.insertId
          if(info[0].repair1_detail_id === null){
            const update =updateReceiptRepair(id,receipt_id,1)
            res.status(200).json({ msg: "suc" });
          }else if(info[0].repair2_detail_id === null){
            const update =updateReceiptRepair(id,receipt_id,2)
            res.status(200).json({ msg: "suc" });
          }else if(info[0].repair3_detail_id === null){
            const update =updateReceiptRepair(id,receipt_id,3)
            res.status(200).json({ msg: "suc" });
          }else{
            res.status(205).json({msg : "Full"})
          }
          console.log(info)
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