import React, { useContext } from "react";
import styled from "styled-components";
import moment from "moment";

import COLOR from "../../constants/color";
import { RECEIPT, DETAIL, REPAIR, MANUFACTURER } from "../../constants/field";
import {
  OPTIONS,
  RECEIPT_TYPE_OPTIONS,
  SHIPPING_OPTIONS,
} from "../../constants/select-option";
import { Row, Field, Section, SectionRow } from "../styled";
import Input from "../Input";
import SelectOption from "../SelectOption";
import TextArea from "../TextArea";
import Checkbox from "../Checkbox";

import { ManufacturerContext, RepairContext } from "../../store/Context";
import RepairInfo from "./Repair";
import ManufacturerInfo from "./Manufacturer";

const DetailInfo = ({ targetData = {}, handleChangeTargetData = () => {} }) => {
  return (
    <Wrapper>
      <Container>
        {
          !targetData[
          RECEIPT.REPAIR_DETAILS[0].ID
          ] && (
            <RepairInfo
              REPAIR={RECEIPT.REPAIR_DETAILS[0]}
              {...{ targetData, handleChangeTargetData }}
            />
          ) /** 수선처 데이터가 없는 경우 어떤 내용인지 볼수있는 부분 */
        }
        {RECEIPT.REPAIR_DETAILS.filter(
          (REPAIR) => targetData[REPAIR.ID]
        ).map((REPAIR) => (
          <RepairInfo
            key={REPAIR.ID}
            REPAIR={REPAIR}
            {...{ targetData, handleChangeTargetData }}
          />
        ))}
        {targetData[RECEIPT.MANUFACTURER_DETAIL.ID] && (
          <ManufacturerInfo {...{ targetData }} />
        )}
      </Container>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 780px;
  min-width: 780px;
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

  >div: first-child {
    border-top: none;
  }
`;

export default DetailInfo;
