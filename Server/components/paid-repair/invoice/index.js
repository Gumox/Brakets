import React, {useState, useEffect} from "react";
import styled from "styled-components";
import moment from "moment";
import axios from 'axios'

import COLOR from "../../../constants/color";
import Options from "./Option";
import List from "./List";
import Sum from "./Sum";

import store from '../../../store/store'

const ReturnInvoice = ({}) => {

  const [data, setData] = useState("");
  const [itemList, setItemList] = useState([])


  const getInvoiceLog = async(list) =>{
    const[datas] =await Promise.all([
      axios.post(`${process.env.API_URL}/invoiceLogPaidRepair/getInvoiceList`,{list:list}
      )
      .then(({ data }) => data)
      .catch(error=>{
  
      })
    ])
    return datas;
  }

  useEffect(async() => {
    let tmp = await getInvoiceLog(itemList);
    setData(tmp);
  }, [itemList])


  let items = [];
  store.subscribe(() => {
    store.getState().selected_data.selectedFlatRows.map((item) => {
      items.push(item.original)
    })
    setItemList(items)
    items=[];
  });
  
  const invoiceData = data == "" ? [] : data;
  
  return (
    <Wrapper>
        <List data={invoiceData}/>
        <Sum />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: calc(40% - 85px);
  width: 100%;
`;

export default ReturnInvoice;
