import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import axios from "axios";

import COLOR from "../../../constants/color";
import Options from "./Options";
import List from "./List";
import Sum from "./Sum";

import store from '../../../store/store'
import { values } from "lodash";

const ReturnInvoice = ({}) => {

  const [data, setData] = useState("");
  const [itemList, setItemList] = useState([])


  const insertLog = async(list) =>{
    const[datas] =await Promise.all([
      axios.post(`${process.env.API_URL}/invoiceLog/getInvoiceList`,{
        body: {list:list},
      })
      .then(({ data }) => data)
      .catch(error=>{
  
      })
    ])
    return datas;
  }

  useEffect(async() => {
    let tmp = await insertLog(itemList);
    setData(tmp);
  }, [store.getState().selected_data.selectedFlatRows])


  let items = [];
  store.subscribe(() => {
    store.getState().selected_data.selectedFlatRows.map((item) => {
      items.push(item.original)
    })
    setItemList(items)
    items=[];
  });
  
    
  const invoiceData = ( data == "" ) ? ( [] ) : ( data );

  return (
    <Wrapper>
        <List data={invoiceData}/>
        <Sum />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: calc(40% - 85px);
  /* height: 100%; */
  width: 100%;
`;

const Btn = styled.button`
  width: 500px;
  height: 200px;
  background: red;
`;

export default ReturnInvoice;
