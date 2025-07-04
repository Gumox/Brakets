import React, { useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";

import COLOR from "../constants/color";

const Modal = ({ options, children, handleCloseButtonClick }) => {


  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.code === 'Escape') {
        handleCloseButtonClick()
      }
    }
  
    document.addEventListener('keydown', handleEscapeKey)
    return () => document.removeEventListener('keydown', handleEscapeKey)
  }, [])

  return (
    <>
      <Wrapper>
        <Section {...options}>
          <CloseButton onClick={handleCloseButtonClick}>
            <Image
              src="/close.png"
              alt="close"
              width="15px"
              height="15px"
              layout="fixed"
            />
          </CloseButton>
          {children}
        </Section>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(67, 67, 67, 0.5);
  width: 100%;
  min-width:800px;
  min-height:450px;
`;

const Section = styled.div`
  position: relative;
  /* width: ${({ width = "90%" }) => width}; */
  width: 90%;

  height: ${({ height = "80%" }) => height};
  /* max-width: ${({ maxWidth = "760px" }) => maxWidth}; */
  max-height: 100%;
  margin: 0 auto;
  background-color: ${({ backgroundColor = COLOR.WHITE }) => backgroundColor};
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
  cursor: pointer;
  z-index: 10; 
  
  display: flex;
  align-items: center;
  justify-content: center;

  width : 25px;
  height : 25px;
  background-color:${COLOR.WHITE};
  border-radius : 12.5px;
`;

export default Modal;
