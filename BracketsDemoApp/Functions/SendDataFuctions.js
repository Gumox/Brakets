import React from "react";
import store from "../store/store";
import { getList } from "./GetSendList";


export function changeBasicSend(value){
    const Categories = [];

    const productCategories = store.getState().getProductCategory;

    productCategories.forEach(obj => {

        if(obj.receiver_name !== '아디다스코리아(본사)' ){
    
            Categories.push({'category_name' :obj.category_name, 'receiver_name': obj.receiver_name});
        }
        
    });

    Categories.forEach(obj =>{
        if(value === obj.category_name){
            store.dispatch({type:'SAVE_BASIC_REPAIR_STORE',basicRepairStore:obj.receiver_name});
            console.log(store.getState().basicRepairStore);
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