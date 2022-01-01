import React, { useContext } from "react";
import styled from "styled-components";
import moment from "moment";

import { OptionContext, ReceiptContext } from "../../store/Context";
import COLOR from "../../constants/color";
import { PRODUCT, RECEIPT } from "../../constants/field";
import { Row, Field, Section, SectionRow } from "../styled";
import Input from "../Input";
import SelectOption from "../SelectOption";
import { DEFAULT_OPTION } from "../../constants/select-option";

const ProducInfo = ({
  targetData = {},
  handleChangeTargetData = () => {},
  openProductImage = () => {},
}) => {
  const { seasonList } = useContext(OptionContext);
  return (
    <Wrapper>
      <SectionRow>
        <Section marginRight="0px" width="70%">
          <Row>
            <Field marginRight="10px">
              <SelectOption
                title="시즌"
                name={PRODUCT.SEASON_ID}
                options={[DEFAULT_OPTION, ...seasonList]}
                value={targetData[PRODUCT.SEASON_ID] || ""}
                styleOptions={{ width: "100px" }}
                onChange={handleChangeTargetData}
                // disabled={true}
              />
            </Field>
            <Field marginRight="10px">
              <Input
                title="스타일"
                name={PRODUCT.STYLE}
                value={targetData[PRODUCT.STYLE] || ""}
                styleOptions={{ width: "110px" }}
                onChange={handleChangeTargetData}
                // disabled={true}
              />
            </Field>
          </Row>
          <Row>
            <Field marginRight="10px">
              <Input
                title="차수"
                name={PRODUCT.DEGREE}
                styleOptions={{ width: "30px" }}
                value={targetData[PRODUCT.DEGREE] || ""}
                onChange={handleChangeTargetData}
                // disabled={true}
              />
            </Field>
            <Field marginRight="10px">
              <Input
                title="컬러"
                name={PRODUCT.COLOR}
                styleOptions={{ width: "40px" }}
                value={targetData[PRODUCT.COLOR] || ""}
                onChange={handleChangeTargetData}
                // disabled={true}
              />
            </Field>
            <Field marginRight="10px">
              <Input
                title="사이즈"
                name={PRODUCT.SIZE}
                styleOptions={{ width: "30px" }}
                value={targetData[PRODUCT.SIZE] || ""}
                onChange={handleChangeTargetData}
                // disabled={true}
              />
            </Field>
          </Row>
          <Row>
            <Field marginRight="5px">
              <Input
                title="RFID코드"
                name={PRODUCT.RFID}
                styleOptions={{ width: "210px" }}
                value={targetData[PRODUCT.RFID] || ""}
                onChange={handleChangeTargetData}
                // disabled={true}
              />
            </Field>
            <Field marginRight="5px">
              <Input
                title="대체품번"
                name={RECEIPT.SUBSTITUE}
                value={targetData[RECEIPT.SUBSTITUE]}
                styleOptions={{ width: "15px" }}
                onChange={handleChangeTargetData}
                // disabled={true}
              />
            </Field>
          </Row>
          <Row>
            <Field marginRight="0px">
              <Input
                type="date"
                title="최초출고일"
                name={PRODUCT.RELEASE_DATE}
                value={
                  targetData[PRODUCT.RELEASE_DATE]
                    ? moment(targetData[PRODUCT.RELEASE_DATE]).format(
                        "YYYY-MM-DD"
                      )
                    : undefined
                }
                styleOptions={{ padding: "1px 0px", width: "125px" }}
                disabled={true}
              />
            </Field>
          </Row>
        </Section>
        <Section width="120px">
          {targetData[PRODUCT.IMAGE] && (
            <ProductImage
              imageUrl={targetData[PRODUCT.IMAGE]}
              onClick={openProductImage}
            />
          )}
        </Section>
      </SectionRow>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 600px;
  min-width: 600px;
  margin: 0px 5px 5px 15px;
  padding: 10px 10px;
  border: 2px solid ${COLOR.BORDER_MAIN};
  border-radius: 5px;
`;

const ProductImage = styled.div`
  width: 120px;
  height: 100%;
  background-color: ${COLOR.GRAY};
  background: center / contain no-repeat url(${({ imageUrl }) => imageUrl});
  color: ${COLOR.WHITE};
  margin-right: 5px;
  cursor: pointer;
`;

export default ProducInfo;
