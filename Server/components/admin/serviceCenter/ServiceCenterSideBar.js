import React,{useState,useCallback,useEffect} from "react";
import styled from "styled-components";
import { debounce } from "lodash";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Router, { useRouter } from "next/router";
import COLOR from "../../../constants/color";

const ServiceCenterSideBar =({setSelectedView = () => {} ,path})=>{
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
    return(
        <div style={{ backgroundColor:COLOR.MENU_MAIN,}}>

                <MenuWrapper  style={styles.menu}>
                    <SideMenu selected={path === "/admin/serviceCenterControl"} style={{marginTop:"40px"}} onClick={() => router.push("/admin/serviceCenterControl/")}>
                        직원 목록
                    </SideMenu>
                        
                   
                    <SideMenu selected={path === "/admin/serviceCenterControl/staffRegist"} onClick={() => router.push("/admin/serviceCenterControl/staffRegist")}>
                        직원 등록
                    </SideMenu>
                </MenuWrapper>
        </div>
    )
    
}
export default ServiceCenterSideBar
const styles = {
    menu:{
        backgroundColor:COLOR.MENU_MAIN,
        color:COLOR.BLACK,
        fontWeight:"bold",
    },
}

  
const MenuWrapper = styled.div`
    width: 230px;
    height: 100%;
    display: flex;
    flex-direction: column;
`;
const SideMenu = styled.div`
    margin:10px;
    width: 11%;
    min-width:115px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ selected }) => (selected ? "rgb(133,133,133)": COLOR.BLACK )};
    font-weight: bold;
    font-size: 15px;
    cursor: pointer;

    &: hover {
        color: rgb(180,180,180);
}`