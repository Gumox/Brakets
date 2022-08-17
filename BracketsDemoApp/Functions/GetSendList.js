import React from "react";
import store from "../store/store";

export async function getList(value,key){
    
    const DataParseForDropdownList = (dataList)=>{
        const itemList=[];
        for(var i =0 ; i<dataList.length;i++){
            itemList.push( dataList[i].receiver_name)
        }
        
        const Lists =[];
    
        if (itemList !==null){
            itemList.map(x => Lists.push({label:x,value:x}));
            
        }
        return(Lists);
    }
    const dataSet = {
        "repair":"store",
        "category": 1,
        "receipt": 1,
        "name": value
        }
    try {
            const response = await fetch('http://13.125.232.214/api/getRepairInfo',{method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataSet)
            });
            
            const json = await response.json();
            
            const sendList = DataParseForDropdownList(json.body);
            store.dispatch({type:"TYPESTORE",typeStoreAdd: {key : key ,sendList:sendList}});
            
    } catch (error) {
            console.error(error);
        } 
}