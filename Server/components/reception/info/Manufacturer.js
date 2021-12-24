import React from "react";
import styled from "styled-components";
import moment from "moment";

import COLOR from "../../../constants/color";
import { RECEIPT, REPAIR, MANUFACTURER } from "../../../constants/field";
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

const ManufacturerInfo = ({
  options,
  data = {},
  handleValueChange = () => {},
}) => {
  return (
    <Wrapper>
      <Row>
        <Field marginRight="10px">
          <Input
            type="date"
            title="생산업체접수일"
            name={MANUFACTURER.REGISTER_DATE}
            value={
              data[MANUFACTURER.REGISTER_DATE]
                ? moment(data[MANUFACTURER.REGISTER_DATE]).format("YYYY-MM-DD")
                : undefined
            }
          />
        </Field>
        <Field marginRight="10px">
            <Checkbox 
              title="재수선"  
              name={MANUFACTURER.REDO}
              checked={data[MANUFACTURER.REDO]}
            />
        </Field>
        <Field marginRight="10px">
          <Input
            type="date"
            title="생산업체발송일"
            name={MANUFACTURER.COMPLETE_DATE}
            value={
              data[MANUFACTURER.COMPLETE_DATE]
                ? moment(data[MANUFACTURER.COMPLETE_DATE]).format("YYYY-MM-DD")
                : undefined
            }
          />
        </Field>
      </Row>
      <Row>
        <TextArea
          title="생산업체설명:"
          name={MANUFACTURER.MESSAGE}
          value={data[MANUFACTURER.MESSAGE]}
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
