import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styled from "styled-components";

import MENUS from "../constants/menu";
import HeaderButton from "./HeaderButton";

const Header = ({ path }) => {
  const router = useRouter();
  const handleLogout = async () => {
    await axios.get("/api/auth/logout");
    router.push("/admin/login");
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
  margin: 5px 2% 5px 1%;
  width: 96%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MenuWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const Logout = styled.button`
  border: 1px solid;
  background-color: transparent;
  height: 26px;
  padding: 2px 5px;
  text-align: center;
  border-radius: 10px;
  cursor: pointer;
`;

export default Header;
