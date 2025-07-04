import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

import Content from "../Content";
import Modal from "../Modal";
import SearchField from "./SearchField";
import List from "./list";
import Total from "./Total";

const Return = ({user}) => {
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
    let hq_id
    if(user.level ==5){
      hq_id = sessionStorage.getItem("ADMIN_HEADQURTER")
    }else{
      hq_id = user.headquarter_id
    }
    axios
      .get("/api/receipt", { 
        params: {
          ...inputData,
          headquarter_id:hq_id,
          dateType: inputData["isMonthly"] ? "month" : "all",
          dateOption: "complete_date",
          
          // TODO
          hasCharged: true,
          hasCashReceipt: true,
        },
      })
      .then((response) => setSearchList(response.data.data));
  }, [inputData]);
  const searchTargetData = useCallback((receiptCode) => {
    axios
      .get(`/api/receipt/${receiptCode}`)
      .then((response) => setTargetData(response.data.data));
  }, []);

  return (
    <Content>
      <SearchField
        data={inputData}
        handleCheckboxChange = {handleInputCheckboxChange}
        handleValueChange = {handleInputValueChange}
        handleSearchButtonClick = {handleSearchButtonClick}
        searchList = {searchList}
      />
      <List data={searchList} />
      {/*<Total total={searchList.length}/> */}
    </Content>
  );
};

export default Return;
