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
  complete_date,
  shipment_type,
  shipment_price
) => {
    
  return excuteQuery({
    query:
      "INSERT INTO `repair_detail`(`receipt_id`,`store_id`, `register_date`,`fault_id`,`result_id`,`analysis_id`, `delivery_type`, `message`,`complete_date`,`shipment_type`,`shipment_price`) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
    values: [receipt_id,store,  register_date, fault_id, result_id, analysis_id, delivery_type, message, complete_date, shipment_type, shipment_price],
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
  complete_date,
  shipment_type,
  shipment_price,
  repair_detail_id
) => {
    
  return excuteQuery({
    query:
      `UPDATE repair_detail SET 
              store_id =?,
              register_date =?,
              fault_id =?,
              result_id =?,
              analysis_id =?, 
              delivery_type =?,
              message =?,
              complete_date =?,
              shipment_type =?,
              shipment_price =?
              WHERE repair_detail_id =?`,
    values: [ store,
              register_date, 
              fault_id, 
              result_id, 
              analysis_id, 
              delivery_type, 
              message, 
              complete_date, 
              shipment_type,
              shipment_price,
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
const updateReceiptRepair = async (repair_detail_id,receiptId,receiver,num) => {//reciever 추가
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
    const receiver = req.body.receiver
    const repair_detail_id = req.body.repair_detail_id

    console.log("store")
    console.log(req.body)
    
    try {
        const info = await getReceiptInfo(receipt_id)
        if(repair_detail_id == null){
          if(info[0] !== undefined){
            const result = await addRepairDetail(receipt_id,store, register_date, fault_id, result_id,analysis_id,delivery_type,message,
                  complete_date,shipment_type,shipment_price);
              
              console.log(result)
              const id = result.insertId
            if(info[0].repair1_detail_id === null){
              const update =updateReceiptRepair(id,receipt_id,receiver,1)
              res.status(200).json({ msg: "suc" });
            }else if(info[0].repair2_detail_id === null){
              const update =updateReceiptRepair(id,receipt_id,receiver,2)
              res.status(200).json({ msg: "suc" });
            }else if(info[0].repair3_detail_id === null){
              const update =updateReceiptRepair(id,receipt_id,receiver,3)
              res.status(200).json({ msg: "suc" });
            }else{
              res.status(205).json({msg : "Full"})
            }
            console.log(info)
          }
          else{
            res.status(210).json({ msg: "non proper receipt_id" });
          }
        }else{
          console.log("update")
          const result = await updateRepairDetail(store, register_date, fault_id, result_id,analysis_id,delivery_type,message,
            complete_date,shipment_type,shipment_price,repair_detail_id);
            console.log(result)
            res.status(200).json({ msg: "suc" });
        }
        
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default sendRepairInfo;