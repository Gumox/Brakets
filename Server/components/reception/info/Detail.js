import React from "react";
import styled from "styled-components";

import COLOR from "../../../constants/color";
import { RECEIPT, DETAIL } from "../../../constants/field";
import {
  OPTIONS,
  REPAIR_OPTIONS,
  RECEIPT_TYPE_OPTIONS,
  SHIPPING_OPTIONS,
} from "../../../constants/select-option";
import { Row, Field, Section, SectionRow } from "../../styled";
import Input from "../../Input";
import SelectOption from "../../SelectOption";
import TextArea from "../../TextArea";
import Checkbox from "../../Checkbox";

const DetailInfo = ({ options, data = {}, handleValueChange = () => {} }) => {
  return (
    <div>
      <Wrapper>
        <SectionRow>
          <Section marginRight="10px">
            <Row>
              <Field>
                <SelectOption
                  title="고객요구"
                  name={RECEIPT.TYPE}
                  options={RECEIPT_TYPE_OPTIONS}
                  value={data[RECEIPT.TYPE]}
                  onChange={handleValueChange}
                  styleOptions={{ width: "100px" }}
                />
              </Field>
            </Row>
            <Row>
              <Field>
                <SelectOption
                  title="제품구분:"
                  name={DETAIL.REPAIR_ID}
                  options={REPAIR_OPTIONS}
                  value={data[DETAIL.REPAIR_ID]}
                  // onChange={handleValueChange}
                  styleOptions={{ width: "100px" }}
                />
              </Field>
            </Row>
            <Row>
              <Field>
                <SelectOption
                  title="수선처:"
                  name={DETAIL.REPAIR_PLACE}
                  options={options.repairList}
                  value={data[DETAIL.REPAIR_PLACE]}
                  // onChange={handleValueChange}
                  styleOptions={{ width: "100px" }}
                />
              </Field>
            </Row>
          </Section>
          <Section>
            <Row alignItems="flex-start">
              <TextArea
                title="매장접수내용:"
                styleOptions={{ width: "390px", height: "50px" }}
              />
              <ImageButton>사진보기</ImageButton>
            </Row>
          </Section>
        </SectionRow>
        <SectionRow>
          <Section marginRight="10px">
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
              <Field marginRight="10px">
                <SelectOption
                  title="과실구분:"
                  // name={PRODUCT.SEASON}
                  options={OPTIONS}
                  // value={data[PRODUCT.SEASON]}
                  // onChange={handleValueChange}
                  styleOptions={{ width: "70px" }}
                />
              </Field>
              <Field marginRight="10px">
                <SelectOption
                  title="내용분석:"
                  // name={PRODUCT.SEASON}
                  options={OPTIONS}
                  // value={data[PRODUCT.SEASON]}
                  // onChange={handleValueChange}
                  styleOptions={{ width: "70px" }}
                />
              </Field>
              <Field marginRight="0px">
                <SelectOption
                  title="판정결과:"
                  // name={PRODUCT.SEASON}
                  options={OPTIONS}
                  // value={data[PRODUCT.SEASON]}
                  // onChange={handleValueChange}
                  styleOptions={{ width: "70px" }}
                />
              </Field>
            </Row>
            {new Array(3).fill(0).map((_, index) => <Row key={index}>
              <Field marginRight="10px">
                <SelectOption
                  title={`수선내용${index+1}:`}
                  // name={PRODUCT.SEASON}
                  options={OPTIONS}
                  // value={data[PRODUCT.SEASON]}
                  // onChange={handleValueChange}
                />
              </Field>
              {/* <Field>
                <Input title="수량" styleOptions={{ width: "15px" }} />
              </Field> */}
              <Field marginRight="10px">
                <Input
                  title={`수선비${index+1}`}
                  styleOptions={{ width: "70px" }}
                  name={DETAIL.CHARGE}
                  value={data[DETAIL.CHARGE]}
                />
              </Field>
              <Field marginRight="0px">
                <Checkbox title={`재수선${index+1}`} />
              </Field>
            </Row>)}
          </Section>
          <Section>
            <TextArea title="수선처설명:" />
          </Section>
        </SectionRow>
        <Row>
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
    </div>
  );
};
const Wrapper = styled.div`
  margin: 0px 5px 5px 15px;
  padding: 7px 7px 20px 7px;
  border: 2px solid ${COLOR.GRAY};
  border-radius: 10px;
`;

const ImageButton = styled.button`
  margin-top: 10px;
  margin-left: 15px;
  min-height: max-content;
  height: 30px;
  background-color: ${COLOR.MENU_MAIN};
  color: ${COLOR.WHITE};
  padding: 0 20px;
  border-radius: 5px;
  border: 2px solid ${COLOR.BLUE};
`;

export default DetailInfo;
