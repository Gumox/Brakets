import excuteQuery from "../db";

async function updateReceipt(query, values) {
  const result = await excuteQuery({
    query: `UPDATE receipt 
            SET complete_date=?
                ${query} 
            WHERE receipt_id=?`,
    values,
  });

  return result;
}
async function getRepairDetail( repair_detail_id ) {
    const result = await excuteQuery({
      query: `SELECT * 
              FROM repair_detail
              WHERE repair_detail_id =?`,
      values:[repair_detail_id],
    });
  
    return result;
  }
async function getMfr( mfr_detail_id  ) {
    const result = await excuteQuery({
      query: `SELECT * 
              FROM mfr_detail
              WHERE mfr_detail_id  =?`,
      values:[mfr_detail_id ],
    });
  
    return result;
  }
async function updateRepairDetail( send_date,repair_detail_id ) {
    const result = await excuteQuery({
      query: `UPDATE repair_detail 
              SET send_date = ?
              WHERE repair_detail_id =?`,
      values:[send_date,repair_detail_id],
    });
  
    return result;
  }
async function updateMfr( send_date,mfr_detail_id  ) {
    const result = await excuteQuery({
      query: `UPDATE mfr_detail
              SET send_date = ?
              WHERE mfr_detail_id  =?`,
      values:[send_date,mfr_detail_id ],
    });
  
    return result;
  }
  async function insertRepairDetail( repair_id,receipt_id,send_date ) {
    const result = await excuteQuery({
      query: 
            "INSERT INTO `mfr_detail` ( `store_id`,`receipt_id`, `send_date`) VALUES (?,?,?)",
      values:[repair_id,receipt_id,send_date],
    });
  
    return result;
  }
async function insertMfr( mfr_id,receipt_id,send_date) {
    const result = await excuteQuery({
      query: 
            "INSERT INTO `mfr_detail` ( `store_id`, `receipt_id`, `send_date`) VALUES (?,?,?)",
      values:[mfr_id,receipt_id,send_date],
    });
  
    return result;
  }
const receipt = async (req, res) => {
  if (req.method === "PUT") {
    console.log("req.headers.referer");
    console.log(req.headers.referer);
    console.log("req.query");
    console.log(req.body.body);
    try {
        const {
            receipt_id,     // 필수
            register_date,  
            result_id,
            result_detail,
            fault_id,
            analysis_id,
            receipt_message,
            repair1_id,
            repair2_id,
            repair3_id,
            repair1_detail_id,
            repair2_detail_id,
            repair3_detail_id,
            repair1_send_date,
            repair2_send_date,
            repair3_send_date,
            paid,
            fee,
            complete_date,  // 필수 : 발송일 to S
            mfr_id,
            mfr_detail_id,
            mfr_send_date,
            cashreceipt_num, // 현금영수증번호
            discount,
            discount_price,
            claim,
            claim_price,
        } = req.body.body;
        let query = "";
        let values = [complete_date];

        if(result_id){          // 판정결과
            query += `, result_id = ?`
            values = [...values,result_id]
            if(result_detail){
                query += `, result_detail = ?` 
                values = [...values,result_detail]   
            }
        }
        if(fault_id){           //과실구분
            query += `, fault_id = ?`
            values = [...values,fault_id]
        }
        if(analysis_id){        //내용분석
            query += `, analysis_id = ?`
            values = [...values,analysis_id]
        }
        if(receipt_message){    //본사설명
            query += `, message = ?`
            values = [...values,receipt_message]
        }
        
        if(paid){               //유상수선비 체크박스
            query += `, paid = ?`
            values = [...values,paid]
            if(fee){            //유상수선비 
                query += `, fee = ?` 
                values = [...values,fee]   
            }
        }
        if(register_date){          //본사 접수일
            query += `, register_date = ?`
            values = [...values,register_date]
        }
        
        if(cashreceipt_num){    //현금영수증
            query += `, cashreceipt_num = ?`
            values = [...values,cashreceipt_num]
        }
        if(discount){          //할인율
          query += `, discount = ?`
          values = [...values,discount]
          
          if(discount_price){          
            query += `, discount_price = ?`
            values = [...values,discount_price]
          }
        }
      
        if(claim){              //클레임가
          query += `, claim = ?`
          values = [...values,claim]
          if(claim_price){    
            query += `, claim_price = ?`
            values = [...values,claim_price]
          }
        }
     
        
        values = [...values,receipt_id]
        console.log(query)
        console.log(values)
        const receipt = await updateReceipt(query, values);
        if(repair1_detail_id){
            const repair =await getRepairDetail(repair1_detail_id)
            if(repair.length){
                const updateResult = await updateRepairDetail(repair1_send_date,repair1_detail_id)
                if (updateResult.error) throw new Error(updateResult.error);
            }else{
                const insertResult =await insertRepairDetail(repair1_id,receipt_id,repair1_send_date)
                if (insertResult.error) throw new Error(insertResult.error);
            }
        }
        if(repair2_detail_id){
            const repair =await getRepairDetail(repair2_detail_id)
            if(repair.length){
                const updateResult = await updateRepairDetail(repair2_send_date,repair2_detail_id)
                if (updateResult.error) throw new Error(updateResult.error);
            }else{
                const insertResult =await insertRepairDetail(repair2_id,receipt_id,repair2_send_date)
                if (insertResult.error) throw new Error(insertResult.error);
            }
        }
        if(repair3_detail_id){
            const repair =await getRepairDetail(repair3_detail_id)
            if(repair.length){
                const updateResult = await updateRepairDetail(repair3_send_date,repair3_detail_id)
                if (updateResult.error) throw new Error(updateResult.error);
            }else{
                const insertResult =await insertRepairDetail(repair3_id,receipt_id,repair3_send_date)
                if (insertResult.error) throw new Error(insertResult.error);
            }
        }
        if(mfr_detail_id){
            const mfr =await getMfr(mfr_detail_id)
            if(mfr.length){
                const updateResult = await updateMfr(mfr_send_date,mfr_detail_id)
                if (updateResult.error) throw new Error(updateResult.error);
            }else{
                const insertResult =await insertMfr(mfr_id,receipt_id,mfr_send_date)
                if (insertResult.error) throw new Error(insertResult.error);
            }
        }
        if (receipt.error) throw new Error(receipt.error);
        res.status(200).json({ data: receipt });
        } catch (err) {
        console.log(err.message);
        res.status(400).json({err: err.message});
    }
  }
};

export default receipt;
/*
                    receipt.discount AS discount,
                    receipt.discount_price AS discount_price,
                    receipt.claim AS claim,
                    receipt.claim_price AS claim_price, */