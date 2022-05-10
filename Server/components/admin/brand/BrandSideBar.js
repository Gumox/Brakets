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
        let seasonListColor = COLOR.BLACK;
        let seasonRegistColor = COLOR.BLACK;
        let categoryListColor = COLOR.BLACK;
        let categoryRegistColor = COLOR.BLACK;
    
        if(path === "/admin/brandControl"){
            listColor = "rgb(133,133,133)";
        }else if(path === "/admin/brandControl/brandRegist"){
            registColor = "rgb(133,133,133)";
        }
        else if(path === "/admin/brandControl/seasonList"){
            seasonListColor = "rgb(133,133,133)";
        }else if(path === "/admin/brandControl/seasonRegist"){
            seasonRegistColor = "rgb(133,133,133)";
        }
        else if(path === "/admin/brandControl/productExcelRegist"){
            categoryListColor = "rgb(133,133,133)";
        }else if(path === "/admin/brandControl/productExcelRegist"){
            categoryRegistColor = "rgb(133,133,133)";
        }
    
    return(
        <div style={{ backgroundColor:COLOR.MENU_MAIN,}}>

            <ProSidebar style={{...styles.menu,minHeight:`${windowHeight-120}px`}}>
                <Menu  style={styles.menu} iconShape="square">
                    <MenuItem></MenuItem>
                    <MenuItem  style={{color : listColor }} onClick={() => {
                        router.push("/admin/brandControl")
                    }}>
                        브랜드 목록
                    </MenuItem>
                    <MenuItem style={{color : registColor}} onClick={() => {
                        router.push("/admin/brandControl/brandRegist")
                    }}>
                        브랜드 등록
                    </MenuItem>

                    <SubMenu title="시즌">
                        <MenuItem style={{color : seasonListColor}} onClick={() => {
                            router.push("/admin/brandControl/seasonList")
                        }}>
                            시즌 목록
                        </MenuItem>

                        <MenuItem style={{color : seasonRegistColor}} onClick={() => {
                            router.push("/admin/brandControl/seasonRegist")
                        }}>
                            시즌 등록
                        </MenuItem>
                    </SubMenu>

                    <SubMenu title="카테고리">
                        <MenuItem style={{color : categoryListColor}} onClick={() => {
                            router.push("/admin/brandControl/")
                        }}>
                            카테고리 목록
                        </MenuItem>

                        <MenuItem style={{color : categoryRegistColor}} onClick={() => {
                            router.push("/admin/brandControl/")
                        }}>
                            카테고리 등록
                        </MenuItem>
                    </SubMenu>

                   
                   
                </Menu>
            </ProSidebar>
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