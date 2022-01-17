import excuteQuery from "../../db";

/**
 * 0단계 고객 수정
 */
 const addRepairDetail = async (
    store,
    send_date,
    register_date,
    delivery_type,
    message,
    complete_date,
    shipment_type,
    shipment_price,
  ) => {
    console.log(store,
        send_date,
        register_date,
        delivery_type,
        message,
        complete_date,
        shipment_type,
        shipment_price)
    return excuteQuery({
      query:
        "INSERT INTO `repair_detail`(`store_id`, `send_date`, `register_date`, `delivery_type`, `message`, `complete_date`, `shipment_type`, `shipment_price`) VALUES (?,?,?,?,?,?,?,?)",
      values: [store, send_date, register_date, delivery_type, message, complete_date, shipment_type,  shipment_price],
    });
  };

  const updateReceiptRepair = async (receiptId, {pcategory, message, receiver}) => {
    return excuteQuery({
      query: "UPDATE receipt SET pcategory_id=?, store_message=?, receiver=? WHERE receipt_id=?",
      values: [pcategory, message, receiver, receiptId],
    });
  };

  const updateRepairDetail = async (Id, complete_date, shipment_type, shipment_price) => {
    return excuteQuery({
      query: "UPDATE repair_detail SET complete_date=?, shipment_type=?, shipment_price=? WHERE repair_detail_id=?",
      values: [complete_date, shipment_type, shipment_price, Id],
    });
  };
const sendRepairInfo = async (req, res) => {
  if (req.method === "PUT") {
    console.log(`[${new Date().toISOString()}] /api/RepairShop/sendRepairInfo`);
    
    console.log(req.body)

    const store = req.body.store;
    const send_date = req.body.send_date;
    const register_date = req.body.register_date;
    const delivery_type = req.body.delivery_type;
    const message = req.body.message;
    const complete_date = req.body.complete_date;
    const shipment_type = req.body.shipment_type;
    const shipment_price = req.body.shipment_price;
    const repair_detail_id  = req.body.repair_detail_id ;

    console.log("store : "+ store)
    if (!store) {
        return res.status(400).send();
    }
    try {
        
        //const result = await addRepairDetail(store , send_date, register_date, delivery_type, message, complete_date, shipment_type,  shipment_price);
        const result = await updateRepairDetail(repair_detail_id,complete_date,shipment_type,shipment_price)
        if (result.error) throw new Error(result.error);

            console.log(result)
            
        if (result.changedRows) {
            console.log("update RepairInfo");
            //res.json({body});
            res.status(200).json({ changed: result.changedRows});
        } else {
            console.log("update RepairInfo Fail");
            res.status(400).json({ message: "update RepairInfo Fail" });
        }
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ err: err.message });
    }
  }
};

export default sendRepairInfo;