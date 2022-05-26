import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styled from "styled-components";

import MENUS from "../constants/repairMenu";
import COLOR from "../constants/color";
import store from "../store/store";
import logout from "../functions/logoutfunc";

const BracketsAdminHeader = ({ path,user }) => {
  const router = useRouter();
  const handleLogout = () => {
    const result = logout(user)
    if(result){
      router.push("/login");
    }
  };
  return (
    <div>
    <Wrapper>
      <MenuWrapper>
        <MenuWrapper style={{width:250,justifyContent:"center"}}>
          <h1>수선</h1>
          <OkImage src="/icons/OK_image.png" width={81} height={52} />
        </MenuWrapper>
        
        <h2 style={{marginLeft:"3%"}}>브래키츠 관리자</h2>
      </MenuWrapper>
      <Logout style={{marginRight:"2%"}} onClick={handleLogout}>Logout</Logout>
    </Wrapper>
      
      <Line/>
    </div>
  );
};



const OkImage =styled.img`
  margin-left: 2px;
  width:81px;
  margin-top: 5px; 
  height: 52px;
`;


const Line =styled.div`
  width :100%
  margin:2px;
  height:4px;
  margin-top:10px;
  background-color: ${COLOR.INDIGO}
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


export default BracketsAdminHeader;
