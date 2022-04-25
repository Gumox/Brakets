import formatDate from "./formatDate";
import store from "../store/store";
const sortInquiryDataHeadquarter = async(data , params,_analysisType,_judgmentResult,_faultType,types) =>{
    const shop = params.shop_id
    const analysis_type = _analysisType
    const judgment_result= _judgmentResult
    const fault_type= _faultType
    const repair_type = types

    let sorteddata=[];


    if(Array.isArray(data)){
        data.map((obj)=>{
            let newObj;
            let analysis_id= null,
                analysis_name = null,
                fault_id = null,
                fault_name = null,
                repair1_price = 0,
                repair1_type_id = null,
                repair2_price = 0,
                repair2_type_id = null,
                repair3_price = 0,
                repair3_type_id = null,
                repair_detail_id = 0,
                result_id = null,
                result_name = null,
                repair1_name = null,
                repair2_name = null,
                repair3_name = null,
                register_date = null,
                send_date = null,
                repair1_count=null,
                repair2_count=null,
                repair3_count=null,
                repair1_redo =null,
                repair2_redo =null,
                repair3_redo =null,
                fee =0,
                paid =null,
                repair_store_name = null,
                cashreceipt_num = null,
                
                complete_date  = null,
                shipment_type  = null,
                shipment_price = null               
                ;
               
                
            if(obj.repair1_store_id){

                analysis_id = obj.repair1_detail_analysis_id,
                fault_id = obj.repair1_detail_fault_id,
                repair1_price = obj.repair1_detail_repair1_price,
                repair1_type_id = obj.repair1_detail_repair1_type_id,
                repair2_price = obj.repair1_detail_repair2_price,
                repair2_type_id = obj.repair1_detail_repair2_type_id,
                repair3_price = obj.repair1_detail_repair3_price,
                repair3_type_id = obj.repair1_detail_repair3_type_id,
                repair_detail_id = obj.repair1_detail_id,
                result_id = obj.repair1_detail_result_id,
                
                repair1_count=obj.repair1_detail_repair1_count,
                repair2_count=obj.repair1_detail_repair2_count,
                repair3_count=obj.repair1_detail_repair3_count,
                repair1_redo =obj.repair1_detail_repair1_redo,
                repair2_redo =obj.repair1_detail_repair2_redo,
                repair3_redo =obj.repair1_detail_repair3_redo,
                fee = obj.repair1_fee,
                paid = obj.repair1_paid,
                repair_store_name = obj.repair1_store_name,
                cashreceipt_num =obj.repair1_cashreceipt_num
                
                complete_date  = obj.repair1_complete_date
                shipment_type  = obj.repair1_shipment_type
                shipment_price = obj.repair1_shipment_price  

                analysis_name = obj.repair1_fault_name
                
                result_name = obj.repair1_result_name
                
                fault_name = obj.repair1_analysis_name
                

                if(obj.repair1_register_date == null){
                    register_date = obj.repair1_register_date
                }else{
                    register_date = formatDate(new Date(obj.repair1_register_date))    
                }
                if(obj.repair1_send_date == null){
                    send_date = obj.repair1_send_date
                }else{
                    send_date = formatDate(new Date(obj.repair1_send_date))
                } 
                repair_type.map((el)=>{
                    if(repair1_type_id === el.value){
                        repair1_name = el.text;
                    }
                    if(repair2_type_id === el.value){
                        repair2_name = el.text;
                    }
                    if(repair3_type_id === el.value){
                        repair3_name = el.text;
                    }
                })

                
            newObj={
                brand_name: obj.brand_name,
                color: obj.color,
                customer_name: obj.customer_name,
                customer_phone: obj.customer_phone,
                degree: obj.degree ,
                headquarter_id: obj.headquarter_id,
                message: obj.message,
                image:obj.image,
                repair_message:obj.repair_message,
                mfr_id: obj.mfr_id,
                mfr_name: obj.mfr_name,
                headquarter_name:obj.headquarter_name,
                headquarter_store_id:obj.headquarter_store_id,
                product_name: obj.product_name,
                receipt_code: obj.receipt_code,
                receipt_date: formatDate(new Date(obj.receipt_date)),
                receipt_id: obj.receipt_id,
                season_code: obj.season_code,
                season_name: obj.season_name,
                size: obj.size,
                store_contact: obj.store_contact,
                store_message: obj.store_message,
                store_name: obj.store_name,
                style_code: obj.style_code,
                repair_detail_analysis_id: analysis_id,
                repair_detail_fault_id: fault_id,
                
                repair_detail_repair1_count: repair1_count,
                repair_detail_repair2_count: repair2_count,
                repair_detail_repair3_count: repair3_count,

                repair_detail_repair1_redo: repair1_redo,
                repair_detail_repair2_redo: repair2_redo,
                repair_detail_repair3_redo: repair3_redo,

                repair_detail_repair1_price: repair1_price,
                repair_detail_repair1_type_id: repair1_type_id,
                repair_detail_repair2_price: repair2_price,
                repair_detail_repair2_type_id: repair2_type_id,
                repair_detail_repair3_price: repair3_price,
                repair_detail_repair3_type_id: repair3_type_id,
                repair_detail_repair_detail_id: repair_detail_id,
                repair_detail_result_id: result_id,
                fault : fault_name,
                result : result_name,
                analysis : analysis_name,
                repair1_name: repair1_name,
                repair2_name: repair2_name,
                repair3_name: repair3_name,
                register_date: register_date,
                send_date: send_date,
                paid :paid,
                fee:fee,
                repair_store_name : repair_store_name,
                cashreceipt_num:cashreceipt_num,
                
                complete_date  : complete_date,
                shipment_type  : shipment_type,
                shipment_price : shipment_price,
                
                
            }
            sorteddata.push(newObj)
               
            }
            if(obj.repair2_store_id ){

                analysis_id = obj.repair2_detail_analysis_id,
                fault_id = obj.repair2_detail_fault_id,
                repair1_price = obj.repair2_detail_repair1_price,
                repair1_type_id = obj.repair2_detail_repair1_type_id,
                repair2_price = obj.repair2_detail_repair2_price,
                repair2_type_id = obj.repair2_detail_repair2_type_id,
                repair3_price = obj.repair2_detail_repair3_price,
                repair3_type_id = obj.repair2_detail_repair3_type_id,
                repair_detail_id = obj.repair2_detail_id,
                result_id = obj.repair2_detail_result_id,
                
                repair1_count=obj.repair2_detail_repair1_count,
                repair2_count=obj.repair2_detail_repair2_count,
                repair3_count=obj.repair2_detail_repair3_count,
                repair1_redo =obj.repair2_detail_repair1_redo,
                repair2_redo =obj.repair2_detail_repair2_redo,
                repair3_redo =obj.repair2_detail_repair3_redo,
                fee = obj.repair2_fee,
                paid = obj.repair2_paid 
                repair_store_name = obj.repair2_store_name
                cashreceipt_num =obj.repair1_cashreceipt_num

                complete_date  = obj.repair2_complete_date
                shipment_type  = obj.repair2_shipment_type
                shipment_price = obj.repair2_shipment_price  

                analysis_name = obj.repair2_fault_name
                
                result_name = obj.repair2_result_name
                
                fault_name = obj.repair2_analysis_name

                if(obj.repair2_register_date == null){
                    register_date = obj.repair2_register_date
                }else{
                    register_date = formatDate(new Date(obj.repair2_register_date))    
                }
                if(obj.repair2_send_date == null){
                    send_date = obj.repair2_send_date
                }else{
                    send_date = formatDate(new Date(obj.repair2_send_date))
                }
                repair_type.map((el)=>{
                    if(repair1_type_id === el.value){
                        repair1_name = el.text;
                    }
                    if(repair2_type_id === el.value){
                        repair2_name = el.text;
                    }
                    if(repair3_type_id === el.value){
                        repair3_name = el.text;
                    }
                })
                
            newObj={
                brand_name: obj.brand_name,
                color: obj.color,
                customer_name: obj.customer_name,
                customer_phone: obj.customer_phone,
                degree: obj.degree ,
                headquarter_id: obj.headquarter_id,
                message: obj.message,
                image:obj.image,
                repair_message:obj.repair_message,
                mfr_id: obj.mfr_id,
                mfr_name: obj.mfr_name,
                headquarter_name:obj.headquarter_name,
                headquarter_store_id:obj.headquarter_store_id,
                product_name: obj.product_name,
                receipt_code: obj.receipt_code,
                receipt_date: formatDate(new Date(obj.receipt_date)),
                receipt_id: obj.receipt_id,
                season_code: obj.season_code,
                season_name: obj.season_name,
                size: obj.size,
                store_contact: obj.store_contact,
                store_message: obj.store_message,
                store_name: obj.store_name,
                style_code: obj.style_code,
                repair_detail_analysis_id: analysis_id,
                repair_detail_fault_id: fault_id,
                
                repair_detail_repair1_count: repair1_count,
                repair_detail_repair2_count: repair2_count,
                repair_detail_repair3_count: repair3_count,

                repair_detail_repair1_redo: repair1_redo,
                repair_detail_repair2_redo: repair2_redo,
                repair_detail_repair3_redo: repair3_redo,

                repair_detail_repair1_price: repair1_price,
                repair_detail_repair1_type_id: repair1_type_id,
                repair_detail_repair2_price: repair2_price,
                repair_detail_repair2_type_id: repair2_type_id,
                repair_detail_repair3_price: repair3_price,
                repair_detail_repair3_type_id: repair3_type_id,
                repair_detail_repair_detail_id: repair_detail_id,
                repair_detail_result_id: result_id,
                fault : fault_name,
                result : result_name,
                analysis : analysis_name,
                repair1_name: repair1_name,
                repair2_name: repair2_name,
                repair3_name: repair3_name,
                register_date: register_date,
                send_date: send_date,
                paid :paid,
                fee:fee,
                repair_store_name : repair_store_name,
                cashreceipt_num:cashreceipt_num,
                
                complete_date  : complete_date,
                shipment_type  : shipment_type,
                shipment_price : shipment_price
            }
            sorteddata.push(newObj)

            }
            if(obj.repair3_store_id ){

                analysis_id = obj.repair3_detail_analysis_id,
                fault_id = obj.repair3_detail_fault_id,
                repair1_price = obj.repair3_detail_repair1_price,
                repair1_type_id = obj.repair3_detail_repair1_type_id,
                repair2_price = obj.repair3_detail_repair2_price,
                repair2_type_id = obj.repair3_detail_repair2_type_id,
                repair3_price = obj.repair3_detail_repair3_price,
                repair3_type_id = obj.repair3_detail_repair3_type_id,
                repair_detail_id = obj.repair3_detail_id,
                result_id = obj.repair3_detail_result_id,
                
                repair1_count=obj.repair3_detail_repair1_count,
                repair2_count=obj.repair3_detail_repair2_count,
                repair3_count=obj.repair3_detail_repair3_count,
                repair1_redo =obj.repair3_detail_repair1_redo,
                repair2_redo =obj.repair3_detail_repair2_redo,
                repair3_redo =obj.repair3_detail_repair3_redo,
                
                fee = obj.repair3_fee,
                paid = obj.repair3_paid 
                repair_store_name = obj.repair3_store_name
                cashreceipt_num =obj.repair1_cashreceipt_num

                complete_date  = obj.repair3_complete_date
                shipment_type  = obj.repair3_shipment_type
                shipment_price = obj.repair3_shipment_price  

                analysis_name = obj.repair3_fault_name
                
                result_name = obj.repair3_result_name
                
                fault_name = obj.repair3_analysis_name

                if(obj.repair3_register_date == null){
                    register_date = obj.repair3_register_date
                }else{
                    register_date = formatDate(new Date(obj.repair3_register_date))    
                }
                if(obj.repair3_send_date == null){
                    send_date = obj.repair3_send_date
                }else{
                    send_date = formatDate(new Date(obj.repair3_send_date))
                }
                repair_type.map((el)=>{
                    if(repair1_type_id === el.value){
                        repair1_name = el.text;
                    }
                    if(repair2_type_id === el.value){
                        repair2_name = el.text;
                    }
                    if(repair3_type_id === el.value){
                        repair3_name = el.text;
                    }
                })
                
            newObj={
                brand_name: obj.brand_name,
                color: obj.color,
                customer_name: obj.customer_name,
                customer_phone: obj.customer_phone,
                degree: obj.degree ,
                headquarter_id: obj.headquarter_id,
                message: obj.message,
                image:obj.image,
                repair_message:obj.repair_message,
                mfr_id: obj.mfr_id,
                mfr_name: obj.mfr_name,
                headquarter_name:obj.headquarter_name,
                headquarter_store_id:obj.headquarter_store_id,
                product_name: obj.product_name,
                receipt_code: obj.receipt_code,
                receipt_date: formatDate(new Date(obj.receipt_date)),
                receipt_id: obj.receipt_id,
                season_code: obj.season_code,
                season_name: obj.season_name,
                size: obj.size,
                store_contact: obj.store_contact,
                store_message: obj.store_message,
                store_name: obj.store_name,
                style_code: obj.style_code,
                repair_detail_analysis_id: analysis_id,
                repair_detail_fault_id: fault_id,
                
                repair_detail_repair1_count: repair1_count,
                repair_detail_repair2_count: repair2_count,
                repair_detail_repair3_count: repair3_count,

                repair_detail_repair1_redo: repair1_redo,
                repair_detail_repair2_redo: repair2_redo,
                repair_detail_repair3_redo: repair3_redo,

                repair_detail_repair1_price: repair1_price,
                repair_detail_repair1_type_id: repair1_type_id,
                repair_detail_repair2_price: repair2_price,
                repair_detail_repair2_type_id: repair2_type_id,
                repair_detail_repair3_price: repair3_price,
                repair_detail_repair3_type_id: repair3_type_id,
                repair_detail_repair_detail_id: repair_detail_id,
                repair_detail_result_id: result_id,
                fault : fault_name,
                result : result_name,
                analysis : analysis_name,
                repair1_name: repair1_name,
                repair2_name: repair2_name,
                repair3_name: repair3_name,
                register_date: register_date,
                send_date: send_date,
                paid :paid,
                fee:fee,
                repair_store_name : repair_store_name,
                cashreceipt_num:cashreceipt_num,
                
                complete_date  : complete_date,
                shipment_type  : shipment_type,
                shipment_price : shipment_price
            }
            sorteddata.push(newObj)
            }
        })
    }
    return(sorteddata)
}
export default sortInquiryDataHeadquarter;