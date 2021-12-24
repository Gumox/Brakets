import React from "react";
import styled from "styled-components";
import moment from "moment";

import COLOR from "../../../constants/color";
import { RECEIPT, DETAIL, REPAIR, MANUFACTURER } from "../../../constants/field";
import {
  OPTIONS,
  RECEIPT_TYPE_OPTIONS,
  SHIPPING_OPTIONS,
} from "../../../constants/select-option";
import { Row, Field, Section, SectionRow } from "../../styled";
import Input from "../../Input";
import SelectOption from "../../SelectOption";
import TextArea from "../../TextArea";
import Checkbox from "../../Checkbox";

import RepairInfo from "./Repair";
import ManufacturerInfo from "./Manufacturer";

const DetailInfo = ({
  data = {},
  mfrData = {},
  repairData = [],
  handleValueChange = () => {},
}) => {
  return (
    <Wrapper>
      <Container>
      {repairData.length === 0 && <RepairInfo {...{handleValueChange}} data={{}}/> /** 수선처 데이터가 없는 경우 어떤 내용인지 볼수있는 부분 */}
      {repairData.map((repair) => <RepairInfo key={repair[REPAIR.ID]} {...{handleValueChange}} data={repair}/>)}
      {mfrData[MANUFACTURER.ID] && <ManufacturerInfo {...{handleValueChange}} data={mfrData}/>}
      </Container>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 50%;
  margin: 0px 5px 5px 15px;
`;

const Container = styled.div`
  width: 100%;
  padding: 7px 7px 7px 7px;
  border: 2px solid ${COLOR.BORDER_MAIN};
  border-radius: 5px;

  > div {
    border-top: 1px solid ${COLOR.BORDER_MAIN};
  }

  > div: first-child {
    border-top: none;
  }
`;

export default DetailInfo;
