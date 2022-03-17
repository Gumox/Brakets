import React, { useContext } from "react";
import styled from "styled-components";
import moment from "moment";

import { OptionContext, ReceiptContext } from "../../store/Context";
import COLOR from "../../constants/color";
import { CUSTOMER, STORE, RECEIPT, DETAIL } from "../../constants/field";
import {
  DEFAULT_OPTION,
  RECEIPT_CATEGORY_OPTIONS,
  RECEIPT_TYPE_OPTIONS,
} from "../../constants/select-option";
import { Row, Field, SectionRow, Section } from "../styled";
import Input from "../Input";
import SelectOption from "../SelectOption";
import TextArea from "../TextArea";

const StoreInfo = ({
  targetData = {},
  handleChangeTargetData = () => {},
  openReceiptImage = () => {},
}) => {
  const { storeList, productCategoryList } = useContext(OptionContext);
  return (
    <Wrapper>
      <SectionRow>
        <Section marginRight="5px" width="90%">
          <Row>
            <Field marginRight="5px">
              <SelectOption
                title="매장명"
                name={STORE.ID}
                options={[DEFAULT_OPTION, ...storeList]}
                value={targetData[STORE.ID]}
                onChange={handleChangeTargetData}
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
                  targetData[RECEIPT.RECEIPT_DATE]
                    ? moment(targetData[RECEIPT.RECEIPT_DATE]).format(
                        "YYYY-MM-DD"
                      )
                    : undefined
                }
                onChange={handleChangeTargetData}
              />
            </Field>

            <Field marginRight="5px">
              <Input
                type="date"
                title="고객약속일"
                name={RECEIPT.DUE_DATE}
                styleOptions={{ padding: "1px 0px" }}
                value={
                  targetData[RECEIPT.DUE_DATE]
                    ? moment(targetData[RECEIPT.DUE_DATE]).format("YYYY-MM-DD")
                    : undefined
                }
                onChange={handleChangeTargetData}
              />
            </Field>
            
          </Row>
        </Section>
        <Section width="120px">
          {/* TODO */}
          {/* {targetData[RECEIPT.ID] && (
            <ImageButton onClick={openReceiptImage}>사진 보기</ImageButton>
          )} */}
        </Section>
      </SectionRow>

      <Row alignItems="flex-start">
        <Field marginRight="10px">
          <SelectOption
            title="접수구분"
            name={RECEIPT.CATEGORY}
            options={[DEFAULT_OPTION, ...RECEIPT_CATEGORY_OPTIONS]}
            value={targetData[RECEIPT.CATEGORY]}
            onChange={handleChangeTargetData}
          />
        </Field>
        <Field marginRight="10px">
          <SelectOption
            title="고객요구"
            name={RECEIPT.TYPE}
            options={[DEFAULT_OPTION, ...RECEIPT_TYPE_OPTIONS]}
            value={targetData[RECEIPT.TYPE]}
            onChange={handleChangeTargetData}
            styleOptions={{ width: "120px", maxWidth: "120px" }}
          />
        </Field>
        <Field marginRight="5px">
          <SelectOption
            title="제품구분"
            name={DETAIL.PRODUCT_CATEGORY_ID}
            options={[DEFAULT_OPTION, ...productCategoryList]}
            value={targetData[DETAIL.PRODUCT_CATEGORY_ID]}
            onChange={handleChangeTargetData}
            styleOptions={{
              width: "120px",
              maxWidth: "120px",
            }}
          />
        </Field>
        <Field marginRight="5px">
              <Input
                title="고객명"
                name={CUSTOMER.NAME}
                styleOptions={{ width: "100px" }}
                value={targetData[CUSTOMER.NAME] || ""}
                onChange={handleChangeTargetData}
              />
            </Field>
            <Field marginRight="0px">
              <Input
                title="고객연락처"
                name={CUSTOMER.CONTACT}
                styleOptions={{ width: "100px" }}
                value={targetData[CUSTOMER.CONTACT] || ""}
                onChange={handleChangeTargetData}
              />
            </Field>
      </Row>
      <Row>
        <Field height="80px" width="100%">
          <TextArea
            title="매장접수내용"
            value={targetData[RECEIPT.STORE_MESSAGE]}
            styleOptions={{ width: "100%", height: "50px" }}
            disabled={true}
          />
        </Field>
      </Row>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: calc(100% - 600px);
  margin: 0px 15px 5px 5px;
  padding: 2px 10px 0px 10px;
  border: 2px solid ${COLOR.BORDER_MAIN};
  border-radius: 5px;
`;

const ImageButton = styled.button`
  width: 120px;
  min-height: max-content;
  font-size: 12px;
  font-weight: bold;
  background-color: ${COLOR.BORDER_MAIN};
  color: ${COLOR.WHITE};
  padding: 3px;
  border-radius: 15px;
  border: 2px solid ${COLOR.BORDER_MAIN};
`;

export default StoreInfo;
