
import { createStore } from "redux";

export default createStore(function(state,action){
    
    if(state === undefined){
        return{
            company:[],
            shop:"",
            analysis:[],
            judiment:[],
            fault:[],
            repair_type:[],
            selected:[],
            selected_data: [""],
            invoice_data: [],
            invoice_paid_repair_data: [],
            phone_num: [],
            toggled: false,
        }
    }
    if(action.type === "COMPANY"){
        return{...state, company: action.company};
    }
    if(action.type === "SHOP"){
        return{...state, shop: action.shop};
    }
    if(action.type === "ANALYSIS"){
        return{...state, analysis: action.analysis};
    }
    if(action.type === "JUDIMENT"){
        return{...state, judiment: action.judiment};
    }
    if(action.type === "FAULT"){
        return{...state, fault: action.fault};
    }
    if(action.type === "REPAIR_TYPE"){
        return{...state, repair_type: action.repair_type};
    }
    if(action.type === "SET_SELECTED"){
        return{...state, selected:  [...state.selected,action.selected]};
    }
    if(action.type === "RESET_SELECTED"){
        return{...state, selected: action.selected};
    }
    if(action.type === "SELECTED_DATA"){
        return{...state, selected_data: action.selected_data}
    }
    if(action.type === "INVOICE_DATA"){
        return{...state, invoice_data: action.invoice_data}
    }
    if(action.type === "INVOICE_PAID_REPAIR_DATA"){
        return{...state, invoice_paid_repair_data: action.invoice_paid_repair_data}
    }
    if(action.type === "PHONE_NUM"){
        return{...state, phone_num: action.phone_num}
    }
    if(action.type === "TOGGLED"){
        return{...state, toggled: action.toggled}
    }
    return state;
})