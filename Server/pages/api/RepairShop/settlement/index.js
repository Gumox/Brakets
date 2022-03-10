import excuteQuery from "../../db";

async function getList(query,values) {
    const result = await excuteQuery({
        query: `SELECT 
                        receipt.receipt_code,
                        brand.headquarter_id,
                        brand.brand_code,
                        store.store_id,
                        store.name,
                        repair_detail.hq_staff,
                        repair_detail.repair_staff,
                        store.contact AS store_contact,
                        repair_detail.repair_detail_id,
                        repair_detail.store_id,
                        repair_detail.send_date,
                        repair_detail.register_date,
                        repair_detail.delivery_type,
                        repair_detail.fault_id,
                        repair_detail.result_id,
                        repair_detail.analysis_id,
                        repair_detail.message,
                        repair_detail.repair1_type_id,
                        repair_detail.repair1_count,
                        repair_detail.repair1_price,
                        repair_detail.repair1_redo,
                        repair_detail.repair2_type_id,
                        repair_detail.repair2_count,
                        repair_detail.repair2_price,
                        repair_detail.repair2_redo,
                        repair_detail.repair3_type_id,
                        repair_detail.repair3_count,
                        repair_detail.repair3_price,
                        repair_detail.repair3_redo,
                        repair_detail.complete_date,
                        repair_detail.shipment_type,
                        repair_detail.shipment_price,
                        repair_detail.repair_detail_state,
                        repair_detail.confirm_date,
                        repair_detail.adjustment,
                        repair_detail.adjustment_reason,
                        repair_detail.remarks,
                        customer.customer_id AS customer_id,
                        customer.name AS customer_name,
                        customer.phone AS customer_phone	
                FROM repair_detail
                LEFT JOIN receipt ON receipt.receipt_id = repair_detail.receipt_id
                LEFT JOIN brand ON brand.brand_id = receipt.brand_id
                LEFT JOIN store ON repair_detail.store_id = store.store_id
                LEFT JOIN customer ON receipt.customer_id = customer.customer_id
                WHERE repair_detail_state !=3 ${query}`,
      values,
    });
    return result;
  }

const settlement = async (req, res) => {
  if (req.method == "GET") {
    console.log("api/RepairShop/settlement")

    const {
        hq_id,
        brand,
        repairShop,
        selectOption,
        startDate,
        endDate
    } = req.query;
    let query = "";
    let values = [];
    console.log(req.query)
    
    if(hq_id&&hq_id!='전체'){
    
        query += "AND brand.headquarter_id = ? ";
        values = [...values, hq_id];
    
    }
    if(brand&&brand!='전체'){
    
        query += "AND brand.brand_id = ? ";
        values = [...values, brand];
        
    }
    if(repairShop){
    
        query += " AND repair_detail.store_id = ? ";
        values = [...values, repairShop];
        
    }
    if(selectOption){//complete_date 발송일,register_date 접수일
        if (startDate !== null || endDate !== null) {
            
            if (startDate) {
            query += ` AND DATE(repair_detail.${selectOption}) > ? `;
            values = [...values, startDate];
            }
            if (endDate) {
            query += ` AND DATE(repair_detail.${selectOption}) <= ? `;
            values = [...values, endDate];
            }
            
        }
    }

    try {
        console.log(":::::::::::::::::")
        console.log(query)
        console.log(values)
        const result = await getList(query,values);
        if (result.error) throw new Error(result.error);
        res.status(200).json({data: result});
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ err: err.message });
    } finally {
        res.end();
    }
  }
};

export default settlement;