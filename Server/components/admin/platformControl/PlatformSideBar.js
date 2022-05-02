import React,{useState,useCallback,useEffect} from "react";
import styled from "styled-components";
import { debounce } from "lodash";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Router, { useRouter } from "next/router";
import COLOR from "../../../constants/color";

const PlatformSideBar =({setSelectedView = () => {} })=>{
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

            <ProSidebar style={{...styles.menu,backgroundColor:COLOR.INDIGO}}>
                <Menu style={styles.menu} iconShape="square">
                    <MenuItem></MenuItem>

                    <SubMenu title="서비스센터 WEB">
                        <MenuItem  onClick={()=>{
                            setSelectedView(
                            <div>
                                1
                            </div>
                            )
                        }}>예시</MenuItem>
                        <MenuItem  onClick={()=>{
                            setSelectedView(
                            <div>
                                12
                            </div>
                            )
                        }}>예시2</MenuItem>
                    </SubMenu>
                    <SubMenu title="매장 APP">
                        <MenuItem  onClick={()=>{
                            setSelectedView(
                            <div>
                                123
                            </div>
                            )
                        }}>예시3</MenuItem>
                        <MenuItem  onClick={()=>{
                            setSelectedView(
                            <div>
                                1234
                            </div>
                            )
                        }}>예시4</MenuItem>
                    </SubMenu>
                    <SubMenu title="수선처 WEB">
                        <MenuItem  onClick={()=>{
                            setSelectedView(
                            <div>
                                12345
                            </div>
                            )
                        }}>예시5</MenuItem>
                        <MenuItem  onClick={()=>{
                            setSelectedView(
                            <div>
                                123456
                            </div>
                            )
                        }}>예시6</MenuItem>
                    </SubMenu>
                </Menu>
            </ProSidebar>
        </div>
    )
    
}
export default PlatformSideBar
const styles = {
    menu:{
        backgroundColor:COLOR.MENU_MAIN,
        color:COLOR.BLACK,
        fontWeight:"bold",
    },
}