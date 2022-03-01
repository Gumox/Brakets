import React from "react";
import styled from "styled-components";
import moment from "moment";

import COLOR from "../../../constants/color";

const Options = ({state}) => {
  return (
    <Wrapper>
      <CustomerButton>일괄선택</CustomerButton>
      <CustomerButton width="250px">
        선택된 항목 전표 발생/취소 (+,-)
      </CustomerButton>

      {(state === "출고확정") ? (
        <>
          <Notice>
            [출고확정]
            업체 클래임으로 처리된 건에 대해 [매장]에 전표를 발행하는 부분입니다.
            기 발행된 건의 경우 취소하면 -전표가 발행되며, 내용수정이 가능합니다.
          </Notice>
        </>
      ) : (
        <Notice>
          [출고대기]
          업체 클래임으로 처리된 건에 대해 [업체]에 전표를 발행하는 부분입니다.
          기 발행된 건의 경우 취소하면 -전표가 발행되며, 내용수정이 가능합니다.
        </Notice>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 10px 0 10px 20px;
  height: 80px;
  width: 100%;
`;

const Notice = styled.div`
  padding: 5px 0;
  width: 100%;
  height: 20px;
  color: ${COLOR.RED};
  font-size: 12px;
`;

const CustomerButton = styled.button`
  height: 40px;
  width: ${({ width = "100px" }) => width};
  margin-right: 20px;
  border: 3px solid ${COLOR.BLACK};
`;

export default Options;
