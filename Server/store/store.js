
import { createStore } from "redux";

export default createStore(function(state,action){
    
    if(state === undefined){
        return{
            company:[]
        }
    }
    if(action.type === "COMPANY"){
        return{...state, company: action.company};
    }
    return state;
})