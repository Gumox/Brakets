import React from "react";
import styled from "styled-components";
import moment from "moment";

import COLOR from "../../../constants/color";
import { RECEIPT, REPAIR } from "../../../constants/field";
import {
  OPTIONS,
  DEFAULT_OPTION,
  RECEIPT_TYPE_OPTIONS,
  SHIPPING_OPTIONS,
} from "../../../constants/select-option";
import { Row, Field, Section, SectionRow } from "../../styled";
import Input from "../../Input";
import SelectOption from "../../SelectOption";
import TextArea from "../../TextArea";
import Checkbox from "../../Checkbox";

const RepairInfo = ({ options, data = {}, handleValueChange = () => {} }) => {
  return (
    <Wrapper>
        <SectionRow>
          <Section marginRight="10px">
            <Row>
              <Field marginRight="0px">
                <SelectOption
                  title="수선처"
                  name={REPAIR.PLACE_ID}
                  options={options.repairList}
                  value={data[REPAIR.PLACE_ID]} // details last index receiver
                  // onChange={handleValueChange}
                  styleOptions={{
                    width: "120px",
                    maxWidth: "120px",
                    labelMarginRight: "20px",
                  }}
                />
              </Field>
            </Row>
            <Row>
              <Field marginRight="10px">
                <Input 
                  type="date" 
                  title="수선처접수일" 
                  name={REPAIR.REGISTER_DATE}
                  value={
                    data[REPAIR.REGISTER_DATE]
                      ? moment(data[REPAIR.REGISTER_DATE]).format("YYYY-MM-DD")
                      : undefined
                  }
                  
                />
              </Field>
              <Field>
                <SelectOption
                  title="운송형태"
                  name={REPAIR.DELIVERY_TYPE}
                  options={SHIPPING_OPTIONS}
                  value={data[REPAIR.DELIVERY_TYPE]}
                  // onChange={handleValueChange}
                  styleOptions={{ color: COLOR.RED }}
                />
              </Field>
            </Row>
            <Row>
              <Field marginRight="5px">
                <SelectOption
                  title="과실구분:"
                  name={REPAIR.FAULT_ID}
                  options={[DEFAULT_OPTION, ...options.faultType]}
                  value={data[REPAIR.FAULT_ID]}
                  // onChange={handleValueChange}
                  styleOptions={{ width: "70px" }}
                />
              </Field>
              <Field marginRight="5px">
                <SelectOption
                  title="내용분석:"
                  name={REPAIR.ANALYSIS_ID}
                  options={[DEFAULT_OPTION, ...options.analysisType]}
                  value={data[REPAIR.ANALYSIS_ID]}
                  // onChange={handleValueChange}
                  styleOptions={{ width: "70px" }}
                />
              </Field>
              <Field marginRight="0px">
                <SelectOption
                  title="판정결과:"
                  name={REPAIR.RESULT_ID}
                  options={[DEFAULT_OPTION, ...options.resultType]}
                  value={data[REPAIR.RESULT_ID]}
                  // onChange={handleValueChange}
                  styleOptions={{ width: "70px" }}
                />
              </Field>
            </Row>
            {REPAIR.DETAILS.map((DETAIL, index) => (
              <Row key={index+1}>
                <Field marginRight="5px">
                  <SelectOption
                    title={`수선내용${index + 1}:`}
                    name={DETAIL.TYPE_ID}
                    options={[DEFAULT_OPTION, ...options.repairType]}
                    value={data[DETAIL.TYPE_ID]}
                    // onChange={handleValueChange}
                    disabled={data[DETAIL.TYPE_ID] === null}
                  />
                </Field>
                <Field marginRight="5px">
                    <Input 
                        title="수량" 
                        name={DETAIL.COUNT}
                        value={data[DETAIL.COUNT]}
                        styleOptions={{ width: "15px" }} 
                        disabled={data[DETAIL.TYPE_ID] === null}
                    />
                </Field>
                <Field marginRight="5px">
                  <Input
                    title={`수선비${index + 1}`}
                    name={DETAIL.CHARGE}
                    value={DETAIL[DETAIL.CHARGE]}
                    styleOptions={{ width: "70px" }}
                    disabled={data[DETAIL.TYPE_ID] === null}
                  />
                </Field>
                <Field marginRight="0px">
                  <Checkbox 
                    title={`재수선${index + 1}`}  
                    disabled={data[DETAIL.TYPE_ID] === null}
                  />
                </Field>
              </Row>
            ))}
          </Section>
          <Section>
            <TextArea
              title="수선처설명:"
              name={REPAIR.MESSAGE}
              value={data[REPAIR.MESSAGE]}
              styleOptions={{ width: "290px", height: "100px" }}
            />
          </Section>
        </SectionRow>
        <Row>
          <Field marginRight="10px">
            <Input
              type="date"
              title="수선처발송일"
              name={REPAIR.COMPLETE_DATE}
              value={
                data[REPAIR.COMPLETE_DATE]
                  ? moment(data[REPAIR.COMPLETE_DATE]).format("YYYY-MM-DD")
                  : undefined
              }
            />
          </Field>
          <Field marginRight="10px">
            <SelectOption
              title="발송방법:"
              name={REPAIR.SHIPMENT_TYPE}
              options={OPTIONS}
              value={data[REPAIR.SHIPMENT_TYPE]}
              // onChange={handleValueChange}
              styleOptions={{ color: COLOR.RED }}
            />
          </Field>
          <Field marginRight="0px">
            <Input 
                title="발송비용" 
                name={REPAIR.SHIPMENT_PRICE}
                value={data[REPAIR.SHIPMENT_PRICE]}
                styleOptions={{ width: "70px" }} 
            />
          </Field>
        </Row>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 7px 7px 7px 7px;
`;

export default RepairInfo;
