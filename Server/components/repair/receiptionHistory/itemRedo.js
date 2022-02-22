import React from "react";

export default function ItemRedo(props){

    const key  =  props.index;
    const redo1 = props.redo1;
    const redo2 = props.redo2;
    const redo3 = props.redo3;

    const checkBoxTag = (tof) => {
        let result ;
        if(tof){
            result = (<input checked type="checkbox" name="xxx" value="yyy" onChange={()=>{ props.onChange()}}/>)
        }else{
            result = (<input type="checkbox" name="xxx" value="yyy" onChange={()=>{ props.onChange()}}/>)
        }
        return(result)
    }
    let inItemRedoReturn;
    if(key+1 === 1){
        inItemRedoReturn = checkBoxTag(redo1) 
    }else if(key+1 === 2){
        inItemRedoReturn = checkBoxTag(redo2)
    }else if(key+1 === 3){
        inItemRedoReturn = checkBoxTag(redo3)
    }
    return(
        <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
            {
                inItemRedoReturn
            }
        </div>
    )
}