import React from "react";
import store from "../store/store";

export async function GetRepairList (id){
    const [isLoading, setLoading] = React.useState(true);
    
        const bodyData = {
          "category": 1,
          "receipt": 1,
          "pcategory_id": id
  
          }
        try {
          const response = await fetch('http://34.64.182.76/api/getRepairList',{method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
              },
          body: JSON.stringify(bodyData)
          });
          const json = await response.json();
          
  
          store.dispatch({type: 'RECIVER_LIST' ,receiverList: json.list})
          store.dispatch({type:'SAVE_BASIC_REPAIR_STORE',basicRepairStore:json.list[0].receiver_name });
          setLoading(false);
            
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
    
}