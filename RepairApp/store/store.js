import { act } from "react-test-renderer";
import { createStore } from "redux";

export default createStore(function(state,action){
    
    if(state === undefined){


        return{
            cardValue:""
        }
    }
    if(action.type === 'STORE_ID'){
        return{...state,  store_id: action.store_id};
    }
    return state;
}