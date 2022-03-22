
import store from "../store/store";
import ip from "../serverIp/Ip";
import axios from "axios";
const getProductCategory = async () => {
   
    const option = {
        url: ip+'/api/getProductCategory',
        method: 'POST',

        // 
        header: {
            'Content-Type': 'application/json'
        },
        data: {
            brand:  store.getState().brand_id,
        }
    }
    //console.log(store.getState().brand_id)
    axios(option)
    .then(
        response => (response.status == '200') ? (
           console.log(response.data),
           store.dispatch({type:'GET_APL_TYPE',setAplType: response.data.body})
        ) : (
            console.log("204")
        )
    )
    .catch(function(error){
        console.log(error)
        
    })
}
const SetReReceiptInfo=(data)=>{
    store.dispatch({type:'RECEIPT_ID',receipt_id: data.receipt_id});
    store.dispatch({type:'SEASON_ID',season_id: data.product_season_id})

    if(data.category==1){
        store.dispatch({type:'RECEPITION_DIVISION',receptionDivision: {name:"고객용",id:1}});
    }else if(data.category==2){
        store.dispatch({type:'RECEPITION_DIVISION',receptionDivision: {name:"매장용-선처리",id:2}});
    }else if(data.category==3){
        store.dispatch({type:'RECEPITION_DIVISION',receptionDivision:{name:"매장용",id:3} });
    }

    if(data.receipt_type==1){
        store.dispatch({type:'REQUIREMENT',requirement:{name:"수선",id:1}});
        getProductCategory();
    }else if(data.receipt_type==2){
        store.dispatch({type:'REQUIREMENT',requirement:{name:"교환",id:2}});
        store.dispatch({type:'SAVE_BASIC_REPAIR_STORE',basicRepairStore: "본사"});
    }else if(data.receipt_type==3){
        store.dispatch({type:'REQUIREMENT',requirement:{name:"환불",id:3}});
        store.dispatch({type:'SAVE_BASIC_REPAIR_STORE',basicRepairStore: "본사"});
    }else if(data.receipt_type==4){
        store.dispatch({type:'REQUIREMENT',requirement:{name:"심의",id:4}});
        store.dispatch({type:'SAVE_BASIC_REPAIR_STORE',basicRepairStore: "본사"});
    }
    if(data.image){
        store.dispatch({type:'SAVE_BASIC_REPAIR_STORE',basicRepairStore: data.receiver_name});
    }
    if(data.receipt_code){
        store.dispatch({type:'SERVICECAED',value:data.receipt_code});
    }

}
export default SetReReceiptInfo