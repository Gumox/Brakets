import { createStore } from "redux";

export default createStore(function(state,action){
    if(state === undefined){
<<<<<<< HEAD
        return{number:0,cardValue:"",bagCodeValue:"",receptionDate:"",appointmentDate:""}
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
=======
        return{cardValue:"",card:"",bagCodeValue:"",receptionDate:"",appointmentDate:""}
    }
    
    if(action.type ==='SERVICECAED'){
        return{...state, cardValue: action.value };
    }
    if(action.type ==='TAKE'){
        return{...state, card: action.take };
    }
    if(action.type ==='RECDATE'){
        return{...state, receptionDate: action.recDate };
    }
    if(action.type ==='APPODATE'){
        return{...state, appointmentDate: action.appoDate };
    }
    if(action.type ==='BAGCODE'){
        return{...state, bagCodeValue: action.bag };
    }
    
>>>>>>> 0chan
    return state;
})