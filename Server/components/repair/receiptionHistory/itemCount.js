import React from "react";
export default function ItemCount(props){
    const key  =  props.index;
    const count1 = props.count1;
    const count2 = props.count2;
    const count3 = props.count3;

   

    let inItemCount;
    if(key+1 === 1){
        inItemCount = count1
    }else if(key+1 === 2){
        inItemCount = count2
    }else if(key+1 === 3){
        inItemCount = count3
    }
    return(
        <input type="number" min="0" style={{width:50,borderWidth:0,borderBottomWidth:2}} value={inItemCount} 
            onChange={(e)=>{
                inItemCount = e.target.value;
                props.onChange(e)
            }}/>
    )
}