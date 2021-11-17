import React from "react";
import store from "../store/store";

export async function getList(value,key){
    
    const DataParseForDropdownList = (dataList)=>{
        console.log("is in here !!!!")
        const itemList=[];
        for(var i =0 ; i<dataList.length;i++){
            itemList.push( dataList[i].receiver_name)
        }
        
        const Lists =[];
    
        if (itemList !==null){
            itemList.map(x => Lists.push({label:x,value:x}));
            
        }
        console.log(Lists);
        console.log("AAAAAAAAAAAAAaaaaaa")
        return(Lists);
    }
    const dataSet = {
        "repair":"store",
        "category": 1,
        "receipt": 1,
        "name": value
        }
    console.log(dataSet);
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
            console.log(sendList)
            store.dispatch({type:"TYPESTORE",typeStoreAdd: {key : key ,sendList:sendList}});
            console.log(store.getState().typeStore);
            
    } catch (error) {
            console.error(error);
        } 
}