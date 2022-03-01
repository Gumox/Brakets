import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import styled from "styled-components";
import List from './list'
import Send from './sendingMessage'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  margin-top: 10px;
  /* padding: 10px; */
  border: 2px solid;
`;



const Sms = ({}) => {

  return (
    <Wrapper>
      <List/>
      <Send/>
    </Wrapper>    
  );
};

export default Sms;
