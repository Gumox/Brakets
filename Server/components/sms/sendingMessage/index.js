import React, { useState } from "react";
import styled from "styled-components";




const SendMsg = ({ data, user, handleDataClick = () => { } }) => {

  // console.log(rows)

  return (
    <Wrapper>
        <MsgView>
          <TextBox/>
          <SendBtn>
            전송
          </SendBtn>
        </MsgView>

        <SelectingView>
            <SelectedRow>
              <TextBox/>
              <TextBox/>
              <TextBox/>
              <TextBox/>
            </SelectedRow>

            <SelectedRow>
              <TextBox/>
              <TextBox/>
              <TextBox/>
              <TextBox/>
            </SelectedRow>

            <SelectedRow>
              <TextBox/>
              <TextBox/>
              <TextBox/>
              <TextBox/>
            </SelectedRow>

        </SelectingView>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  
  height: 90%;
  width: 50%;
  overflow: scroll;
  border-bottom: 2px solid;
  border-left: 1px solid;
`;

const MsgView = styled.div`
    height: 30%;
    border-bottom: 1px solid;
    padding: 1rem 1rem;

`

const SelectingView = styled.div`
    border-top: 1px solid;
    padding: 20px;
`

const SelectedRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
`;

const MsgBox = styled.div`
    width: 35%;
    height: 90%;
    border: 1px solid;
    padding: 5px;
`;

const TextBox = styled.textarea`
  /* padding: 5px; */
  width: 40%;
  height: 90%;
  border: 1px solid;
  resize: none;
`;

const SendBtn = styled.button`

`;


export default SendMsg;
