import React from "react";
import styled from "styled-components";

import COLOR from "../../../constants/color";
import { RECEIPT, DETAIL } from "../../../constants/field";
import { RECEIPT_TYPE_OPTIONS } from "../../../constants/select-option";
import { Field, Section, SectionRow } from "../../styled";
import SelectOption from "../../SelectOption";
import DetailBox from "./DetailBox";

const DetailInfo = ({ options, data = {}, handleValueChange = () => {} }) => {
  return (
    <Wrapper>
      <SectionRow>
        <Section>
          <Field>
            <SelectOption
              title="고객요구"
              name={RECEIPT.TYPE}
              options={RECEIPT_TYPE_OPTIONS}
              value={data[RECEIPT.TYPE]}
              onChange={handleValueChange}
            />
          </Field>
        </Section>
        <Section>
          <ImageButton>사진보기</ImageButton>
        </Section>
      </SectionRow>
      {data?.details?.map((detail) => (
        <Row key={detail[DETAIL.ID]}>
          <Index>{`(${detail[DETAIL.ORDER]})`}</Index>
          <DetailBox options={options} data={detail} />
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
  margin-top: 10px;
  font-size: 15px;
`;

const ImageButton = styled.button`
  margin-top: 10px;
  min-height: max-content;
  height: 30px;
  background-color: ${COLOR.MENU_MAIN};
  color: ${COLOR.WHITE};
  padding: 0 20px;
  border-radius: 5px;
  border: 2px solid ${COLOR.BLUE};
`;

export default DetailInfo;
