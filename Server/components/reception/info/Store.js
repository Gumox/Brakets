import React from "react";
import styled from "styled-components";

import COLOR from "../../../constants/color";
import { CUSTOMER, STORE, RECEIPT } from "../../../constants/field";
import { STORE_OPTIONS } from "../../../constants/select-option";
import { Row, Field } from "../../styled";
import Input from "../../Input";
import SelectOption from "../../SelectOption";

const StoreInfo = ({ data = {}, handleValueChange = () => {} }) => {
  return (
    <Wrapper>
      <Row>
        <Field>
          <SelectOption
            title="매장명"
            name={STORE.ID}
            options={STORE_OPTIONS}
            value={data[STORE.ID]}
            onChange={handleValueChange}
            styleOptions={{ maxWidth: "150px" }}
          />
        </Field>
        <Field>
          <Input
            title="고객명"
            name={CUSTOMER.NAME}
            styleOptions={{ width: "100px" }}
            value={data[CUSTOMER.NAME]}
            onChange={handleValueChange}
          />
        </Field>
        <Field>
          <Input
            title="고객연락처"
            name={CUSTOMER.CONTACT}
            styleOptions={{ width: "100px" }}
            value={data[CUSTOMER.CONTACT]}
            onChange={handleValueChange}
          />
        </Field>
      </Row>
      <Row>
        <Field>
          <Input
            title="접수구분"
            name={RECEIPT.TYPE}
            styleOptions={{ width: "100px" }}
            value={data[RECEIPT.TYPE]}
            onChange={handleValueChange}
          />
        </Field>
        <Field>
          <Input
            type="date"
            title="매장접수일"
            name={RECEIPT.RECEIPT_DATE}
            styleOptions={{ padding: "1px 0px" }}
            value={data[RECEIPT.RECEIPT_DATE]}
            onChange={handleValueChange}
          />
        </Field>
        <Field>
          <Input
            type="date"
            title="고객약속일"
            name={RECEIPT.DUE_DATE}
            styleOptions={{ padding: "1px 0px" }}
            value={data[RECEIPT.DUE_DATE]}
            onChange={handleValueChange}
          />
        </Field>
      </Row>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  min-width: 750px;
  margin: 0px 15px 5px 5px;
`;

export default StoreInfo;
