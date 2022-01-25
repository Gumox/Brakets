
import { createStore } from "redux";

export default createStore(function(state,action){
    
    if(state === undefined){
        return{
            user:[]
        }
    }
    if(action.type === "USER"){
        return{...state, user: action.user};
    }
    return state;
})