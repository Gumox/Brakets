import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import styled from "styled-components";

import List from './list'




const SmsResult = ({}) => {

  return (
 
    <>
      <SmsInqueryView>
        <SmsInquery>
            <div>SMS 전송결과 조회</div>
        </SmsInquery>

        <TempView></TempView>
      </SmsInqueryView>
        
        <List></List>
    </>
 
  );
};

const SmsInqueryView = styled.div`
  display: flex;
  flex-direction: row;
  height: 40%;
`;


const SmsInquery = styled.div`
  width: 40%;
  border: 1px solid;
`;

const TempView = styled.div`
  width: 60%;
  border: 1px solid;
`;



export default SmsResult;
