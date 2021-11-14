import React from "react";
import styled from "styled-components";

import COLOR from "../../../constants/color";
import { RECEIPT, DETAIL } from "../../../constants/field";
import { RECEIPT_TYPE_OPTIONS } from "../../../constants/select-option";
import { Field } from "../../styled";
import SelectOption from "../../SelectOption";
import DetailBox from "./DetailBox";

const DetailInfo = ({ data = {}, handleValueChange = () => {} }) => {
  return (
    <Wrapper>
      <Row>
        <Field>
          <SelectOption
            title="고객요구"
            name={RECEIPT.TYPE}
            options={RECEIPT_TYPE_OPTIONS}
            value={data[RECEIPT.TYPE]}
            onChange={handleValueChange}
          />
        </Field>
      </Row>
      {data?.details?.map((detail) => (
        <Row key={detail[DETAIL.ID]}>
          <Index>{`(${detail[DETAIL.ORDER]})`}</Index>
          <DetailBox data={detail}/>
        </Row>
      ))}
    </Wrapper>
  );
};
const Wrapper = styled.div`
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
