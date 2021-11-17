import React from "react";
import store from "../store/store";
import { getList } from "./GetSendList";


export function changeBasicSend(value,key){
    const basicSendList = store.getState().basicRepairStore;
    const data =store.getState().getAplType;
    console.log("");
    console.log("on hear");
    console.log("");
    console.log(basicSendList);
    console.log("");
    console.log("");
    console.log("");
    for (let i = 0; i < basicSendList.length; i++) {
        if(basicSendList[i].key == key){
            basicSendList.splice(i,1);
        }
    }
    console.log(basicSendList);
            console.log("");
            console.log("");
            console.log("");
    data.forEach(obj => {
        if(value === obj.repair_name){
            basicSendList.push({key: key ,basicSend :obj.receiver_name});
          
            console.log(basicSendList);
            console.log("");
            console.log("");
            console.log("");
        }
    });
    basicSendList.sort(function(a,b){
        return a.key -b.key;
    })
    console.log(basicSendList);
    console.log("");
    console.log("");
    console.log("");

}
export function changeSelectSend(value,key){
    const selectSendList = store.getState().typeStore;
    
    for (let i = 0; i < selectSendList.length; i++) {
        if(selectSendList[i].key == key){
            selectSendList.splice(i,1);
        }
    }
    store.dispatch({type:'RESET_TYPE_STORE',reset:selectSendList});
    getList(value,key);
    console.log(selectSendList);
    console.log(store.getState().typeStore);
} 
