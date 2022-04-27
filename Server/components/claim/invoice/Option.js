import React, {useState} from "react";
import styled from "styled-components";
import COLOR from "../../../constants/color";
import store from "../../../store/store";
import axios from "axios";

const insertLogStore = async (list, user) => {
  const [datas] = await Promise.all([
    axios.put(`${process.env.API_URL}/invoiceLogClaimStore`, {
      body: { list: list, user: user.name },
    })
      .then(({ data }) => data)
      .catch(error => {

      })
  ])
  console.log(list, user);
  return datas;
}

const insertLogCompany = async (list, user) => {
  const [datas] = await Promise.all([
    axios.put(`${process.env.API_URL}/invoiceLogClaimCompany`, {
      body: { list: list, user: user.name },
    })
      .then(({ data }) => data)
      .catch(error => {

      })
  ])
  console.log(list, user);
  return datas;
}

const Options = ({state, user, handleSearchButtonClick={}}) => {

  const [data, setData] = useState("");

  return (
    <Wrapper>
      {(state === "출고확정") ? (
        <>
          <CustomerButton width="250px"
            onClick={async () => {
              const items = [];
              store.getState().selected_data.selectedFlatRows.map((item) => {items.push(item.original)})
              const tempData = await insertLogStore(items, user);
              setData(tempData);
    
              const len = store.getState().selected_data.selectedFlatRows.length;
    
              if(len == 0){
                confirm("전표를 발행할 건을 선택해주세요.")
              } else{
                confirm("전표가 발행되었습니다.");
                handleSearchButtonClick();    
              }
    
            }
            }
          >
            선택된 항목 전표 발생/취소 (+,-)
          </CustomerButton>
          <Notice>
            [출고확정]
            업체 클래임으로 처리된 건에 대해 [매장]에 전표를 발행하는 부분입니다.
            기 발행된 건의 경우 취소하면 -전표가 발행되며, 내용수정이 가능합니다.
          </Notice>
        </>
      ) : (
        <>
          <CustomerButton width="250px"
            onClick={async () => {
              const items = [];
              store.getState().selected_data.selectedFlatRows.map((item) => {items.push(item.original)})
              const tempData = await insertLogCompany(items, user);
              setData(tempData);
    
              const len = store.getState().selected_data.selectedFlatRows.length;
    
              if(len == 0){
                confirm("전표를 발행할 건을 선택해주세요.")
              } else{
                confirm("전표가 발행되었습니다. (업체)");
                handleSearchButtonClick();    
              }
    
            }
            }          >
            선택된 항목 전표 발생/취소 (+,-)
          </CustomerButton>
          <Notice>
            [출고대기]
            업체 클래임으로 처리된 건에 대해 [업체]에 전표를 발행하는 부분입니다.
            기 발행된 건의 경우 취소하면 -전표가 발행되며, 내용수정이 가능합니다.
        </Notice>
        </>
        
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
