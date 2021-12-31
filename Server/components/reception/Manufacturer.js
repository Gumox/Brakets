import React from "react";
import styled from "styled-components";
import moment from "moment";

import COLOR from "../../constants/color";
import { RECEIPT } from "../../constants/field";
import {
  OPTIONS,
  DEFAULT_OPTION,
  RECEIPT_TYPE_OPTIONS,
  SHIPPING_OPTIONS,
} from "../../constants/select-option";
import { Row, Field, Section, SectionRow } from "../styled";
import Input from "../Input";
import SelectOption from "../SelectOption";
import TextArea from "../TextArea";
import Checkbox from "../Checkbox";

const ManufacturerInfo = ({
  targetData = {},
}) => {
  return (
    <Wrapper>
      <Row>
        <Field marginRight="10px">
          <Input
            type="date"
            title="생산업체접수일"
            name={RECEIPT.MANUFACTURER_DETAIL.REGISTER_DATE}
            value={
              targetData[RECEIPT.MANUFACTURER_DETAIL.REGISTER_DATE]
                ? moment(targetData[RECEIPT.MANUFACTURER_DETAIL.REGISTER_DATE]).format("YYYY-MM-DD")
                : undefined
            }
          />
        </Field>
        <Field marginRight="10px">
            <Checkbox 
              title="재수선"  
              name={RECEIPT.MANUFACTURER_DETAIL.REDO}
              checked={targetData[RECEIPT.MANUFACTURER_DETAIL.REDO]}
            />
        </Field>
        <Field marginRight="10px">
          <Input
            type="date"
            title="생산업체발송일"
            name={RECEIPT.MANUFACTURER_DETAIL.COMPLETE_DATE}
            value={
              targetData[RECEIPT.MANUFACTURER_DETAIL.COMPLETE_DATE]
                ? moment(targetData[RECEIPT.MANUFACTURER_DETAIL.COMPLETE_DATE]).format("YYYY-MM-DD")
                : undefined
            }
          />
        </Field>
      </Row>
      <Row>
        <TextArea
          title="생산업체설명:"
          name={RECEIPT.MANUFACTURER_DETAIL.MESSAGE}
          value={targetData[RECEIPT.MANUFACTURER_DETAIL.MESSAGE]}
          styleOptions={{ width: "100%", height: "50px" }}
        />
      </Row>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 7px 7px 7px 7px;
`;

export default ManufacturerInfo;
