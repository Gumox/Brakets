import React from "react";
import store from "../store/store";
import { getList } from "./GetSendList";


export function changeBasicSend(value,key){
    const basicSendList = store.getState().basicRepairStore;
    const data =store.getState().getProductCategory;
    console.log("");
    console.log("on hear");
    console.log("");
    console.log(basicSendList);
    console.log("");
    console.log("");
    console.log("");
    const Categories = [];
    const productCategories = store.getState().getProductCategory;
    productCategories.forEach(obj => {
        if(obj.receiver_name !== '아디다스코리아(본사)' ){
    
            Categories.push({'category_name' :obj.category_name, 'receiver_name': obj.receiver_name});
        }
        console.log(obj.category_name+ " : " + obj.receiver_name);
        
    });
    Categories.forEach(obj =>{
        if(value === obj.category_name){
            store.dispatch({type:'RESET_BASIC_REPAIR_STORE',reset:[]});
            store.dispatch({type:'SAVE_BASIC_REPAIR_STORE',basicRepairStoreAdd: {key: 0 ,basicSend :obj.receiver_name}});
        }
    });
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
export function changeSelectType(value,key){
    const selectType =store.getState().selectType;
    for (let i = 0; i < selectType.length; i++) {
        if(selectType[i].key == key){
            selectType.splice(i,1);
        }
    }
    selectType.push({key : key,value : value});
    selectType.sort(function(a,b){
        return a.key -b.key;
    })

}