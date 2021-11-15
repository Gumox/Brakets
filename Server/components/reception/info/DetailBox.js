import React from "react";
import styled from "styled-components";
import moment from "moment";

import COLOR from "../../../constants/color";
import { DETAIL } from "../../../constants/field";
import {
  OPTIONS,
  REPAIR_OPTIONS,
  REPAIR_PLACE_OPTIONS,
  SHIPPING_OPTIONS,
} from "../../../constants/select-option";
import { Row, Field, Section, SectionRow } from "../../styled";
import Input from "../../Input";
import SelectOption from "../../SelectOption";
import TextArea from "../../TextArea";
import Checkbox from "../../Checkbox";

const DetailBox = ({ options, data = {} }) => {
  return (
    <Wrapper>
      <SectionRow>
        <Section marginRight="10px">
          <Row>
            <Field>
              <SelectOption
                title="수선유형:"
                name={DETAIL.REPAIR_ID}
                options={REPAIR_OPTIONS}
                value={data[DETAIL.REPAIR_ID]}
                // onChange={handleValueChange}
              />
            </Field>
            <Field>
              <Input
                title="추가요청사항"
                name={DETAIL.MESSAGE}
                value={data[DETAIL.MESSAGE]}
                styleOptions={{ width: "300px" }}
              />
            </Field>
          </Row>
        </Section>
        <Section>
          <ImageButton>사진보기</ImageButton>
        </Section>
      </SectionRow>
      <SectionRow>
        <Section>
          <Row>
            <Field>
              <SelectOption
                title="수선처:"
                name={DETAIL.REPAIR_PLACE}
                options={options.repairList}
                value={data[DETAIL.REPAIR_PLACE]}
                // onChange={handleValueChange}
                styleOptions={{ maxWidth: "200px" }}
              />
            </Field>
          </Row>
          <Row>
            <Field>
              <Input type="date" title="수선처접수일" />
            </Field>
            <Field>
              <SelectOption
                title="운송형태:"
                // name={PRODUCT.SEASON}
                options={SHIPPING_OPTIONS}
                // value={data[PRODUCT.SEASON]}
                // onChange={handleValueChange}
              />
            </Field>
          </Row>
          <Row>
            <Field>
              <SelectOption
                title="과실구분:"
                // name={PRODUCT.SEASON}
                options={OPTIONS}
                // value={data[PRODUCT.SEASON]}
                // onChange={handleValueChange}
                styleOptions={{ maxWidth: "80px" }}
              />
            </Field>
            <Field>
              <SelectOption
                title="내용분석:"
                // name={PRODUCT.SEASON}
                options={OPTIONS}
                // value={data[PRODUCT.SEASON]}
                // onChange={handleValueChange}
                styleOptions={{ maxWidth: "80px" }}
              />
            </Field>
            <Field>
              <SelectOption
                title="판정결과:"
                // name={PRODUCT.SEASON}
                options={OPTIONS}
                // value={data[PRODUCT.SEASON]}
                // onChange={handleValueChange}
                styleOptions={{ maxWidth: "80px" }}
              />
            </Field>
          </Row>
          <Row>
            <Field>
              <SelectOption
                title="하자유형:"
                // name={PRODUCT.SEASON}
                options={OPTIONS}
                // value={data[PRODUCT.SEASON]}
                // onChange={handleValueChange}
              />
            </Field>
            <Field>
              <Input title="수량" styleOptions={{ width: "15px" }} />
            </Field>
            <Field>
              <Input
                title="수선비"
                styleOptions={{ width: "70px" }}
                name={DETAIL.CHARGE}
                value={data[DETAIL.CHARGE]}
              />
            </Field>
          </Row>
        </Section>
        <Section>
          <TextArea title="수선처설명:" />
        </Section>
      </SectionRow>
      <Row>
        <Field>
          <Checkbox title="재수선" />
        </Field>
        <Field>
          <Input
            type="date"
            title="수선처발송일"
            name={DETAIL.SEND_DATE}
            value={
              data[DETAIL.SEND_DATE]
                ? moment(data[DETAIL.SEND_DATE]).format("YYYY-MM-DD")
                : undefined
            }
          />
        </Field>
        <Field>
          <SelectOption
            title="발송방법:"
            // name={PRODUCT.SEASON}
            options={OPTIONS}
            // value={data[PRODUCT.SEASON]}
            // onChange={handleValueChange}
          />
        </Field>
        <Field>
          <Input title="발송비용" styleOptions={{ width: "70px" }} />
        </Field>
      </Row>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  margin: 0px 5px 15px 5px;
  width: 100%;
`;

const ImageButton = styled.button`
  min-height: max-content;
  height: 30px;
  background-color: ${COLOR.MENU_MAIN};
  color: ${COLOR.WHITE};
  padding: 0 20px;
  border-radius: 5px;
  border: 2px solid ${COLOR.BLUE};
`;
export default DetailBox;
