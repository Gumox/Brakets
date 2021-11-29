import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";

import { DATE_SEARCH_TYPE_OPTIONS } from "../../constants/select-option";

import Content from "../Content";
import Info from "./info";
import List from "./list";

const Reception = ({ options , user}) => {
  const [inputData, setInputData] = useState({
    storeId: user.store_id, 
    storeName: options.storeList[0].value,
    season: options.seasonList[0].value,
    dateOption: DATE_SEARCH_TYPE_OPTIONS[0].value,
    dateType: "all",
  });
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
      .get("/api/receipt", { params: inputData })
      .then((response) => setSearchList(response.data.data));
  }, [inputData]);
  const searchTargetData = useCallback((receiptCode) => {
    axios
      .get(`/api/receipt/${receiptCode}`)
      .then((response) => setTargetData(response.data.data));
  }, []);

  // useEffect(() => console.log(inputData), [inputData]);
  return (
    <Content>
      <Info
        options={options}
        inputData={inputData}
        data={targetData}
        {...{
          handleInputCheckboxChange,
          handleInputValueChange,
          handleTargetValueChange,
          handleSearchButtonClick,
        }}
      />
      <List data={searchList} handleDataClick={searchTargetData} />
    </Content>
  );
};

export default Reception;
