import React, { useContext } from "react";
import styled from "styled-components";
import moment from "moment";

import { OptionContext } from "../../../store/Context";
import COLOR from "../../../constants/color";
import { PRODUCT, RECEIPT } from "../../../constants/field";
import { Row, Field, Section, SectionRow } from "../../styled";
import Input from "../../Input";
import SelectOption from "../../SelectOption";

const ProducInfo = ({
  data = {},
  handleValueChange = () => {},
  handleProductImageClick = () => {},
}) => {
  const { seasonList } = useContext(OptionContext);
  return (
    <Wrapper>
      <SectionRow>
        <Section>
          <Row>
            <Field marginRight="10px">
              <SelectOption
                title="시즌"
                name={PRODUCT.SEASON}
                options={seasonList}
                value={data[PRODUCT.SEASON] || ""}
                onChange={handleValueChange}
              />
            </Field>
            <Field marginRight="10px">
              <Input
                title="스타일"
                name={PRODUCT.STYLE}
                styleOptions={{ width: "80px" }}
                value={data[PRODUCT.STYLE] || ""}
                onChange={handleValueChange}
              />
            </Field>
            <Field marginRight="10px">
              <Input
                title="차수"
                name={PRODUCT.DEGREE}
                styleOptions={{ width: "30px" }}
                value={data[PRODUCT.DEGREE] || ""}
                onChange={handleValueChange}
              />
            </Field>
            <Field marginRight="10px">
              <Input
                title="컬러"
                name={PRODUCT.COLOR}
                styleOptions={{ width: "30px" }}
                value={data[PRODUCT.COLOR] || ""}
                onChange={handleValueChange}
              />
            </Field>
            <Field marginRight="10px">
              <Input
                title="사이즈"
                name={PRODUCT.SIZE}
                styleOptions={{ width: "30px" }}
                value={data[PRODUCT.SIZE] || ""}
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
                value={data[PRODUCT.RFID] || ""}
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
                disabled={true}
              />
            </Field>
          </Row>
        </Section>
        <Section>
          {data[PRODUCT.IMAGE] && (
            <ProductImage
              imageUrl={data[PRODUCT.IMAGE]}
              onClick={handleProductImageClick}
            />
          )}
        </Section>
      </SectionRow>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 40%;
  margin: 0px 15px 5px 5px;
  padding: 10px;
  border: 2px solid ${COLOR.BORDER_MAIN};
  border-radius: 5px;
`;

const ProductImage = styled.div`
  width: 80px;
  height: 80px;
  background-color: ${COLOR.GRAY};
  background: center / contain no-repeat url(${({ imageUrl }) => imageUrl});
  color: ${COLOR.WHITE};
  margin-right: 5px;
  cursor: pointer;
`;

export default ProducInfo;
