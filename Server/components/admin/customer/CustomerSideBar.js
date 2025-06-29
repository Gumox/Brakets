import React,{useState,useCallback,useEffect} from "react";
import styled from "styled-components";
import { debounce } from "lodash";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Router, { useRouter } from "next/router";
import COLOR from "../../../constants/color";

const CustomerSideBar =({path})=>{
    const router =useRouter()
    
    const [windowWidth,setWindowWidth] = useState(0)
    const [windowHeight,setWindowHeight] = useState(0)
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

    let listColor = "rgb(133,133,133)";

    if(path === "/admin/customerControl"){
        listColor = COLOR.BLACK;
    }

    return(
        <div>

            <ProSidebar style={{...styles.menu,}}>
                <Menu  style={styles.menu} iconShape="square">
                    <MenuItem></MenuItem>
                    
                    <MenuItem style={{backgroundColor:"rgb(250,250,250)",color:listColor,fontWeight:"bold",}} onClick={()=>{
                       
                    }}
                    >고객 목록</MenuItem>
                    
                </Menu>
            </ProSidebar>
        </div>
    )
    
}
export default CustomerSideBar
const styles = {
    menu:{
     backgroundColor:"rgb(250,250,250)",color:COLOR.BLACK,fontWeight:"bold",
    },
}