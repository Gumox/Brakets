
import { createStore } from "redux";

export default createStore(function(state,action){
    
    if(state === undefined){
        return{
            addRepairImageUri:null,afterImageUri1:null,afterImageUri2:null,afterImageUri3:null,afterImageUri4:null,afterImageUri5:null,
            userEmail:"",staffInfo:[],shopId:0,shippingPlace:"",brand:{label : '회사를 선택하세요.',value: null}
        }
    }
    if(action.type === 'STORE_ADD_REPAIR_IMAGE'){
        return{...state,  addRepairImageUri:  action.addRepairImageUri};
    }
    if(action.type === 'STORE_AFTER_IMAGE1'){
        return{...state,  afterImageUri1: action.afterImageUri1};
    }
    if(action.type === 'STORE_AFTER_IMAGE2'){
        return{...state,  afterImageUri2: action.afterImageUri2};
    }
    if(action.type === 'STORE_AFTER_IMAGE3'){
        return{...state,  afterImageUri3: action.afterImageUri3};
    }
    if(action.type === 'STORE_AFTER_IMAGE4'){
        return{...state,  afterImageUri4: action.afterImageUri4};
    }
    if(action.type === 'STORE_AFTER_IMAGE5'){
        return{...state,  afterImageUri5: action.afterImageUri5};
    }
    if(action.type === 'USER_EMAIL'){
        return{...state,  userEmail: action.userEmail};
    }
    if(action.type === 'STAFF_INFO'){
        return{...state,  staffInfo: action.staffInfo};
    }
    if(action.type === 'SHOP_ID'){
        return{...state,  shopId: action.shopId};
    }
    if(action.type === 'SHIPPING_PLACE'){
        return{...state,  shippingPlace: action.shippingPlace};
    }
    if(action.type === 'SET_BRAND'){
        return{...state,  brand: action.brand};
    }
    if(action.type === "IMAGE_RESET"){
        return{...state,afterImageUri1:null,afterImageUri2:null,afterImageUri3:null,afterImageUri4:null}
    }
    return state;
})