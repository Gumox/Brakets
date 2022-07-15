import React ,{useEffect,useState,useCallback} from "react";
import Router, { useRouter } from "next/router";
import cookies from "next-cookies";
import styled from "styled-components";
import axios from "axios";
import { debounce } from "lodash";
import BracketsAdminHeader from "../../components/BracketsAdminHeader";
import COLOR from "../../constants/color";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Modal from "../../components/BracketsAdmin/LinkModal";
import { UserContext } from "../../store/Context";
import LeftSideBar from "../../components/BracketsAdmin/LeftSidebar";

const AdminHome = ({}) => {
    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = useCallback(
      () => setIsModalOpen(false),
      []
    );
    

    const [pageNumber,setPageNumber] = useState(0)
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
        router.push("/adminBrackets/CompanyList")
        return ()=>{
            window.removeEventListener('resize',handleResize);
        }
    },[])
    return (
        <Wrapper>
            <BracketsAdminHeader  />
            
            <SrollWrapper>
                <SidebarSpace>
                    <LeftSideBar/>
                </SidebarSpace>
            
                <MainSpace  style={{height:windowHeight}}>
                </MainSpace>
            </SrollWrapper>
            {isModalOpen && (
              <Modal handleCloseButtonClick={closeModal} width={windowHeight}>
                
              </Modal>
            )}

        </Wrapper>
    );
};

const Wrapper = styled.div`
    
background-color:${COLOR.INDIGO};
`;

const SrollWrapper = styled.nav`
display:flex;
flex-direction:row;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 8px;
    height: 10px;
    background: rgba(210, 210, 210, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(96, 96, 96, 0.7);
    border-radius: 6px;
  }
`;


const SidebarSpace = styled.div`
background-color:${COLOR.INDIGO};
`;
const MainSpace=styled.div`
    background-color:${COLOR.WHITE};
    width :100%;
`;


const Title = styled.div`
  margin-bottom: 30px;
  padding: 10px 30px;
  font-size: 45px;
  font-weight: bold;
  border: 2px solid;
  border-radius: 10px;
`;

const Logout = styled.button`
  border: 1px solid;
  background-color: transparent;
  height: 26px;
  padding: 2px 5px;
  text-align: center;
  border-radius: 10px;
`;

const CuetomLink = styled.div`
  margin-top: 20px;
  font-size: 20px;
  border-bottom: 1px solid;
  cursor: pointer;
`;

export default AdminHome;
