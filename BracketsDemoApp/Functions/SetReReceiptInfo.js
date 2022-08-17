
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
    axios(option)
    .then(
        response => (response.status == '200') ? (
           store.dispatch({type:'GET_APL_TYPE',setAplType: response.data.body})
           
        ) : (
            console.log("204")
        )
    )
    .catch(function(error){
        
    })
}
export const getRepairList = async (id) => {
    const bodyData = {
      "category": store.getState().receptionDivision.id,
      "receipt": store.getState().requirement.id,
      "season_id": store.getState().season_id,
      "pcategory_id": id,
      "brand_id" : store.getState().brand_id

      }
    try {
      const response = await fetch(ip+'/api/getRepairList',{method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          },
      body: JSON.stringify(bodyData)
      });
      const json = await response.json();

      store.dispatch({type: 'RECIVER_LIST' ,receiverList: json.list})

      return(json)
      

      
        
    } catch (error) {
      console.error(error);
    } 
}
const SetReReceiptInfo=async(data)=>{
    store.dispatch({type:'RECEIPT_ID',receipt_id: data.receipt_id});
    store.dispatch({type:'SEASON_ID',season_id: data.product_season_id})
    store.dispatch({type:'CUSTOMER',customer:{cId: data.customer_id,cName:data.customer_name,cPhone:data.customer_phone}});

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
        getProductCategory();
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
        
        const Categories = [];
        const itemList = [];
        let i = 1;
        const productCategories = store.getState().getProductCategory;

        productCategories.forEach(obj => {
            if(obj.receiver_name !== '아디다스코리아(본사)' ){
            
            itemList.push({ label: i+'.'+obj.category_name, value: obj.category_name })
            Categories.push({'category_name' :obj.category_name, 'pcategory_id': obj.pcategory_id, 'service_date':  obj.service_date});
            i = i+1;
            }
            
        });
        const receiverListData = await getRepairList(data.pcategory_id);
        
        Categories.forEach(obj => {
            if(data.product_category_name === obj.category_name){
              

              
              store.dispatch({type:"SERVICE_DATE",serviceDate:obj.service_date});
              
            }

          });
    }
    if(data.receipt_code){
        store.dispatch({type:'SERVICECAED',value:data.receipt_code});
    }

}
export default SetReReceiptInfo