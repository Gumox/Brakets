import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

import Content from "../Content";
import Modal from "../Modal";
import SearchField from "./SearchField";
import List from "./list"
import Invoice from './invoice'

const Return = () => {
  const [isProductImageModalOpen, setIsProductImageModalOpen] = useState(false);
  const openProductImage = useCallback(
    () => setIsProductImageModalOpen(true),
    []
  );
  const closeProductImage = useCallback(
    () => setIsProductImageModalOpen(false),
    []
  );
  const [inputData, setInputData] = useState({});
  const [targetData, setTargetData] = useState({});
  const [searchList, setSearchList] = useState([]);
  const handleInputCheckboxChange = useCallback(
    (e) => {
      setInputData({ ...inputData, [e.target.name]: e.target.checked });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [inputData]
  );
  const handleInputValueChange = useCallback(
    (e) => {
      setInputData({ ...inputData, [e.target.name]: e.target.value });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inputData]
  );
  const handleTargetCheckboxChange = useCallback(
    (e) => {
      setTargetData({ ...targetData, [e.target.name]: e.target.checked });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [targetData]
  );
  const handleTargetValueChange = useCallback(
    (e) => {
      setTargetData({ ...targetData, [e.target.name]: e.target.value });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [targetData]
  );
  const handleSearchButtonClick = useCallback(() => {
    axios
      .get("/api/receipt", { 
        params: {
          ...inputData,
          dateType: inputData["isMonthly"]? "month": "all",
          dateOption: 'complete_date',
          
          // TODO
          // hasCharged: true
        }
      })
      .then((response) => setSearchList(response.data.data));
  }, [inputData]);
  const searchTargetData = useCallback((receiptCode) => {
    axios
      .get(`/api/receipt/${receiptCode}`)
      .then((response) => setTargetData(response.data.data));
  }, []);

  useEffect(() => console.log(targetData), [targetData]);
  return (

    <Content>
      <SearchField
        data={inputData}
        handleCheckboxChange={handleInputCheckboxChange}
        handleValueChange={handleInputValueChange}
        handleSearchButtonClick={handleSearchButtonClick}
      />
      <List data={searchList}/>
      <Invoice />
    </Content>
    
  );
};

export default Return;
