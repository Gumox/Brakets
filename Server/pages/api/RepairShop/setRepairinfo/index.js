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
    repair3_redo
  ) => {
    return excuteQuery({
      query:
        "INSERT INTO `repair_detail`(`store_id`, `register_date`,`fault_id`,`result_id`,`analysis_id`, `delivery_type`, `message`,`repair1_type_id`,`repair1_count`,`repair1_price`,`repair1_redo`,`repair2_type_id`,`repair2_count`,`repair2_price`,`repair2_redo`,`repair3_type_id`,`repair3_count`,`repair3_price`,`repair3_redo` ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      values: [store,  register_date, fault_id,result_id,analysis_id,delivery_type, message, repair1_type_id,repair1_count,repair1_price,repair1_redo,repair2_type_id,repair2_count,repair2_price,repair2_redo,repair3_type_id,repair3_count,repair3_price,repair3_redo],
    });
  };

  const updateReceiptRepair = async (receiptId, pcategory, message, receiver) => {
    return excuteQuery({
      query: "UPDATE receipt SET pcategory_id=?, store_message=?, receiver=? WHERE receipt_id=?",
      values: [pcategory, message, receiver, receiptId],
    });
  };
const sendRepairInfo = async (req, res) => {
  if (req.method === "POST") {
    console.log(`[${new Date().toISOString()}] /api/RepairShop/sendRepairInfo`);
    
    console.log(req.body)

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

    console.log("store : "+ store)
    
    try {
        
        const result = await addRepairDetail(store, register_date, fault_id, result_id,analysis_id,delivery_type,message,
            repair1_type_id,repair1_count,repair1_price,repair1_redo,
            repair2_type_id,repair2_count,repair2_price,repair2_redo,
            repair3_type_id,repair3_count,repair3_price,repair3_redo,
            );
        console.log(result)
        res.status(200).json({ msg: "suc" });
        
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default sendRepairInfo;