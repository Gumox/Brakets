import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styled from "styled-components";

import MENUS from "../constants/mfrMenu";
import COLOR from "../constants/color";
import MfrHeaderButton from "./MfrHeaderButton";

const MfrHeader = ({ path }) => {
  const router = useRouter();
  const handleLogout = async () => {
    await axios.get("/api/auth/logout");
    router.push("/login");
  };
  return (
    <div>
        <Top>
            <div/>
            <Logout onClick={handleLogout}>Logout</Logout>
            
        </Top>
        <>
       
        <Wrapper>
            
        <MenuWrapper > 
            <h1 style={{marginLeft:"5%"}}>수선</h1>
            <OkImage src="/icons/OK_image.png" width={81} height={52} onClick={()=>{
              let loadUser = JSON.parse(localStorage.getItem("USER"))
            if(loadUser.level !=3 && loadUser.level !=4){
              
              router.push("/");
            }else if( loadUser.level == 3){
              router.push("/repair");
            }else if( loadUser.level == 4){
              router.push("/manufacturer");
            }
        }}/>
            <div style={{margin:"15%"}}/>
            {MENUS.map((menu) => (
            <MfrHeaderButton key={menu.link} {...menu} path={path} />
            ))}
        </MenuWrapper>
        </Wrapper>
        <Line/>
        </>
    </div>
  );
};



const OkImage =styled.img`
    margin-left: 2px;
    width:81px;
    margin-top: 5px; 
    height: 52px;
`;
const Wrapper = styled.div`
    flex:1
    padding: 0px 1% 0px 1%;
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${COLOR.WHITE};
    margin-bottom :20px
`;

const Top =styled.div`
    display: flex;
    height: 35px;
    justify-content: space-between;
    background-color: ${COLOR.DARK_GREEN};
`;


const Line =styled.div`
  border:1px solid  ${COLOR.DARK_GREEN};
  width :100%
  margin:2px;
  height:2px;
  margin-top:10px;
  background-color: ${COLOR.DARK_GREEN}
`;
const MenuWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
`;

const Logout = styled.button`
    margin:5px;
    background-color: transparent;
    height: 26px;
    padding: 2px 5px;
    text-align: center;
    border: 2px solid ${COLOR.WHITE};
    color: ${COLOR.WHITE};
    border-radius: 10px;
    cursor: pointer;
    margin-right: 15%;
`;

export default MfrHeader;
