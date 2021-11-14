import React from "react";
import styled from "styled-components";

import COLOR from "../../../constants/color";
import { Field } from "../../styled";
import Input from "../../Input";
import DetailBox from "./DetailBox";

const DetailInfo = () => {
  const data = [{}, {}, {}];
  return (
    <Wrapper>
      <Row>
        <Field>
          <Input title="고객요구" />
        </Field>
      </Row>
      {data.map((detail, index) => (
        <Row key={index}>
          <Index>{`(${index + 1})`}</Index>
          <DetailBox />
        </Row>
      ))}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  min-width: 750px;
  margin: 0px 5px 5px 15px;
  padding: 0px 7px;
  border: 2px solid ${COLOR.GRAY};
  border-radius: 10px;
`;

const Row = styled.div`
  display: flex;
`;

const Index = styled.span`
  margin-top: 5px;
  font-size: 15px;
`;

export default DetailInfo;
