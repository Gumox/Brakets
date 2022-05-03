import React from "react";
import { useRouter } from "next/dist/client/router";
import styled from "styled-components";

import COLOR from "../../constants/color";

const AdminHeaderButton = ({ title, link, path }) => {
  const router = useRouter();
  return (
    <div style={{backgroundColor:COLOR.DARK_INDIGO}}>
      <Wrapper selected={path === link} onClick={() => router.push(link)}>
        {title}
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  width: 11%;
  min-width:115px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ selected }) => (selected ? COLOR.MENU_MAIN : COLOR.DARK_INDIGO)};
  color: ${({ selected }) => (selected ? COLOR.TEXT_MAIN : COLOR.WHITE)};
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
  border:2px solid ${COLOR.DARK_INDIGO};
  border-top:8px solid ${COLOR.DARK_INDIGO};
  border-bottom:8px solid ${COLOR.DARK_INDIGO};
  border-radius:23px;

  &: hover {
    background-color: ${COLOR.MENU_MAIN};
    color: ${COLOR.TEXT_MAIN};
  }
`;
export default AdminHeaderButton;
