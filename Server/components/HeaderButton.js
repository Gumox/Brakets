import React from "react";
import { useRouter } from "next/dist/client/router";
import styled from "styled-components";

import COLOR from "../constants/color";

const HeaderButton = ({ title, link, path }) => {
  const router = useRouter();
  return (
    <Wrapper selected={path === link} onClick={() => router.push(link)}>
      {title}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 11%;
  height: 26px;
  padding: 2px 0;
  text-align: center;
  background-color: ${({ selected }) => (selected ? COLOR.MENU_MAIN : COLOR.WHITE)};
  color: ${({ selected }) => (selected ? COLOR.WHITE : COLOR.MENU_MAIN)};
  border: 1px solid ${COLOR.MENU_MAIN};
  cursor: pointer;
`;

export default HeaderButton;
