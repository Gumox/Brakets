import excuteQuery from "../../db";


  const updateRepairDetail = async (Id, complete_date, shipment_type, shipment_price) => {
    return excuteQuery({
      query: "UPDATE repair_detail SET complete_date=?, shipment_type=?, shipment_price=? WHERE repair_detail_id=?",
      values: [complete_date, shipment_type, shipment_price, Id],
    });
  };
  const updateReceipt = async (Id,store) => {
    console.log(Id,store)
    return excuteQuery({
      query: "UPDATE receipt SET receiver=? WHERE receipt_id =?",
      values: [store, Id],
    });
  };
  const getInfo = async (Id ) => {
    return excuteQuery({
      query: "SELECT receipt_id FROM repair_detail WHERE repair_detail_id=?",
      values: [ Id],
    });
  };
const sendRepairInfo = async (req, res) => {
  if (req.method === "PUT") {
    console.log(`[${new Date().toISOString()}] /api/RepairShop/sendRepairInfo`);
    
    console.log(req.body)

    const store = req.body.store;
    const complete_date = req.body.complete_date;
    const shipment_type = req.body.shipment_type;
    const shipment_price = req.body.shipment_price;
    const repair_detail_id  = req.body.repair_detail_id ;

    console.log("store : "+ store)
    
    try {
        
        const result = await updateRepairDetail(repair_detail_id,complete_date,shipment_type,shipment_price)
        const info = await getInfo(repair_detail_id)
        if (result.error) throw new Error(result.error);

            console.log(result)
            
        if (result) {
            console.log("update RepairInfo");
            const updateReceiver = await updateReceipt(info[0].receipt_id,store)
            //res.json({body});
            res.status(200).json({ changed: result.changedRows,changed2:updateReceiver.changedRows});
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