import React from "react";
import COLOR from "../../../constants/color";

export default function ItemCost(props){
    const key  =  props.index;
    const cost1 = props.cost1;
    const cost2 = props.cost2;
    const cost3 = props.cost3;

    let inItemCost;
    if(key+1 === 1){
        inItemCost = cost1
    }else if(key+1 === 2){
        inItemCost = cost2
    }else if(key+1 === 3){
        inItemCost = cost3
    }
    const setPrice=(cost)=>{
        let after = new Number(cost)
        return after.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return(
        <div style={{width:100,borderWidth:0,borderBottomWidth:2 ,borderBottomColor:COLOR.GRAY,borderStyle:"solid"}} 
            
        >{setPrice(inItemCost)}</div>
    )
}