import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import COLOR from "../../../constants/color";
import {
  OPTIONS,
  DEFAULT_OPTION,
  REPAIR_OPTIONS,
  REPAIR_PLACE_OPTIONS,
  SHIPPING_OPTIONS,
} from "../../../constants/select-option";
import { RECEIPT } from "../../../constants/field";
import { Row, Field, Section, SectionRow } from "../../styled";
import Input from "../../Input";
import SelectOption from "../../SelectOption";
import TextArea from "../../TextArea";
import Checkbox from "../../Checkbox";

const ReceiptInfo = ({ options, data = {}, handleValueChange = () => {} }) => {
  const [isRepair, setIsRepiar] = useState(false);
  const [isReview, setIsReview] = useState(false);

  const resultType = useMemo(
    () =>
      options.resultType.reduce(
        (prev, cur) => ({ ...prev, [cur.value]: cur.text }),
        {}
      ),
    [options]
  );
  useEffect(() => {
    if (!resultType[data[RECEIPT.RESULT_ID]]) return;
    if (resultType[data[RECEIPT.RESULT_ID]].includes("수선")) setIsRepiar(true);
    else setIsRepiar(false);

    if (resultType[data[RECEIPT.RESULT_ID]].includes("심의")) setIsReview(true);
    else setIsReview(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data[RECEIPT.RESULT_ID]]);
  return (
    <Wrapper>
      <SectionRow>
        <Section marginRight="10px">
          <Row>
            <Field>
              <Input type="date" title="본사접수일" />
            </Field>
          </Row>
          <Row>
            <Field>
              <SelectOption
                title="1.과실구분:"
                name={RECEIPT.FAULT_ID}
                options={[DEFAULT_OPTION, ...options.faultType]}
                value={data[RECEIPT.FAULT_ID]}
                onChange={handleValueChange}
                styleOptions={{ maxWidth: "80px" }}
              />
            </Field>
          </Row>
          <Row>
            <Field>
              <SelectOption
                title="2.내용분석:"
                name={RECEIPT.ANALYSIS_ID}
                options={[DEFAULT_OPTION, ...options.analysisType]}
                value={data[RECEIPT.ANALYSIS_ID]}
                onChange={handleValueChange}
                styleOptions={{ maxWidth: "80px" }}
              />
            </Field>
          </Row>
          <Row>
            <Field>
              <SelectOption
                title="3.판정결과:"
                name={RECEIPT.RESULT_ID}
                options={[DEFAULT_OPTION, ...options.resultType]}
                value={data[RECEIPT.RESULT_ID]}
                onChange={handleValueChange}
                styleOptions={{ maxWidth: "80px" }}
              />
            </Field>
          </Row>
          {!isReview && (
            <Row>
              {!isRepair && (
                <Field>
                  <Checkbox title="폐기" />
                </Field>
              )}

              <Field>
                <Checkbox title="수선미입고" />
              </Field>
            </Row>
          )}
        </Section>
        <Section>
          <TextArea title="본사설명:" styleOptions={{ width: "400px" }} />
        </Section>
      </SectionRow>
      <SectionRow>
        {!isReview && (
          <Section marginRight="10px">
            <Row>
              <Field>
                <SelectOption
                  title="수선처지정:"
                  // name={PRODUCT.SEASON}
                  options={[DEFAULT_OPTION, ...options.repairList]}
                  // value={data[PRODUCT.SEASON]}
                  // onChange={handleValueChange}
                  styleOptions={{ maxWidth: "80px" }}
                />
              </Field>
              <Field>
                <Input type="date" title="발송일 to R" />
              </Field>
            </Row>
            <Row>
              <Field>
                <Input title="생산업체" styleOptions={{ width: "50px" }} />
                <Input styleOptions={{ width: "70px" }} />
              </Field>
              <Field>
                <Input type="date" title="발송일 to M" />
              </Field>
              <Field>
                <Input title="대체품" styleOptions={{ width: "70px" }} />
              </Field>
            </Row>
            <Row>
              <Field>
                <Checkbox />
                <Input title="유상수선비" styleOptions={{ width: "70px" }} />
              </Field>
              <Field>
                <Input title="현금영수증번호" />
              </Field>
            </Row>
            {!isRepair && (
              <>
                <Row>
                  <Field>
                    <Input
                      title="고객구매금액"
                      styleOptions={{ width: "70px" }}
                    />
                  </Field>
                  <Field>
                    <Input title="Tag가:" styleOptions={{ width: "70px" }} />
                  </Field>
                  <Field>
                    <SelectOption
                      title="할인율:"
                      // name={PRODUCT.SEASON}
                      options={OPTIONS}
                      // value={data[PRODUCT.SEASON]}
                      // onChange={handleValueChange}
                      styleOptions={{ maxWidth: "80px" }}
                    />
                  </Field>
                  <Field>
                    <Input title="실판매가:" styleOptions={{ width: "70px" }} />
                  </Field>
                </Row>
                <Row>
                  <Field>
                    <SelectOption
                      title="클레임가:"
                      // name={PRODUCT.SEASON}
                      options={OPTIONS}
                      // value={data[PRODUCT.SEASON]}
                      // onChange={handleValueChange}
                      styleOptions={{ maxWidth: "70px" }}
                    />
                    <Input styleOptions={{ width: "70px" }} />
                  </Field>
                  <Field>
                    <Input type="date" title="발송일 to S" />
                  </Field>
                </Row>
              </>
            )}
          </Section>
        )}
        {isReview && (
          <Section>
            <Row>
              <Field>
                <div>분쟁조정의뢰서</div>
                <ReportButton>출력</ReportButton>
              </Field>
              <Field>
                <Input type="date" title="심의의뢰일" />
              </Field>
            </Row>
            <Row>
              <Field>
                <div>심의결과서</div>
                <ReportButton>파일저장</ReportButton>
              </Field>
              <Field>
                <Input type="date" title="발송일 to S" />
              </Field>
            </Row>
          </Section>
        )}
        <Section>
          <ButtonArea>
            <SaveButton>저장</SaveButton>
          </ButtonArea>
        </Section>
      </SectionRow>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  margin: 0px 15px 5px 5px;
`;

const ButtonArea = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const ReportButton = styled.button`
  min-height: max-content;
  width: 100px;
  background-color: ${COLOR.MENU_MAIN};
  color: ${COLOR.WHITE};
  padding: 2px 5px;
  border-radius: 5px;
  border: 2px solid ${COLOR.BLUE};
  word-break: keep-all;
`;
const SaveButton = styled.button`
  min-height: max-content;
  width: 100px;
  background-color: ${COLOR.ORANGE};
  color: ${COLOR.WHITE};
  padding: 5px;
  border-radius: 5px;
  border: 2px solid ${COLOR.ORANGE};
  word-break: keep-all;
`;

export default ReceiptInfo;
