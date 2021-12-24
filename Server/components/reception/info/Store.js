import React, { useContext } from "react";
import styled from "styled-components";
import moment from "moment";

import { OptionContext, ReceiptContext } from "../../../store/Context";
import COLOR from "../../../constants/color";
import { CUSTOMER, STORE, RECEIPT, DETAIL } from "../../../constants/field";
import {
  RECEIPT_CATEGORY_OPTIONS,
  RECEIPT_TYPE_OPTIONS,
} from "../../../constants/select-option";
import { Row, Field, SectionRow, Section } from "../../styled";
import Input from "../../Input";
import SelectOption from "../../SelectOption";
import TextArea from "../../TextArea";

const StoreInfo = ({ handleValueChange = () => {} }) => {
  const { storeList, productCategoryList } = useContext(OptionContext);
  const data = useContext(ReceiptContext);
  return (
    <Wrapper>
      <SectionRow>
        <Section>
          <Row>
            <Field marginRight="5px">
              <SelectOption
                title="매장명"
                name={STORE.ID}
                options={storeList}
                value={data[STORE.ID]}
                onChange={handleValueChange}
                styleOptions={{ width: "180px", maxWidth: "180px" }}
              />
            </Field>
            <Field marginRight="5px">
              <Input
                type="date"
                title="매장접수일"
                name={RECEIPT.RECEIPT_DATE}
                styleOptions={{ padding: "1px 0px" }}
                value={
                  data[RECEIPT.RECEIPT_DATE]
                    ? moment(data[RECEIPT.RECEIPT_DATE]).format("YYYY-MM-DD")
                    : undefined
                }
                onChange={handleValueChange}
              />
            </Field>

            <Field marginRight="5px">
              <Input
                type="date"
                title="고객약속일"
                name={RECEIPT.DUE_DATE}
                styleOptions={{ padding: "1px 0px" }}
                value={
                  data[RECEIPT.DUE_DATE]
                    ? moment(data[RECEIPT.DUE_DATE]).format("YYYY-MM-DD")
                    : undefined
                }
                onChange={handleValueChange}
              />
            </Field>
          </Row>
          <Row>
            <Field marginRight="5px">
              <Input
                title="고객명"
                name={CUSTOMER.NAME}
                styleOptions={{ width: "100px" }}
                value={data[CUSTOMER.NAME] || ""}
                onChange={handleValueChange}
              />
            </Field>
            <Field marginRight="0px">
              <Input
                title="고객연락처"
                name={CUSTOMER.CONTACT}
                styleOptions={{ width: "100px" }}
                value={data[CUSTOMER.CONTACT] || ""}
                onChange={handleValueChange}
              />
            </Field>
          </Row>
          <Row alignItems="flex-start">
            <Field marginRight="5px">
              <SelectOption
                title="접수구분"
                name={RECEIPT.CATEGORY}
                options={RECEIPT_CATEGORY_OPTIONS}
                value={data[RECEIPT.CATEGORY]}
                onChange={handleValueChange}
              />
            </Field>
            <Field marginRight="5px">
              <SelectOption
                title="고객요구"
                name={RECEIPT.TYPE}
                options={RECEIPT_TYPE_OPTIONS}
                value={data[RECEIPT.TYPE]}
                // onChange={handleValueChange}
                styleOptions={{ width: "120px", maxWidth: "120px" }}
              />
            </Field>
            <Field marginRight="0px">
              <SelectOption
                title="제품구분"
                name={DETAIL.PRODUCT_CATEGORY_ID}
                options={productCategoryList}
                value={data[DETAIL.PRODUCT_CATEGORY_ID]} // details last index pcategory_id
                // onChange={handleValueChange}
                styleOptions={{
                  width: "120px",
                  maxWidth: "120px",
                  color: COLOR.RED,
                }}
              />
            </Field>
          </Row>
        </Section>
        <Section>
          <TextArea
            title="매장접수내용"
            value={data[RECEIPT.STORE_MESSAGE]}
            styleOptions={{ width: "350px", height: "60px" }} // details first index message
            disabled={true}
          />
        </Section>
      </SectionRow>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 60%;
  margin: 0px 5px 5px 15px;
  padding: 10px;
  border: 2px solid ${COLOR.BORDER_MAIN};
  border-radius: 5px;
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

export default StoreInfo;
