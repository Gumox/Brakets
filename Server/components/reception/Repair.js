import React, { useContext } from "react";
import styled from "styled-components";
import moment from "moment";

import { OptionContext } from "../../store/Context";
import COLOR from "../../constants/color";
import { RECEIPT } from "../../constants/field";
import {
  OPTIONS,
  DEFAULT_OPTION,
  RECEIPT_TYPE_OPTIONS,
  TRANSPORT_OPTIONS,
  SHIPPING_OPTIONS,
} from "../../constants/select-option";
import { Row, Field, Section, SectionRow } from "../styled";
import Input from "../Input";
import SelectOption from "../SelectOption";
import TextArea from "../TextArea";
import Checkbox from "../Checkbox";

const RepairInfo = ({ REPAIR, targetData = {}, handleChangeTargetData = () => {} }) => {
  const { repairList, faultType, resultType, analysisType, repairType } =
    useContext(OptionContext);
  return (
    <Wrapper>
      <SectionRow>
        <Section marginRight="10px">
          <Row>
            <Field marginRight="0px">
              <SelectOption
                title="수선처"
                name={`${REPAIR.PREFIX}${REPAIR.PLACE_ID}`}
                options={[DEFAULT_OPTION, ...repairList]}
                value={targetData[`${REPAIR.PREFIX}${REPAIR.PLACE_ID}`]}
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
                name={`${REPAIR.PREFIX}${REPAIR.REGISTER_DATE}`}
                value={
                  targetData[`${REPAIR.PREFIX}${REPAIR.REGISTER_DATE}`]
                    ? moment(targetData[`${REPAIR.PREFIX}${REPAIR.REGISTER_DATE}`]).format("YYYY-MM-DD")
                    : undefined
                }
              />
            </Field>
            <Field>
              <SelectOption
                title="운송형태"
                name={`${REPAIR.PREFIX}${REPAIR.DELIVERY_TYPE}`}
                options={[DEFAULT_OPTION, ...TRANSPORT_OPTIONS]}
                value={targetData[`${REPAIR.PREFIX}${REPAIR.DELIVERY_TYPE}`]}
              />
            </Field>
          </Row>
          <Row>
            <Field marginRight="5px">
              <SelectOption
                title="과실구분:"
                name={`${REPAIR.PREFIX}${REPAIR.FAULT_ID}`}
                options={[DEFAULT_OPTION, ...faultType]}
                value={targetData[`${REPAIR.PREFIX}${REPAIR.FAULT_ID}`]}
                styleOptions={{ width: "70px" }}
              />
            </Field>
            <Field marginRight="5px">
              <SelectOption
                title="내용분석:"
                name={`${REPAIR.PREFIX}${REPAIR.ANALYSIS_ID}`}
                options={[DEFAULT_OPTION, ...analysisType]}
                value={targetData[`${REPAIR.PREFIX}${REPAIR.ANALYSIS_ID}`]}
                styleOptions={{ width: "70px" }}
              />
            </Field>
            <Field marginRight="0px">
              <SelectOption
                title="판정결과:"
                name={`${REPAIR.PREFIX}${REPAIR.RESULT_ID}`}
                options={[DEFAULT_OPTION, ...resultType]}
                value={targetData[`${REPAIR.PREFIX}${REPAIR.RESULT_ID}`]}
                styleOptions={{ width: "70px" }}
              />
            </Field>
          </Row>
          {REPAIR.DETAILS.map((DETAIL, index) => (
            <Row key={index + 1}>
              <Field marginRight="5px">
                <SelectOption
                  title={`수선내용${index + 1}:`}
                  name={`${REPAIR.PREFIX}${DETAIL.TYPE_ID}`}
                  options={[DEFAULT_OPTION, ...repairType]}
                  value={targetData[`${REPAIR.PREFIX}${DETAIL.TYPE_ID}`]}
                  disabled={!targetData[`${REPAIR.PREFIX}${DETAIL.TYPE_ID}`]}
                />
              </Field>
              <Field marginRight="5px">
                <Input
                  title="수량"
                  name={`${REPAIR.PREFIX}${DETAIL.COUNT}`}
                  value={targetData[`${REPAIR.PREFIX}${DETAIL.COUNT}`]}
                  styleOptions={{ width: "15px" }}
                  disabled={!targetData[`${REPAIR.PREFIX}${DETAIL.TYPE_ID}`]}
                />
              </Field>
              <Field marginRight="5px">
                <Input
                  title={`수선비${index + 1}`}
                  name={`${REPAIR.PREFIX}${DETAIL.PRICE}`}
                  value={targetData[`${REPAIR.PREFIX}${DETAIL.PRICE}`]}
                  styleOptions={{ width: "70px" }}
                  disabled={!targetData[`${REPAIR.PREFIX}${DETAIL.TYPE_ID}`]}
                />
              </Field>
              <Field marginRight="0px">
                <Checkbox
                  title={`재수선${index + 1}`}
                  name={`${REPAIR.PREFIX}${DETAIL.REDO}`}
                  checked={targetData[`${REPAIR.PREFIX}${DETAIL.REDO}`]}
                  disabled={!targetData[`${REPAIR.PREFIX}${DETAIL.TYPE_ID}`]}
                />
              </Field>
            </Row>
          ))}
        </Section>
        <Section>
          <TextArea
            title="수선처설명:"
            name={`${REPAIR.PREFIX}${REPAIR.MESSAGE}`}
            value={targetData[`${REPAIR.PREFIX}${REPAIR.MESSAGE}`]}
            styleOptions={{ width: "290px", height: "100px" }}
          />
        </Section>
      </SectionRow>
      <Row>
        <Field marginRight="10px">
          <Input
            type="date"
            title="수선처발송일"
            name={`${REPAIR.PREFIX}${REPAIR.COMPLETE_DATE}`}
            value={
              targetData[`${REPAIR.PREFIX}${REPAIR.COMPLETE_DATE}`]
                ? moment(targetData[`${REPAIR.PREFIX}${REPAIR.COMPLETE_DATE}`]).format("YYYY-MM-DD")
                : undefined
            }
          />
        </Field>
        <Field marginRight="10px">
          <SelectOption
            title="발송방법:"
            name={`${REPAIR.PREFIX}${REPAIR.SHIPMENT_TYPE}`}
            options={[DEFAULT_OPTION, ...SHIPPING_OPTIONS]}
            value={targetData[`${REPAIR.PREFIX}${REPAIR.SHIPMENT_TYPE}`]}
          />
        </Field>
        <Field marginRight="0px">
          <Input
            title="발송비용"
            name={`${REPAIR.PREFIX}${REPAIR.SHIPMENT_PRICE}`}
            value={targetData[`${REPAIR.PREFIX}${REPAIR.SHIPMENT_PRICE}`]}
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
