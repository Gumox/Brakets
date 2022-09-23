import React from "react";
import styled from "styled-components";
import COLOR from "../../../../../constants/color";

const AutoSmsSelect = ({
    state,
    setState = ()=>{},
    title,
    objName,
    id
}) =>{
 
    return(
        <AutoSmsSelectWapper onClick={()=>{setState(!state,objName,id)}}>
            <input type={"checkbox"} checked={state} onChange={()=>{setState(!state,objName,id)}}/>
            <div style={{color:COLOR.INDIGO,fontWeight:"bold"}}>{title}</div>
        </AutoSmsSelectWapper>
    )

}
const AutoSmsSelectWapper = styled.div`
    display: flex;
    flex-direction: row;
    height: 22px;
    text-align: center;
    align-items: center;
    margin: 5px 0px;
    border-radius: 4px;
    border: 2px solid ${COLOR.INDIGO};
    cursor: pointer;
`
export default AutoSmsSelect