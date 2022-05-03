import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import COLOR from "../constants/color";

const RepairHeaderButton = ({ title, link, path }) => {
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
  background-color: ${({ selected }) => (selected ? COLOR.MOCCA : COLOR.WHITE)};
  color: ${({ selected }) => (selected ? COLOR.WHITE : COLOR.TEXT_MAIN)};
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
  margin-top:20px;
  margin-left:2px;
  margin-right:2px;
  border-radius: 30px 30px 0px 0px; 
  &: hover {
    background-color: ${COLOR.MOCCA};
    color: ${COLOR.WHITE};
  }
`;
export default RepairHeaderButton