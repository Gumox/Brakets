import React, {useState, useEffect,useCallback} from "react";
import styled from "styled-components";
import moment from "moment";

import COLOR from "../../constants/color";
import store from "../../store/store";
import axios from "axios";


const Options = ({ user, handleSearchButtonClick={} }) => {

  const [data, setData] = useState("");
  const [itemList, setItemList] = useState([]);


  const insertLog = async(list, user) =>{
    const body= {list:list, user:user.name}
    const[datas] =await Promise.all([
      axios.put(`${process.env.API_URL}/invoiceLog`,body)
      .then(({ data }) => data)
      .catch(error=>{
  
      })
    ])
    console.log(datas)
    return datas;
  }


  return (
    <Wrapper>
      <CustomerButton width="250px"
        onClick={async () => {
          const items = [];
          store.getState().selected_data.selectedFlatRows.map((item) => {items.push(item.original)})
          const tempData = await insertLog(items, user);
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
        하자반품 처리된 건에 대해 전표를 발행하는 부분입니다. 기 발행된 건의
        경우 취소하면 -전표가 발행되며, 내용수정이 가능합니다.
      </Notice>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 10px 0 10px 20px;
  height: 80px;
  width: 100%;
  border-bottom: 2px solid;
`;

const Notice = styled.div`
padding: 5px 0;
width: 100%;
height: 20px;
font-size: 12px;
color: ${COLOR.RED};
`;

const CustomerButton = styled.button`
  height: 40px;
  width: ${({ width = "100px" }) => width};
  margin-right: 20px;
  border: 3px solid ${COLOR.BLACK};
`;


export default Options;