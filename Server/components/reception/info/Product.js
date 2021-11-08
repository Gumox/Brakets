import React from "react";
import styled from "styled-components";

import COLOR from "../../../constants/color";
import { PRODUCT } from "../../../constants/field";
import { SEASON_OPTIONS } from "../../../constants/dummy";
import { Row, Field } from "../../styled";
import Input from "../../Input";
import SelectOption from "../../SelectOption";

const ProducInfo = ({ data = {}, handleValueChange = () => {} }) => {
  return (
    <Wrapper>
      <Row>
        <Field>
          <SelectOption
            title={PRODUCT.SEASON.title}
            name={PRODUCT.SEASON.id}
            options={SEASON_OPTIONS}
            value={data[PRODUCT.SEASON.id]}
            onChange={handleValueChange}
          />
        </Field>
        <Field>
          <Input
            title={PRODUCT.STYLE.title}
            name={PRODUCT.STYLE.id}
            styleOptions={{ width: "100px" }}
            value={data[PRODUCT.STYLE.id]}
            onChange={handleValueChange}
          />
        </Field>
        <Field>
          <Input
            title={PRODUCT.DEGREE.title}
            name={PRODUCT.DEGREE.id}
            styleOptions={{ width: "40px" }}
            value={data[PRODUCT.DEGREE.id]}
            onChange={handleValueChange}
          />
        </Field>
        <Field>
          <Input
            title={PRODUCT.COLOR.title}
            name={PRODUCT.COLOR.id}
            styleOptions={{ width: "40px" }}
            value={data[PRODUCT.COLOR.id]}
            onChange={handleValueChange}
          />
        </Field>
        <Field>
          <Input
            title={PRODUCT.SIZE.title}
            name={PRODUCT.SIZE.id}
            styleOptions={{ width: "40px" }}
            value={data[PRODUCT.SIZE.id]}
            onChange={handleValueChange}
          />
        </Field>
      </Row>
      <Row>
        <Field>
          <Input
            title={PRODUCT.RFID.title}
            name={PRODUCT.RFID.id}
            styleOptions={{ width: "100px" }}
            value={data[PRODUCT.RFID.id]}
            onChange={handleValueChange}
          />
        </Field>
        <Field>
          <Input
            type="date"
            title={PRODUCT.RELEASE_DATE.title}
            name={PRODUCT.RELEASE_DATE.id}
            styleOptions={{ padding: "1px 0px" }}
            value={data[PRODUCT.RELEASE_DATE.id]}
            onChange={handleValueChange}
          />
        </Field>
        <Field>
          <Input
            title={PRODUCT.SUBSTITUE_CODE.title}
            name={PRODUCT.SUBSTITUE_CODE.id}
            styleOptions={{ width: "70px" }} 
            value={data[PRODUCT.SUBSTITUE_CODE.id]}
            onChange={handleValueChange}
          />
        </Field>
      </Row>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  border: 2px dotted ${COLOR.GRAY};
  margin: 0px 5px 5px 15px;
`;

export default ProducInfo;
