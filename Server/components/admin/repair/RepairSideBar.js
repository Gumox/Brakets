import React,{useState,useCallback,useEffect} from "react";
import styled from "styled-components";
import { debounce } from "lodash";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Router, { useRouter } from "next/router";
import COLOR from "../../../constants/color";

const RepairSideBar =({path })=>{
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


    let listColor = COLOR.BLACK;
    let registColor = COLOR.BLACK;
    let employeeListColor = COLOR.BLACK;
    let employeeRegistColor = COLOR.BLACK;
    console.log("path : ",path)

    if(path === "/admin/repairControl"){
        listColor = "rgb(133,133,133)";
    }
    if(path === "/admin/repairControl/"){
        registColor = "rgb(133,133,133)";
    }
    if(path === "/admin/repairControl/"){
        employeeListColor = "rgb(133,133,133)";
    }
    if(path === "/admin/repairControl/"){
        employeeRegistColor = "rgb(133,133,133)";
    }
    return(
        <div>

            <ProSidebar style={{...styles.menu,minHeight:`${windowHeight-105}px`}}>
                <Menu  style={styles.menu} iconShape="square">
                    <MenuItem></MenuItem>
                    <MenuItem  style={{backgroundColor:COLOR.MENU_MAIN,fontWeight:"bold",color:listColor}} onClick={() => {
                        router.push("/admin/repairControl")
                    }}>
                        수선처 목록
                    </MenuItem>
                    <MenuItem style={{backgroundColor:COLOR.MENU_MAIN,fontWeight:"bold",color:registColor}} onClick={() => {
                        router.push("/admin/repairControl")
                    }}>
                        수선처 등록
                    </MenuItem>
                    <MenuItem  style={{backgroundColor:COLOR.MENU_MAIN,fontWeight:"bold",color:employeeListColor}} onClick={() => {
                        router.push("/admin/repairControl")
                    }}>
                        수선처 직원 목록
                    </MenuItem>
                    <MenuItem style={{backgroundColor:COLOR.MENU_MAIN,fontWeight:"bold",color:employeeRegistColor}} onClick={() => {
                        router.push("/admin/repairControl")
                    }}>
                        수선처 직원 등록
                    </MenuItem>
                </Menu>
            </ProSidebar>
        </div>
    )
    
}
export default RepairSideBar
const styles = {
    menu:{
        backgroundColor:COLOR.MENU_MAIN,
        
        fontWeight:"bold",
    },
}