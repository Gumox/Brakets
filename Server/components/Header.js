import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styled from "styled-components";

import MENUS from "../constants/menu";
import COLOR from "../constants/color";
import HeaderButton from "./HeaderButton";

const Header = ({ path }) => {
  const router = useRouter();
  const handleLogout = async () => {
    await axios.get("/api/auth/logout");
    router.push("/login");
  };
  return (
    <Wrapper>
      <MenuWrapper>
        {MENUS.map((menu) => (
          <HeaderButton key={menu.link} {...menu} path={path} />
        ))}
      </MenuWrapper>
      <Logout onClick={handleLogout}>Logout</Logout>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 0px 1% 0px 1%;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${COLOR.MENU_MAIN};
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

export default Header;
