import React,{useState,useCallback,useEffect} from "react";
import styled from "styled-components";
import { debounce } from "lodash";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Router, { useRouter } from "next/router";
import COLOR from "../../../constants/color";

const ProductSideBar =({path})=>{
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
    let styleListColor = "rgb(133,133,133)";
    let styleExcelRegistColor = "rgb(133,133,133)";

    if(path === "/admin/productControl"){
        listColor = COLOR.BLACK;
    }
    if(path === "/admin/productControl/productEachRegist"){
        eachRegistColor = COLOR.BLACK;
    }
    if(path === "/admin/productControl/productExcelRegist"){
        excelRegistColor = COLOR.BLACK;
    }
    if(path === "/admin/productControl/productStyle"){
        styleListColor = COLOR.BLACK;
    }
    if(path === "/admin/productControl/productStyleExcelRegist"){
        styleExcelRegistColor = COLOR.BLACK;
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

                    <MenuItem style={{color : styleListColor}} onClick={() => {
                        router.push("/admin/productControl/productStyle")
                    }}>
                        스타일
                    </MenuItem>
                    <MenuItem style={{color : styleExcelRegistColor}} onClick={() => {
                        router.push("/admin/productControl/productStyleExcelRegist")
                    }}>
                        스타일 엑셀 등록
                    </MenuItem>

                    <MenuItem style={{color : eachRegistColor}} onClick={() => {
                        router.push("/admin/productControl/productEachRegist")
                    }}>
                        상품 개별 등록
                    </MenuItem>
                    <MenuItem style={{color : excelRegistColor}} onClick={() => {
                        router.push("/admin/productControl/productExcelRegist")
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
     backgroundColor:"rgb(250,250,250)",
        color:COLOR.BLACK,
        fontWeight:"bold",
    },
}