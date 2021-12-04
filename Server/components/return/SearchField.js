import React from "react";
import styled from "styled-components";

import { MONTHLY_OPTIONS } from "../../constants/select-option";
import COLOR from "../../constants/color";
import Input from "../Input";
import SelectOption from "../SelectOption";
import Checkbox from "../Checkbox";
import { Row, Field } from "../styled";

const SearchField = ({
  options,
  data = {},
  handleCheckboxChange = () => {},
  handleValueChange = () => {},
  handleSearchButtonClick = () => {},
}) => {
  return (
    <Wrapper>
      <Row>
        <Field>
          <Checkbox
            title="매장별"
            name="isStoreType"
            checked={data["isStoreType"]}
            onChange={handleCheckboxChange}
          />
        </Field>
        <Field>
          <SelectOption
            title="매장명"
            name="storeName"
            disabled={!data["isStoreType"]}
            options={options.storeList}
            value={data["storeName"]}
            onChange={handleValueChange}
          />
        </Field>
        <Field>
          <Input
            title="하자반품일"
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
            disabled={data["dateType"] === "day"}
            onChange={handleValueChange}
          />
        </Field>
        <Field>
          {/** TODO: 월별 조건 추가 필요 */}
          <Checkbox
            title="월별"
            name="isMonthly"
            checked={data["isMonthly"]}
            onChange={handleCheckboxChange}
          />
          <SelectOption
            name="startMonth"
            disabled={!data["isMonthly"]}
            options={MONTHLY_OPTIONS}
            value={data["startMonth"]}
            onChange={handleValueChange}
          />
          <SelectOption
            name="endMonth"
            disabled={!data["isMonthly"]}
            options={MONTHLY_OPTIONS}
            value={data["endMonth"]}
            onChange={handleValueChange}
          />
        </Field>
        <SearchButton onClick={handleSearchButtonClick}>조회</SearchButton>
      </Row>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  margin: 5px 15px 20px 15px;
  display: flex;
  flex-wrap: wrap;
`;

const SearchButton = styled.button`
  min-height: max-content;
  background-color: ${COLOR.BLACK};
  color: ${COLOR.WHITE};
  margin: 2px 15px;
  padding: 2px 20px;
  border-radius: 10px;
  border: none;
`;

export default SearchField;
