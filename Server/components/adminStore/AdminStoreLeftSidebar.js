import React,{useState,useCallback,useEffect} from "react";
import { debounce } from "lodash";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Router, { useRouter } from "next/router";
import COLOR from "../../constants/color";

const AdminStoreLeftSidebar =({s})=>{
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
                        <MenuItem style={styles.menu} 
                            onClick={()=>{router.push("/adminStore/staffList")
                        }}>매장 직원 목록</MenuItem>
                        <MenuItem style={styles.menu} 
                            onClick={()=>{router.push("/adminStore/staffRegist")
                        }}>매장 직원 등록</MenuItem>
                    <div style={{height:15}}/>

                </Menu>
            </ProSidebar>
            

        </div>
    )
    
}
export default AdminStoreLeftSidebar
const styles = {
    menu:{
        color:COLOR.WHITE
    },
}