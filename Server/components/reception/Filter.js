import React, { useCallback, useContext, useReducer, useState } from "react";
import styled from "styled-components";
import Router, { useRouter } from "next/router";
import { OptionContext } from "../../store/Context";
import COLOR from "../../constants/color";
import {
  DEFAULT_OPTION,
  DATE_SEARCH_TYPE_OPTIONS,
  REGISTER_STEP_OPTIONS,
  SEND_OPTIONS,
  ANALYSIS_TYPE_OPTIONS,
  RESULT_TYPE_OPTIONS,
} from "../../constants/select-option";
import { Row, Field } from "../styled";
import Input from "../Input";
import SelectOption from "../SelectOption";
import Checkbox from "../Checkbox";

const FilterInfo = ({
  inputData = {},
  handleChangeInputData = () => {},
  searchReceipts = () => {},
}) => {
  const { storeList, analysisType, resultType, seasonList } =
    useContext(OptionContext);
  const router = useRouter();
  return (
    <Wrapper>
      <Title>조회</Title>
      <Row>
        <Field marginRight="0px">
          <Checkbox
            title="매장별"
            name="isStoreType"
            checked={inputData["isStoreType"]}
            onChange={handleChangeInputData}
          />
        </Field>
        <Field marginRight="5px">
          <SelectOption
            title="매장명"
            name="storeName"
            disabled={!inputData["isStoreType"]}
            options={[DEFAULT_OPTION, ...storeList]}
            value={inputData["storeName"]}
            onChange={handleChangeInputData}
            styleOptions={{width: "180px", maxWidth: "180px"}}
          />
        </Field>
        <Field marginRight="5px">
          <SelectOption
            title="날짜기준"
            name="dateOption"
            options={DATE_SEARCH_TYPE_OPTIONS}
            value={inputData["dateOption"]}
            onChange={handleChangeInputData}
          />
        </Field>
        <Field>
          <Input
            type="date"
            name="startDate"
            styleOptions={{ padding: "1px 0px" }}
            value={inputData["startDate"]}
            onChange={handleChangeInputData}
          />
          <span>~</span>
          <Input
            type="date"
            name="endDate"
            styleOptions={{ padding: "1px 0px" }}
            value={inputData["endDate"]}
            disabled={inputData["dateType"] === "day"}
            onChange={handleChangeInputData}
          />
          <div>
            <Field height="15px" marginRight="5px">
              <Checkbox
                type="radio"
                title="기간전체"
                name="dateType"
                value="all"
                checked={"all" === inputData["dateType"]}
                onChange={handleChangeInputData}
              />
            </Field>
            <Field height="15px" marginRight="5px">
              <Checkbox
                type="radio"
                title="하루만"
                name="dateType"
                value="day"
                checked={"day" === inputData["dateType"]}
                onChange={handleChangeInputData}
              />
            </Field>
          </div>
        </Field>
        <Row>
          <Field marginRight="5px">
            <SelectOption
              title="접수여부"
              name="hasRegistered"
              options={REGISTER_STEP_OPTIONS}
              value={inputData["hasRegistered"]}
              onChange={handleChangeInputData}
            />
          </Field>
          <Field marginRight="5px">
            <SelectOption
              title="발송여부"
              name="hasSent"
              options={SEND_OPTIONS}
              value={inputData["hasSent"]}
              onChange={handleChangeInputData}
            />
          </Field>
          <Field marginRight="5px">
            <SelectOption
              title="내용분석"
              name="analysisId"
              options={[...ANALYSIS_TYPE_OPTIONS, ...analysisType]}
              value={inputData["analysisId"]}
              onChange={handleChangeInputData}
            />
          </Field>
          <Field marginRight="0px">
            <SelectOption
              title="판정결과"
              name="resultId"
              options={[...RESULT_TYPE_OPTIONS, ...resultType]}
              value={inputData["resultId"]}
              onChange={handleChangeInputData}
            />
          </Field>
        </Row>
      </Row>
      <Row>
        <Field marginRight="0px">
          <Checkbox
            title="스타일별"
            name="isStyleType"
            checked={inputData["isStyleType"]}
            onChange={handleChangeInputData}
          />
        </Field>
        <Field marginRight="2px">
          <SelectOption
            title="시즌"
            name="season"
            disabled={!inputData["isStyleType"]}
            options={[DEFAULT_OPTION, ...seasonList]}
            checked={inputData["season"]}
            onChange={handleChangeInputData}
          />
        </Field>
        <Field>
          <Input
            title="스타일"
            name="style"
            disabled={!inputData["isStyleType"]}
            value={inputData["style"]}
            onChange={handleChangeInputData}
          />
        </Field>
        <Field>
          <Input
            title="고객이름:"
            name="customerName"
            value={inputData["customerName"]}
            onChange={handleChangeInputData}
          />
        </Field>
        <Field>
          <Input
            title="연락처(뒷4자리):"
            name="customerContact"
            value={inputData["customerContact"]}
            onChange={handleChangeInputData}
          />
        </Field>
        <Field>
          <Input
            title="업체명:"
            name="companyName"
            value={inputData["companyName"]}
            onChange={handleChangeInputData}
          />
        </Field>
        <SmsButton onClick={() => router.push("/sms")}>조회 대상 SMS 전송</SmsButton>
      </Row>
      <SearchButton onClick={searchReceipts}>조회</SearchButton>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: relative;
  margin: 10px 10px 5px 10px;
  padding: 10px;
  border: 2px solid ${COLOR.FILTER_MAIN};
  border-radius: 5px;
`;

const Title = styled.div`
  position: absolute;
  top: -8px;
  width: 100px;
  height: 20px;
  font-size: 12px;
  text-align: center;
  color: ${COLOR.FILTER_MAIN};
  border: 2px solid ${COLOR.FILTER_MAIN};
  background-color: ${COLOR.WHITE};
`;

const SearchButton = styled.button`
  position: absolute;
  bottom: 5px;
  right: 10px;
  width: 150px;
  height: 35px;
  font-size: 17px;
  font-weight: bold;
  text-align: center;
  color: ${COLOR.WHITE};
  border: 2px solid ${COLOR.FILTER_MAIN};
  background-color: ${COLOR.FILTER_MAIN};
  border-radius: 15px;
`;

const SmsButton = styled.button`
  height: 25px;
  background-color: ${COLOR.FILTER_MAIN};
  color: ${COLOR.WHITE};
  margin: 0 15px;
  padding: 0 20px;
  border-radius: 5px;
  border: none;
`;

export default FilterInfo;
