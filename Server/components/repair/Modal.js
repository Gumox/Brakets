import React from "react";
import Image from "next/image";
import styled from "styled-components";

import COLOR from "../../constants/color";

const Modal = ({ options, children, handleCloseButtonClick ,width}) => {
  return (
    <>
      <Wrapper>
        <Section {...options} style={{width:width*0.7}}>
          <CloseButton onClick={handleCloseButtonClick}>
            
            &times;
            {/*<Image
              src="/close.png"
              alt="close"
              width="15px"
              height="15px"
              layout="fixed"
            /> */}
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
  background-color: rgba(67, 67, 67, 0.7);
  width: 100%;
`;

const Section = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: ${({ width = "50%" }) => width}; */
  width: 40%;

  height: ${({ height = "90%" }) => height};
  /* max-width: ${({ maxWidth = "760px" }) => maxWidth}; */
  max-height: 100%;
  margin: 0 auto;
  background-color: rgba(67, 67, 67, 0);
`;

const CloseButton = styled.div`
  position: absolute;
  display: flex;
  width: 32px;
  height: 32px;
  padding-Bottom:5px;
  justify-content: center;
  align-items: center;
  font-size:30px;
  top: 6px;
  right: 12px;
  cursor: pointer;
  z-index: 10; 
  color:${COLOR.WHITE}
`;

export default Modal;
