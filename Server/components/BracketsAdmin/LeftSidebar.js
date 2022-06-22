import React,{useState,useCallback,useEffect} from "react";
import { debounce } from "lodash";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Router, { useRouter } from "next/router";
import COLOR from "../../constants/color";
import LinkModal from "./LinkModal";

const LeftSideBar =({path})=>{
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
    
    let controlCompany = false;
    let controlAdminister= false;

    let subMenuCompanyColor = "rgb(133,133,133)";
    let subMenuAdministratorColor = "rgb(133,133,133)";

    let companyListColor = "rgb(133,133,133)";
    let compayRegistColor = "rgb(133,133,133)";
    let administratorListColor = "rgb(133,133,133)";
    let administratorRegistColor = "rgb(133,133,133)";

    if(path === '/adminBrackeks/CompanyList'){
        controlCompany = true;
        subMenuCompanyColor = COLOR.WHITE;
        companyListColor = COLOR.WHITE;
    }else if(path === '/adminBrackeks/CompayRegist'){
        controlCompany = true;
        subMenuCompanyColor = COLOR.WHITE;
        compayRegistColor = COLOR.WHITE;
    }else if(path === '/adminBrackeks/AdministratorList'){
        controlAdminister = true;
        subMenuAdministratorColor = COLOR.WHITE;
        administratorListColor = COLOR.WHITE;
    }else if(path === '/adminBrackeks/AdministratorRegist'){
        controlAdminister = true;
        subMenuAdministratorColor = COLOR.WHITE;
        administratorRegistColor = COLOR.WHITE;
    }

    return(
        <div>

            <ProSidebar>
                <Menu iconShape="square">
                    <MenuItem></MenuItem>
                    <SubMenu style={{color: subMenuCompanyColor}} title="회사 관리" defaultOpen={controlCompany}>
                        <MenuItem style={{color: companyListColor}} 
                            onClick={()=>{router.push("/adminBrackeks/CompanyList")}}>
                                회사 목록
                        </MenuItem>
                        <MenuItem style={{color: compayRegistColor}} 
                            onClick={()=>{router.push("/adminBrackeks/CompayRegist")}}>
                                회사 등록
                        </MenuItem>
                    </SubMenu>
                    <SubMenu style={{color: subMenuAdministratorColor}} title="전체관리자 관리" defaultOpen={controlAdminister}>
                        <MenuItem style={{color: administratorListColor}} 
                            onClick={()=>{router.push("/adminBrackeks/AdministratorList")}}>
                                관리자 목록
                        </MenuItem>
                        <MenuItem style={{color: administratorRegistColor}} 
                            onClick={()=>{router.push("/adminBrackeks/AdministratorRegist")}}>
                                관리자 등록
                        </MenuItem>
                    </SubMenu>
                    <div style={{height:15}}/>
                    <MenuItem style={{color:"rgb(133,133,133)"}} onClick={() => {
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