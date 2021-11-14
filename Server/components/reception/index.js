import React, { useState, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";

import Content from "../Content";
import Info from "./info";
import List from "./list";

const Reception = ({ data }) => {
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
      .get("/api/receipt")
      .then((response) => setSearchList(response.data.data));
  }, [inputData]);
  const searchTargetData = useCallback(() => {
    axios
      .get("/api/receipt/7099433")
      .then((response) => setTargetData(response.data.data));
  }, []);
  return (
    <Content>
      <Info
        initialData={data}
        inputData={inputData}
        data={targetData}
        {...{
          handleInputCheckboxChange,
          handleInputValueChange,
          handleTargetValueChange,
          handleSearchButtonClick,
        }}
      />
      <List data={searchList} handleDataClick={searchTargetData}/>
    </Content>
  );
};

export default Reception;
