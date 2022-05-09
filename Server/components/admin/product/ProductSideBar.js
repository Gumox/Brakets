import React,{useState,useCallback,useEffect} from "react";
import styled from "styled-components";
import { debounce } from "lodash";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Router, { useRouter } from "next/router";
import COLOR from "../../../constants/color";

const ProductSideBar =({path})=>{
    console.log(path)
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
    let eachRegistColor = COLOR.BLACK;
    let excelRegistColor = COLOR.BLACK;

    if(path === "/admin/productControl"){
        listColor = "rgb(133,133,133)";
    }else if(path === "/admin/productControl/productEachRegist"){
        eachRegistColor = "rgb(133,133,133)";
    }else if(path === "/admin/productControl/productExcelRegist"){
        excelRegistColor = "rgb(133,133,133)";
    }
    return(
        <div>

            <ProSidebar style={{...styles.menu,minHeight:`${windowHeight-120}px`}}>
                <Menu  style={styles.menu} iconShape="square">
                    <MenuItem></MenuItem>
                    <MenuItem  style={{color : listColor }} onClick={() => {
                        router.push("/admin/productControl")
                    }}>
                        상품 목록
                    </MenuItem>
                    <MenuItem style={{color : eachRegistColor}} onClick={() => {
                        router.push("/admin/productControl/productEachRegist")
                    }}>
                        상품 개별 등록
                    </MenuItem>
                    <MenuItem style={{color : excelRegistColor}} onClick={() => {
                        router.push("/admin/productControl")
                    }}>
                        상품 엑셀 등록
                    </MenuItem>
                </Menu>
            </ProSidebar>
        </div>
    )
    
}
export default ProductSideBar
const styles = {
    menu:{
        backgroundColor:COLOR.MENU_MAIN,
        color:COLOR.BLACK,
        fontWeight:"bold",
    },
}