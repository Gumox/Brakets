import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import COLOR from "../constants/color";

const MfrHeaderButton = ({ title, link, path }) => {
  const router = useRouter();
  return (
    <Wrapper selected={path === link} onClick={() => router.push(link)}>
      {title}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 11%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ selected }) => (selected ? COLOR.MENU_SELECTED : COLOR.WHITE)};
  color: ${COLOR.TEXT_MAIN};
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;

  &: hover {
    background-color: ${COLOR.DARK_GREEN};
    color: ${COLOR.WHITE};
  }
`;
export default MfrHeaderButton