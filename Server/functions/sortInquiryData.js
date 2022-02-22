import formatDate from "./formatDate";
import store from "../store/store";
const sortInquiryData = async(data , params,types) =>{
    const shop = params.shop_id
    const analysis_type = JSON.parse(localStorage.getItem('ANALYSIS'))
    const judgment_result= JSON.parse(localStorage.getItem('JUDIMENT'))
    const fault_type= JSON.parse(localStorage.getItem('FAULT'))
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
                send_date = null
                ;
            if(obj.repair1_store_id == shop){

                analysis_id = obj.repair1_detail_analysis_id,
                fault_id = obj.repair1_detail_fault_id,
                repair1_price = obj.repair1_detail_repair1_price,
                repair1_type_id = obj.repair1_detail_repair1_type_id,
                repair2_price = obj.repair1_detail_repair2_price,
                repair2_type_id = obj.repair1_detail_repair2_type_id,
                repair3_price = obj.repair1_detail_repair3_price,
                repair3_type_id = obj.repair1_detail_repair3_type_id,
                repair_detail_id = obj.repair1_detail_id,
                result_id = obj.repair1_detail_result_id
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
               
            }else if(obj.repair2_store_id == shop){

                analysis_id = obj.repair2_detail_analysis_id,
                fault_id = obj.repair2_detail_fault_id,
                repair1_price = obj.repair2_detail_repair1_price,
                repair1_type_id = obj.repair2_detail_repair1_type_id,
                repair2_price = obj.repair2_detail_repair2_price,
                repair2_type_id = obj.repair2_detail_repair2_type_id,
                repair3_price = obj.repair2_detail_repair3_price,
                repair3_type_id = obj.repair2_detail_repair3_type_id,
                repair_detail_id = obj.repair2_detail_id,
                result_id = obj.repair2_detail_result_id
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

            }else if(obj.repair3_store_id == shop){

                analysis_id = obj.repair3_detail_analysis_id,
                fault_id = obj.repair3_detail_fault_id,
                repair1_price = obj.repair3_detail_repair1_price,
                repair1_type_id = obj.repair3_detail_repair1_type_id,
                repair2_price = obj.repair3_detail_repair2_price,
                repair2_type_id = obj.repair3_detail_repair2_type_id,
                repair3_price = obj.repair3_detail_repair3_price,
                repair3_type_id = obj.repair3_detail_repair3_type_id,
                repair_detail_id = obj.repair3_detail_id,
                result_id = obj.repair3_detail_result_id 
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
            } 
            analysis_type.map((el)=>{
                if(analysis_id === el.analysis_code){
                    analysis_name = el.analysis_name
                }
            })
            judgment_result.map((el)=>{
                if(result_id === el.judgment_code){
                    result_name = el.judgment_name
                }
            })
            fault_type.map((el)=>{
                if(fault_id === el.fault_code){

                    fault_name = el.fault_name
                }
            })
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
                mfr_id: obj.mfr_id,
                mfr_name: obj.mfr_name,
                name: obj.name,
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
                send_date: send_date
            }
            sorteddata.push(newObj)
        })
    }
    return(sorteddata)
}
export default sortInquiryData;