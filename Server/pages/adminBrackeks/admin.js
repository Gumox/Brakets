import React ,{useEffect,useState,useCallback} from "react";
import Router, { useRouter } from "next/router";
import cookies from "next-cookies";
import styled from "styled-components";
import axios from "axios";
import { debounce } from "lodash";
import BracketsAdminHeader from "../../components/BracketsAdminHeader";
import COLOR from "../../constants/color";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Main from "../../components/BracketsAdmin/Main";
import Modal from "../../components/BracketsAdmin/Modal";

const AdminHome = () => {
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
        return ()=>{
            window.removeEventListener('resize',handleResize);
        }
    },[])
    return (
        <SrollWrapper>
            <BracketsAdminHeader/>
            
            <Wrapper>
                <SidebarSpace>
                    <ProSidebar>
                        <Menu iconShape="square">
                            <MenuItem></MenuItem>
                            <SubMenu title="회사 관리">
                                <MenuItem style={styles.menu} onClick={()=>{setPageNumber(1)}}>회사 목록</MenuItem>
                                <MenuItem style={styles.menu} onClick={()=>{setPageNumber(2)}}>회사 등록</MenuItem>
                            </SubMenu>
                            <SubMenu title="전체관리자 관리">
                                <MenuItem style={styles.menu} onClick={()=>{setPageNumber(3)}}>관리자 목록</MenuItem>
                                <MenuItem style={styles.menu} onClick={()=>{setPageNumber(4)}}>관리자 등록</MenuItem>
                            </SubMenu>
                            <div style={{height:15}}/>
                            <MenuItem onClick={() => {setIsModalOpen(true)}}>서비스 센터 웹 바로가기</MenuItem>
                        </Menu>
                    </ProSidebar>
                </SidebarSpace>
            
                <MainSpace  style={{height:windowHeight}}>
                    <Main pageNumber ={pageNumber}/>
                </MainSpace>
            </Wrapper>
            {isModalOpen && (
              <Modal handleCloseButtonClick={closeModal} width={windowHeight}>
                {
                  
                }
              </Modal>
            )}

        </SrollWrapper>
    );
};


export const getServerSideProps = async (ctx) => {
  const {
    data: { isAuthorized, user },
  } = await axios.get(
    `${process.env.API_URL}/auth`,
    ctx.req
      ? {
          withCredentials: true,
          headers: {
            cookie: ctx.req.headers.cookie || {},
          },
        }
      : {}
  );
  if (!isAuthorized) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
    
  
  if(user.level ===5){
    return { props: {user:user} };
  }else{
    return {
      redirect: {
        permanent: false,
        destination: '/login'
      }
    }
  }
};
const styles = {
    menu:{
        color:COLOR.BLACK
    },
}


const SrollWrapper = styled.nav`
  overflow: scroll;
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
`;
const MainSpace=styled.div`
    background-color:${COLOR.WHITE};
    width :100%;
    height :100%;
`;

const Wrapper = styled.div`
    background-color:${COLOR.INDIGO};
    display:flex;
    flex-direction:row;
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
