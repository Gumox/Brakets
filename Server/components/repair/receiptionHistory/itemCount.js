import React,{useState,useEffect} from "react";
export default function ItemCount(props){
    const key  =  props.index;
    const count1 = props.count1;
    const count2 = props.count2;
    const count3 = props.count3;

   

    const [inItemCount,setInItemCount] = useState(0);
    const [isBlurToggle,setIsBlurToggle] = useState(false);
    
    useEffect(()=>{
        if(key+1 === 1){
            setInItemCount(count1)
        }else if(key+1 === 2){
            setInItemCount(count2)
        }else if(key+1 === 3){
            setInItemCount(count3)
        }
    },[isBlurToggle])
    
    return(
        <input style={{width:50,borderWidth:0,borderBottomWidth:2}} value={inItemCount} 
            onFocus={()=>{
                setInItemCount("")}}
            onBlur={()=>{
                setIsBlurToggle(!isBlurToggle)}}
            onChange={(e)=>{
                let value = e.target.value.replace(/[^0-9]/g,"")
                e.target.value = value
                setInItemCount(e.target.value);
                props.onChange(e)
            }}/>
    )
}