import { createStore } from "redux";

export default createStore(function(state,action){
    if(state === undefined){

<<<<<<< HEAD
        return{cardValue:"",card:"",bagCodeValue:"",receptionDate:"",appointmentDate:"", picture:""}
=======
        return{cardValue:"",card:"",bagCodeValue:"",receptionDate:"",appointmentDate:"", picture:"",bagPicture:""}
>>>>>>> 0chan
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
    if (action.type ==='PHOTO') {
        return{...state, picture: action.photo};
    }
<<<<<<< HEAD
=======
    if (action.type ==='BAGTAG') {
        return{...state, bagPicture: action.bagTag};
    }
>>>>>>> 0chan
    return state;
})