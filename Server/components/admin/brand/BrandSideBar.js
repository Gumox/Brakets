import React,{useState,useCallback,useEffect} from "react";
import styled from "styled-components";
import { debounce } from "lodash";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Router, { useRouter } from "next/router";
import COLOR from "../../../constants/color";

const BrandSideBar =({
    setSelectedView = () => {} ,
    path})=>{
    const router =useRouter()
    
    return(
        <div style={{ backgroundColor:COLOR.MENU_MAIN,}}>

                <MenuWrapper  style={styles.menu}>
                    <SideMenu selected={path === "/admin/brandControl"} style={{marginTop:"40px"}} onClick={() => router.push("/admin/brandControl")}>
                        브랜드 목록
                    </SideMenu>
                        
                   
                    <SideMenu selected={path === "/admin/brandControl/brandRegist"} onClick={() => router.push("/admin/brandControl/brandRegist")}>
                        브랜드 등록
                    </SideMenu>
                </MenuWrapper>
        </div>
    )
    
}
export default BrandSideBar
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