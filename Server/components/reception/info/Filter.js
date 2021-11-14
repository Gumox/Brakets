import React, { useCallback, useState } from "react";
import styled from "styled-components";

import COLOR from "../../../constants/color";
import { OPTIONS } from "../../../constants/select-option";
import { Row, Field } from "../../styled";
import Input from "../../Input";
import SelectOption from "../../SelectOption";
import Checkbox from "../../Checkbox";

const FilterInfo = ({
  data = {},
  handleCheckboxChange = () => {},
  handleValueChange = () => {},
  handleSearchButtonClick = () => {},
}) => {
  return (
    <Wrapper>
      <Title>조회</Title>
      <Row>
        <Field>
          <Checkbox
            title="매장별"
            name="isStoreType"
            onChange={handleCheckboxChange}
          />
        </Field>
        <Field>
          <SelectOption
            title="매장명"
            name="storeName"
            options={OPTIONS}
            value={data["storeName"]}
            onChange={handleValueChange}
          />
        </Field>
        <Field marginRight="20px">
          <SelectOption
            title="날짜기준"
            name="dateOption"
            options={OPTIONS}
            value={data["dateOption"]}
            onChange={handleValueChange}
          />
        </Field>
        <Field>
          <Input
            type="date"
            name="startDate"
            styleOptions={{ padding: "1px 0px" }}
            value={data["startDate"]}
            onChange={handleValueChange}
          />
          <span>~</span>
          <Input
            type="date"
            name="endDate"
            styleOptions={{ padding: "1px 0px" }}
            value={data["endDate"]}
            onChange={handleValueChange}
          />
          <div>
            <Field height="15px">
              <Checkbox
                type="radio"
                title="기간전체"
                name="dateType"
                value="all"
                onChange={handleValueChange}
              />
            </Field>
            <Field height="15px">
              <Checkbox
                type="radio"
                title="하루만"
                name="dateType"
                value="day"
                onChange={handleValueChange}
              />
            </Field>
          </div>
        </Field>
        <Row>
        <Field>
          <SelectOption
            title="접수여부"
            name="receiptType"
            options={OPTIONS}
            value={data["receiptType"]}
            onChange={handleValueChange}
          />
        </Field>
        <Field>
          <SelectOption
            title="발송여부"
            name="sendType"
            options={OPTIONS}
            value={data["sendType"]}
            onChange={handleValueChange}
          />
        </Field>
        <Field>
          <SelectOption
            title="내용분석"
            name="contentType"
            options={OPTIONS}
            value={data["contentType"]}
            onChange={handleValueChange}
          />
        </Field>
        <Field>
          <SelectOption
            title="판정결과"
            name="step"
            options={OPTIONS}
            value={data["step"]}
            onChange={handleValueChange}
          />
        </Field>
        </Row>
      </Row>
      <Row>
        <Field>
          <Checkbox
            title="스타일별"
            name="isStyleType"
            onChange={handleCheckboxChange}
          />
        </Field>
        <Field marginRight="20px">
          <SelectOption
            title="시즌"
            name="season"
            options={OPTIONS}
            value={data["season"]}
            onChange={handleValueChange}
          />
        </Field>
        <Field>
          <SelectOption
            title="스타일"
            name="style"
            options={OPTIONS}
            value={data["style"]}
            onChange={handleValueChange}
          />
        </Field>
        <Field>
          <Input
            title="고객이름:"
            name="customerName"
            value={data["customerName"]}
            onChange={handleValueChange}
          />
        </Field>
        <Field>
          <Input
            title="연락처(뒷4자리):"
            name="customerContact"
            value={data["customerContact"]}
            onChange={handleValueChange}
          />
        </Field>
        <Field>
          <Input
            title="업체명:"
            name="companyName"
            value={data["companyName"]}
            onChange={handleValueChange}
          />
        </Field>
        <SmsButton>조회 대상 SMS 전송</SmsButton>
      </Row>
      <SearchButton onClick={handleSearchButtonClick}>조회</SearchButton>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: relative;
  margin: 15px 10px 25px 10px;
  padding: 10px;
  border: 2px solid ${COLOR.FILTER_MAIN};
  border-radius: 5px;
`;

const Title = styled.div`
  position: absolute;
  top: -10px;
  width: 50px;
  height: 20px;
  font-size: 13px;
  text-align: center;
  color: ${COLOR.FILTER_MAIN};
  border: 2px solid ${COLOR.FILTER_MAIN};
  background-color: ${COLOR.WHITE};
`;

const SearchButton = styled.button`
  position: absolute;
  bottom: -20px;
  right: 10px;
  width: 80px;
  height: 30px;
  font-size: 17px;
  text-align: center;
  color: ${COLOR.WHITE};
  border: 2px solid ${COLOR.FILTER_MAIN};
  background-color: ${COLOR.FILTER_MAIN};
  border-radius: 5px;
`;

const SmsButton = styled.button`
  height: 25px;
  background-color: ${COLOR.BLACK};
  color: ${COLOR.WHITE};
  margin: 0 15px;
  padding: 0 20px;
  border-radius: 10px;
  border: none;
`;

export default FilterInfo;
