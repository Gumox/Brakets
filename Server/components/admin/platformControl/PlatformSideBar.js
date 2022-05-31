import React,{useState,useCallback,useEffect} from "react";
import styled from "styled-components";
import { debounce } from "lodash";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Router, { useRouter } from "next/router";
import COLOR from "../../../constants/color";

const PlatformSideBar =({
    path,
})=>{
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
        
        let controlSweb = false
        let controlStApp = false
        let controlRweb = false
        let controlRwebRc = false
        
        let controlSwebColor = COLOR.BLACK;
        let controlStAppColor = COLOR.BLACK;
        let controlRwebColor = COLOR.BLACK;
        

        let controlFaultColor = COLOR.BLACK;
        let controlAnalysisColor = COLOR.BLACK;
        let controlClaimColor = COLOR.BLACK;
        let controlSmsColor = COLOR.BLACK;

        let controlCustomerAlertColor = COLOR.BLACK;
        let controlSmsAutoColor = COLOR.BLACK;


        
        let controlPaidFeeColor = COLOR.BLACK;

        let controlRepairColor = COLOR.BLACK;
        let controlEachRegistColor = COLOR.BLACK;
        let controlExcelRegistColor = COLOR.BLACK;
    
        if(path === "/admin/platformControl"){
            listColor = "rgb(133,133,133)";

        }

        if(path === "/admin/platformControl/controlFault"){
            controlSweb= true;
            controlSwebColor = "rgb(133,133,133)";
            controlFaultColor = "rgb(133,133,133)";
        }
        else if(path === "/admin/platformControl/controlAnalysis"){
            controlSweb= true;
            controlSwebColor = "rgb(133,133,133)";
            controlAnalysisColor = "rgb(133,133,133)";
        }
        else if(path === "/admin/platformControl/controlClaim"){
            controlSweb= true;
            controlSwebColor = "rgb(133,133,133)";
            controlClaimColor = "rgb(133,133,133)";
        }
        else if(path === "/admin/platformControl/controlSmsMessage"){
            controlSweb= true;
            controlSwebColor = "rgb(133,133,133)";
            controlSmsColor = "rgb(133,133,133)";
        }


        if(path === "/admin/platformControl/controlFaults"){
            controlStApp = true;
            controlStAppColor = "rgb(133,133,133)";
            controlCustomerAlertColor = "rgb(133,133,133)";
        }
        else if(path === "/admin/platformControl/controlFaults"){
            controlStApp = true;
            controlStAppColor = "rgb(133,133,133)";
            controlSmsAutoColor = "rgb(133,133,133)";
        } 


        if(path === "/admin/platformControl/controlUnitPriceList"){
            controlRweb = true;
            controlRwebColor = "rgb(133,133,133)";
            controlPaidFeeColor = "rgb(133,133,133)";
        }
        
        else if(path === "/admin/platformControl/controlRepairTypeEachRegist"){
            controlRweb = true;
            controlRwebRc = true;
            controlRwebColor = "rgb(133,133,133)";
            controlRepairColor = "rgb(133,133,133)";
            controlEachRegistColor = "rgb(133,133,133)";
        }
        else if(path === "/admin/platformControl/controlRepairTypeExcelRegist"){
            controlRweb = true;
            controlRwebRc = true;
            controlRwebColor = "rgb(133,133,133)";
            controlRepairColor = "rgb(133,133,133)";
            controlExcelRegistColor = "rgb(133,133,133)";
        }

    return(
        <div style={{ backgroundColor:COLOR.MENU_MAIN,}}>

            <ProSidebar style={{...styles.menu,minHeight:`${windowHeight-120}px`}}>
                <Menu  style={styles.menu} iconShape="square">
                    

                    <SubMenu title="서비스센터 web" style={{color : controlSwebColor}} defaultOpen={controlSweb}>
                        <MenuItem style={{color : controlFaultColor}} onClick={() => {
                            router.push("/admin/platformControl/controlFault")
                        }}>
                            과실구분 관리
                        </MenuItem>

                        <MenuItem style={{color : controlAnalysisColor}} onClick={() => {
                            router.push("/admin/platformControl/controlAnalysis")
                        }}>
                            내용분석 관리
                        </MenuItem>

                        <MenuItem style={{color : controlClaimColor}} onClick={() => {
                            router.push("/admin/platformControl/controlClaim")
                        }}>
                            클레임가 관리
                        </MenuItem>

                        <MenuItem style={{color : controlSmsColor}} onClick={() => {
                            router.push("/admin/platformControl/controlSmsMessage")
                        }}>
                            SMS전송 관리
                        </MenuItem>
                    </SubMenu>

                    <SubMenu title="매장 app" style={{color : controlStAppColor}} defaultOpen={controlStApp}>
                        <MenuItem style={{color : controlCustomerAlertColor}} onClick={() => {
                            router.push("/admin/platformControl/controlFault")
                        }}>
                            고객동의 고지사항 관리
                        </MenuItem>

                        <MenuItem style={{color : controlSmsAutoColor}} onClick={() => {
                            router.push("/admin/platformControl/controlFault")
                        }}>
                            자동발송 문구 관리
                        </MenuItem>
                    </SubMenu>

                    <SubMenu title="수선처 web" style={{color : controlRwebColor}} defaultOpen={controlRweb}>
                        <MenuItem style={{color : controlPaidFeeColor}} onClick={() => {
                            router.push("/admin/platformControl/controlUnitPriceList")
                        }}>
                           고객유상단가표 관리
                        </MenuItem>

                        <SubMenu title="수선내용 수선비 관리" style={{color : controlRepairColor}} defaultOpen={controlRwebRc}>
                            <MenuItem style={{color : controlEachRegistColor}} onClick={() => {
                                router.push("/admin/platformControl/controlRepairTypeEachRegist")
                            }}>
                                수선단가 개별 등록
                            </MenuItem>

                            <MenuItem style={{color : controlExcelRegistColor}} onClick={() => {
                                router.push("/admin/platformControl/controlRepairTypeExcelRegist")
                            }}>
                                수선단가 엑셀 등록
                            </MenuItem>
                        </SubMenu>
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