
import { createStore } from "redux";

export default createStore(function(state,action){
    
    if(state === undefined){


        return{
            afterImageUris:[],afterImageUri1:"",afterImageUri2:"",afterImageUri3:"",afterImageUri4:"",afterImageUri5:""
        }
    }
    if(action.type === 'STORE_AFTER_IMAGE'){
        return{...state,  afterImageUris:  [...state.afterImageUris,action.afterImageUris]};
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
    return state;
})