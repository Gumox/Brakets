import React, { useState,useEffect } from "react";
import { debounce } from "lodash";
import styled from "styled-components";
import COLOR from "../constants/color";

export default function RequestForm(props){
    
    const [windowWidth,setWindowWidth] = useState()
    const [windowHeight,setWindowHeight] = useState()
    const handleResize = debounce(()=>{
        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
    },1000)
    useEffect(()=>{
            
        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
        window.addEventListener('resize',handleResize);
        return ()=>{
            window.removeEventListener('resize',handleResize);
        }
    },[])
    return(
        <div style={{backgroundColor: COLOR.GRAY,display:"flex",justifyContent:"center",alignItems:"center" ,width:windowWidth,height:windowHeight}}>
            <div style={{backgroundColor: COLOR.WHITE,width:windowWidth*0.45,height:windowHeight*0.93,display:"flex",justifyContent:"center",alignItems:"center"}}>
                <RequestBox>

                </RequestBox>
            </div>
        </div>
    )
}
const RequestBox = styled.div`
    width : 98%;
    height : 98%;
    border :2px solid;
`;