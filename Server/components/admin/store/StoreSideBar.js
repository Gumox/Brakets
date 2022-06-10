import React,{useState,useCallback,useEffect} from "react";
import { debounce } from "lodash";
import styled from "styled-components";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Router, { useRouter } from "next/router";
import COLOR from "../../../constants/color";

const StoreSideBar =({path })=>{
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
    let eachRegistColor = "rgb(133,133,133)";
    let excelRegistColor = "rgb(133,133,133)";

    if(path === "/admin/storeControl"){
        listColor = COLOR.BLACK;
    }else if(path === "/admin/storeControl/storeEachRegist"){
        eachRegistColor = COLOR.BLACK;
    }else if(path === "/admin/storeControl/storeExcelRegist"){
        excelRegistColor = COLOR.BLACK;
    }
    
    return(
        <div style={{zIndex:0}}>
            <MenuWrapper  style={styles.menu}>
                    <SideMenu selected={path === "/admin/storeControl"} style={{marginTop:"40px"}} onClick={() => router.push("/admin/storeControl/")}>
                        매장 목록
                    </SideMenu>
                        
                   
                    <SideMenu selected={path === "/admin/storeControl/storeEachRegist"} onClick={() => router.push("/admin/storeControl/storeEachRegist")}>
                        매장 개별 등록
                    </SideMenu>

                    <SideMenu selected={path === "/admin/storeControl/storeExcelRegist"} onClick={() => router.push("/admin/storeControl/storeExcelRegist")}>
                        매장 엑셀 등록
                    </SideMenu>

                    <SideMenu selected={path === "/admin/storeControl/storeStaffsList"} onClick={() => router.push("/admin/storeControl/storeStaffsList")}>
                        매장 직원 목록
                    </SideMenu>

                    <SideMenu selected={path === "/admin/storeControl/storeStaffRegist"} onClick={() => router.push("/admin/storeControl/storeStaffRegist")}>
                        매장 직원 등록
                    </SideMenu>
                </MenuWrapper>
        </div>
    )
    
}
export default StoreSideBar
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
    padding-left:10px;
    align-items: center;
    color: ${({ selected }) => (selected ? COLOR.BLACK: "rgb(133,133,133)" )};
    font-weight: bold;
    font-size: 15px;
    cursor: pointer;

    &: hover {
        color: rgb(180,180,180);
}`