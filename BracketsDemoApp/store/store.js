import { act } from "react-test-renderer";
import { createStore } from "redux";

export default createStore(function(state,action){
    
    if(state === undefined){


        return{
            cardValue:"",card:null,bagCodeValue:0,receptionDate:"",appointmentDate:"", receptionDivision:"",requirement: "",customerSign:"",
            receiverList:"",customer:"",serviceDate:"",startDate:"",endDate:"",brand_id:0,store_id:"",season_id:0,
            selectType:"",bagPicture: null, photoArr:[],indexNumber:0,photo:"",detailPhoto:"",addPhoto1:"",addPhoto2:"",addPhoto3:"",
            typeStore:[],basicRepairStore : "",addRequest: [],getProductCategory:[],drawingImage:"",receipt_id: 0, 
            storeStaffId: "", storeName: "",userInfo:""}
    }
    if(action.type ==='PHOTO'){
        return{...state, photo: action.photo };
    }
    if(action.type ==='CUSTOMER'){
        return{...state, customer: action.customer };
    }
    if(action.type ==='CUSTOMER_SIGN'){
        return{...state, customerSign: action.customerSign };
    }
    if(action.type ==='SERVICE_DATE'){
        return{...state, serviceDate: action.serviceDate };
    }
    if(action.type ==='DETAIL_PHOTO'){
        return{...state, detailPhoto: action.detailPhoto };
    }
    if(action.type ==='DRAW'){
        return{...state, drawingImage: action.drawingImage };
    }
    if(action.type ==='RECEIPT_ID'){
        return{...state, receipt_id: action.receipt_id };
    }
    if(action.type ==='REQUIREMENT'){
        return{...state, requirement: action.requirement };
    }
    if(action.type ==='RECEPITION_DIVISION'){
        return{...state, receptionDivision: action.receptionDivision };
    }
    if(action.type ==='RECIVER_LIST'){
        return{...state, receiverList: action.receiverList };
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
        return{...state, selectType: action.typeSelect};
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
        return{...state,  basicRepairStore: action.basicRepairStore};
    }
    if(action.type === 'RESET_BASIC_REPAIR_STORE'){
        return{...state,  basicRepairStore: action.reset};
    }
    if(action.type === 'DELETE_KEY_SELECT_TYPE'){
        for(let i  = 0 ; i < state.selectType.length;i++){
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
    if(action.type === 'START_DATE'){
        
        return{...state,  startDate: action.startDate};
    }
    if(action.type === 'END_DATE'){
        
        return{...state,  endDate: action.endDate};
    }
    if(action.type === 'STORE_CLEAR'){
        
        return{
            ...state,  cardValue:"",card:"",bagCodeValue:"",receptionDate:"",appointmentDate:"", 
            receptionDivision:"",requirement: "",customerSign:"",receiverList:"",customer:"",serviceDate:"",startDate:"",endDate:"",
            selectType:[],typeStore:[],addRequest: [],getProductCategory:[], photoArr:[],
            bagPicture:"",indexNumber:0,photo:"",detailPhoto:"",addPhoto1:"",addPhoto2:"",addPhoto3:"",
            basicRepairStore : "",drawingImage:"",receipt_id: 0}
    }
    if(action.type === 'SEASON_ID'){
        return{...state,  season_id: action.season_id};
    }
    if(action.type === 'storeStaffId'){
        return{...state,  storeStaffId: action.storeStaffId};
    }
    if(action.type === 'storeName'){
        return{...state,  storeName: action.storeName};
    }
    if(action.type === 'USER_INFO'){
        return{...state,  userInfo: action.userInfo};
    }
    if(action.type === 'BRAND_ID'){
        return{...state,  brand_id: action.brand_id};
    }
    if(action.type === 'STORE_ID'){
        return{...state,  store_id: action.store_id};
    }

    return state;
}) 