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
} from "../../../store/Context";
import COLOR from "../../../constants/color";
import { OPTIONS, DEFAULT_OPTION } from "../../../constants/select-option";
import { RECEIPT, REPAIR, MANUFACTURER } from "../../../constants/field";
import { Row, Field, Section, SectionRow } from "../../styled";
import Input from "../../Input";
import SelectOption from "../../SelectOption";
import TextArea from "../../TextArea";
import Checkbox from "../../Checkbox";

const ReceiptInfo = ({
  handleValueChange = () => {},
  handleCheckboxChange = () => {},
}) => {
  const { resultType, faultType, analysisType, repairList } =
    useContext(OptionContext);
  const data = useContext(ReceiptContext);
  const repairData = useContext(RepairContext);
  const mfrData = useContext(ManufacturerContext);

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
    if (!resultTypeMap[data[RECEIPT.RESULT_ID]]) return;
    if (resultTypeMap[data[RECEIPT.RESULT_ID]].includes("수선"))
      setIsRepiar(true);
    else setIsRepiar(false);

    if (resultTypeMap[data[RECEIPT.RESULT_ID]].includes("심의"))
      setIsReview(true);
    else setIsReview(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data[RECEIPT.RESULT_ID]]);
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
                  data[RECEIPT.RECEIPT_DATE]
                    ? moment(data[RECEIPT.REGISTER_DATE]).format("YYYY-MM-DD")
                    : undefined
                }
                onChange={handleValueChange}
              />
            </Field>
          </Row>
          <Row>
            <Field>
              <SelectOption
                title="1.과실구분:"
                name={RECEIPT.FAULT_ID}
                options={[DEFAULT_OPTION, ...faultType]}
                value={data[RECEIPT.FAULT_ID]}
                onChange={handleValueChange}
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
                value={data[RECEIPT.ANALYSIS_ID]}
                onChange={handleValueChange}
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
                value={data[RECEIPT.RESULT_ID]}
                onChange={handleValueChange}
                styleOptions={{ maxWidth: "160px", width: "160px" }}
              />
            </Field>
          </Row>
          {!isReview && (
            <Row>
              {!isRepair && (
                <Field>
                  <Checkbox title="폐기" styleOptions={{ color: COLOR.RED }} />
                </Field>
              )}

              <Field>
                <Checkbox
                  title="수선미입고"
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
            value={data[RECEIPT.MESSAGE] || ""}
            onChange={handleValueChange}
            styleOptions={{ width: "500px" }}
          />
        </Section>
      </SectionRow>
      {!isReview && (
        <>
          {repairData.map((repair, index) => (
            <Row key={repair["repair_detail_id"]}>
              <Field marginRight="10px">
                <SelectOption
                  title={`수선처지정${index + 1}`}
                  name={REPAIR.PLACE_ID}
                  options={[DEFAULT_OPTION, ...repairList]}
                  value={repair[REPAIR.PLACE_ID]}
                  styleOptions={{ maxWidth: "160px", width: "160px" }}
                  disabled={true}
                />
              </Field>
              <Field>
                <Input
                  type="date"
                  title={`발송일 to R${index + 1}`}
                  name={REPAIR.SEND_DATE}
                  value={
                    repair[REPAIR.SEND_DATE]
                      ? moment(repair[REPAIR.SEND_DATE]).format("YYYY-MM-DD")
                      : undefined
                  }
                  disabled={true}
                />
              </Field>
              <Field>
                <Input
                  title={`총 비용${index + 1}`}
                  name={REPAIR.TOTAL_PRICE}
                  value={repair[REPAIR.TOTAL_PRICE]}
                  styleOptions={{ width: "50px" }}
                  disabled={true}
                />
              </Field>
            </Row>
          ))}
          <Row>
            <RepairAddButton>수선처 추가</RepairAddButton>
          </Row>
          <Row>
            <Field marginRight="10px">
              <Input
                title="생산업체"
                name={RECEIPT.MANUFACTURER_CODE}
                value={data[RECEIPT.MANUFACTURER_CODE] || ""}
                onChange={handleValueChange}
                styleOptions={{ width: "50px" }}
              />
              <Input
                name={RECEIPT.MANUFACTURER_NAME}
                value={data[RECEIPT.MANUFACTURER_NAME] || ""}
                onChange={handleValueChange}
                styleOptions={{ width: "80px" }}
                disabled={true}
              />
            </Field>
            <Field marginRight="10px">
              <Input
                type="date"
                title="발송일 to M"
                name={MANUFACTURER.SEND_DATE}
                value={
                  mfrData[MANUFACTURER.SEND_DATE]
                    ? moment(mfrData[MANUFACTURER.SEND_DATE]).format(
                        "YYYY-MM-DD"
                      )
                    : undefined
                }
                onChange={handleValueChange}
              />
            </Field>
            <Field marginRight="0px">
              <Input
                title="수선대체상품"
                styleOptions={{ width: "20px" }}
                value={mfrData[MANUFACTURER.SUBSTITUTE]}
                disabled={true}
              />
            </Field>
          </Row>
          <Row>
            <Field marginRight="10px">
              <Checkbox
                name={RECEIPT.FREECHARGE}
                value={parseInt(data[RECEIPT.FREECHARGE]) === 1 ? 1 : 0}
                checked={parseInt(data[RECEIPT.FREECHARGE]) === 1}
                onChange={handleValueChange}
              />
              <Input
                title="유상수선비"
                name={RECEIPT.CHARGE}
                value={data[RECEIPT.CHARGE]}
                onChange={handleValueChange}
                styleOptions={{ width: "70px" }}
                disabled={parseInt(data[RECEIPT.FREECHARGE]) !== 1}
              />
            </Field>
            <Field>
              <Input
                title="현금영수증번호"
                name={RECEIPT.CASHRECEIPT_NUM}
                value={data[RECEIPT.CASHRECEIPT_NUM] || ""}
                onChange={handleValueChange}
                disabled={parseInt(data[RECEIPT.FREECHARGE]) !== 1}
              />
            </Field>
          </Row>
          {!isRepair && (
            <Row>
              <Field marginRight="10px">
                <Input
                  title="고객구매금액"
                  styleOptions={{ width: "70px", color: COLOR.RED }}
                />
              </Field>
              <Field marginRight="10px">
                <Input
                  title="Tag가"
                  styleOptions={{ width: "70px", color: COLOR.RED }}
                />
              </Field>
              <Field marginRight="10px">
                <SelectOption
                  title="할인율"
                  options={OPTIONS}
                  styleOptions={{ maxWidth: "80px", color: COLOR.RED }}
                />
              </Field>
              <Field marginRight="0px">
                <Input
                  title="실판매가"
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
                  options={OPTIONS}
                  styleOptions={{ maxWidth: "70px", color: COLOR.RED }}
                />
                <Input styleOptions={{ width: "70px", color: COLOR.RED }} />
              </Field>
            )}
            {/* {isRepair && <Field marginRight="400px" />}
            <Field marginRight="0px">
                <Input
                  type="date"
                  title="발송일 to S"
                  name={RECEIPT.STORE_SEND_DATE}
                  value={
                    data[RECEIPT.STORE_SEND_DATE]
                      ? moment(data[RECEIPT.STORE_SEND_DATE]).format(
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
              <Input type="date" title="심의의뢰일" />
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
                    data[RECEIPT.STORE_SEND_DATE]
                      ? moment(data[RECEIPT.STORE_SEND_DATE]).format(
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
              data[RECEIPT.COMPLETE_DATE]
                ? moment(data[RECEIPT.COMPLETE_DATE]).format("YYYY-MM-DD")
                : undefined
            }
            onChange={handleValueChange}
          />
        </Field>
        <SaveButton>저장</SaveButton>
      </CustomRow>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 50%;
  position: relative;
  margin: 0px 15px 5px 5px;
  padding: 10px;
  border: 2px solid ${COLOR.BORDER_MAIN};
  border-radius: 5px;
`;

const CustomRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  right: 0px;
  bottom: 0px;
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
