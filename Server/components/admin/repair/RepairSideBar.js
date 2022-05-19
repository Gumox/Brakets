import React,{useState,useCallback,useEffect} from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { debounce } from "lodash";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
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


   
    return(
        <div style={{zIndex:0}}>
            <MenuWrapper  style={{...styles.menu,minHeight:`${windowHeight-120}px`}}>
                    <SideMenu selected={path === "/admin/repairControl"} style={{marginTop:"40px"}} onClick={() => router.push("/admin/repairControl")}>
                        수선처 목록
                    </SideMenu>
                        
                    <SideMenu selected={path === "/admin/repairControl/repairShopRegist"} onClick={() => router.push("/admin/repairControl/repairShopRegist")}>
                        수선처 등록
                    </SideMenu>

                    <SideMenu selected={path === "/admin/repairControl/"} onClick={() => router.push("/admin/repairControl/")}>
                        수선처 직원 목록
                    </SideMenu>

                    <SideMenu selected={path === "/admin/repairControl/"} onClick={() => router.push("/admin/repairControl/")}>
                        수선처 직원 등록
                    </SideMenu>
                </MenuWrapper>
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
const MenuWrapper = styled.div`
    width: 230px;
    height: 100%;
    display: flex;
    flex-direction: column;
`;
const SideMenu = styled.div`
    margin:10px;
    width: 11%;
    min-width:130px;
    height: 100%;
    display: flex;
    padding-left:10px;
    align-items: center;
    color: ${({ selected }) => (selected ? "rgb(133,133,133)": COLOR.BLACK )};
    font-weight: bold;
    font-size: 15px;
    cursor: pointer;

    &: hover {
        color: rgb(180,180,180);
}`