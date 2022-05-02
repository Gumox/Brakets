import React,{useState,useCallback,useEffect} from "react";
import styled from "styled-components";
import { debounce } from "lodash";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Router, { useRouter } from "next/router";
import COLOR from "../../../constants/color";

const RepairSideBar =({setSelectedView = () => {} })=>{
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
        <div>

            <ProSidebar style={{...styles.menu,minHeight:`${windowHeight-105}px`}}>
                <Menu  style={styles.menu} iconShape="square">
                    <MenuItem></MenuItem>
                    <MenuItem  style={styles.menu} onClick={() => {
                        setSelectedView(
                            <div>
                                1
                            </div>
                        )
                    }}>
                        수선처 목록
                    </MenuItem>
                    <MenuItem style={styles.menu} onClick={() => {
                        setSelectedView(
                            <div>
                                2
                            </div>
                        )
                    }}>
                        수선처 등록
                    </MenuItem>
                    <MenuItem  style={styles.menu} onClick={() => {
                        setSelectedView(
                            <div>
                                3
                            </div>
                        )
                    }}>
                        수선처 직원 목록
                    </MenuItem>
                    <MenuItem style={styles.menu} onClick={() => {
                        setSelectedView(
                            <div>
                                4
                            </div>
                        )
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
        color:COLOR.BLACK,
        fontWeight:"bold",
    },
}