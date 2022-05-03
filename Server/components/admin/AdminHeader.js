import React,{useState,useEffect} from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styled from "styled-components";
import { debounce } from "lodash";

import COLOR from "../../constants/color";
import MENUS from "../../constants/adminMenu";
import AdminHeaderButton from "./AdminHeaderButton";

const AdminHeader = ({ path ,minWidth}) => {
  const router = useRouter();
  const handleLogout = async () => {
    await axios.get("/api/auth/logout");
    router.push("/login");
  };


  const [windowWidth,setWindowWidth] = useState(0)
  const [windowHeight,setWindowHeight] = useState(0)
  const handleResize = debounce(()=>{
      setWindowWidth(window.innerWidth)
      setWindowHeight(window.innerHeight)
  },1000)
  let settedWidth = 1350
  if(minWidth){
    settedWidth =250+minWidth;
  }
  useEffect(()=>{
      
      setWindowWidth(window.innerWidth)
      setWindowHeight(window.innerHeight)
      window.addEventListener('resize',handleResize);
      return ()=>{
          window.removeEventListener('resize',handleResize);
      }
  },[])
  return (
    <div>
    <Wrapper>
      <MenuWrapper>
        <MenuWrapper style={{width:250,justifyContent:"center"}}>
          <h1>수선</h1>
          <OkImage src="/icons/OK_image.png" width={81} height={52} />
        </MenuWrapper>
        
        <h2 style={{marginLeft:"3%"}}>전체관리자</h2>
      </MenuWrapper>
      <Logout style={{marginRight:"2%"}} onClick={handleLogout}>Logout</Logout>
    </Wrapper>
    
      <Control style={{minWidth: `${settedWidth}px`}}>
        <MenuWrapper style={{height:"50px",paddingLeft:`230px`}}>
          {MENUS.map((menu) => (
            <AdminHeaderButton key={menu.link} {...menu} path={path} />
          ))}
        </MenuWrapper>
       
      </Control> 
    </div>
  );
};



const OkImage =styled.img`
  margin-left: 2px;
  width:81px;
  margin-top: 5px; 
  height: 52px;
`;
const Control =styled.div`
  width : 100%;
  margin-top:10px;
  background-color: ${COLOR.DARK_INDIGO};
`;
const Line =styled.div`
  width :100%
  margin:5px;
  height:5px;
  background-color: ${COLOR.DARK_INDIGO}
`;
const Wrapper = styled.div`
  padding: 0px 1% 0px 1%;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${COLOR.WHITE};
`;

const MenuWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const Logout = styled.button`
  background-color: transparent;
  height: 26px;
  padding: 2px 5px;
  text-align: center;
  border: 2px solid ${COLOR.TEXT_MAIN};
  color: ${COLOR.TEXT_MAIN};
  border-radius: 10px;
  cursor: pointer;
`;


export default AdminHeader;
