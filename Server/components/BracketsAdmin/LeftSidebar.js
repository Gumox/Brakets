import React,{useState,useCallback,useEffect} from "react";
import { debounce } from "lodash";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Router, { useRouter } from "next/router";
import COLOR from "../../constants/color";
import LinkModal from "./LinkModal";

const LeftSideBar =({})=>{
    const router =useRouter()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = useCallback(
      () => setIsModalOpen(false),
      []
    );
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

            <ProSidebar>
                <Menu iconShape="square">
                    <MenuItem></MenuItem>
                    <SubMenu title="회사 관리">
                        <MenuItem style={styles.menu} onClick={()=>{router.push("/adminBrackeks/CompanyList")}}>회사 목록</MenuItem>
                        <MenuItem style={styles.menu} onClick={()=>{router.push("/adminBrackeks/CompayRegist")}}>회사 등록</MenuItem>
                    </SubMenu>
                    <SubMenu title="전체관리자 관리">
                        <MenuItem style={styles.menu} onClick={()=>{router.push("/adminBrackeks/AdministratorList")}}>관리자 목록</MenuItem>
                        <MenuItem style={styles.menu} onClick={()=>{router.push("/adminBrackeks/AdministratorRegist")}}>관리자 등록</MenuItem>
                    </SubMenu>
                    <div style={{height:15}}/>
                    <MenuItem onClick={() => {
                        setIsModalOpen(true)
                    }}>서비스 센터 웹 바로가기</MenuItem>
                </Menu>
            </ProSidebar>
            {isModalOpen && (
              <LinkModal handleCloseButtonClick={closeModal} width={windowHeight}>
                
              </LinkModal>
            )}

        </div>
    )
    
}
export default LeftSideBar
const styles = {
    menu:{
        color:COLOR.BLACK
    },
}