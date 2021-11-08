import React from "react";
import styled from "styled-components";

import COLOR from "../../../constants/color";
import { CUSTOMER, STORE, RECEIPT } from "../../../constants/field";
import { STORE_OPTIONS } from "../../../constants/dummy";
import { Row, Field } from "../../styled";
import Input from "../../Input";
import SelectOption from "../../SelectOption";

const StoreInfo = ({ data = {}, handleValueChange = () => {} }) => {
  return (
    <Wrapper>
      <Row>
        <Field>
          <SelectOption
            title={STORE.NAME.title}
            name={STORE.NAME.id}
            options={STORE_OPTIONS}
            value={data[STORE.NAME.id]}
            onChange={handleValueChange}
            styleOptions={{ maxWidth: "150px" }}
          />
        </Field>
        <Field>
          <Input
            title={CUSTOMER.NAME.title}
            name={CUSTOMER.NAME.id}
            styleOptions={{ width: "100px" }}
            value={data[CUSTOMER.NAME.id]}
            onChange={handleValueChange}
          />
        </Field>
        <Field>
          <Input
            title={CUSTOMER.CONTACT.title}
            name={CUSTOMER.CONTACT.id}
            styleOptions={{ width: "100px" }}
            value={data[CUSTOMER.CONTACT.id]}
            onChange={handleValueChange}
          />
        </Field>
      </Row>
      <Row>
        <Field>
          <Input
            title={RECEIPT.TYPE.title}
            name={RECEIPT.TYPE.id}
            styleOptions={{ width: "100px" }}
            value={data[RECEIPT.TYPE.id]}
            onChange={handleValueChange}
          />
        </Field>
        <Field>
          <Input
            type="date"
            title={RECEIPT.RECEIPT_DATE.title}
            name={RECEIPT.RECEIPT_DATE.id}
            styleOptions={{ padding: "1px 0px" }}
            value={data[RECEIPT.RECEIPT_DATE.id]}
            onChange={handleValueChange}
          />
        </Field>
        <Field>
          <Input
            type="date"
            title={RECEIPT.DUE_DATE.title}
            name={RECEIPT.DUE_DATE.id}
            styleOptions={{ padding: "1px 0px" }}
            value={data[RECEIPT.DUE_DATE.id]}
            onChange={handleValueChange}
          />
        </Field>
      </Row>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  border: 2px dotted ${COLOR.PURPLE};
  margin: 0px 15px 5px 5px;
`;

export default StoreInfo;
