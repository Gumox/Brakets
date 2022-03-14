import React from "react";
import Image from "next/image";
import styled from "styled-components";

import COLOR from "../constants/color";

const Modal = ({ options, children, handleCloseButtonClick }) => {
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
  background-color: rgba(67, 67, 67, 0.3);
  width: 100%;
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
  border: 5px solid ${COLOR.BLACK};
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  z-index: 10; 
`;

export default Modal;
