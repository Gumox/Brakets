import React from "react";
import styled from "styled-components";
import moment from "moment";

import COLOR from "../../../constants/color";
import { PRODUCT, RECEIPT } from "../../../constants/field";
import { Row, Field, Section, SectionRow } from "../../styled";
import Input from "../../Input";
import SelectOption from "../../SelectOption";

const ProducInfo = ({ options, data = {}, handleValueChange = () => {} }) => {
  return (
    <Wrapper>
      <SectionRow>
        <Section>
          <Row>
            <Field marginRight="10px">
              <SelectOption
                title="시즌:"
                name={PRODUCT.SEASON}
                options={options.seasonList}
                value={data[PRODUCT.SEASON]}
                onChange={handleValueChange}
              />
            </Field>
            <Field marginRight="10px">
              <Input
                title="스타일:"
                name={PRODUCT.STYLE}
                styleOptions={{ width: "80px" }}
                value={data[PRODUCT.STYLE]}
                onChange={handleValueChange}
              />
            </Field>
            <Field marginRight="10px">
              <Input
                title="차수:"
                name={PRODUCT.DEGREE}
                styleOptions={{ width: "30px" }}
                value={data[PRODUCT.DEGREE]}
                onChange={handleValueChange}
              />
            </Field>
            <Field marginRight="10px">
              <Input
                title="컬러:"
                name={PRODUCT.COLOR}
                styleOptions={{ width: "30px" }}
                value={data[PRODUCT.COLOR]}
                onChange={handleValueChange}
              />
            </Field>
            <Field marginRight="10px">
              <Input
                title="사이즈:"
                name={PRODUCT.SIZE}
                styleOptions={{ width: "30px" }}
                value={data[PRODUCT.SIZE]}
                onChange={handleValueChange}
              />
            </Field>
          </Row>
          <Row>
            <Field marginRight="10px">
              <Input
                title="RFID코드"
                name={PRODUCT.RFID}
                styleOptions={{ width: "100px" }}
                value={data[PRODUCT.RFID]}
                onChange={handleValueChange}
                disabled={true}
              />
            </Field>
            <Field marginRight="10px">
              <Input
                type="date"
                title="최초출고일"
                name={PRODUCT.RELEASE_DATE}
                styleOptions={{ padding: "1px 0px" }}
                value={
                  data[PRODUCT.RELEASE_DATE]
                    ? moment(data[PRODUCT.RELEASE_DATE]).format("YYYY-MM-DD")
                    : undefined
                }
                onChange={handleValueChange}
                disabled={true}
              />
            </Field>
            <Field marginRight="10px">
              <Input
                title="대체품번"
                name={RECEIPT.SUBSTITUE}
                styleOptions={{ width: "20px" }}
                value={data[RECEIPT.SUBSTITUE]}
                onChange={handleValueChange}
              />
            </Field>
          </Row>
        </Section>
        <Section>
          <ProductImage imageUrl={data[PRODUCT.IMAGE]} />
        </Section>
      </SectionRow>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  margin: 0px 5px 5px 15px;
`;

const ProductImage = styled.div`
  width: 80px;
  height: 80px;
  background-color: ${COLOR.GRAY};
  background: center / contain no-repeat url(${({ imageUrl }) => imageUrl});
  color: ${COLOR.WHITE};
  margin-right: 5px;
`;

export default ProducInfo;
