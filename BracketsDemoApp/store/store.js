import { act } from "react-test-renderer";
import { createStore } from "redux";

export default createStore(function(state,action){
    var array =[];
    if(state === undefined){


        return{cardValue:"",card:"",bagCodeValue:"",receptionDate:"",appointmentDate:"", picture:"",picture2:"",selectType:[],bagPicture:"", photoArr:[],indexNumber:0}
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
    if (action.type ==='PHOTO2') {
        return{...state, picture2: action.photo2};
    }
    if (action.type ==='SELECTTYPE') {
        return{...state, selectType:  [...state.selectType,action.typeSelect]};
    }
    if (action.type ==='BAGTAG') {
        return{...state, bagPicture: action.bagTag};
    }
    if (action.type ==='ADD') {
        return{...state,  photoArr: [...state.photoArr,action.add]};
    }
    if(action.type === 'SELECTTYPERESET'){
        return{...state, selectType:  []};
    }
    if(action.type === 'PHOTORESET'){
        return{...state,  photoArr:  []};
    }
    if(action.type === 'PLUSINDEXNUMBER'){
        return{...state,  indexNumber:state.indexNumber+1};
    }
    return state;
}) 