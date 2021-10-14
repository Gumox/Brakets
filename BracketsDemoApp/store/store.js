import { createStore } from "redux";

export default createStore(function(state,action){
    if(state === undefined){
        return{number:0,cardValue:"",bagCodeValue:""}
    }
    if(action.type ==='INCREM'){
        return{...state, number: state.number+action.size}
    }
    if(action.type ==='SERVICECAED'){
        return{...state, cardValue: action.value };
    }
    if(action.type ==='BAGCODE'){
        return{...state, bagCodeValue: action.bag };
    }
    return state;
})