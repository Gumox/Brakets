import React, {useState, useEffect} from "react";
import styled from "styled-components";
import store from "../../../store/store";
import axios from "axios";
import COLOR from "../../../constants/color";
import Options from "./Option";
import List from "./List";
import Sum from "./Sum";

const ReturnInvoice = ({ state, user, handleSearchButtonClick = {} }) => {

  const [data, setData] = useState(""); // TODO
  const [dataForCompany, setDataForCompany] = useState("");
  const [itemList, setItemList] = useState([])


  const getInvoiceLogStore = async(list) =>{
    const[datas] =await Promise.all([
      axios.post(`${process.env.API_URL}/invoiceLogClaimStore/getInvoiceList`,{
        body: {list:list},
      })
      .then(({ data }) => data)
      .catch(error=>{
  
      })
    ])
    return datas;
  }

  useEffect(async() => {
    let tmp = await getInvoiceLogStore(itemList);
    setData(tmp);
  }, [itemList])

  const getInvoiceLogCompany = async(list) =>{
    const[datas] =await Promise.all([
      axios.post(`${process.env.API_URL}/invoiceLogClaimCompany/getInvoiceList`,{
        body: {list:list},
      })
      .then(({ data }) => data)
      .catch(error=>{
  
      })
    ])
    return datas;
  }

  useEffect(async() => {
    let tmp = await getInvoiceLogCompany(itemList);
    setDataForCompany(tmp);
  }, [itemList])


  let items = [];
  store.subscribe(() => {
    store.getState().selected_data.selectedFlatRows.map((item) => {
      items.push(item.original)
    })
    setItemList(items)
    items=[];
  });
  
  const invoiceDataStore = data == "" ? [] : data;
  const invoiceDataCompany = dataForCompany == "" ? [] : dataForCompany;


  return (
    <Wrapper>
        <Options state = {state} user = {user} handleSearchButtonClick = {handleSearchButtonClick}/>
        <List data={state == "출고확정" ? invoiceDataStore : invoiceDataCompany}/>
        <Sum />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: calc(40% - 85px);
  width: 100%;
`;

export default ReturnInvoice;
