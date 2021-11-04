import React from "react";
import Router, { useRouter } from "next/router";
import axios from "axios";
import styled from "styled-components";
import HeaderButton from "./HeaderButton";

const MENUS = [
  {
    title: "수선접수/처리",
    link: "/admin/reception",
  },
  {
    title: "하자반품",
    link: "/admin/return",
  },
  {
    title: "업체클레임",
    link: "/admin/claim",
  },
  {
    title: "유상수선",
    link: "/admin/paid-repair",
  },
  {
    title: "현금영수증",
    link: "/admin/cash-receipt",
  },
  {
    title: "SMS 전송",
    link: "/admin/sms",
  },
  {
    title: "SMS 결과",
    link: "/admin/sms-result",
  },
];

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
  margin: 5px 2% 0 2%;
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
`;

export default Header;
