import { act } from "react-test-renderer";
import { createStore } from "redux";

export default createStore(function(state,action){
    
    if(state === undefined){


        return{
            cardValue:"",card:"",bagCodeValue:"",receptionDate:"",appointmentDate:"", 
            selectType:[],bagPicture:"", photoArr:[],indexNumber:0,
            typeStore:[],basicRepairStore : [],addRequest: [],getProductCategory:[]}
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
    if (action.type ==='SELECTTYPE') {
        return{...state, selectType:  [...state.selectType,action.typeSelect]};
    }
    if (action.type ==='BAGTAG') {
        return{...state, bagPicture: action.bagTag};
    }
    if (action.type ==='ADD') {
        return{...state,  photoArr: [...state.photoArr,action.add]};
    }
    if(action.type === 'SELECTTYPESET'){
        return{...state, selectType: action.set};
    }
    if(action.type === 'PHOTORESET'){
        return{...state,  photoArr: action.setPhoto};
    }
    if(action.type === 'PLUSINDEXNUMBER'){
        state.indexNumber= state.indexNumber + action.plus;
        return{...state,  indexNumber:state.indexNumber};
    }
    if (action.type ==='TYPESTORE') {
        return{...state,  typeStore: [...state.typeStore,action.typeStoreAdd]};
    }
    if (action.type ==='RESET_TYPE_STORE') {
        return{...state,  typeStore: action.reset};
    }

    if (action.type ==='SAVE_BASIC_REPAIR_STORE') {
        return{...state,  basicRepairStore: [...state.basicRepairStore,action.basicRepairStoreAdd]};
    }
    if(action.type === 'RESET_BASIC_REPAIR_STORE'){
        return{...state,  basicRepairStore: action.reset};
    }
    if(action.type === 'DELETE_KEY_SELECT_TYPE'){
        console.log(state.selectType.length);
        for(let i  = 0 ; i < state.selectType.length;i++){
            console.log(state.selectType[i]);
            console.log(action.deleteTypeKey);
            if(state.selectType[i].key==action.deleteTypeKey){
                state.selectType.splice(i,1);
               i--;
            }
        }
        return{...state,selectType:[...state.selectType]}
        
    }
    if(action.type === 'ADD_REQUESR'){
        return{...state,  addRequest: action.addRequest};
    }
    if(action.type === 'GET_APL_TYPE'){
        
        return{...state,  getProductCategory: action.setAplType};
    }
    return state;
}) 