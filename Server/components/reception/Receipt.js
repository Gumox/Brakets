import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import styled from "styled-components";
import moment from "moment";

import {
  OptionContext,
  ReceiptContext,
  RepairContext,
  ManufacturerContext,
} from "../../store/Context";
import COLOR from "../../constants/color";
import { OPTIONS, DEFAULT_OPTION } from "../../constants/select-option";
import { RECEIPT, REPAIR, MANUFACTURER } from "../../constants/field";
import { Row, Field, Section, SectionRow } from "../styled";
import Input from "../Input";
import SelectOption from "../SelectOption";
import TextArea from "../TextArea";
import Checkbox from "../Checkbox";

const ReceiptInfo = ({
  targetData = {},
  handleChangeTargetData = () => {},
}) => {
  const { resultType, faultType, analysisType, repairList } =
    useContext(OptionContext);

  const [isRepair, setIsRepiar] = useState(false);
  const [isReview, setIsReview] = useState(false);

  const resultTypeMap = useMemo(
    () =>
      resultType.reduce(
        (prev, cur) => ({ ...prev, [cur.value]: cur.text }),
        {}
      ),
    [resultType]
  );
  useEffect(() => {
    if (!resultTypeMap[targetData[RECEIPT.RESULT_ID]]) return;
    if (resultTypeMap[targetData[RECEIPT.RESULT_ID]].includes("수선"))
      setIsRepiar(true);
    else setIsRepiar(false);

    if (resultTypeMap[targetData[RECEIPT.RESULT_ID]].includes("심의"))
      setIsReview(true);
    else setIsReview(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetData[RECEIPT.RESULT_ID]]);
  return (
    <Wrapper>
      <SectionRow>
        <Section marginRight="10px">
          <Row>
            <Field>
              <Input
                type="date"
                title="본사접수일"
                name={RECEIPT.REGISTER_DATE}
                value={
                  targetData[RECEIPT.RECEIPT_DATE]
                    ? moment(targetData[RECEIPT.REGISTER_DATE]).format(
                        "YYYY-MM-DD"
                      )
                    : undefined
                }
                onChange={handleChangeTargetData}
              />
            </Field>
          </Row>
          <Row>
            <Field>
              <SelectOption
                title="1.과실구분:"
                name={RECEIPT.FAULT_ID}
                options={[DEFAULT_OPTION, ...faultType]}
                value={targetData[RECEIPT.FAULT_ID]}
                onChange={handleChangeTargetData}
                styleOptions={{ maxWidth: "160px", width: "160px" }}
              />
            </Field>
          </Row>
          <Row>
            <Field>
              <SelectOption
                title="2.내용분석:"
                name={RECEIPT.ANALYSIS_ID}
                options={[DEFAULT_OPTION, ...analysisType]}
                value={targetData[RECEIPT.ANALYSIS_ID]}
                onChange={handleChangeTargetData}
                styleOptions={{ maxWidth: "160px", width: "160px" }}
              />
            </Field>
          </Row>
          <Row>
            <Field>
              <SelectOption
                title="3.판정결과:"
                name={RECEIPT.RESULT_ID}
                options={[DEFAULT_OPTION, ...resultType]}
                value={targetData[RECEIPT.RESULT_ID]}
                onChange={handleChangeTargetData}
                styleOptions={{ maxWidth: "160px", width: "160px" }}
              />
            </Field>
          </Row>
          {!isReview && (
            <Row>
              {!isRepair && (
                <Field>
                  <Checkbox
                    title="폐기"
                    onChange={handleChangeTargetData}
                    styleOptions={{ color: COLOR.RED }}
                  />
                </Field>
              )}

              <Field>
                <Checkbox
                  title="수선미입고"
                  onChange={handleChangeTargetData}
                  styleOptions={{ color: COLOR.RED }}
                />
              </Field>
            </Row>
          )}
        </Section>
        <Section>
          <TextArea
            title="본사설명:"
            name={RECEIPT.MESSAGE}
            value={targetData[RECEIPT.MESSAGE] || ""}
            onChange={handleChangeTargetData}
            styleOptions={{ width: "500px" }}
          />
        </Section>
      </SectionRow>
      {!isReview && (
        <>
          {RECEIPT.REPAIR_DETAILS.map((REPAIR, index) => (
            <Row key={REPAIR.PREFIX}>
              <Field marginRight="10px">
                <SelectOption
                  title={`수선처지정${index + 1}`}
                  name={`${REPAIR.PREFIX}${REPAIR.PLACE_ID}`}
                  options={[DEFAULT_OPTION, ...repairList]}
                  value={targetData[`${REPAIR.PREFIX}${REPAIR.PLACE_ID}`]}
                  styleOptions={{ maxWidth: "160px", width: "160px" }}
                  onChange={handleChangeTargetData}
                />
              </Field>
              <Field>
                <Input
                  type="date"
                  title={`발송일 to R${index + 1}`}
                  name={`${REPAIR.PREFIX}${REPAIR.SEND_DATE}`}
                  value={
                    targetData[`${REPAIR.PREFIX}${REPAIR.SEND_DATE}`]
                      ? moment(targetData[`${REPAIR.PREFIX}${REPAIR.SEND_DATE}`]).format("YYYY-MM-DD")
                      : undefined
                  }
                  onChange={handleChangeTargetData}
                />
              </Field>
              <Field>
                <Input
                  title={`총 비용${index + 1}`}
                  name={`${REPAIR.PREFIX}${REPAIR.TOTAL_PRICE}`}
                  value={targetData[`${REPAIR.PREFIX}${REPAIR.TOTAL_PRICE}`]}
                  styleOptions={{ width: "50px" }}
                  onChange={handleChangeTargetData}
                />
              </Field>
            </Row>
          ))}
          <Row>
            <Field marginRight="10px">
              <Input
                title="생산업체"
                name={RECEIPT.MANUFACTURER_CODE}
                value={targetData[RECEIPT.MANUFACTURER_CODE] || ""}
                disabled={true}
                styleOptions={{ width: "50px" }}
              />
              <Input
                name={RECEIPT.MANUFACTURER_NAME}
                value={targetData[RECEIPT.MANUFACTURER_NAME] || ""}
                styleOptions={{ width: "80px" }}
                disabled={true}
              />
            </Field>
            <Field marginRight="10px">
              <Input
                type="date"
                title="발송일 to M"
                name={RECEIPT.MANUFACTURER_DETAIL.SEND_DATE}
                value={
                  targetData[RECEIPT.MANUFACTURER_DETAIL.SEND_DATE]
                    ? moment(targetData[RECEIPT.MANUFACTURER_DETAIL.SEND_DATE]).format(
                        "YYYY-MM-DD"
                      )
                    : undefined
                }
                onChange={handleChangeTargetData}
              />
            </Field>
            <Field marginRight="0px">
              <Input
                title="수선대체상품"
                styleOptions={{ width: "20px" }}
                value={targetData[RECEIPT.MANUFACTURER_DETAIL.SUBSTITUTE]}
                disabled={true}
              />
            </Field>
          </Row>
          <Row>
            <Field marginRight="10px">
              <Checkbox
                name={RECEIPT.FREECHARGE}
                value={parseInt(targetData[RECEIPT.FREECHARGE]) === 1 ? 1 : 0}
                checked={parseInt(targetData[RECEIPT.FREECHARGE]) === 1}
                onChange={handleChangeTargetData}
              />
              <Input
                title="유상수선비"
                name={RECEIPT.CHARGE}
                value={targetData[RECEIPT.CHARGE]}
                onChange={handleChangeTargetData}
                styleOptions={{ width: "70px" }}
                disabled={parseInt(targetData[RECEIPT.FREECHARGE]) !== 1}
              />
            </Field>
            <Field>
              <Input
                title="현금영수증번호"
                name={RECEIPT.CASHRECEIPT_NUM}
                value={targetData[RECEIPT.CASHRECEIPT_NUM] || ""}
                onChange={handleChangeTargetData}
                disabled={parseInt(targetData[RECEIPT.FREECHARGE]) !== 1}
              />
            </Field>
          </Row>
          {!isRepair && (
            <Row>
              <Field marginRight="10px">
                <Input
                  title="고객구매금액"
                  onChange={handleChangeTargetData}
                  styleOptions={{ width: "70px", color: COLOR.RED }}
                />
              </Field>
              <Field marginRight="10px">
                <Input
                  title="Tag가"
                  onChange={handleChangeTargetData}
                  styleOptions={{ width: "70px", color: COLOR.RED }}
                />
              </Field>
              <Field marginRight="10px">
                <SelectOption
                  title="할인율"
                  options={[DEFAULT_OPTION, ...OPTIONS]}
                  onChange={handleChangeTargetData}
                  styleOptions={{ maxWidth: "80px", color: COLOR.RED }}
                />
              </Field>
              <Field marginRight="0px">
                <Input
                  title="실판매가"
                  onChange={handleChangeTargetData}
                  styleOptions={{ width: "70px", color: COLOR.RED }}
                />
              </Field>
            </Row>
          )}

          <Row>
            {!isRepair && (
              <Field>
                <SelectOption
                  title="클레임가"
                  options={[DEFAULT_OPTION, ...OPTIONS]}
                  onChange={handleChangeTargetData}
                  styleOptions={{ maxWidth: "70px", color: COLOR.RED }}
                />
                <Input
                  onChange={handleChangeTargetData}
                  styleOptions={{ width: "70px", color: COLOR.RED }}
                />
              </Field>
            )}
            {/* {isRepair && <Field marginRight="400px" />}
            <Field marginRight="0px">
                <Input
                  type="date"
                  title="발송일 to S"
                  name={RECEIPT.STORE_SEND_DATE}
                  value={
                    targetData[RECEIPT.STORE_SEND_DATE]
                      ? moment(targetData[RECEIPT.STORE_SEND_DATE]).format(
                          "YYYY-MM-DD"
                        )
                      : undefined
                  }
                  onChange={handleValueChange}
                />
              </Field> */}
          </Row>
        </>
      )}
      {isReview && (
        <>
          <Row>
            <Field>
              <div>분쟁조정의뢰서</div>
              <ReportButton width="68px">출력</ReportButton>
            </Field>
            <Field>
              <Input
                type="date"
                onChange={handleChangeTargetData}
                title="심의의뢰일"
              />
            </Field>
          </Row>
          <Row>
            <Field>
              <div>심의결과서</div>
              <ReportButton>파일저장</ReportButton>
            </Field>
            {/* <Field>
                <Input
                  type="date"
                  title="발송일 to S"
                  name={RECEIPT.STORE_SEND_DATE}
                  value={
                    targetData[RECEIPT.STORE_SEND_DATE]
                      ? moment(targetData[RECEIPT.STORE_SEND_DATE]).format(
                          "YYYY-MM-DD"
                        )
                      : undefined
                  }
                  onChange={handleValueChange}
                />
              </Field> */}
          </Row>
        </>
      )}
      <CustomRow>
        <Field marginRight="20px">
          <Input
            type="date"
            title="발송일 to S"
            name={RECEIPT.COMPLETE_DATE}
            value={
              targetData[RECEIPT.COMPLETE_DATE]
                ? moment(targetData[RECEIPT.COMPLETE_DATE]).format("YYYY-MM-DD")
                : undefined
            }
            onChange={handleChangeTargetData}
          />
        </Field>
        <SaveButton>저장</SaveButton>
      </CustomRow>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: calc(100% - 780px);
  position: relative;
  margin: 0px 15px 5px 5px;
  padding: 10px;
  border: 2px solid ${COLOR.BORDER_MAIN};
  border-radius: 5px;
  align-self: start;
`;

const CustomRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const RepairAddButton = styled.button`
  min-height: max-content;
  width: 100px;
  height: 25px;
  font-size: 13px;
  font-weight: bold;
  background-color: ${COLOR.TEXT_MAIN};
  color: ${COLOR.WHITE};
  border-radius: 5px;
  border: none;
`;

const ReportButton = styled.button`
  min-height: max-content;
  width: ${({ width = "100px" }) => width};
  background-color: ${COLOR.MENU_MAIN};
  color: ${COLOR.WHITE};
  padding: 2px 5px;
  border-radius: 5px;
  border: 2px solid ${COLOR.BLUE};
  word-break: keep-all;
`;

const SaveButton = styled.button`
  min-height: max-content;
  width: 150px;
  height: 35px;
  font-size: 17px;
  font-weight: bold;
  background-color: ${COLOR.BORDER_MAIN};
  color: ${COLOR.WHITE};
  padding: 5px;
  border-radius: 15px;
  border: 2px solid ${COLOR.BORDER_MAIN};
`;

export default ReceiptInfo;
